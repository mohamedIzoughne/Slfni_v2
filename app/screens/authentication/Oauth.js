import React, { useEffect, useState } from "react"
import { ActivityIndicator, Linking, View } from "react-native"
// // import { WebView } from "react-native-webview"

import useHttp from "../../hooks/useHttp"
import { WebView } from "react-native-webview"

const OAuthScreen = () => {
  const [authUrl, setAuthUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const { sendData } = useHttp()
  useEffect(() => {
    // Fetch the Google OAuth URL from your backend
    const fetchOAuthUrl = async () => {
      try {
        sendData(
          "/oauth",
          {
            method: "POST",
          },
          (data) => {
            setAuthUrl(data.url)
            console.log(data)
          },
          (err) => {
            console.log(err)
          }
        )
      } catch (error) {
        console.error("Error fetching OAuth URL:", error)
      }
    }

    fetchOAuthUrl()
  }, [])

  // Function to handle redirection after successful authentication
  const handleNavigationStateChange = (navState) => {
    if (authUrl) {
      Linking.openURL(authUrl)
    }
  }

  if (!authUrl) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <WebView
      source={{ uri: authUrl }}
      onLoadStart={() => setLoading(true)}
      onLoadEnd={() => setLoading(false)}
      onNavigationStateChange={handleNavigationStateChange}
      startInLoadingState={true}
      renderLoading={() => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    />
  )
}

export default OAuthScreen
