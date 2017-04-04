import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { View, Modal, Platform } from 'react-native'
import { Text, Button } from 'native-base'

// for convenient, we can just import one
import { clearToast } from '~/store/actions/common'
import { getToast } from '~/store/selectors/common'

@connect(state => ({
  toast: getToast(state),
}), {clearToast})
export default class Toasts extends Component {

  render(){
    // we can display close all or something
    // for this to show toast only when cross form, for update call Toast.show directly
    if(!this.props.toast)
      return false
    const {position, message, level, duration} = this.props.toast
    if (duration>0) {
      setTimeout(()=> this.props.clearToast(), duration)
    }
    const levelProps = {[level]:true}
    return (
      <Modal
        animationType={(position=='bottom') ? "slide" : "fade"}
        transparent={true}        
        onRequestClose={() => this.props.clearToast()}
        >
        <View style={{
            margin: (Platform.OS==='ios') ? 20 : 0,
            flex: 1,
            justifyContent: (position==='top') ? 'flex-start' : (position==='bottom') ? 'flex-end' : (position==='center') ? 'center' : 'flex-start'}}          >            
            <Button 
              full  
              iconRight            
              {...levelProps}
              onPress={() =>this.props.clearToast()}>
              <Text style={{color:'#fff'}}>{message}</Text>
            </Button>      
        </View>
      </Modal>
    )
  }
}


