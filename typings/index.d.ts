interface Window {
  // add you custom properties and methods
  App : JawakerApp
}

interface JawakerApp {
  initSock : WebSocket
  comm : {
    socket : WebSocket
  }
}