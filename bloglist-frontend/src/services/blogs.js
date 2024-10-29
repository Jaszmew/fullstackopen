import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const token = window.localStorage.getItem("loggedBlogUser")
  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(token).token}` },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const token = window.localStorage.getItem("loggedBlogUser")
  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(token).token}` },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const remove = async (id) => {
  const token = window.localStorage.getItem("loggedBlogUser")
  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(token).token}` },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, remove }
