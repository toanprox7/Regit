import React, { Component } from 'react'
import { 
  Container,   
  Form, 
  Item, 
  Input, 
  Button, 
  Text, 
  Thumbnail, 
  Label,
} from 'native-base'
import styles from './styles'
import { connect } from 'react-redux'
// this way help copy and paste faster
import * as commonActions from '~/store/actions/common'
import * as authActions from '~/store/actions/auth'
import { Field, reduxForm } from 'redux-form'

import routes from '~/ui/routes'

import Content from '~/ui/components/Content'
import { InputField } from '~/ui/elements/Form'
import { validate } from './utils'
import { logo } from '~/assets'

@connect(null, {...commonActions, ...authActions})
@reduxForm({ form: 'LoginForm', validate})
export default class extends Component {

  _handleLogin = ({email, password}) => {    
    this.props.login(email, password)
  }

  render() {    
    const { handleSubmit, submitting, setToast } = this.props        
    return (
      <Container style={styles.container}>
        <Content>                    
          
          <Thumbnail style={styles.logo} source={logo} />        
          
          <Form style={styles.form}>
              
              <Field autoCapitalize="none" name="email" label="Email" component={InputField} />
              <Field name="password" label="Password" secureTextEntry={true} component={InputField} />              
              <Button onPress={handleSubmit(this._handleLogin)} 
                style={styles.button}>
                <Text>Sign in</Text>
              </Button>

              <Text style={styles.label}>Forgot password?</Text>

              <Button bordered style={styles.outlineButton} onPress={()=>setToast('hehe')}>
                <Text style={styles.whiteColor}>Sign up</Text>
              </Button>              

          </Form>
        </Content>
      </Container>
    )
  }
}