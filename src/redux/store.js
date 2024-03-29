import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import allReducer from './reducers/allReducer'

const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
