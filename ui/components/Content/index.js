import React, { Component } from 'react'
import { RefreshControl } from 'react-native'
import {         
    Content, 
    View,    
} from 'native-base'

// assume we not try to rotate it
export default class extends Component {  

  static defaultProps = {
    onEndReachedThreshold: 10,
    keyboardShouldPersistTaps: 'always',
  }

  render() {
    const {children, refreshing, onRefresh, onScroll, padder, onEndReached, onEndReachedThreshold, ...props} = this.props    
    // show refresh control
    if(onRefresh){
      props.refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Loading..." />
    }
    
    return (                             
      <Content
        onScroll={(e)=>{    
          const offsetY = e.nativeEvent.contentOffset.y     
          const contentHeight= e.nativeEvent.contentSize.height
          const height = e.nativeEvent.layoutMeasurement.height
          if(offsetY + height + onEndReachedThreshold > contentHeight){            
            onEndReached && onEndReached(offsetY, contentHeight)                      
          }                            
          return onScroll && onScroll(e)
        }}        
       {...props} >
        <View padder={padder}>
          {children}
        </View>
      </Content>    
    )
  }
}



