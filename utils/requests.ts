import axios, {AxiosPromise} from "axios";
import {APIResult} from "../typing";

export const list = (uri: string, params: any): AxiosPromise =>{
    return axios.post(uri, params)
}
export const create = (uri: string, params: any): AxiosPromise =>{
    return axios.post(uri, params)
}
export const update = (uri: string, params: any): AxiosPromise =>{
    return axios.post(uri, params)
}
export const del = (uri: string, id: number | string): AxiosPromise => {
    return axios.post<APIResult>(uri, { id: id })
}
export const post = (uri: string, params: any):  AxiosPromise =>{
    return axios.post(uri, params)
}
