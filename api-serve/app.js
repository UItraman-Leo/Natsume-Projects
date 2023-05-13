const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const UserRouter = require("./routes/admin/UserRouter");
const NewRouter = require("./routes/admin/NewRouter")
const JWT = require("./util/JWT");
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 后台系统用
app.use((req, res, next) => {
    // console.log(req.headers["authorization"].split(" ")[1])
    // 首先排除登录接口，登录前是没有token的
    if (req.url === '/adminapi/user/login') {
        next()
        return;
    }
    const token = req.headers["authorization"].split(" ")[1]
    if (token) {
        // 1.如果token有效 将token给 JWT.verify
        let payload = JWT.verify(token)
        if (payload) {
            // 2.1判断JWT.verify 返回值，如果没有过期为true则刷新token
            const newToken = JWT.generate({
                _id: payload._id,
                username: payload.username
            }, "1d")
            // 2.2将刷新的token返回前端
            res.header("Authorization", newToken)
            next()
        } else {
            // 3.过期为false 返回401 token过期
            res.status(401).send({
                errCode: "-1",
                errorInfo: "token过期"
            })
        }
    }


})
app.use(UserRouter)
app.use(NewRouter)
// 后台系统用

//前台用的



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
