import { ReactNode, createContext, useEffect, useState } from "react";
import { authenticateUserAccount } from "../services/make-authenticate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { gettingAccountInfos } from "../services/geting-account-infos";

type User = {
  username: string
  email: string
  id: string
}

export interface UserContextType {
  user: User | null
  makeLogin: (email: string, password: string) => Promise<boolean>
  makeLogout: () => Promise<void>
  hasAccountIsLogged: () => Promise<boolean>
  gettingUserInfo(): Promise<void>
}

interface UserContextProvider {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProvider) {

  const [user, setUser] = useState<User | null>(null)

  async function makeLogin(email: string, password: string) {
    try {
      const res = await authenticateUserAccount({ email, password })
      if (res.status === 200) {
        await saveTokenAtStorage(res.data.access_token)
        await gettingUserInfo()
        return true
      }
      return false
    } catch (error) {
      throw error
    }
  }

  async function gettingUserInfo() {
    try {
      const res = await gettingAccountInfos()
      if (res.status === 200) {
        setUser({
          email: res.data.email,
          username: res.data.name,
          id: res.data.id
        })
      }
    } catch (error) {
    }
  }

  async function makeLogout() {
    removeTokenAtStorage()
    setUser(null)
  }

  async function hasAccountIsLogged() {
    return user !== null
  }

  async function saveTokenAtStorage(token: string) {
    try {
      await AsyncStorage.setItem("access_token", token);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function removeTokenAtStorage() {
    await AsyncStorage.removeItem("access_token")
  }

  useEffect(() => {
    gettingUserInfo()
  }, [])

  return (
    <UserContext.Provider value={{ makeLogin, makeLogout, user, hasAccountIsLogged, gettingUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}