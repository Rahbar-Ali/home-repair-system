import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ScrollView, Animated, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NavBarImg from '../../assets/images/NavBarImg.jpg';

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
// import { studentChanged, getActivities } from '../../store/actions/index';
import GLOABAL_PATH from '../../utils/GlobalPath';
import ProgressBar from '../General/ProgressBar';
import Constants from '../../utils/Constants';

import { setLogoutValue } from '../../store/actions/index';
import Hamburger from 'react-native-animated-hamburger';

import { Badge } from 'react-native-paper';

// import { getStudentOrClassList, getStudentOrTeacherName, getClassName, getClassOrStdId } from '../../utils/UserTypeFunc';

const Sliding_Drawer_Width = 250;
const nav_bar_icon_size = 27;

class CustomSideMenu extends React.Component {
    constructor(props) {
        super(props);

        this.Animation = new Animated.Value(0);

        this.Sliding_Drawer_Toggle = true;

        // this.inputRefs = {
        //     firstTextInput: null,
        //     favSport0: null,
        //     favSport1: null,
        //     lastTextInput: null,
        //     favSport5: null,
        // };
        this.state = {
            active: false,

            //     numbers: [
            //         {
            //             label: '1',
            //             value: 1,
            //             color: 'orange',
            //         },
            //         {
            //             label: '2',
            //             value: 2,
            //             color: 'green',
            //         },
            //     ],
            //     favSport0: undefined,
            //     favSport1: undefined,
            //     favSport2: undefined,
            //     favSport3: undefined,
            //     favSport4: 'baseball',
            //     previousFavSport5: undefined,
            //     favSport5: null,
            //     favNumber: undefined,
        };

    }
    // componentDidMount()
    // {
    //     alert(this.props.selectedStudent);
    // }

    // StudentOrClassChangedHandler = (val) => {
    //     //alert(val);

    //     this.props.onStudentChanged(val);

    // }
    saveData() {
        let logoutDetail = "true";
        AsyncStorage.setItem('user', logoutDetail);
        console.log("Data is saved.." + logoutDetail);
    }
    onLogoutBtn = () => {
        // this.props.sendLogoutValue(this.state.isLogoutValue);
        // console.log("Value of :"+this.state.isLogoutValue);
        this.saveData();
        this.props.navigation.navigate("Logout");
    }

    ShowSlidingDrawer = () => {
        if (this.Sliding_Drawer_Toggle === true) {
            Animated.timing(
                this.Animation,
                {
                    toValue: 1,
                    duration: 500
                }
            ).start(() => {
                this.Sliding_Drawer_Toggle = false;
            });
        }
        else {
            Animated.timing(
                this.Animation,
                {
                    toValue: 0,
                    duration: 500
                }
            ).start(() => {
                this.Sliding_Drawer_Toggle = true;
            });
        }
    }

    onMenuIconPress = () => {
        this.setState({ active: !this.state.active })
        this.ShowSlidingDrawer();
        // console.log("Side Menu icon pressed..");
    }
    onCancelPress = () => {
        this.ShowSlidingDrawer();
        // console.log("On Cancel Side Menu icon pressed..");
    }

    render() {
        const Animation_Interpolate = this.Animation.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [-(Sliding_Drawer_Width - 32), 0]
            });

        // if (this.props.StudentOrClassList.length > 0) {
        //     let lst = getStudentOrClassList(this.props.StudentOrClassList);
        //     // this.props.StudentOrClassist.forEach(function (entry) {
        //     //     var studentOrClass = {}
        //     //     studentOrClass['label'] = entry.UserType === Constants.UserType.Parent? entry.StudentName + ' (' + entry.ClassName + ')': entry.ClassName ;
        //     //     studentOrClass['value'] = entry.UserType === Constants.UserType.Parent? entry.Id : entry.ClassId;
        //     //     lst.push(studentOrClass);
        //     // });
        return (

            <ScrollView >
                <View style={styles.sideMenuContainer}>
                    <ProgressBar />
                    <Image style={styles.bgImage} source={NavBarImg} />
                    <View
                        style={{
                            // backgroundColor: Constants.Colors.headerBackColor,
                            // backgroundColor: Constants.Colors.appThemeColor,
                            width: '100%',
                            height: 210,
                            flexDirection: 'row',
                            // justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                        <View style={{ paddingLeft: 10, paddingTop: 0 }}>
                            <View>
                                <Image source={{ uri: 'http://repairhomeappliances.com/wp-content/uploads/2018/06/logo-80x80.png' }} style={styles.sideMenuProfileIcon} />
                                <Badge style={styles.logoBadge}>
                                    <Entypo name="camera" size={24} color={Constants.Colors.black} />
                                </Badge>
                            </View>
                            <View>
                                <Text style={styles.navBarTitles} >Id Type:  {this.props.UserType}</Text>
                                <Text style={styles.navBarTitles} >Name:  {this.props.Name}</Text>
                                <Text style={styles.navBarTitles} >Email:  {this.props.UserObject.Email}</Text>
                                <Text style={styles.navBarTitles} >Mobile No:  {this.props.UserObject.MobileNo}</Text>
                            </View>

                        </View>
                        {/* <View style={{backgroundColor: 'pink'}}> */}
                        {/* <View paddingVertical={5} marginLeft={15} /> */}
                        {/* </View> */}

                    </View>
                    {/* <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} /> */}

                    <View style={{ width: '100%' }}>
                        {(this.props.UserType === 'USER') &&
                            <View>
                                <View style={styles.menuParentView}>
                                    <View style={styles.column}
                                    // style={{ paddingLeft: 20 }}
                                    >
                                        <Icon name="md-home" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Map') }} > Home </Text>
                                    </View>

                                    {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}

                                </View>
                                <View style={styles.hr}></View>
                            </View>
                        }


                        {(this.props.UserType === 'USER') &&
                            <View>
                                <View style={styles.menuParentView}>
                                    <View style={styles.column}
                                    // style={{ paddingLeft: 20 }}
                                    >
                                        <Icon name="md-alarm" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('ParentTeacherMeeting') }} > My History </Text>
                                    </View>

                                    {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}

                                </View>
                                <View style={styles.hr}></View>
                            </View>
                        }

                        {(this.props.UserType === 'USER' || this.props.UserType === 'USER') && 
                        <View>
                            <View style={styles.menuParentView}>
                                <View style={styles.column}
                                // style={{ paddingLeft: 20 }}
                                >
                                    {/* <Icon name="md-paper" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} /> */}
                                    <MaterialIcons name="notifications-active" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('FeeChallan') }} > Notifications</Text>
                                </View>

                                {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}

                            </View>
                            <View style={styles.hr}></View>
                        </View>
                        }

                        <View style={styles.menuParentView}>
                            <View style={styles.column}
                            // style={{ paddingLeft: 20 }}
                            >
                                <MaterialIcons name="settings" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Events') }} > Settings </Text>
                            </View>

                            {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}
                        </View>
                        <View style={styles.hr}></View>

                        {(this.props.UserType === 'AGENT' || this.props.UserType === 'USER') &&
                            <View>
                                <View style={styles.menuParentView}>
                                    <View style={styles.column}
                                    // style={{ paddingLeft: 20 }}
                                    >
                                        {/* <Icon name="md-document" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} /> */}
                                        <FontAwesome name="user-circle-o" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                                    </View>
                                    <View style={styles.column}  >
                                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('MyProfile') }} > My Profile </Text>
                                    </View>

                                    {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}
                                </View>
                                <View style={styles.hr}></View>
                            </View>
                        }

                        {(this.props.UserType === 'ADMIN') &&
                            <View>
                                <View style={styles.menuParentView}>
                                    <View style={styles.column}
                                    // style={{ paddingLeft: 20 }}
                                    >
                                        {/* <Entypo name="user" size={32} color={Constants.Colors.headerBackColor} /> */}
                                        {/* <FontAwesome5 name="user-friends" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} /> */}
                                        <Entypo name="users" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                                    </View>
                                    <View style={styles.column}  >
                                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('AllUserQuery') }} > All User Query </Text>
                                    </View>

                                    {/* <View style={[styles.IconParentView , { marginRight: '28%' } ]}>
                                <MaterialIcons name="navigate-next" size={32} style={[ styles.RightSideArrawIcon , { marginLeft: '10%' } ]} />
                            </View> */}
                                </View>
                                <View style={styles.hr}></View>
                            </View>
                        }
                        {(this.props.UserType === 'USER') &&
                            <View>
                                <View style={styles.menuParentView}>
                                    <View style={styles.column}
                                    // style={{ paddingLeft: 20 }}
                                    >
                                        {/* <Entypo name="user" size={32} color={Constants.Colors.headerBackColor} /> */}
                                        {/* <FontAwesome5 name="user-friends" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />*/}
                                        <Entypo name="users" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                                    </View>
                                    <View style={styles.column}  >
                                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('AllUsersQueryForUserOnly') }} > All User Query</Text>
                                    </View>

                                    {/* <View style={[styles.IconParentView , { marginRight: '28%' } ]}>
                                <MaterialIcons name="navigate-next" size={32} style={[ styles.RightSideArrawIcon , { marginLeft: '10%' } ]} />
                            </View> */}
                                </View>
                                <View style={styles.hr}></View>
                            </View>
                        }

                        {(this.props.UserType === 'AGENT') &&
                            <View>
                                <View style={styles.menuParentView}>
                                    <View style={styles.column}
                                    // style={{ paddingLeft: 20 }}
                                    >
                                        {/* <Entypo name="user" size={32} color={Constants.Colors.headerBackColor} /> */}
                                        {/* <FontAwesome5 name="user-friends" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} /> */}
                                        <Entypo name="users" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                                    </View>
                                    <View style={styles.column}  >
                                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('AllUsersQueryForAgent') }} > All User Query</Text>
                                    </View>

                                    {/* <View style={[styles.IconParentView , { marginRight: '28%' } ]}>
                                <MaterialIcons name="navigate-next" size={32} style={[ styles.RightSideArrawIcon , { marginLeft: '10%' } ]} />
                            </View> */}
                                </View>
                                <View style={styles.hr}></View>
                            </View>
                        }


                        {(this.props.UserType === 'AGENT' || this.props.UserType === 'ADMIN') &&
                        <View>
                            <View style={styles.menuParentView}>
                                <View style={styles.column}
                                // style={{ paddingLeft: 20 }}
                                >
                                    {/* <MaterialCommunityIcons name="face-agent" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} /> */}
                                    <FontAwesome name="user-secret" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />

                                </View>
                                <View style={styles.column}  >
                                    <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('AllAgents') }} > All Agents </Text>
                                </View>

                                {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}
                            </View>
                            <View style={styles.hr}></View>
                        </View>
                        }


                        {(this.props.UserType === 'AGENT' || this.props.UserType === 'ADMIN') &&
                        <View>
                            <View style={styles.menuParentView}>
                                <View style={styles.column}
                                // style={{ paddingLeft: 20 }}
                                >
                                    {/* <MaterialCommunityIcons name="face-agent" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} /> */}
                                    <Entypo name="user" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                                </View>
                                <View style={styles.column}  >
                                    <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('AllUsers') }} > All Users </Text>
                                </View>

                                {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}
                            </View>
                            <View style={styles.hr}></View>
                        </View>
                        }


                        {/* <View style={styles.menuParentView}>
                                <View style={styles.column} style={{ paddingLeft:20}}>
                                   
                                </View>
                                <View style={styles.column}  >
                                <Text style={styles.menuText}  onPress={() => { this.props.navigation.navigate('AllUsers') }} > All Users </Text>
                                </View>
                            </View> */}

                        <View style={styles.menuParentView}>
                            <View style={styles.column}
                            // style={{ paddingLeft: 20 }}
                            >
                                {/* <Icon name="md-copy" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} /> */}
                                <MaterialIcons name="feedback" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />

                            </View>
                            <View style={styles.column}>
                                <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('AllUsers') }} > Feedback </Text>
                            </View>

                            {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}
                        </View>
                        <View style={styles.hr}></View>

                        <View style={styles.menuParentView}>
                            <View style={styles.column}
                            // style={{ paddingLeft: 20 }}
                            >
                                {/* <Icon name="md-copy" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} /> */}
                                <FontAwesome name="file-text-o" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Feedback') }} > Terms & Conditions </Text>
                            </View>

                            {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}
                        </View>
                        <View style={styles.hr}></View>

                        <View style={styles.menuParentView}>
                            <View style={styles.column}
                            // style={{ paddingLeft: 20 }}
                            >
                                <Icon name="ios-log-out" size={nav_bar_icon_size} color={Constants.Colors.appDarkThemeColor} />
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.menuText} onPress={() => this.onLogoutBtn()} > Logout </Text>
                            </View>

                            {/* <View style={styles.IconParentView}>
                                <MaterialIcons name="navigate-next" size={32} style={styles.RightSideArrawIcon} />
                            </View> */}
                        </View>
                        <View style={styles.hr}></View>
                    </View>


                    {/* <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} /> */}


                </View>

            </ScrollView >
        );
        // }
        // else {
        //     return (
        //         <View></View>
        //     );
        // }
    }
}

const styles = StyleSheet.create({
    hr: {
        width: '85%',
        height: 0.4,
        backgroundColor: '#444',
        marginTop: 4,
        marginLeft: '5%'
    },
    ScrollViewContainer: {
        marginTop: 200,
    },
    sideMenuContainer: {

        width: '100%',
        height: '100%',
        backgroundColor: '#fff',  // white 
        // backgroundColor: 'yellow'
        // backgroundColor: '#f00',  // red 
        // backgroundColor: Constants.Colors.lightWhite,
        // alignItems: 'center',
        // marginTop: 200,



        // marginTop: 200,
        // backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: 'transparent'
        // display: "flex",
        //  : Dimensions.get("screen").height - 200,
    },

    column: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',

    },

    sideMenuProfileIcon:
    {
        borderColor: Constants.Colors.lightWhite,
        borderWidth: 4,
        marginBottom: 15,
        marginLeft: 10,
        width: 72,
        height: 72,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
    },

    //   sideMenuIcon:
    //   {
    //     resizeMode: 'center',
    //     width: 28,
    //     height: 28,
    //     marginRight: 10,
    //     marginLeft: 20

    //   },
    menuText: {

        fontSize: 12,
        fontWeight: "bold",
        color: '#222222',
        marginLeft: 30,
        width: '100%'

    },

    menuParentView: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        // alignItems: 'flex-start',
        // alignSelf:'flex-start',
        // justifyContent:'flex-start',
        marginTop: 10,

        marginLeft: '11%',

    },
    Root_Sliding_Drawer_Container:
    {
        position: 'absolute',
        flexDirection: 'row',
        left: 0,
        top: 0,
        //top: (Platform.OS == 'ios') ? 20 : 0,
        width: Sliding_Drawer_Width,
        height: '100%'
    },

    Main_Sliding_Drawer_Container:
    {
        flex: 1,
        backgroundColor: 'gray',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    IconParentView: {
        flexDirection: "row",
        alignItems: 'flex-end',
        marginRight: '24%'
    },
    RightSideArrawIcon: {
        color: 'black',
        marginLeft: '5%',
        fontWeight: "bold",
        flex: 0.3
    },
    bgImage: {
        // flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        // height: '30.4%',
        height: 205,
        // top: -10,
        justifyContent: 'center',
        // flexDirection: 'column'
    },
    navBarTitles: {
        color: Constants.Colors.yellowColor,
        fontSize: 13,
        fontWeight: "bold",
        paddingLeft: 16,
        // paddingTop: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoBadge: {
        top: 2,
        position: 'absolute',
        // width: 30,
        height: 28,
        // right: '2%', 
        left: 0,
        backgroundColor: 'white',
        borderRadius: 100
    }

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: Constants.Colors.yellowColor,
        borderRadius: 4,
        color: Constants.Colors.yellowColor,
        marginLeft: 10,
        marginRight: 10,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 2,
        borderColor: Constants.Colors.yellowColor,
        borderRadius: 8,
        color: Constants.Colors.yellowColor,
        paddingRight: 30, // to ensure the text is never behind the icon

    },
});

const maspStateToProps = state => {
    return {
        SelectedUser: state.reducerLogin.SelectedUser,
        UserType: state.reducerLogin.userType,
        UserObject: state.reducerLogin.userInfoObject,
        Name: state.reducerLogin.userInfoObject.Name,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        // onStudentChanged: (StdId) => dispatch(studentChanged(StdId)),
        // sendLogoutValue: (isLogout) => dispatch(setLogoutValue(isLogout))

    };
}

export default connect(maspStateToProps, null)(CustomSideMenu);