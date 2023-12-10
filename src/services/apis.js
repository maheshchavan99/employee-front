
import axios from 'axios'
export const addUserServices = async (payload) => {
    const response = await axios.post(`/api/add/peoples`, payload)
    return response.data
}
export const deleteUserServices = async (id) => {
    const response = await axios.delete(`/api/people/${id}`)
    return response.data
}