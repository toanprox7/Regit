import React, { Component } from 'react'
import {             
    Button, List, ListItem, Switch,
    Container, Text, Item, Input, Left, Body, Right, View,
} from 'native-base'

import Icon from '~/ui/elements/Icon'
import IconMessage from '~/ui/elements/IconMessage'
import Content from '~/ui/components/Content'

import { connect } from 'react-redux'

import * as commonActions from '~/store/actions/common'

import styles from './styles'
import material from '~/theme/variables/material'


@connect(null, commonActions)
export default class extends Component {

  renderActions(){
    return(
      <View style={{
        marginTop: 10,
      }}>
        <Text note bold style={{
          marginLeft: 10,
          marginBottom:3,
          fontSize:12,
        }}>NEW INTERACTION</Text>
        <View row style={{
          backgroundColor: '#fff',
          paddingTop: 10,
          paddingBottom: 10,
          justifyContent: 'space-around',
        }}>
          <IconMessage size={12} color={material.grayColor} icon="cloud-upload" message="Push Form" />
          <IconMessage size={12} color="#cccccc" icon="event" message="Event" />
          <IconMessage size={12} color="#cccccc" icon="sync" message="Manual Sync" />
        </View>
      </View>
    )
  }

  renderSearchResult(){
    const {setToast} = this.props    
    return (
      <View regit style={{
        marginTop: 10,
      }}>
        <ListItem style={styles.itemHeader}>            
          <Button style={styles.itemHeaderButtonFirst} transparent>
            <Icon style={styles.iconGrayFirst} name="filter" />
            <Text note bold small>Filter</Text>
          </Button>            
        </ListItem>                    
        <ListItem style={styles.itemBody}>    
                   
          <Button bordered style={styles.pushButton}>
            <Text note bold>P</Text>
          </Button>   
            
          <View>  
            <Text small>You changed security question</Text>
            <Text note small>10:41 AM</Text>
          </View>  
          
          <Button style={styles.itemHeaderButton} transparent>
            <Icon style={styles.iconSmall} gray name="keyboard-arrow-down" />
          </Button>
        </ListItem>  
        <ListItem style={styles.itemBody} last>                                                
          <Button bordered style={styles.pushButton}>
            <Text note bold>P</Text>
          </Button> 

          <View>  
            <Text small>You changed security question</Text>
            <Text note small>10:41 AM</Text>
          </View> 

          <Button style={styles.itemHeaderButton} transparent>
            <Icon style={styles.iconSmall} gray name="keyboard-arrow-down" />
          </Button>
        </ListItem>  
        <ListItem style={styles.itemBody} last>                                                
          <Button bordered style={styles.pushButton}>
            <Text note bold>P</Text>
          </Button> 

          <View>  
            <Text small>You changed security question</Text>
            <Text note small>10:41 AM</Text>
          </View> 

          <Button style={styles.itemHeaderButton} transparent>
            <Icon style={styles.iconSmall} gray name="keyboard-arrow-down" />
          </Button>
        </ListItem>            
      </View>   
    )
  }

  renderSearchResultAddress(){
    const {setToast} = this.props    
    return (
      <View regit style={{
        marginTop: 15,
      }}>
        <ListItem style={styles.itemHeader}>
            <Button transparent style={{...styles.itemHeaderButtonFilter,
              borderRightWidth:1,
              borderColor: material.grayColor,
            }} transparent>
              <Text note bold style={{color:material.textColor}}>Drafts</Text>
            </Button>
            <Button transparent style={styles.itemHeaderButtonFilter} transparent>
              <Text note>Templates</Text>
            </Button>
        </ListItem>    
        <ListItem style={styles.itemBody}>    
                   
          <Button bordered style={styles.pushButton}>
            <Text note bold>P</Text>
          </Button>   
            
          <View>  
            <Text small>You changed security question</Text>
            <Text note small>10:41 AM</Text>
          </View>  
          
          <Button style={styles.itemHeaderButton} transparent>
            <Icon style={styles.iconSmall} gray name="keyboard-arrow-down" />
          </Button>
        </ListItem>  
        <ListItem style={styles.itemBody} last>                                                
          <Button bordered style={styles.pushButton}>
            <Text note bold>P</Text>
          </Button> 

          <View>  
            <Text small>You changed security question</Text>
            <Text note small>10:41 AM</Text>
          </View> 

          <Button style={styles.itemHeaderButton} transparent>
            <Icon style={styles.iconSmall} gray name="keyboard-arrow-down" />
          </Button>
        </ListItem>  
        <ListItem style={styles.itemBody} last>                                                
          <Button bordered style={styles.pushButton}>
            <Text note bold>P</Text>
          </Button> 

          <View>  
            <Text small>You changed security question</Text>
            <Text note small>10:41 AM</Text>
          </View> 

          <Button style={styles.itemHeaderButton} transparent>
            <Icon style={styles.iconSmall} gray name="keyboard-arrow-down" />
          </Button>
        </ListItem>           
      </View>   
    )
  }

  render() {
       
    return (                 
        <Container>         
          {this.renderActions()}           
            <Content padder>              
              {this.renderSearchResult()}
              {this.renderSearchResultAddress()}
            </Content>                   
        </Container>      
    )
  }
}