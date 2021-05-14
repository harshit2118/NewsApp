import axios from 'axios';
const baseURL="http://localhost:2410";
function get(url){
    return axios.get(baseURL+url);
}
function post(url,obj){
    console.log(obj);
    return axios.post(baseURL+url,obj);
}
function put(url,obj){
    console.log("hello on put service")
    return axios.put(baseURL+url,obj);
}
function deleteReq(url,obj){
    return axios.delete(baseURL+url,obj);
}
export default {
    get,
    post,
    put,
    deleteReq,
};