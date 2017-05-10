import { call, put, take, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { 
  markRequestPending,
  markRequestSuccess,
  markRequestCancelled,
  markRequestFailed,
  invokeCallback,
  setToast,
  forwardTo,
} from '~/store/actions/common'


import {
  saveRefreshToken,
  setAuthState,     
  removeLoggedUser, 
} from '~/store/actions/auth'

import api from '~/store/api'

import {  
  API_TIMEOUT
} from '~/store/constants/api'

// create saga here
// convenient way: [] instead of polymorph, such as item is not array then [item]
// because later changes to code will be so easy, just add new row
export const createRequestSaga = ({request, key, start, stop, success, failure, cancelled, timeout=API_TIMEOUT, cancel}) => {
  
  // when we dispatch a function, redux-thunk will give it a dispatch
  // while redux-saga will give it an action instead, good for testing
  // we may not needs this if we use redux-saga, of course we can use both
  return function* (action) {    
    // default is empty
    let args = action.args || []
    // check to see if we have success callback that pass as a param, so that it will be callback from where it was born
    // with this way we can make something like cleaning the messages    
    let callback = typeof args[args.length-1] === 'function' ? args[args.length-1] : null
    if(callback){
      args = args.slice(0, -1)
    }
    // error first callback
    let ret = null
    let err = null

    // store into redux
    const requestKey = (typeof key === 'function') ? key(...args) : key
    // for key, we render unique key using action.args
    // but for actionCreator when callback, we should pass the whole action
    // so on event such as success, we can use action.type or action.args to 
    // do next, example: addBook => success : (data, {args:[token]}) => loadBooks(token) 
    if(start) for(let actionCreator of start){      
      yield put(actionCreator())
    }    
    // mark pending
    yield put(markRequestPending(requestKey))        
    try {

      // this is surely Error exception, assume as a request failed
      if(!request){
        throw new Error("Api method not found!!!")
      }

      // we do not wait forever for whatever request !!!
      // timeout is 0 mean default timeout, so default is 0 in case user input 0 
      let raceOptions = {
        data: call(request, ...args),
        isTimeout: call(delay, timeout)
      }

      if(cancel) {
        raceOptions.cancelRet = take(cancel)
      }

      const{data, isTimeout, cancelRet} = yield race(raceOptions)
      
      if(isTimeout){
        throw new Error(`Api method is timeout after ${timeout} ms!!!`)
      } else if(cancelRet){
        // callback on success
        if(cancelled) for(let actionCreator of cancelled){          
          yield put(actionCreator(cancelRet, action))
        }
        // mark cancelled request
        yield put(markRequestCancelled(cancelRet, requestKey))
      } else {
        // callback on success
        if(success) for(let actionCreator of success){          
          yield put(actionCreator(data, action))
        }                
        // finally mark the request success
        yield put(markRequestSuccess(requestKey))

        // assign data, for cancel both ret and err is null
        ret = data

      }            
      
    } catch (reason) {
      // unauthorized
      if(reason.status === 401){
        // try refresh token
        const token = action.args[0]
        // catch exception is safer than just read response status
        if(token && token.refreshToken){
          // tell user to wait, no need to catch for more errors this step!!!
          yield put(setToast('Refreshing token... You should reload page for sure!'))
          // try refresh token, then reload page ?
          const { token: newToken } = yield call(api.auth.refreshAccessToken, token.refreshToken)          
          // it can return more such as user info, expired date ?            
          // call action creator to update        
          yield put(saveRefreshToken(newToken))
        } else {
          // call logout user because we do not have refresh token
          yield put(removeLoggedUser())
          yield put(setAuthState(false))       
          yield put(forwardTo('login'))   
        }
      }
      // anyway, we should treat this as error to log
      if(failure) for(let actionCreator of failure){          
        yield put(actionCreator(reason, action))
      }        
      yield put(markRequestFailed(reason, requestKey))

      // mark error
      err = reason      
      
    } finally {
      if(stop) for(let actionCreator of stop){          
        yield put(actionCreator(ret, action))
      } 
      // check if the last param is action, should call it as actionCreator
      // from where it is called, we can access action[type and args], 
      // so we will use it with first error callback style
      if(callback) {
        yield put(invokeCallback(callback, err, ret))        
      } 
    }
  }
}