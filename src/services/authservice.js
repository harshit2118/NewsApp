const keyname = "user";
function login(obj){
    let str=JSON.stringify(obj);
    localStorage.setItem(keyname,str);
}
function logout(){
    localStorage.removeItem(keyname);
}
function getUser(){
    let str=localStorage.getItem(keyname);
    let obj = str?JSON.parse(str):null;
    return obj;
}
export default {
    login,
    logout,
    getUser
};