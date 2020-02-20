import axios from 'axios'
//创建一个方法来封装axios实例 axios实例自带promise
export function request(config){
    const instance = axios.create({
      baseURL:'http://123.207.32.32:8000',
      timeout:5000
    })
    return instance(config)
}
