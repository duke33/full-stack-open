import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNewAnecdote = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 });
  return response.data;
};

const voteAnecdoteDB = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const fetchedAnecdote = response.data;
  const updatedAnecdote = await axios.put(`${baseUrl}/${id}`, {
    ...fetchedAnecdote,
    votes: fetchedAnecdote.votes + 1,
  });
  return updatedAnecdote.data;
};

export default { getAll, createNewAnecdote, voteAnecdoteDB };
