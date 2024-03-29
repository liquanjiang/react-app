import Cookies from 'js-cookie'
import {version} from '../../package.json'

/**
 * @description
 * 设置app名称，所有cookie的操作都基于app名称和版本执行
 */
const appName = 'screenDemo'

const util = {
    cookies: {
        set: () => {
        },
        get: () => {
        },
        getAll: () => {
        },
        remove: () => {
        },
    },
    getWeekByNum: {},
    formatDateTime: {},
    formatDate: {},
    getTimeByStr: {},
    getToday: {},
    getNextMonthToday: {},
    getMonthDate: {},
    getBetweenDate: {},
    getSingleArray: {},
    arrayTile: {},
    splitString: {},
    makeTips: {},
    choseArr: {},
    sortBytime: {},
    numSeat: {},
}

// @ts-ignore
// @ts-ignore
/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
util.cookies.set = function(name: any = 'default', value: any = '', setting: any = {}) {
    const cookieSetting = {
        expires: 1,
    }
    Object.assign(cookieSetting, setting)
    Cookies.set(`${appName}-${version}-${name}`, value, cookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
util.cookies.get = function(name: any = 'default') {
    return Cookies.get(`${appName}-${version}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
util.cookies.getAll = function() {
    return Cookies.get()
}

// @ts-ignore
/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
util.cookies.remove = function(name: any = 'default') {
    return Cookies.remove(`${appName}-${version}-${name}`)
}

util.getWeekByNum = (num: number) => {
    switch (num) {
        case 1 :
            return '星期一'
        case 2 :
            return '星期二'
        case 3 :
            return '星期三'
        case 4 :
            return '星期四'
        case 5 :
            return '星期五'
        case 6 :
            return '星期六'
        case 0 :
            return '星期日'
    }
}

// 根据时间戳返回'yyyy-mm-dd hh:mm:ss'格式的字符串
util.formatDateTime = function(inputTime: string | number | Date) {
    const date = new Date(inputTime)
    const y = date.getFullYear()
    let m: any = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d: any = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h: any = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute: any = date.getMinutes()
    let second: any = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

// 根据时间戳返回'yyyy-mm-dd'格式的字符串
util.formatDate = function(inputTime: string | number | Date) {
    const date = new Date(inputTime)
    const y = date.getFullYear()
    let m: any = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d: any = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
}

// 根据'yyyy-mm-dd hh:mm:ss'格式的时间字符串获得时间戳
util.getTimeByStr = function(str: any) {
    let date = str
    date = date.substring(0, 19)
    date = date.replace(/-/g, '/')
    return new Date(date).getTime()
}

// 获取今天的yyyy-mm-dd格式字符串
util.getToday = (hideZero: any) => {
    const date = new Date()
    const month = hideZero ? date.getMonth() + 1 : date.getMonth() >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const day = hideZero ? date.getDate() : date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
}

// 获取下个月的今天的yyyy-mm-dd格式字符串
util.getNextMonthToday = (hideZero: boolean) => {
    const date = new Date()
    const month = hideZero ? date.getMonth() + 2 : date.getMonth() >= 10 ? date.getMonth() + 2 : '0' + (date.getMonth() + 2)
    const day = hideZero ? date.getDate() : date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
}

// 根据输入的月份数据，获取整个月的每一天的日期数组
util.getMonthDate = (month: any) => {
    // 根据日期字符串，返回日期的时间戳
    function getDate(date: string) {
        const temp = date.split('-').map((item: string) => {
            return parseInt(item, 10)
        })
        return new Date(temp[0], temp[1] - 1, temp[2])
    }

    // 根据月初日期 获取 月末日期
    function getMonthEnd(mon: string) {
        const y = mon.substring(0, 4) + '-'
        const mm = parseInt(mon.substring(5, 7), 10) + 1
        const m = mm > 10 ? mm.toString() + '-' : '0' + mm + '-'
        const d = month.substring(8)
        return y + m + d
    }

    // 获取每个月的时间数据，并放入数组中
    const end = getMonthEnd(month)
    const startTime = getDate(month)
    const endTime = getDate(end)
    const arr = []
    while ((endTime.getTime() - startTime.getTime()) > 0) {
        const year = startTime.getFullYear().toString()
        const m = startTime.getMonth() + 1
        const months: any = m < 11 ? '0' + m.toString() : m.toString()
        const d = startTime.getDate()
        const day = d < 10 ? '0' + d.toString() : d.toString()
        const str = year + '-' + months + '-' + day
        const array = []
        array.push(str)
        arr.push(array)
        startTime.setDate(startTime.getDate() + 1)
    }
    return arr
}

// 根据开始时间和结束时间，获取中间的所有时间数据数组
util.getBetweenDate = (start: any, end: any) => {
    // 根据日期字符串，返回日期的时间戳
    function getDate(date: string) {
        const temp = date.split('-').map((item: string) => {
            return parseInt(item, 10)
        })
        return new Date(temp[0], temp[1] - 1, temp[2])
    }

    // 获取每个月的时间数据，并放入数组中
    const startTime = getDate(start)
    const endTime = getDate(end)
    const arr = []
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
        const year = startTime.getFullYear().toString()
        const m = startTime.getMonth() + 1
        const month = m < 11 ? '0' + m.toString() : m.toString()
        const d = startTime.getDate()
        const day = d < 10 ? '0' + d.toString() : d.toString()
        const str = year + '-' + month + '-' + day
        arr.push(str)
        startTime.setDate(startTime.getDate() + 1)
    }
    return arr
}

// 从一个对象数组中，提出指定的key组成的数字或者字符串数组
util.getSingleArray = (array: any, key: string) => {
    if (!array) {
        return []
    }
    const len = array.length
    const arr: any = []
    for (let i = 0; i < len; i++) {
        if (!array[i][key]) {
            continue
        }
        arr.push(array[i][key])
    }
    return arr
}

// 将二维数组转化为一维数组的方法
util.arrayTile = (array: any) => {
    return array.reduce((a: any, b: any) => {
        return a.concat(b)
    })
}

// 根据指定的长度将字符串分割换行
util.splitString = (params: string, lengthNum: any) => {
    let str = ''// 最终拼接成的字符串
    const paramslen = params.length// 实际标签的个数
    const newlen = lengthNum// 每行能显示的字的个数
    const rowNumber = Math.ceil(paramslen / newlen)// 换行的话，需要显示几行，向上取整
    /**
     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
     */
    // 条件等同于rowNumber>1
    if (paramslen > newlen) {
        /** 循环每一行,p表示行 */
        for (let p = 0; p < rowNumber; p++) {
            let tempStr = ''// 表示每一次截取的字符串
            const start = p * newlen// 开始截取的位置
            const end = start + newlen// 结束截取的位置
            // 此处特殊处理最后一行的索引值
            const flag = p === rowNumber - 1
            // 最后一次不换行
            tempStr = flag ? params.substring(start, paramslen) : params.substring(start, end) + '\n'
            str += tempStr// 最终拼成的字符串
        }
    } else {
        // 将旧标签的值赋给新标签
        str = params
    }
    // 将最终的字符串返回
    return str
}

// 生成echarts的tips数组
util.makeTips = (string: string, leng: number) => {
    const len = string.length
    const arrlen = Math.ceil(len / leng)
    let divStr = `<span>`
    for (let i = 0; i < arrlen; i++) {
        let str
        const flag = len > leng * (i + 1)
        str = flag ? string.substring(i * leng, leng * (i + 1)) : string.substring(i * leng)
        const spanstr = `<span>${str}</span><br>`
        divStr += spanstr
    }
    divStr = divStr + `</span>`
    return divStr
}

// 从数组中提取满足条件的数组
util.choseArr = (array: any, key1: string, fun: any, key: string, key2: string) => {
    const arr: any[] = []
    if (!array || array.length === 0 || !fun) {
        return arr
    }
    const len = array.length
    for (let i = 0; i < len; i++) {
        if (fun(array[i][key1], key, key2)) {
            arr.push(array[i])
        }
    }
    return arr
}

// 根据字符串获取时间戳  时间字符串格式为 yyyy-mm-dd
function getTimeByStr(str: any) {
    let date = str
    date = date.replace(/-/g, '')
    const arr = []
    arr[0] = date.substring(0, 4)
    arr[1] = date.substring(4, 6)
    arr[2] = date.substring(6, 8)
    return new Date(arr[0], arr[1], arr[2]).getTime()
}

// 根据时间戳进行排序
util.sortBytime = (obj1: any, obj2: any) => {
    const ts1 = getTimeByStr(obj1['name'])
    const ts2 = getTimeByStr(obj2['name'])
    if (ts1 < ts2) {
        return -1
    } else if (ts1 > ts2) {
        return 1
    } else {
        return 0
    }
}

util.numSeat = (num: any, length: number) => {
    let numStr = num.toString()
    if (numStr.length >= length) {
        return numStr
    }
    const ln = length - numStr.length
    for (let i = 0; i < ln; i++) {
        numStr = '0' + numStr
    }
    return numStr
}

export default util
