import axios from 'axios';

export const getItems = ()=> {
    return axios.get('http://localhost:3500/items')
}

export const insertItems = (data)=> {
    console.log("Data:- ", data)
    return axios.post(`http://localhost:3500/cart/`,data)
}

export const getCart = () =>{
    return axios.get('http://localhost:3500/cart')
}

export const getCategories = () =>{
    return axios.get('http://localhost:3500/categories')
}