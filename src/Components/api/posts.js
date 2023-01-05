import axios from 'axios';

export const getMenuItem = ()=> {
    return axios.get(`http://localhost:9000/menu`)
}

export const insertUser = (data)=> {
    // console.log("Sending user data :- ", data)
    return axios.post(`http://localhost:9000/user/send-otp`,data)
}

export const getUser = (data)=> {
    return axios.get(`http://localhost:9000/user/`)
}

export const updateUser = (data)=> {
    // console.log("User Edit >>>>>", data);
    return axios.put(`http://localhost:9000/user/edit-user/`, data)
}

export const reSendOtp = (data) =>{
    // console.log("resend Otp", data);
    return axios.put(`http://localhost:9000/user/re-send-otp`,data)
}

export const checkOtp = (data) => {
    return axios.post(`http://localhost:9000/user/check-otp`, data);
}

export const insertOrder = (data)=>{
    return axios.post(`http://localhost:9000/order`, data)
}

export const getUserByNum = (num)=> {
    //console.log("Asdsad",data)
    return axios.get(`http://localhost:9000/user/${num}`)
}

export const getOldUser = (data)=> {
    //console.log("Asdsad",data)
    return axios.post(`http://localhost:9000/user/old-user`, data)
}

export const getOrder = () =>{
    return axios.get(`http://localhost:9000/order`)
}

export const editOrder = (id, data) =>{
    //console.log("Edit order >>>>>>>>", id, data);
    return axios.put(`http://localhost:9000/order/${id}`, data)
}

export const getOrderByID = (id) =>{
    return axios.get(`http://localhost:9000/order/${id}`)
}

export const getOrderByStatus = (data) =>{
    // console.log("Running", data);
    return axios.post(`http://localhost:9000/order/filter/${data.status}`, data)
}

export const getRecentOrder = (data) =>{
    // console.log("Running", data);
    return axios.post(`http://localhost:9000/order/recent-order/`, data)
}

export const getMyOrder = (data) =>{
    // console.log("Running", data);
    return axios.post(`http://localhost:9000/order/my-order/`, data)
}


export const getOrderByUserId = (userId)=> {
    return axios.get(`http://localhost:9000/order/${userId}`)
}

export const deleteOrder = (id) =>{
    return axios.delete(`http://localhost:9000/order/delete/${id}`)
} 

export const getCategories = () =>{
    return axios.get('http://localhost:9000/categories')
}