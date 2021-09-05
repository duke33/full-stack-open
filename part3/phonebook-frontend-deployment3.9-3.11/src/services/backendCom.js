import axios from "axios";
const baseUrl = "/api/persons"; //TODO aca hay un problema, para que funcione en produccio ntieen que ser  "/api/persons" , pero para que funcione en development tiene que ser "/persons". No se como solucionarlo sin cagarla

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
    const responsePuntoData = axios
        .put(`${baseUrl}/${found.id}`, newPerson)
        .then((response) => response.data);
    return responsePuntoData;
};

export default {
    getAll,
    createNewPerson,
    deletePerson,
    replacePhoneNumber,
};