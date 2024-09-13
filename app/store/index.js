import React, { createContext, useReducer, useState } from "react"
import { Appearance } from "react-native"
import * as SecureStore from "expo-secure-store"

export const Context = createContext()

let initialState = {
  notifications: [],
  theme: Appearance.getColorScheme(),
  language: "en",
  name: "",
  notificationsPreference: true,
  accessToken: "",
  refreshToken: "",
  imageUrl: "",
}

const getInitialState = async () => {
  const storedLanguage = await SecureStore.getItemAsync("language")
  const storedName = await SecureStore.getItemAsync("name")
  const storedAccessToken = await SecureStore.getItemAsync("accessToken")
  const storedRefreshToken = await SecureStore.getItemAsync("refreshToken")
  const storedImageUrl = await SecureStore.getItemAsync("imageUrl")
  const storedNotificationsPreference = await SecureStore.getItemAsync(
    "notifications-preference"
  )

  return {
    ...initialState,
    notificationsPreference:
      storedNotificationsPreference || initialState.notificationsPreference,
    language: storedLanguage || initialState.language,
    name: storedName || initialState.name,
    accessToken: storedAccessToken || initialState.accessToken,
    refreshToken: storedRefreshToken || initialState.refreshToken,
    imageUrl: storedImageUrl || initialState.imageUrl,
  }
}

initialState = await getInitialState()
// const saveAccessToken = async (accessToken) => {
//   await SecureStore.setItemAsync("access-token", accessToken)
// }

// const saveRefreshToken = async (refreshToken) => {
//   await SecureStore.setItemAsync("refresh-token", refreshToken)
// }

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      SecureStore.setItemAsync("access-token", action.payload)
      return { ...state, accessToken: action.payload }
    case "SET_REFRESH_TOKEN":
      SecureStore.setItemAsync("refresh-token", action.payload)
      return { ...state, refreshToken: action.payload }
    case "SET_NOTIFICATION_SETTINGS":
      SecureStore.setItemAsync("notifications-preference", action.payload)
      return { ...state, notificationsPreference: action.payload }
    case "SET_THEME":
      SecureStore.setItemAsync("theme", action.payload)
      return { ...state, theme: action.payload }
    case "SET_LANGUAGE":
      SecureStore.setItemAsync("language", action.payload)
      return { ...state, language: action.payload }
    case "SET_NAME":
      SecureStore.setItemAsync("name", action.payload)
      return { ...state, name: action.payload }
    case "SET_IMAGE_URL":
      SecureStore.setItemAsync("image", action.payload)
      return { ...state, imageUrl: action.payload }
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [userConfiguration, dispatch] = useReducer(reducer, initialState)
  const [notifications, setNotifications] = useState([])

  // console.log(userConfiguration.accessToken)

  const accessTokenHandler = (accessToken) => {
    dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken })
  }

  const refreshTokenHandler = (accessToken) => {
    dispatch({ type: "SET_REFRESH_TOKEN", payload: accessToken })
  }

  const themeHandler = (theme) => {
    dispatch({ type: "SET_THEME", payload: theme })
  }

  const languageHandler = (language) => {
    dispatch({ type: "SET_LANGUAGE", payload: language })
  }

  const nameHandler = (name) => {
    dispatch({ type: "SET_NAME", payload: name })
  }

  const notificationsHandler = (notifications) => {
    setNotifications(notifications)
  }

  const notificationSettingsHandler = (notificationsPreference) => {
    dispatch({
      type: "SET_NOTIFICATION_SETTINGS",
      payload: notificationsPreference,
    })
  }

  const imageHandler = (imageUrl) => {
    dispatch({ type: "SET_IMAGE_URL", payload: imageUrl })
  }

  return (
    <Context.Provider
      value={{
        userConfiguration,
        notifications,
        accessTokenHandler,
        refreshTokenHandler,
        notificationSettingsHandler,
        themeHandler,
        nameHandler,
        languageHandler,
        nameHandler,
        notificationsHandler,
        imageHandler,
      }}
    >
      {children}
    </Context.Provider>
  )
}
