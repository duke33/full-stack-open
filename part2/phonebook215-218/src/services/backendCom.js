import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

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
    console.log('found:::', found);
    console.log('como queda la nueva persona hecha de otra forma:::', {...found, name: newPerson.name });
    const responsePuntoData = axios.put(`${baseUrl}/${found.id}`, newPerson).then(response => response.data)
    console.log('responsePuntoData', responsePuntoData);
    return responsePuntoData
}

export default {
    getAll,
    createNewPerson,
    deletePerson,
    replacePhoneNumber
};