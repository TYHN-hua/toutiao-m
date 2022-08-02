import axios from "axios"
import store from "@/store";
const request = axios.create({
    baseURL:'http://toutiao.itheima.net',
    timeout:3000
})



//添加请求拦截器
request.interceptors.request.use(
    function(config) {
        //config是本次请求的配置
        //发请求之前做什么
        const token = store.state.tokenObj.token
        if (token) {
            config.headers.Authorization = "bearer " + token
        }
        //config一定要返回
        return config
    },
    function(error) {
        //对请求错误做些什么
        return Promise.reject(error)
    }
)

export default request