import axios from "axios";

const urlPrefix = "https://m3p-backend-squad4-t6lg.onrender.com/";

export const getUsers = async () => await axios.get(`${urlPrefix}/user`)
    .then(function (response) {
       return response.data
    
    
    })
    .catch(function (error) {
   
    console.error(error);
    })

export const getUser = async (id) => await axios.get(`${urlPrefix}/user/${id}`)
    .then(function (response) {
    
    console.log(response);
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const addUser = async (values) => await axios.post(`${urlPrefix}/user/`, values)
    .then(function (response) {
        return response.data
    
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const editUser = async (id) => await axios.put(`${urlPrefix}/user/${id}`)
    .then(function (response) {
    
    console.log(response);
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const deleteUser = async (id) => await axios.delete(`${urlPrefix}/user/${id}`)
    .then(function (response) {
    
    console.log(response);
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const getLocais = async () => await axios.get(`${urlPrefix}/local`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const addLoccais = async (values) => await axios.post(`${urlPrefix}/local`, values)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {    
    console.error(error);
    })

export const deleteLocal = async (id) => await axios.delete(`${urlPrefix}/local/${id}`)
    .then(function (response) {
        return response.data;
    
    })
    .catch(function (error) {
    
    console.error(error.message);
    })
    
export const atualizarLocal = async (id, data) =>  await axios
    .put(`${urlPrefix}/local/${id}`, data)
    .then(function (response) {
    return response.data;
})
.catch(function (error) {
    console.error(error.message);
})

