const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

module.exports = (async () => {
  // Get the default Expo Metro config with CSS enabled
  const config = await getDefaultConfig(__dirname, { isCSSEnabled: true })

  // Extract assetExts and sourceExts for SVG handling
  const { assetExts, sourceExts } = config.resolver

  // Update the config for both NativeWind and SVGs
  return withNativeWind(
    {
      ...config,
      transformer: {
        ...config.transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer"), // Add SVG transformer
      },
      resolver: {
        ...config.resolver,
        assetExts: assetExts.filter((ext) => ext !== "svg"), // Remove SVG from assets
        sourceExts: [...sourceExts, "svg"], // Add SVG to source extensions
      },
    },
    {
      input: "./global.css", // NativeWind input file
    }
  )
})()
