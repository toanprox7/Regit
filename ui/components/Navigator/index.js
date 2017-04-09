import React, { Component } from 'react'
import { Navigator as NavigatorRN} from 'react-native'

import routes from '~/ui/routes'
import { connect } from 'react-redux'

// should show error if not found
import { getRouter } from '~/store/selectors/common'

@connect(state=>({
  router: getRouter(state),  
}))
export default class extends Component {

    static configureScene(route) {
        // use default as PushFromRight, do not use HorizontalSwipeJump or it can lead to swipe horizontal unwanted
        return NavigatorRN.SceneConfigs[route.animationType || 'PushFromRight']
    }

    // push on first time, later only jumpTo without reload
    static mounted = {

    }

    // replace view from stack
    componentWillReceiveProps({router}){     
      const page = routes[router.route]
      if(!page)   
        return console.warn('Not found: ' + router.route)
      if(this.constructor.mounted[router.route]){
        this.refs.navigator.jumpTo(page)
      } else {
        this.constructor.mounted[router.route] = true
        this.refs.navigator.push(page) 
      }           
    }

    renderScene = (route, navigator) => {           
        return this.props.renderScene(route, navigator)
    }

    render() {
      const {initialRoute} = this.props
      this.constructor.mounted[initialRoute] = true
      return (            
        <NavigatorRN ref="navigator"
            configureScene={this.constructor.configureScene}
            initialRoute={routes[initialRoute]}
            renderScene={this.renderScene}                
        />
          
      )
    }
}

