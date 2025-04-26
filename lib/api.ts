import axios from "axios"

const API_BASE_URL = "https://blood-donation-project-backend.onrender.com/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const registerUser = async (userData: any) => {
  try {
    const response = await api.post("/users/register", userData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const loginUser = async (credentials: any) => {
  try {
    const response = await api.post("/users/login", credentials)
    if (response.data.token && typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data
  } catch (error) {
    throw error
  }
}

export const getDonors = async (params?: any) => {
  try {
    const response = await api.get("/users/donors", { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserProfile = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async (userId: string, userData: any) => {
  try {
    const response = await api.put(`/users/${userId}`, userData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
}

export const registerOrganDonor = async (donorData: any) => {
  try {
    const response = await api.post("/users/registerOrganDonor", donorData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getOrganDonors = async (params?: any) => {
  try {
    const response = await api.get("/users/organ-donors", { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export default api
