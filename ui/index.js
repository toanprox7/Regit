import React, { Component } from 'react'
import App from './app'
import { Provider } from 'react-redux'
import configureStore from '~/store/config'

import Preload from './containers/Preload'
import OneSignal from 'react-native-onesignal'

export default class Regit extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      store: null,
    }        

    configureStore(store=> this.setState({store}))
  }

  componentWillMount() {    
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('registered', this.onRegistered);
      OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('registered', this.onRegistered);
      OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
      console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {    
    const {store} = this.state
    // should have a pre-load page
    if(!store)
      return ( <Preload message="Initializing..."/> )

    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

if (!window.navigator.userAgent) {
  window.navigator.userAgent = "react-native"
}