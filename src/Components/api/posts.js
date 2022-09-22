import axios from 'axios';

export const getItems = ()=> {
    return axios.get('http://localhost:3500/items')
}

export const getCategories = () =>{
    return axios.get('http://localhost:3500/categories')
}