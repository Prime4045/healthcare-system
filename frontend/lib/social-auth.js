// Social Authentication Service
class SocialAuthService {
  constructor() {
    this.googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    this.facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
  }

  // Initialize Google OAuth
  initializeGoogle() {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Google OAuth can only be initialized in browser"))
        return
      }

      // Load Google Identity Services script
      if (!window.google) {
        const script = document.createElement("script")
        script.src = "https://accounts.google.com/gsi/client"
        script.async = true
        script.defer = true
        script.onload = () => {
          window.google.accounts.id.initialize({
            client_id: this.googleClientId,
            callback: this.handleGoogleCallback,
          })
          resolve(window.google)
        }
        script.onerror = () => reject(new Error("Failed to load Google OAuth script"))
        document.head.appendChild(script)
      } else {
        resolve(window.google)
      }
    })
  }

  // Initialize Facebook SDK
  initializeFacebook() {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Facebook SDK can only be initialized in browser"))
        return
      }

      // Load Facebook SDK
      if (!window.FB) {
        window.fbAsyncInit = () => {
          window.FB.init({
            appId: this.facebookAppId,
            cookie: true,
            xfbml: true,
            version: "v18.0",
          })
          resolve(window.FB)
        }

        const script = document.createElement("script")
        script.src = "https://connect.facebook.net/en_US/sdk.js"
        script.async = true
        script.defer = true
        script.crossOrigin = "anonymous"
        script.onerror = () => reject(new Error("Failed to load Facebook SDK"))
        document.head.appendChild(script)
      } else {
        resolve(window.FB)
      }
    })
  }

  // Google Sign In
  async signInWithGoogle() {
    try {
      const google = await this.initializeGoogle()

      return new Promise((resolve, reject) => {
        google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback to popup
            google.accounts.oauth2
              .initTokenClient({
                client_id: this.googleClientId,
                scope: "email profile",
                callback: async (response) => {
                  if (response.access_token) {
                    try {
                      const userInfo = await this.getGoogleUserInfo(response.access_token)
                      resolve(userInfo)
                    } catch (error) {
                      reject(error)
                    }
                  } else {
                    reject(new Error("Failed to get access token"))
                  }
                },
              })
              .requestAccessToken()
          }
        })
      })
    } catch (error) {
      throw new Error(`Google sign-in failed: ${error.message}`)
    }
  }

  // Facebook Sign In
  async signInWithFacebook() {
    try {
      const FB = await this.initializeFacebook()

      return new Promise((resolve, reject) => {
        FB.login(
          (response) => {
            if (response.authResponse) {
              FB.api("/me", { fields: "name,email,picture" }, (userInfo) => {
                if (userInfo && !userInfo.error) {
                  resolve({
                    id: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture?.data?.url,
                    provider: "facebook",
                  })
                } else {
                  reject(new Error("Failed to get user info from Facebook"))
                }
              })
            } else {
              reject(new Error("Facebook login was cancelled or failed"))
            }
          },
          { scope: "email" },
        )
      })
    } catch (error) {
      throw new Error(`Facebook sign-in failed: ${error.message}`)
    }
  }

  // Get Google user info
  async getGoogleUserInfo(accessToken) {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
      const userInfo = await response.json()

      if (response.ok) {
        return {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          provider: "google",
        }
      } else {
        throw new Error("Failed to fetch user info from Google")
      }
    } catch (error) {
      throw new Error(`Failed to get Google user info: ${error.message}`)
    }
  }

  // Handle Google callback (for One Tap)
  handleGoogleCallback = async (response) => {
    try {
      // Decode JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split(".")[1]))

      const userInfo = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        provider: "google",
      }

      // Send to your backend for processing
      await this.processSocialLogin(userInfo)
    } catch (error) {
      console.error("Google callback error:", error)
    }
  }

  // Process social login with backend
  async processSocialLogin(userInfo) {
    try {
      const response = await fetch("/api/auth/social-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })

      const result = await response.json()

      if (response.ok) {
        // Store auth token
        localStorage.setItem("authToken", result.token)
        localStorage.setItem("user", JSON.stringify(result.user))

        // Redirect based on user type
        if (result.user.userType === "doctor") {
          window.location.href = "/doctor/dashboard"
        } else {
          window.location.href = "/patient/dashboard"
        }
      } else {
        throw new Error(result.message || "Social login failed")
      }
    } catch (error) {
      throw new Error(`Social login processing failed: ${error.message}`)
    }
  }
}

// Create singleton instance
const socialAuth = new SocialAuthService()

export default socialAuth
