import axios from "axios"
const baseUrl = "https://fullstackopen-6b8m.onrender.com/"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const deleteData = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deleteData }
