import React, { Component } from 'react'
import { 
  Container, Form, Item, Input, Button, 
  Text, Thumbnail, Label 
} from 'native-base'
import styles from './styles'
import { connect } from 'react-redux'
import { setToast } from '~/store/actions/common'
import { login } from '~/store/actions/auth'
import { Field, reduxForm } from 'redux-form'

import routes from '~/ui/routes'

import { InputField } from '~/ui/elements/Form'

const validate = (values) => {
  const errors = {}
  // first time it is empty
  if(!values) return errors
  if (!values.email) {
    errors.email = 'Email is empty'
  } 

  return errors
}

@connect(null, {setToast, login})
@reduxForm({ form: 'LoginForm', validate})
export default class Login extends Component {

  _handleLogin = ({email, password}) => {
    // this.props.setToast(JSON.stringify(data), 'danger')    
    this.props.login(email, password, ()=>this.props.navigator.resetTo(routes.home))
  }

  render() {    
    const { handleSubmit, submitting } = this.props        
    return (
      <Container style={styles.container}>
                            
        <Thumbnail style={styles.logo} 
          source={require('~/assets/logo.png')} />
        
          <Form>
              
              <Field name="email" label="Email" component={InputField} />
              <Field name="password" label="Password" secureTextEntry={true} component={InputField} />
              
              <Button onPress={handleSubmit(this._handleLogin)} 
                style={styles.button}>
                <Text>Sign in</Text>
              </Button>

              <Text style={styles.label}>Forgot password?</Text>

              <Button bordered style={styles.outlineButton}>
                <Text style={styles.whiteColor}>Sign up</Text>
              </Button>              

          </Form>
          
      </Container>
    )
  }
}