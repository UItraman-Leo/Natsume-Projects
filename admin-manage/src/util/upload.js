import axios from 'axios'

/**
 * @author: Natsume
 * @描述:
 * *参数1:上传地址
 * *参数2:上传的数据对象
 */
function upload(path, userForm) {
    const param = new FormData()
    for (const i in userForm) {
        param.append(i, userForm[i])
    }
    // console.log(param)
    return axios.post(path, param, {
        headers: {
            // 因为头像是文件类型，需要在headers中指明，会一部分一部分的传
            "Content-Type": "multipart/form-data"
        }
    })

}

export default upload