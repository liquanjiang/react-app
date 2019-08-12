import axios from 'axios'

const JsonHeaders = {'Content-Type': 'application/json'}
const time = process.env.VUE_APP_CURRENTMODE === 'production' ? 5000 : 30000
const service = axios.create({
    // 需要非JSON格式交互数据时，设置以下格式
    // headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    headers: JsonHeaders,
    timeout: time,
})

service.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem('token')
    console.log(config.url)
    if (token) {
        config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
})

service.interceptors.response.use((res) => {
    if (res.data.code === 500 && res.data.message === '服务内部异常') {
        /* if (confirm("检测到您可能未登录，是否跳转到登录页面？") == true) {
                    // 跳转到登录页面
                    router.push({
                        path: "/login"
                    })
                } else {

                } */
    } else if (res.data.code === 401 && res.data.message === '用户未登录') {
        // 跳转到登录页面
    }
    return res.data
}, (err) => {
    return Promise.reject(err)
})

export  default  service
