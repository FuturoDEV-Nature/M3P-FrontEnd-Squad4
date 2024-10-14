import axios from "axios";

// export const urlPrefix = "http://localhost:3000";
export const urlPrefix = "https://m3p-backend-squad4-t6lg.onrender.com";

export const getUsers = async () => await axios.get(`${urlPrefix}/user`)
    .then(function (response) {
       return response.data   

       
    })
    .catch(function (error) {
        console.error(error);
    })

export const getUser = (id) => new Promise((resolve, reject) => {
    axios.get(`${urlPrefix}/user/${id}`)
        .then(function (response) {
            resolve(response);
        })
        .catch(function (error) {
            console.error(error);
            reject(error);
        })

}) 

export const addUser = async (values) => await axios.post(`${urlPrefix}/user`, values)
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

export const getLocais = () => new Promise((resolve, reject) => {
	axios.get(`${urlPrefix}/local`)
    .then(function (response) {
        resolve(response.data)
	}) 
    .catch(function (error) {
       console.error(error);
       reject(error)
    })
})

export const addLoccais = (values) => new Promise((resolve, reject) => {
    axios.post(`${urlPrefix}/local`, values)
    .then(function (response) {
        resolve(response.data);
    })
    .catch(function (error) {    
        console.error(error);
        reject(error)
    })
}) 

export const deleteLocal = async (id) => await axios.delete(`${urlPrefix}/local/${id}`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.error(error.message);
    })
    
export const atualizarLocal = async (id, data) =>  await axios
    .put(`${urlPrefix}/locals/${id}`, data)
    .then(function (response) {
    return response.data;
})
.catch(function (error) {
    console.error(error.message);
})

