/**
 * 获取localStorage里vuex的缓存数据判断权限
 */
import {ElMessage} from 'element-plus'

export default function limitsOfAuthority() {
    let cat = JSON.parse(localStorage.getItem("vuex"));
// console.log(cat.userInfo.role);
    if (cat.userInfo.role !== 0) {
        ElMessage({
            message: '权限不足',
            type: 'warning',
        })
        return false
    } else {
        return true
    }

}
