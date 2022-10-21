import axios from 'axios';

export const getMenuItem = ()=> {
    return axios.get(`http://localhost:9000/menu`)
}

export const insertUser = (data)=> {
    console.log("Sending user data :- ", data)
    return axios.post(`http://localhost:9000/user/`,data)
}

export const getUser = (data)=> {
    return axios.get(`http://localhost:9000/user/`)
}

export const insertOrder = (data)=>{
    return axios.post(`http://localhost:9000/order`, data)
}

export const getUserByNum = (data)=> {
    //console.log("Asdsad",data)
    return axios.get(`http://localhost:9000/user/${data}`)
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

export const getOrderByUserId = (userId)=> {
    return axios.get(`http://localhost:9000/order/${userId}`)
}

export const deleteOrder = (id) =>{
    return axios.delete(`http://localhost:9000/order/delete/${id}`)
} 

export const getCategories = () =>{
    return axios.get('http://localhost:9000/categories')
}