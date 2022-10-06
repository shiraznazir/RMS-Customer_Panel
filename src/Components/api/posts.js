import axios from 'axios';

export const getItems = ()=> {
    return axios.get('http://localhost:9000/items')
}

export const insertItems = (data)=> {
    //console.log("Data:- ", data)
    return axios.post(`http://localhost:9000/cartItem/`,data)
}

export const insertUser = (data)=> {
    console.log("Sending user data :- ", data)
    return axios.post(`http://localhost:9000/user/`,data)
}

export const getUser = (data)=> {
    return axios.get(`http://localhost:9000/user/`)
}

export const getUserByNum = (data)=> {
    console.log("Asdsad",data)
    return axios.get(`http://localhost:9000/user/${data}`)
}

export const getCart = () =>{
    return axios.get('http://localhost:9000/cartItem')
}

export const getCategories = () =>{
    return axios.get('http://localhost:9000/categories')
}