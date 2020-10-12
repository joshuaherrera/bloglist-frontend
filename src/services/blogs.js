import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (userToken) => {
  token = `bearer ${userToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const updateBlog = async (updatedBlog, blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(baseUrl + "/" + blogId, updatedBlog, config);
  // console.log(res);
  return res.data;
};

export default { getAll, setToken, createBlog, updateBlog };
