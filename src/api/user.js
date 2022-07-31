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