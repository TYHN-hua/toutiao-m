import request from '@/utils/request';


/*
 @param {String} mobile
@param {String} code
@returns Promise 
*/
//登录接口
export const login = (mobile,code) => {
    return request({
        url: '/v1_0/authorizations',
        method:'POST',
        data: {mobile,code}
    })
}
//发送验证码接口
export const getSmsCode = (mobile) => {
    return request({
        url: `/v1_0/sms/codes/${mobile}`
    })
}

//获取用户个人资料
export const getUserInfo = () => {
    return request({
        url: '/v1_0/user/profile'
    })
}


// 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData()
// fm.append(表单的name,表单项)
//上传头像文件
export const uploadAvator = (file) => {
    const fm = new FormData()
    fm.append('photo', file)
    return request({
        url:'/v1_0/user/photo',
        method: 'PATCH',
        data: fm
    })
}

//编辑用户个人资料
export const setUserInfo = (data) => {
    return request({
        url: '/v1_0/user/profile',
        method: 'PATCH',
        data,
    })
}