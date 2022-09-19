import {AppRegistry} from 'react-native';
import React, { Component } from 'react';
import {name as appName} from './app.json';
import  {Provider} from 'react-redux';
import configureStore  from './src/store/configureStore';
import App from './App';
import Splash from './src/Screens/Splash';

const store = configureStore();
// const RNRedux = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// );
class Main extends Component{
    constructor(props){
        super(props);
        this.state={ currentScreen:'Splash' };
        setTimeout(()=>{
            this.setState({currentScreen: 'Login'})
        },3000)
    }
    render(){
        const { currentScreen }=this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash/> : <Provider store={store} >
        <App /> 
        </Provider>
        return mainScreen
    }
}


AppRegistry.registerComponent(appName, () => Main);