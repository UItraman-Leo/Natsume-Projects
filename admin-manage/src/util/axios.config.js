import axios from 'axios'
// Add a request interceptor 请求之前的拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log("请求之前成功的拦截器", config)
    // 获取到token，将token发给后端
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    // Do something with request error
    // console.log("请求之前失败的拦截器", error)
    return Promise.reject(error);
});

// Add a response interceptor 响应之前的拦截器
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("响应之前成功的拦截器", response.headers)
    const {authorization} = response.headers
    authorization && localStorage.setItem("token", authorization)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log("响应之前失败的拦截器", error)
    //
    const {status} = error.response
    if (status === 401) {
        localStorage.removeItem("token")
        window.location.href = "#/login"
    }

    return Promise.reject(error);
});