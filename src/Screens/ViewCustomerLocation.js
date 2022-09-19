import React ,{ Component } from 'react';
import { View,Text, StyleSheet , Button } from 'react-native';
import MapView , { PROVIDER_GOOGLE , Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
// import Axios from 'axios';
// import { getLocation } from '../store/actions/index';
// import { getLocation } from '../store/actions/actionLogin';
import GLOABAL_PATH from '../utils/GlobalPath';
import { getUserInfo } from '../components/General/LoginUserInfo';

class ViewCustomerLocation extends Component{
    constructor(props){
        super(props);
        this.state={
          latitude: 0,
          longitude: 0,
          error: null,
          address: '',
          tempAddress: '',
          name: '',
          num: '12345678912',
          mobile: ''
        }
      }
    componentDidMount(){
        Geolocation.getCurrentPosition(position =>{
            this.setState({
                // latitude: position.coords.latitude,
                // longitude: position.coords.longitude,
                error: null,
          })
        },
        error => this.setState({error: error.message}),
        {
            enableHighAccuracy: false, 
            timeout: 10000, 
            maximumAge: 10000
        });
        
    //     // var mobile='';
        getUserInfo().then((response) => {    // get Mobile No From Async Storage
          let UserInfo = response.UserInfo;
          // mobile = ;
          this.getLocation(UserInfo.Username);
          // this.getLocation('hyd'); // for checking..
          // this.getLocation('psh'); // for checking..
          // this.setState({ mobile: UserInfo.Username });
      }).catch((error) => { });  // end of getUserInfo

    //   // this.CurrentLocation('qasim');

        console.log('GetLocation in Component');
    } // end of ComponentDidMount

    // async getLocation(userName){
    //   let url = GLOABAL_PATH.API_URL + 'CurrentLocation/GetLocation?mobileNo='+userName 
    //   let resp= await Axios.get(url)
    //   console.warn(resp.data);
    // }

    getLocation(username){
      let url = GLOABAL_PATH.API_URL + 'CurrentLocation/GetLocation?mobileNo=' + username ;
      fetch(url)
      .then(Response =>{
        return Response.json();
      }).then(ResponseData =>{
        console.log(ResponseData);
        this.setState({ 
          latitude: ResponseData.LatitutePosition,
          longitude: ResponseData.LongitutePosition,
          name : ResponseData.Username,
      })
        console.log('lati: '+this.state.latitude +' Long: '+this.state.longitude+' user '+this.state.name );
      })
    }

    // CurrentLocation = (username) => {
    //   this.props.GETLOCATION(username);
    // }
  
    render(){
        return(
            <View>
                <Button
                title="Go Back"
                style={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate("Map")}>
                </Button>
                
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
        // initialRegion={this.state}
                    // showsUserLocation={true}
        onMapReady={this.onMapReady}
                    showsCompass={true}
        onRegionChangeComplete={this.onRegionChange}
                >
                <MapView.Marker
                    coordinate={{ "latitude": this.state.latitude,
                    "longitude": this.state.longitude}}
                    title={this.state.name}
                />
                </MapView>
            </View>
        );
    }
}
// const mapsDispatchToProps = dispatch => {
//   return {
//     GETLOCATION: (username) => dispatch(getLocation(username))
//   };
// }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    map: {
      height: '100%',
    },
    textInput: {
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
    },
    textInputContainer: {
      backgroundColor: 'grey',
    },
  
  });
export default ViewCustomerLocation;
// export default connect(null,null)(ViewCustomerLocation);
