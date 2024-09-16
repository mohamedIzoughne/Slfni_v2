import { useCallback, useState } from "react"
import Constants from "expo-constants"

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const sendData = useCallback(
    async (endpoint, options = {}, onSuccess, onError) => {
      setIsLoading(true)
      setErrorMessage("")

      try {
        const url = `${process.env.EXPO_PUBLIC_SERVER_API || ""}${endpoint}`
        console.log("0-", url)
        // Merge default headers and any custom headers provided in options
        const headers = {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        }

        // console.log(url, {
        //   method: options.method || "GET", // Default to GET if no method provided
        //   body: options.body || null, // Body can be string or FormData
        //   headers,
        // })
        const response = await fetch(url, {
          method: options.method || "GET", // Default to GET if no method provided
          body: options.body || null, // Body can be string or FormData
          headers,
        })

        const data = await response.json()

        console.log(data.message)
        if (response.ok) {
          if (onSuccess) onSuccess(data)
        } else {
          // console.log(data)
          // if (data.errors) {
          // console.log(data)

          const error = data.message || "Request failed"
          throw new Error(error)
        }
      } catch (err) {
        const errorMessage = err.message || "An error occurred"
        setErrorMessage(errorMessage)
        if (onError) onError(errorMessage)
      }

      setIsLoading(false)
    },
    []
  )

  return { sendData, isLoading, errorMessage, setErrorMessage }
}

export default useHttp
