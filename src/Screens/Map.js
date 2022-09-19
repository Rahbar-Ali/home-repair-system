import React, { Component, createRef } from 'react';
import { Button, View, ActivityIndicator, StyleSheet, Dimensions, TextInput, Image, BackHandler, TouchableOpacity, Modal, Animated } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Icon, Text, Root } from "native-base";
// import {  Header, Button, Content, ActionSheet, Text } from "native-base";

import Geolocation from 'react-native-geolocation-service';
import MapView from "react-native-maps";
import RBSheet from "react-native-raw-bottom-sheet";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import styles from "./styles";

import { connect } from 'react-redux';
import { sendLocation, setLocation } from '../store/actions/index';
import { getUserInfo } from '../components/General/LoginUserInfo';
import { sendCategory } from '../store/actions/actionLogin';


import * as Animatable from 'react-native-animatable';
import Hamburger from 'react-native-animated-hamburger';
import Constants from '../utils/Constants';

import CustomSideMenu from '../components/Navigation/CustomSideMenu';

// Disable yellow box warning messages
// console.disableYellowBox = true;

var BUTTONS = [
    { id: "1", text: "Washing Machine", icon: "american-football", iconColor: "#2c8ef4" },
    { id: "2", text: "Air Condition", icon: "analytics", iconColor: "#f42ced" },
    { id: "3", text: "Refrigrator", icon: "aperture", iconColor: "#ea943b" },
    // { text: "Delete", icon: "trash", iconColor: "#fa213b" },
    { id: "0", text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

let { width, height } = Dimensions.get('window');

class Map extends Component {

    NextSwingRef = ref2 => this.TouchableOpacity = ref2;
    NextSwing = () => this.TouchableOpacity.swing(800).then(endState2 => console.log(endState2.finished ? this.onConfirmBtn() : 'bounce cancelled'));

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            loading: true,
            region: {
                latitude: 10,
                longitude: 10,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            },
            isMapReady: false,
            region1: {
                latitude: 10,
                longitude: 10,
            },
            marginTop: 1,
            userLocation: "",
            regionChangeProgress: false,
            service: 'Washing Machine',
            getLatitute: 10.1,   // not used in the project
            getLongitute: 10.2,   // not used in the project
            uri: require('../assets/images/logo.png'),
            backClickCount: 0,
        };
        this.springValue = new Animated.Value(100);
    }

    componentWillMount() {
        // BackHandler.addEventListener('hardwarBackPress', function () { return true; });  // back button disable
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        Geolocation.getCurrentPosition(
            (position) => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                };
                this.setState({
                    region: region,
                    loading: false,
                    error: null,
                    getLatitute: parseFloat(position.coords.latitude),
                    getLongitute: position.coords.longitude,
                });
                // console.log('value: '+this.state.getLatitute);
            },
            (error) => {
                // alert(error);
                this.setState({
                    error: error.message,
                    loading: false
                })
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        ); // end of Geolocation

        getUserInfo().then((response) => { // get Mobile No: From Async Storage
            var UserInfo = response.UserInfo;
            // this.setState({ mobile: UserInfo.Username });

            // console.log('Mobile No :'+mobile)
        }).catch((error) => { });  // end of getUserInfo

        // console.log('Redux Value Lat: '+this.props.latiRedux+' Long: '+this.props.longRedux);
        // console.log('LoginId : ' + this.props.loginId);
    } // end of ComponentWillMount

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.15 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),

            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });

    }

    onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: '1%' });
    }

    // Fetch location details as a JOSN from google map API
    fetchAddress = () => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyAXW-WDp0MF5si6oFXaukDQuThTr1wqmDE")
            .then((response) => response.json())
            .then((responseJson) => {
                const userLocation = responseJson.results[0].formatted_address;
                this.setState({
                    userLocation: userLocation,
                    regionChangeProgress: false
                });
            });
    } // end of FetchAddress

    // Update state on region change
    onRegionChange = region => {

        // this.setState({
        //   region,
        //   regionChangeProgress: true
        // }, () => this.fetchAddress());
        this.setState({
            region,
        });
    } // end of onRegionChange

    // Action to be taken after select location button click
    // onLocationSelect = () => alert(this.state.userLocation);
    onLocationSelect = () => {
        this.setState({ region1: this.state.region });
        console.log(this.state.region1);
        // alert('Your Agent will be at your door step soon');
        // this.props.navigation.navigate("ViewCustomerLocation")
    } // end of onLocationSelect
    onSetLocationToRedux = () => {
        this.props.onSetLocation(this.state.region.latitude, this.state.region.longitude);
        // this.props.onSetLocation(40.4444,40.55555555);   // checking ...
        // console.log('Set Location Working..');
        // console.log('Latitude: '+this.state.region.latitude+' longitute: '+this.state.region.longitude);
    }
    onConfirmBtn() {
        // const { username, region, latitude1,longitude1 } = this.state
        if (this.state.region.latitude == null || this.state.region.latitude == undefined || this.state.region.longitude == null || this.state.region.longitude == undefined) {
            alert('Location is not set');
        } else {
            // this.props.onConfirm(this.props.loginId,this.state.region.longitude,this.state.region.latitude,this.props.navigation);  // not work in this page
            // this.onSetLocationToRedux();  //
            console.log('OnConfirm ==> ' + JSON.stringify(this.state.region));
            this.props.navigation.navigate("QueryDetails");

            this.onLocationSelect();  // uncomment when done
        }
    } // end of onConfirmBtn

    onPress = () => {
        this.setState({
            service: 'Washing Machine',
            uri: require('../assets/images/washing-machines.jpg')
        });
        console.log('services: ' + this.state.service);
        this.RBSheet.close();
    };
    onPress1 = () => {
        this.setState({
            service: 'Air Condition',
            uri: require('../assets/images/washing-machines.jpg')
        });
        console.log('services: ' + this.state.service);
        this.RBSheet.close();
    };
    onPress2 = () => {
        this.setState({
            service: 'Refrigrator',
            uri: require('../assets/images/washing-machines.jpg')
        });
        console.log('services: ' + this.state.service);
        this.RBSheet.close();
    };
    onPress3 = () => {
        this.setState({
            service: 'Cancel',
            uri: require('../assets/images/washing-machines.jpg')
        });
        console.log('services: ' + this.state.service);
        this.RBSheet.close();
    };

    onDrawerClick = () => {
        // this.setState({ active: !this.state.active });  // for Hamburger Animation icon 

        this.props.navigation.openDrawer();

        // console.log('Drawer Clicked.. ');
    }

    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    render() {
        let actionSheet;

        if (this.state.loading) {
            return (
                <View style={styles.spinnerView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    {/*  Header Bar Start */}
                    <View style={{ flexDirection: 'row', height: 55, backgroundColor: Constants.Colors.whiteColor, shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24 }}>
                        <TouchableOpacity style={{ width: 45, paddingLeft: 20, justifyContent: 'center' }}>
                            <AntDesign
                                style={{ marginLeft: 2, fontWeight: 'bold' }}
                                color={Constants.Colors.appThemeColor}
                                name="menu-unfold"
                                size={35}
                            />
                            {/* <Hamburger type="spinCross" active={this.state.active} onPress={() => this.onDrawerClick()} underlayColor="transparent" color='#00517b'
                                fontWeight='bold' size={30} >
                            </Hamburger> */}
                        </TouchableOpacity>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '70%', height: '70%', backgroundColor: '#ededed', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                                <Text style={{ fontSize: 18, color: '#00517b', fontWeight: 'bold' }}>LOCATION</Text>
                            </View>
                        </View>
                    </View>
                    {/*  Header Bar End */}

                    <View style={{ flex: 2 }}>
                        {!!this.state.region.latitude && !!this.state.region.longitude &&
                            <MapView
                                style={{ ...styles.map, marginTop: this.state.marginTop }}
                                initialRegion={this.state.region}
                                showsUserLocation={true}
                                onMapReady={this.onMapReady}
                                onRegionChangeComplete={this.onRegionChange}
                            >
                                {/* <MapView.Marker
                                    coordinate={{ "latitude": this.state.region1.latitude, "longitude": this.state.region1.longitude }}
                                    title={"Your Location"}
                                    draggable
                                /> */}
                            </MapView>
                        }

                        <View style={styles.mapMarkerContainer}>
                            {/* <Text style={{ fontFamily: 'fontawesome', fontSize: 42, color: "#ad1f1f" }}>&#xf041;</Text>  this is already commented... */}
                            <Ionicons name="md-pin" size={30} color="#3792cb" />
                        </View>
                        <View style={styles.searchInput}>
                            {/* <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }} /> */}
                            <Card>
                                {/* <CardItem header button onPress={() => alert("This is Card Header")}>
                                <Text>Current Location</Text>
                            </CardItem> */}
                                <CardItem button onPress={
                                    () => alert("This is Card Body")}>
                                    <Body>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
                                            {/* <Image source={require('../assets/images/logo.png')} style={{width: 25, height: 25}} /> */}
                                            <Text style={{ paddingLeft: 16 }}>Gulberg Lahore Punjab  </Text>
                                            {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end'  }}>
                                        <Ionicons name="ios-arrow-down" size={18} />
                                        </View> */}
                                        </View>
                                    </Body>
                                </CardItem>
                                {/* <CardItem footer button onPress={() => alert("This is Card Footer")}>
                                <Text>GeekyAnts</Text>
                            </CardItem> */}
                            </Card>
                        </View>
                    </View>
                    {/* <View style={styles.deatilSection}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "roboto", marginBottom: 20 }}>Move map for location</Text> */}
                    {/* <Text style={{ fontSize: 10, color: "#999" }}>LOCATION</Text> */}
                    {/* <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
              {!this.state.regionChangeProgress ? this.state.userLocation : "Identifying Location..."}</Text> */}
                    {/* <View style={styles.attachmentContainer}>
                        <View style={{ width: '27%' }}>
                            <TouchableOpacity 
                            style={[styles.buttonAttachment, styles.loginButton]} 
                            // onPress={() => this.onClickListener('login')}
                            >
                            <View style={{  flexDirection: 'row', alignItems: 'center' }}>
                            <ion-icon name="document-attach-outline" size={20} style={{ color: '#fff', paddingRight: 4 }}></ion-icon>
                                <Icon name="document-attach-sharp" size={20} style={{ color: '#fff', paddingRight: 4 }} />
                                <Image source={require('../assets/icons/document-attach-outline.svg')} 
                                size={1} style={{ size: 10 , color: '#fff', paddingRight: 4 }}  />
                                <Text style={styles.loginText}>Images</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <View style={styles.bottomView}>
                        <View style={styles.deatilSection}>
                            <TouchableOpacity style={{
                                justifyContent: "center",
                                flex: 1
                            }} onPress={() => this.RBSheet.open()}>
                                <View style={{
                                    justifyContent: "center",
                                    // flex: 1 
                                }}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
                                        <Image source={this.state.uri} style={{ width: 25, height: 25, marginLeft: 5 }} />
                                        <Text style={{ paddingLeft: 17 }}>{this.state.service}</Text>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', paddingRight: 10 }}>
                                                <Ionicons name="ios-arrow-down" size={18} />
                                            </View>

                                        </View>
                                    </View>
                                </View>

                                <RBSheet ref={ref => { this.RBSheet = ref; }}
                                    height={220} openDuration={250} customStyles={{
                                        container: {
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 12,
                                            },
                                            shadowOpacity: 0.58,
                                            shadowRadius: 16.00,
                                            elevation: 24,
                                            borderTopLeftRadius: 30,
                                            borderTopRightRadius: 30,
                                        }
                                    }}
                                    closeOnDragDown={true}
                                >
                                    <View style={styles.containerActionSheet}>
                                        <Text style={{ marginBottom: '1%', color: Constants.Colors.appThemeColor, fontSize: 20, fontWeight: 'bold' }}>SELECT SERVICE</Text>
                                    </View>

                                    <TouchableOpacity onPress={this.onPress}>
                                        <View style={{ flexDirection: 'row' }}>
                                            {/* <Icon name="american-football" size={20} style={{ color: '#000000', paddingRight: 6 }} /> */}
                                            <Image source={require('../assets/images/washing-machines.jpg')}
                                                style={styles.actionSheetItem} />
                                            <Text style={styles.actionSheetItemText}>Washing Machine</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.hr}></View>

                                    {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} /> */}

                                    <TouchableOpacity onPress={this.onPress1}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('../assets/images/washing-machines.jpg')} style={styles.actionSheetItem} />
                                            <Text style={styles.actionSheetItemText}>Air Condition</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.hr}></View>

                                    {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} /> */}

                                    <TouchableOpacity onPress={this.onPress2}>
                                        <View style={{ flexDirection: 'row' }}>
                                            {/* <Icon name="analytics" size={20} style={{ color: '#000000', paddingRight: 6 }} /> */}
                                            <Image source={require('../assets/images/washing-machines.jpg')} style={styles.actionSheetItem} />
                                            <Text style={styles.actionSheetItemText}>Refrigrator</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.hr}></View>

                                    {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} /> */}

                                    <TouchableOpacity onPress={this.onPress3}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('../assets/images/washing-machines.jpg')} style={styles.actionSheetItem} />
                                            <Text style={styles.actionSheetItemText}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {/* <View style={styles.hr}></View> */}
                                    {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} /> */}
                                </RBSheet>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', left: 20 }}>
                            <Animatable.View ref={this.NextSwingRef}>
                                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.NextSwing}>
                                    <View style={{
                                        flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={styles.loginText}>NEXT</Text>
                                        <MaterialIcons name="navigate-next" size={32} style={{ color: '#fff', paddingRight: 8 }} />

                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                            <Text style={styles.exitTitleText}>Press Back Again To EXIT The App</Text>

                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => BackHandler.exitApp()}
                            >
                                <Text style={styles.exitText}>EXIT</Text>
                            </TouchableOpacity>

                        </Animated.View>
                    </View>
                </View>
            ); // end of return 
        } // end of else Condition
    } // end of Render
} // end of App Class

const styles = StyleSheet.create({
    actionSheetItem: {
        width: 35,
        height: 35,
        paddingRight: 10,
        paddingLeft: 33,
    },
    actionSheetItemText: {
        // color: '#000000',
        color: Constants.Colors.appThemeColor,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '3%',
        marginTop: 5,
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center'

    },
    actionSheetContainer: {
        height: 300,
    },
    containerActionSheet: {
        paddingTop: 0,
        // marginTop: 1,
        // backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    container: {
        display: "flex",
        height: Dimensions.get("screen").height - 50,
        width: Dimensions.get("screen").width
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
        top: '1%',
        width: '80%'
    },
    mapMarker: {
        fontSize: 40,
        color: "red"
    },
    deatilSection: {
        flex: 1,
        backgroundColor: "#fff",
        height: 55,
        // paddingBottom: 10,
        display: "flex",
        justifyContent: "flex-start",
        marginRight: 2,
        marginLeft: 2,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'black',
        marginBottom: 10,

    },
    spinnerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomView: {
        // width: Dimensions.get("window").width - 20,
        width: '100%',
        position: "absolute",
        bottom: 20,
        // left: 10,
        // alignItems: 'center',
        marginBottom: 5,
    },
    attachmentContainer: {
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
        fontWeight: 'bold',
        flex: 1,
        // paddingRight: '40px',
        paddingRight: 3,
        textAlign: 'center',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

        // width: 300,
        borderRadius: 14,
        backgroundColor: 'transparent'
    },
    hr: {
        width: '100%',
        height: 0.7,
        backgroundColor: '#444',
        marginTop: 2,
    },
    animatedView: {
        width,
        backgroundColor: "#0a5386",
        elevation: 2,
        position: "absolute",
        bottom: -100,
        padding: 10,
        // justifyContent: "center",
        // alignItems: "center",
        flexDirection: "row",
    },
    exitTitleText: {
        textAlign: "center",
        color: "#ffffff",
        marginRight: 10,
    },
    exitText: {
        color: "#e5933a",
        paddingHorizontal: 10,
        paddingVertical: 3
    }
});
const mapStateToProps = (state) => {
    return {
        loginId: state.reducerLogin.userInfoObject.LoginId,
        // latiRedux : state.reducer
        // longRedux : state.reducerMap.longitude,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onSetLocation: (latitude, longitude) => dispatch(setLocation(latitude, longitude)),
        // onConfirm: (loginId,longitude, latitude,propsNavigate) => dispatch(sendLocation(loginId,longitude, latitude,propsNavigate)),
        // onSendCategoryName: (catName) => dispatch(sendCategory(catName))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);