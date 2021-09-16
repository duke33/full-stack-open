import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data);
};

const createNewPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson);

    return request.then((response) => response.data);
};

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const replacePhoneNumber = (found, newPerson) => {
    return axios
        .put(`${baseUrl}/${found.id}`, newPerson)
        .then((response) => {
            return response.data
        });
};

export default {
    getAll,
    createNewPerson,
    deletePerson,
    replacePhoneNumber,
};