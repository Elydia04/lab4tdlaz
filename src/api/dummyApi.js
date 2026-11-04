import axios from 'axios'

/**
 * Shared Axios instance for the DummyJSON API.
 * Docs: https://dummyjson.com/docs/users
 */
export const dummyApi = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 12000,
})

export async function fetchUsers(limit = 12) {
  const { data } = await dummyApi.get('/users', { params: { limit } })
  return data.users ?? []
}

export async function fetchUser(id = 1) {
  const { data } = await dummyApi.get(`/users/${id}`)
  return data
}

/** Turns an Axios error into a short message that is safe to show in the UI. */
export function getApiErrorMessage(error) {
  if (error?.response) {
    return `The API responded with status ${error.response.status}. Please try again.`
  }
  if (error?.code === 'ECONNABORTED') {
    return 'The request timed out. DummyJSON might be slow right now.'
  }
  if (error?.request) {
    return 'Network error — could not reach dummyjson.com. Check your internet connection.'
  }
  return error?.message || 'Something went wrong while loading the data.'
}
