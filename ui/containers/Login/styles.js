import material from '~/native-base-theme/variables/material'

export default {
  container: {
    backgroundColor: '#00b5f1', 
    flex: 1,
    alignItems: 'center',  
    justifyContent: 'center',   
    flexDirection: 'column',          
    paddingLeft: 20,
    paddingRight: 20,        
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 5,        
    marginLeft: 0,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
  input: {    
    fontFamily: 'Roboto',
    fontWeight: '300',    
  },
  logo: {
    width: 80, 
    height: 120,
    marginTop: 20,    
    marginBottom: 20,
  },
  button: {
    marginTop: 15,    
    backgroundColor: '#0072bc',        
    justifyContent: 'center',
    width: '100%',   
    borderRadius: 5,
  },
  outlineButton: {
    marginTop: 100,        
    borderColor: '#FFF',      
    justifyContent: 'center',
    width: '100%',  
    borderRadius: 5, 
  },
  margin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFF',
  },  
  label: {
    marginTop: 20,
    width: '100%',
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  whiteColor: {
    color: '#FFF',
    fontWeight: '500',
  }
}