import React, { Component } from 'react';
import { Text,TouchableOpacity,StyleSheet, View , Button , ActivityIndicator, Dimensions,Image} from 'react-native';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import MapView from "react-native-maps";
import Carousel from 'react-native-snap-carousel';

import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Constants from '../utils/Constants';

class ShowUserLocation extends Component{
    constructor(props){
        super(props);
        this.state={
            navigationData: [],
            loading: true,
            region1: {
                latitude: 100,
                longitude: 830,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            markerLocationRegion: {
                latitude: 100,
                longitude: 830,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            isMapReady: false,
            region1: {
                latitude: 10,
                longitude: 10,
            },
            regionChangeProgress: false,
            item: [],
            demoImages: [
                {Name: 'image1', Image: require('../assets/images/background.png')},
                {Name: 'image2', Image: require('../assets/images/background.png')},
                {Name: 'image3', Image: require('../assets/images/background.png')},
                {Name: 'image4', Image: require('../assets/images/background.png')},
            ]
        }
    }
    onRegionChange = region => {
        this.setState({ region });
    } // end of onRegionChange
    
    onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: '5%' });
    } // end of onMapReady

    componentWillMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                };
                this.setState({
                    region1: region,
                    loading: false,
                    error: null,
                });
            },
            (error) => {
                this.setState({
                    error: error.message,
                    loading: false
                })
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        ); // end of Geolocation

        // const { navigation } = this.props;
        // this.setState({
        //     navigationData: JSON.stringify(navigation.getParam('id')), 
        // })
        this.setState({
            markerLocationRegion: this.example,
        });
    } // end of ComponentWillMount 
    _renderCarouselItem = ({item}) => {
        return (
            <View style={styles.cardContanier}>
                {/* <Text>{ item.Name }</Text> */}
                <Image style={styles.cardImage} source={item.Image} />
            </View>
        );
    }
    render(){
        const { navigation } = this.props;
        const user_id = navigation.getParam('id');
        const user_name = navigation.getParam('username');
        const user_lat = navigation.getParam('lat');
        const user_long = navigation.getParam('long');

        const example = {
            latitude: user_lat,
            longitude: user_long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };

        if (this.state.loading){
            return (
                <View style={styles.spinnerView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }else{
            return (
                <View>
                {/*  Header Bar Start */}
                <View style={{ flexDirection: 'row', height: 55, backgroundColor: Constants.Colors.whiteColor, position: 'relative', shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24 , marginBottom: 1 }}>
                    <TouchableOpacity style={{ width: 45, paddingLeft: 20, justifyContent: 'center' }}
                        onPress={ () => this.props.navigation.navigate('AllUserQuery') }>

                        <MaterialIcons name="keyboard-arrow-left" size={32} style={{ color: Constants.Colors.appThemeColor, paddingRight: 2, fontWeight: 'bold' }} />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '70%', height: '70%', backgroundColor: '#ededed', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                            <Text style={{ fontSize: 18, color: '#00517b', fontWeight: 'bold' }}>QUERY DETAILS</Text>
                        </View>
                    </View>
                </View>
                {/*  Header Bar End */}

                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                    {!!this.state.region1.latitude && !!this.state.region1.longitude &&
                    <MapView
                        style={{ ...styles.map }}
                        initialRegion={{latitude: user_lat, longitude: user_long,latitudeDelta: 0.0922,longitudeDelta: 0.0421 }}
                        showsUserLocation={true}
                        onMapReady={this.onMapReady}
                        onRegionChangeComplete={this.onRegionChange}>

                        <MapView.Marker
                            coordinate={{latitude: user_lat, longitude: user_long}}
                            title={user_name}
                            description={"description"}/>
                    </MapView>
                    }
                    <View style={styles.btnContainer1}>
                    <View style={{ width: '60%', }}>
                        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <IconFontAwesome5 name="search-location" size={24} color="white" />
                                <Text style={styles.loginText}> SEARCH</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>

                </View>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.demoImages}
                    containerCustomStyle={styles.CarouselStyle}
                    renderItem={this._renderCarouselItem}
                    sliderWidth={Dimensions.get('screen').width}
                    itemWidth={250}
                />
                </View>
            );}
        }
    }
const styles = StyleSheet.create ({
    container: {
        display: "flex",
        height: Dimensions.get("screen").height-300,
        width: Dimensions.get("screen").width
    },
    CarouselStyle:{
        position: 'absolute',
        bottom: '-43%',
        // marginBottom: -170,
    },
    cardContanier:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: 180,
        width: 250,
        padding: 24,
        borderRadius: 24,
        marginBottom: 20
    },
    cardImage:{
        height: 150,
        width: 250,
        bottom: 0,
        position: 'absolute',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    CarouselImageStyle:{
        height: 20,
    },
    map: {
        flex: 1
    },
    mapMarkerContainer: {
        left: '47%',
        position: 'absolute',
        top: '42%'
    },
    searchInput: {
        left: '5%',
        position: 'absolute',
        top: '5%',
        width: '80%'
    },
    mapMarker: {
        fontSize: 40,
        color: "red"
    },
    deatilSection: {
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 10,
        display: "flex",
        justifyContent: "flex-start"
    },
    spinnerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer: {
        width: Dimensions.get("window").width - 20,
        position: "absolute",
        bottom: 100,
        left: 10
    },
    attachmentContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end', // if you want to fill rows left to right
        // marginTop: 20,
        justifyContent: 'flex-end'
    },
    buttonAttachment: {
        height: 28,
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
        marginRight: '2%',
        // width: 300,
        borderRadius: 15,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: '#1F618D', //"#00b5ec",
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        // elevation: 9,
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnContainer1: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        // alignItems: 'flex-start', // if you want to fill rows left to right
        // marginTop: 20,
        position: 'absolute',//use absolute position to show button on top of the map
        top: '1%', //for center align
        alignSelf: 'flex-start',
        marginLeft: '1%'
    },
    buttonContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 30,
        borderRadius: 24,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: '#1F618D', //"#00b5ec",
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.50,
        shadowRadius: 14.35,
        elevation: 20,
    },
    loginText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
 })
const mapStateToProps = state => {
    return {
        latiRedux: state.reducerMap.latitude,
        longRedux: state.reducerMap.longitude,
    };
};
const mapsDispatchToProps = dispatch => {
    return {
    };
}
export default connect(null, null)(ShowUserLocation);