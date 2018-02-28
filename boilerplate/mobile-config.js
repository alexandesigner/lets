App.info({
  name: 'Lets',
  description: 'A minimalist boilerplate for products',
  author: 'Allan Alexandre',
  email: 'dev@alexandesigner.com.br',
  website: 'https://alexandesigner.com.br/lets',
  version: '0.1.0'
})

App.icons({
  // iOS
  'iphone_2x': 'resources/icons/iphone_2x.png',
  'ipad': 'resources/icons/ipad.png',
  'ipad_2x': 'resources/icons/ipad_2x.png',

  // Android
  'android_mdpi': 'resources/icons/android_mdpi.png',
  'android_hdpi': 'resources/icons/android_hdpi.png',
  'android_xhdpi': 'resources/icons/android_xhdpi.png'
})

App.launchScreens({
  // iOS
  'iphone_2x': 'resources/splash/iphone_2x.png',
  'iphone5': 'resources/splash/iphone5.png',
  'ipad_portrait': 'resources/splash/ipad_portrait.png',
  'ipad_portrait_2x': 'resources/splash/ipad_portrait_2x.png',
  'ipad_landscape': 'resources/splash/ipad_landscape.png',
  'ipad_landscape_2x': 'resources/splash/ipad_landscape_2x.png',

  // Android
  'android_mdpi_portrait': 'resources/splash/android_mdpi_portrait.png',
  'android_mdpi_landscape': 'resources/splash/android_mdpi_landscape.png',
  'android_hdpi_portrait': 'resources/splash/android_hdpi_portrait.png',
  'android_hdpi_landscape': 'resources/splash/android_hdpi_landscape.png',
  'android_xhdpi_portrait': 'resources/splash/android_xhdpi_portrait.png',
  'android_xhdpi_landscape': 'resources/splash/android_xhdpi_landscape.png'
})

App.setPreference('StatusBarOverlaysWebView', 'false')
App.setPreference('StatusBarBackgroundColor', '#674CD8')
