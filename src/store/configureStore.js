

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";


import reducerLogin from './reducers/reducerLogin';
import reducerUi from './reducers/reducerUi';
import reducerMap from './reducers/reducerMap'; 


const rootReducer = combineReducers({
     reducerLogin,
     reducerMap,
     reducerUi
    
});

let composeEnhancers = compose;
if (__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} 

const configureStore =() => {
    return createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;