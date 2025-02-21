// Define the shape of the user profile
interface UserProfile {
  id: number
  username: string
  email: string
  avatar: null
  is_expired: boolean
  status: string
  // Add other user profile fields as needed
}

interface StoreProfile {
  id: number
  username: string
  description: string
  email: null
  phone: null
  address: null
}

// Define the state structure
interface AuthState {
  isLoggedIn: boolean
  userProfile: UserProfile | null
  storeProfile: StoreProfile | null
  accessToken: null
  subscription: null
  isAuthenticated: boolean
}
