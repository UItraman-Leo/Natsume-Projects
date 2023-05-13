/**
 * 格式化时间
 * @type {{getTime: (function(*): string)}}
 */
const moment = require('moment');
moment.locale('zh-cn');
const formatTime = {
    getTime:(timeData)=>{
        return moment(timeData).format('YYYY-MM-DD');
    }
 }
 export default formatTime