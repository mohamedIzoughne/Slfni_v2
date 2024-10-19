import React, {
  createContext,
  useReducer,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react"
import { Appearance } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"
import { colorScheme } from "nativewind"
import useHttp from "../hooks/useHttp"

export const Context = createContext()

const initialState = {
  theme: "light",
  language: "english",
  name: "",
  username: "",
  notificationsPreference: true,
  accessToken: "",
  refreshToken: "",
  imageUrl: "",
  isLoggedIn: false,
}

const calculateRemainingTime = (expirationDate) => {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationDate).getTime()
  const remainingDuration = adjExpirationTime - currentTime
  return remainingDuration
}

const reducer = (state, action = { payload: "" }) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      SecureStore.setItem("access-token", action.payload)
      return { ...state, accessToken: action.payload }
    case "SET_REFRESH_TOKEN":
      SecureStore.setItem("refresh-token", action.payload)
      return { ...state, refreshToken: action.payload }
    case "SET_NOTIFICATION_SETTINGS":
      AsyncStorage.setItem(
        "notifications-preference",
        !state.notificationsPreference
      )
      return {
        ...state,
        notificationsPreference: !state.notificationsPreference,
      }
    case "SET_THEME":
      AsyncStorage.setItem("theme", action.payload)
      setTimeout(() => {
        colorScheme.set(action.payload)
      }, 0)
      return { ...state, theme: action.payload }
    case "SET_LOGGED_IN":
      AsyncStorage.setItem("logged-in", JSON.stringify(true))
      return { ...state, isLoggedIn: true }
    case "SET_LANGUAGE":
      AsyncStorage.setItem("language", action.payload)
      return { ...state, language: action.payload }
    case "SET_NAME":
      AsyncStorage.setItem("name", action.payload.name)
      AsyncStorage.setItem("username", action.payload.username)
      return {
        ...state,
        name: action.payload.name,
        username: action.payload.username,
      }
    case "SET_IMAGE_URL":
      AsyncStorage.setItem("image", action.payload)
      return { ...state, imageUrl: action.payload }
    case "SET_INITIAL_PROPERTIES":
      return { ...state, ...action.payload }
    case "CLEAR":
      return { ...initialState }
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [userConfiguration, dispatch] = useReducer(reducer, initialState)
  const [notificationsData, setNotificationsData] = useState({
    notifications: [],
    unSeenCount: 0,
  })
  const { sendData } = useHttp()

  const accessTokenHandler = (accessToken) => {
    dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken })
  }

  const getNewAccessToken = async () => {
    const refreshToken = await SecureStore.getItemAsync("refresh-token")
    if (!refreshToken) {
      logoutHandler()
      return
    }

    sendData(
      "/auth/new-refresh-token",
      {
        method: "POST",
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      },
      async (data) => {
        const newAccessToken = data.accessToken
        const newExpirationDate = data.expiresIn

        // Update the new access token and expiration
        await SecureStore.setItemAsync("access-token", newAccessToken)
        await SecureStore.setItemAsync("expiresIn", newExpirationDate)
        accessTokenHandler(newAccessToken)
        const remainingDuration = calculateRemainingTime(newExpirationDate)
        setTimeout(getNewAccessToken, remainingDuration)
      },
      (error) => {
        console.error("Error refreshing token", error)
        logoutHandler()
      }
    )
  }

  const checkIfTimeExpired = useCallback(async () => {
    const expiresInDate = await SecureStore.getItemAsync("expiresIn")
    if (!expiresInDate) {
      return false
    }
    const now = new Date().getTime()
    const expiresIn = new Date(expiresInDate).getTime()
    const difference = expiresIn - now
    const timeIsExpired = difference <= 0

    if (timeIsExpired) {
      getNewAccessToken()
    } else {
      const remainingDuration = calculateRemainingTime(expiresInDate)
      setTimeout(getNewAccessToken, remainingDuration)
    }
    return timeIsExpired
  }, [])

  useEffect(() => {
    checkIfTimeExpired()
  }, [checkIfTimeExpired])

  useEffect(() => {
    const fetchInitialProperties = async () => {
      const theme =
        (await AsyncStorage.getItem("theme")) || Appearance.getColorScheme()

      const language = (await AsyncStorage.getItem("language")) || "english"
      const notificationsPreference =
        (await AsyncStorage.getItem("notifications-preference")) || true
      const name = (await AsyncStorage.getItem("name")) || ""
      const username = (await AsyncStorage.getItem("username")) || ""
      const isLoggedIn =
        JSON.parse(await AsyncStorage.getItem("logged-in")) || false
      const imageUrl = (await AsyncStorage.getItem("image")) || ""
      const accessToken = (await SecureStore.getItemAsync("access-token")) || ""
      const refreshToken =
        (await SecureStore.getItemAsync("refresh-token")) || ""

      colorScheme.set(theme || "system")

      console.log("The access token", accessToken)
      dispatch({
        type: "SET_INITIAL_PROPERTIES",
        payload: {
          imageUrl,
          accessToken,
          refreshToken,
          name,
          username,
          theme,
          language,
          notificationsPreference: notificationsPreference === "true",
          isLoggedIn,
        },
      })
    }
    fetchInitialProperties()
    colorScheme.set("dark")
  }, [])

  const refreshTokenHandler = (accessToken) => {
    dispatch({ type: "SET_REFRESH_TOKEN", payload: accessToken })
  }

  const loginHandler = (accessToken, refreshToken, expirationDate) => {
    dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken })
    dispatch({ type: "SET_REFRESH_TOKEN", payload: refreshToken })
    dispatch({ type: "SET_LOGGED_IN" })
    SecureStore.setItem("expiresIn", expirationDate)
  }

  async function logoutHandler() {
    setNotificationsData({
      notifications: [],
      unSeenCount: 0,
    })

    await AsyncStorage.clear()
    await SecureStore.deleteItemAsync("access-token")
    await SecureStore.deleteItemAsync("refresh-token")
    await SecureStore.deleteItemAsync("expiresIn")

    dispatch({ type: "CLEAR", payload: {} })
  }

  const themeHandler = (theme) => {
    console.log("This is the theme:", theme)
    dispatch({ type: "SET_THEME", payload: theme })
  }

  const languageHandler = (language) => {
    dispatch({ type: "SET_LANGUAGE", payload: language })
  }

  const nameHandler = (name, username) => {
    dispatch({ type: "SET_NAME", payload: { name, username } })
  }
  const notificationSettingsHandler = () => {
    dispatch({
      type: "SET_NOTIFICATION_SETTINGS",
    })
  }

  const imageHandler = (imageUrl) => {
    dispatch({ type: "SET_IMAGE_URL", payload: imageUrl })
  }

  const notificationsHandler = (notifications) => {
    setNotificationsData(notifications)
  }

  const notificationFilterHandler = (notificationId, isSeen) => {
    const notifications = notificationsData.notifications.filter(
      (notification) => notification.id !== notificationId
    )

    if (isSeen) {
      setNotificationsData((nots) => {
        return {
          ...nots,
          notifications,
        }
      })
    } else {
      setNotificationsData((nots) => {
        return {
          unSeenCount: nots.unSeenCount - 1,
          notifications,
        }
      })
    }
  }

  return (
    <Context.Provider
      value={{
        userConfiguration,
        notificationsData: useMemo(
          () => notificationsData,
          [notificationsData]
        ),
        // accessTokenHandler,
        loginHandler,
        // refreshTokenHandler,
        notificationSettingsHandler,
        themeHandler,
        nameHandler,
        languageHandler,
        nameHandler,
        notificationsHandler,
        imageHandler,
        notificationFilterHandler,
      }}
    >
      {children}
    </Context.Provider>
  )
}
