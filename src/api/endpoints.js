import axios from "axios";

const urlPrefix = "http://localhost:3000";

export const getUsers = async () => await axios.get(`${urlPrefix}/usuarios`)
    .then(function (response) {
       return response.data
    
    
    })
    .catch(function (error) {
   
    console.error(error);
    })

export const getUser = async (id) => await axios.get(`${urlPrefix}/usuarios/${id}`)
    .then(function (response) {
    
    console.log(response);
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const addUser = async (values) => await axios.post(`${urlPrefix}/usuarios/`, values)
    .then(function (response) {
        return response.data
    
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const editUser = async (id) => await axios.put(`${urlPrefix}/usuarios/${id}`)
    .then(function (response) {
    
    console.log(response);
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const deleteUser = async (id) => await axios.delete(`${urlPrefix}/usuarios/${id}`)
    .then(function (response) {
    
    console.log(response);
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const getLocais = async () => await axios.get(`${urlPrefix}/locais`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
    
    console.error(error);
    })

export const addLoccais = async (values) => await axios.post(`${urlPrefix}/locais`, values)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {    
    console.error(error);
    })

export const deleteLocal = async (id) => await axios.delete(`${urlPrefix}/locais/${id}`)
    .then(function (response) {
        return response.data;
    
    })
    .catch(function (error) {
    
    console.error(error.message);
    })
    
export const atualizarLocal = async (id, data) =>  await axios
    .put(`${urlPrefix}/locais/${id}`, data)
    .then(function (response) {
    return response.data;
})
.catch(function (error) {
    console.error(error.message);
})

