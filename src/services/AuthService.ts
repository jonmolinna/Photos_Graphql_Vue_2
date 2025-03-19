import { KEY_LOCAL_STORAGE } from '@/constants'

class AuthService {
  public getToken(): string | null {
    const token = localStorage.getItem(KEY_LOCAL_STORAGE)
    return token
  }

  public isAuthenticated(): boolean {
    const token = this.getToken()

    if (token) {
      const decodeJwt = JSON.parse(atob(token.split('.')[1]))

      if (decodeJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem(KEY_LOCAL_STORAGE)
        return false
      }

      return true
    }

    localStorage.removeItem(KEY_LOCAL_STORAGE)
    return false
  }
}

export default AuthService
