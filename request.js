import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3001"

export const get = (endpoint)=>{
    return axios.get(endpoint)
}

export const put = (endpoint,data)=>{
    return axios.put(endpoint,data)
}

export const destroy = (endpoint,data)=>{
    return axios.delete(endpoint,data)
}

export const post = (endpoint,data)=>{
    return axios.post(endpoint,data)
}