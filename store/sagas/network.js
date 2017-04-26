import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
    replaceNetworks, 
    replaceNetwork,    
    replaceBusinessNetwork,
} from '~/store/actions/network'


const requestGetNetworks = createRequestSaga({
    request: api.network.getNetworks,
    key: 'getNetworks',    
    success: [
        (data) => replaceNetworks(data),           
    ],
    failure: [
        () => setToast('Couldn\'t get networks', 'error')
    ],
})

const requestGetNetwork = createRequestSaga({
    request: api.network.getNetwork,
    key: 'getNetwork',    
    success: [
        (data, args:[Id, name]) => replaceNetwork({name, data:{...data, Id}}),           
    ],
    failure: [
        () => setToast('Couldn\'t get network', 'error')
    ],
})

const requestGetBusinessNetwork = createRequestSaga({
    request: api.network.getBusinessNetwork,
    key: 'getBusinessNetwork',    
    success: [
        (data) => replaceBusinessNetwork(data),           
    ],
    failure: [
        () => setToast('Couldn\'t get business network', 'error')
    ],
})

// saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeLatest('app/getNetworks', requestGetNetworks), 
            takeLatest('app/getNetwork', requestGetNetwork), 
            takeLatest('app/getBusinessNetwork', requestGetBusinessNetwork),                        
        ]
    },
]

