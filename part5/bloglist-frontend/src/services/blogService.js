import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const giveALike = async (newLikes, id) => {
  const fullUrl = `${baseUrl}/${id}`;
  await axios.put(fullUrl, newLikes);
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const fullUrl = `${baseUrl}/${id}`;
  await axios.delete(fullUrl, config);
};

export default { getAll, create, setToken, giveALike, deleteBlog };
