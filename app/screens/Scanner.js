import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"

const Scanner = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [scannedValue, setScannedValue] = useState("")
  const { initialMembers = [] } = route.params || {}
  const routes = navigation.getState()?.routes
  const prevRoute = routes[routes.length - 2]

  useEffect(() => {
    const requestCamera = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    }
    requestCamera()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setScannedValue(data)
    // navigation.goBack()
    // navigation.setParams({ scannedData: data })
    navigation.navigate(prevRoute.name, {
      scannedData: data,
      ...(prevRoute.name === "AddMembers" > 0 && { initialMembers }),
    })
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  //   return <View></View>
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      {scannedValue !== "" && (
        <Text style={styles.scannedText}>Scanned Value: {scannedValue}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  scannedText: {
    fontSize: 18,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: "center",
  },
})

export default Scanner
