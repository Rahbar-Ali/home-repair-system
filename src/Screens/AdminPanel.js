import React, { Component } from 'react';
import { SafeAreaView, FlatList, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Alert, Linking, TouchableWithoutFeedback, Keyboard, TouchableHighlight } from 'react-native';
import { AsyncStorage } from 'react-native'

import bgImage from '../assets/images/background.png';
import loginBg from '../assets/images/loginBackground.jpg';
import bgImage12 from '../assets/images/background12.jpeg';
import logo from '../assets/images/RHA_logo.png';

import axios from 'axios';
import { TextInput, HelperText, withTheme, Theme } from 'react-native-paper';

import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { List, ListItem, Header, Right, Left, Form, Container, Input, Item, Button, Label, Row } from 'native-base';
import { connect } from 'react-redux';
import { login, forgotPassword, setForgotPassword, setOTPModal } from '../store/actions/index';

import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { getUserInfo, setUserInfo } from '../components/General/LoginUserInfo';
import ProgressBar from '../components/General/ProgressBar';
import { setLogoutValue } from '../../src/store/actions/index';

import Constants from '../utils/Constants';
// import * as Animatable from 'react-native-animatable';

// import { Dimensions } from 'Dimensions';

//Keyboard Avoiding View
import KeyboardAvoid from '../components/KeyboardAvoid/KeyboardAvoid';

//Styles From StylesDashboard
import {ScreenCartTextInlineExtraSec, ScreenCartTextInlineExtra,ScreenCartTextInlineViewFirst, ScreenCartTextInlineView, ContentCardTopServiesList, ScreenCartTextInlineMain, ScreenCartTextListMain, ContentCardAllServiesBottomListSec, ContentCardAllServiesBottomListIcon, ContentCardListServiceTextTocuh, ContentCardAllServiesBottomTouch, ContentCardAllServiesBottomList, ContentCardListServiceTextExtra, ContentCardListServiceText, ContentCardListServiceProfileText, ContentCardListServiceProfile, ContentCardListServiceMain, ContentCardAllServies, ContentCardAllServiesTop, ContentCardAllServiesBottom, CartLine, ScreenCartTextInline, ScreenCartTextList, ScreenCartText, ScreenCartMain, ScreenCart, ContentCardServiesflex, CenterText, Center, ServiceContentCardServies, ServiceFirstCardContent, ServiceCardContent, ServiceStyledCardContent, ServiceStyledCardContentImageView, ServiceStyledContentCardImage, ServiceStyledCardContentText, FirstCardContent, StyledCardContentText, StyledContentCardImage, StyledCardContentImageView, StyledCardContent, CardContent, ContentSliderImage, ContentSliderImageView, ContentCardTextExtra, ContentCardText, ContentCardImage, ContentCardImageView, ContentCardTopServies, ContentCardServies, ContentCardSlider, StyledCard, Card, LineExtra, SubTitleError, Line, BackImage, SubTitle, StyledFormArea, StyledContainer, StyledInnerContainer, PageImageLogo, PageText, Colors, StyledInputLabel, StyledTextInput, StyledButton, LeftIcon, RightIcon, ButtonText } from './../styles/stylesAdmin';

//Categories
import categories from '../assets/cate/categories';

import servicecate from '../assets/cate/servicecate';

import categtest from '../assets/cate/categtest';

import slider from '../assets/cate/slider';

//Drawer
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import HamburgerIcon from '../components/Navigation/HamburgerIcon';
import { createStackNavigator } from 'react-navigation-stack';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class CustomHeader extends Component {

    render() {
        return (
            <Header style={styles.headerstyle}>
                <Left>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Entypo name='list' size={30} color='white' />
                    </TouchableOpacity>
                </Left>
                <Center><CenterText>Admin Panel</CenterText></Center>
                <Right><Image source={require('../assets/images/logo1.png')}
                    style={{ height: 40, width: 40, borderRadius: 60 }}
                /></Right>
            </Header>
        );
    }
}
class OrderScreen extends Component {

    render() {
        return (
            <KeyboardAvoid>
                <StyledContainer>
                    <CustomHeader navigation={this.props.navigation} />
                    <StyledInnerContainer>
                        <ContentCardTopServies>
                            <ScreenCartMain>
                                <ScreenCart>
                                    <Image source={require('../assets/images/done.png')}
                                        style={styles.profileImageO}
                                    />
                                </ScreenCart>
                                <ScreenCartText>
                                    <ScreenCartTextInlineMain>
                                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>PLUMBER SERVICE </Text>
                                        <ScreenCartTextInlineExtraSec>
                                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Order: </Text>
                                        </ScreenCartTextInlineExtraSec>
                                    <ScreenCartTextInlineExtra style={{borderWidth: 2, borderColor: "#a33f0d",}}>
                                        <Text style={{color: '#a33f0d', fontSize: 16, }}>PLACED </Text>
                                    </ScreenCartTextInlineExtra>
                                    </ScreenCartTextInlineMain>
                                    <ContentCardTopServiesList>
                                    <ScreenCartTextInline>
                                        
                                    <ScreenCartTextInlineViewFirst >
                                        <ScreenCartTextList>
                                        <Entypo name="clipboard" color={"#fdbe61"} size={18} /> 
                                        </ScreenCartTextList>
                                        <View style={{marginLeft: 6, justifyContent: 'center'}}>
                                        <ScreenCartTextList>Scheduled: </ScreenCartTextList>
                                        </View>
                                        </ScreenCartTextInlineViewFirst>
                                        <ScreenCartTextInlineView style={{justifyContent: 'center'}}>
                                        <ScreenCartTextList >Known </ScreenCartTextList>
                                        </ScreenCartTextInlineView>
                                    </ScreenCartTextInline>
                                    <ScreenCartTextInline>
                                        
                                        <ScreenCartTextInlineViewFirst >
                                            <ScreenCartTextList>
                                            <Entypo name="price-tag" color={"#fdbe61"} size={18} /> 
                                            </ScreenCartTextList>
                                            <View style={{marginLeft: 6, justifyContent: 'center'}}>
                                            <ScreenCartTextList>Cost: </ScreenCartTextList>
                                            </View>
                                            </ScreenCartTextInlineViewFirst>
                                            <ScreenCartTextInlineView style={{justifyContent: 'center'}}>
                                            <ScreenCartTextList style={{color: '#a33f0d'}}>Known </ScreenCartTextList>
                                            </ScreenCartTextInlineView>
                                        </ScreenCartTextInline>
                                        <ScreenCartTextInline>
                                        
                                        <ScreenCartTextInlineViewFirst >
                                            <ScreenCartTextList>
                                            <Entypo name="thumbs-up" color={"#fdbe61"} size={18} /> 
                                            </ScreenCartTextList>
                                            <View style={{marginLeft: 6, justifyContent: 'center'}}>
                                            <ScreenCartTextList>Your Review: </ScreenCartTextList>
                                            </View>
                                            </ScreenCartTextInlineViewFirst>
                                            <ScreenCartTextInlineView style={{justifyContent: 'center'}}>
                                            <ScreenCartTextList >Known </ScreenCartTextList>
                                            </ScreenCartTextInlineView>
                                        </ScreenCartTextInline>
                                    </ContentCardTopServiesList>
                                </ScreenCartText>
                            </ScreenCartMain>
                        </ContentCardTopServies>
                    </StyledInnerContainer>
                </StyledContainer>
            </KeyboardAvoid >

        );
    }
}

class AdminPanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            username: '',
            password: '',
            MobileNo: '',
            OTPText: '',
            isLogoutValue: false,
            filterService: [],
            filterServicetest: []
        }
    }




    render() {

        const filterServicetest = this.state.filterServicetest;
        const filteredServicetest = index => {
            const currentServicetest =
                categtest.filter(item => item?.subtest?.toUpperCase() == categories[index].name,)[0]?.subservicestest;
            console.log(currentServicetest);
            this.setState({
                filterServicetest: currentServicetest
            });


        };


        //Categories Bar
        const ListCategories = () => {
            return (
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesListcontainer}>
                    {categories.map((item, index) => (
                        <View key={'subtest' + index}>
                            
                            </View>
                    ))}

                </ScrollView>
            )
        }


        //Slider Bar
        const ListSlider = () => {
            return (
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesListcontainer}>
                    {slider.map((category, index) => (
                        <ContentCardSlider key={index}>
                            <ContentSliderImageView>
                                <ContentSliderImage source={category.image} />
                            </ContentSliderImageView>
                        </ContentCardSlider>
                    ))}

                </ScrollView>
            )
        }

       

        return (
            <KeyboardAvoid>

                <StyledContainer>
                    <CustomHeader navigation={this.props.navigation} />
                    <StyledInnerContainer>
                        <View style={{  justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', }}>
                    <Card >
                                <StyledCard>
                                    <ContentCardImageView>
                                        <ContentCardImage source={require('../assets/images/worker-show.png')} />
                                    </ContentCardImageView>
                                    <ContentCardText>SHOW WORKERS</ContentCardText>
                                </StyledCard>
                            </Card>
                            <Card >
                                <StyledCard>
                                    <ContentCardImageView>
                                        <ContentCardImage source={require('../assets/images/user-show.png')} />
                                    </ContentCardImageView>
                                    <ContentCardText>SHOW USERS</ContentCardText>
                                </StyledCard>
                    </Card>

                    <Card >
                                <StyledCard>
                                    <ContentCardImageView>
                                        <ContentCardImage source={require('../assets/images/worker-delete.png')} />
                                    </ContentCardImageView>
                                    <ContentCardText>DELETE WORKERS</ContentCardText>
                                </StyledCard>
                            </Card>
                            <Card >
                                <StyledCard>
                                    <ContentCardImageView>
                                        <ContentCardImage source={require('../assets/images/user-delete.png')} />
                                    </ContentCardImageView>
                                    <ContentCardText>DELETE USERS</ContentCardText>
                                </StyledCard>
                    </Card>
                    <Card >
                                <StyledCard>
                                    <ContentCardImageView>
                                        <ContentCardImage source={require('../assets/images/admin-done.png')} />
                                    </ContentCardImageView>
                                    <ContentCardText>SHOW ORDERS</ContentCardText>
                                </StyledCard>
                    </Card>
                    </View>
                    </StyledInnerContainer>
                </StyledContainer>
            </KeyboardAvoid >

        );
    }
}

class SideMenu extends Component {

    render() {
        return (
            <View >
                <Image source={require('../assets/images/NavBarImg.jpg')}
                    style={styles.profileImageR}
                />
                <View style={styles.drawerHeader}>

                    <Image source={require('../assets/images/logo1.png')}
                        style={styles.profileImage}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Rahbar Ali</Text>
                        <View style={styles.row_space}>
                            <Text style={styles.description}>I am a:</Text>
                            <View style={{ height: 28, borderRadius: 30, paddingHorizontal: 8, alignItems: 'center', flexDirection: 'row' }}>
                                <Entypo name="user" color={"black"} size={18} />
                                <Text style={{ color: "black" }}> USER</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <List>
                        <ListItem>
                            <TouchableOpacity style={{ height: 28, alignItems: 'center', flexDirection: 'row' }}>
                                <Entypo name="home" color={"black"} size={18} />
                                <Text style={{ color: "black" }}> HOME </Text>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity style={{ height: 28, alignItems: 'center', flexDirection: 'row' }}>
                                <Entypo name="grid" color={"black"} size={18} />
                                <Text style={{ color: "black" }}> SERVICES </Text>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity style={{ height: 28, alignItems: 'center', flexDirection: 'row' }}>
                                <Entypo name="credit-card" color={"black"} size={18} />
                                <Text style={{ color: "black" }}> ORDERS </Text>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity style={{ height: 28, alignItems: 'center', flexDirection: 'row' }}>
                                <Entypo name="cog" color={"black"} size={18} />
                                <Text style={{ color: "black" }}> SETTING </Text>
                            </TouchableOpacity>
                        </ListItem>
                    </List>
                </ScrollView>
            </View>
        );
    }
}
const resizeMode = 'center';

const styles = StyleSheet.create({
    headerstyle: {
        backgroundColor: '#176ba7',
    },
    listSetting: {
        marginTop: 10,
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoriesListcontainer: {
        //backgroundColor: 'red',
        marginLeft: 7,
    },
    innerContainer: {
        flex: 1,
        position: 'relative',
    },
    inputItem: {
        margin: 10,
        borderBottomWidth: 2,
        borderBottomColor: Constants.Colors.headerBackColor,
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 220,
        // backgroundColor: "red",
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    btnContainer: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        marginTop: 20
    },
    btnItem: {
        width: '50%' // is 50% of container width
    },
    inputContainer: {
        // borderBottomColor: '#F5FCFF',
        // backgroundColor: '#FFFFFF',
        // borderRadius: 30,
        // borderBottomWidth: 1,
        // width: 300,
        // height: 45,
        marginBottom: 10,
        // flexDirection: 'row',
        // alignItems: 'center',
        width: '90%',

        // shadowColor: "#808080",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        elevation: 2,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize: 16,
    },
    inputIcon: {
        paddingRight: 15,
        color: Constants.Colors.headerBackColor
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
        // marginLeft: '7%',

        // width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    SignInText: {
        color: 'blue',
        fontSize: 18,
        // paddingRight: 2,
        fontWeight: 'bold',
        marginTop: 4
        // marginBottom: 20,
    },
    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        // backgroundColor: '#1F618D', //"#00b5ec",
        backgroundColor: Constants.Colors.yellowThemeColor,
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
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',

        position: 'absolute',
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    },
    bigCircle: {
        width: Dimensions.get('window').height * 0.7,
        height: Dimensions.get('window').height * 0.7,
        //   backgroundColor: '#ff6b81',
        backgroundColor: '#1F618D',
        borderRadius: 1000,
        position: 'absolute',
        right: Dimensions.get('window').width * 0.25,
        top: -50,
    },
    smallCircle: {
        width: Dimensions.get('window').height * 0.4,
        height: Dimensions.get('window').height * 0.4,
        //   backgroundColor: '#ff7979',
        backgroundColor: '#1F618D',
        borderRadius: 1000,
        position: 'absolute',
        bottom: Dimensions.get('window').width * -0.2,
        right: Dimensions.get('window').width * -0.3,
    },
    centerizedView: {
        //   width: '100%',
        //   top: '20%',
        // top: Dimensions.get('window').width - 100
        flex: 1,
        flexDirection: 'column',

    },
    authBox: {
        width: '80%',
        backgroundColor: '#fafafa',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoBox: {
        width: 100,
        height: 100,
        //   backgroundColor: '#eb4d4b', // red 
        backgroundColor: '#f2eded',
        borderRadius: 1000,
        borderColor: 'black',
        borderWidth: 0.3,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: -50,
        marginBottom: -50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    logo: {
        // flex: 1,
        resizeMode: 'contain',
        // position: 'absolute',
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
    },
    loginTitleText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
    },
    hr: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#444',
        marginTop: 6,
    },
    inputBox: {
        marginTop: 10,
    },
    cardStyle: {
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    drawerNavigator: {
        width: 290,
        backgroundColor: 'transparent',
        // backgroundColor: Colors.accent,
    },
    absolute: {
        flex: 1,
        height: '100%',
    },
    icon: {
        paddingBottom: 2,
    },
    drawerHeader: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "black",
    },
    profileImageO: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 5,
        marginTop: 22,
        marginLeft: 6,
    },
    profileImageR: {
        width: "100%",
        height: 200,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    textContainer: {
    },
    title: {
        color: Colors.accent,
        fontSize: 22,
        fontWeight: '500',
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    description: {
        color: Colors.accent,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 8
    },
    blurAbsolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    row_space: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});


const mapStateToProp = state => {
    return {
        appVersionModalVisible: state.reducerLogin.appVersionModalVisible,
        AppVersionInfo: state.reducerLogin.AppVersionInfo,
        forgotPasswordModalVisible: state.reducerLogin.forgotPasswordModalVisible,
        OTPVisible: state.reducerLogin.OTPVisible,
        LoginInfo: state.reducerLogin.LoginInfo,
        // islogout: state.reducerLogin.islogout,
    };
};


const mapsDispatchToProps = dispatch => {
    return {
        OnLogin: (username, password, PlayerId, propsNavigate) => dispatch(login(username, password, PlayerId, propsNavigate)),
        OnForgotPassword: (MobileNo) => dispatch(forgotPassword(MobileNo)),
        OnSetForgotPassword: (forgotPasswordModalVisible) => dispatch(setForgotPassword(forgotPasswordModalVisible)),
        OnSetOTPModal: (OTPModalVisible) => dispatch(setOTPModal(OTPModalVisible)),
        sendLogoutValue: (isLogout) => dispatch(setLogoutValue(isLogout))
    };
}

const navOptionHandler = (navigation) => ({
    header: null
})



// const MyDrawerNavigator = createDrawerNavigator({
//     Home: {
//         screen: Dashboard,
//     },
//     Service: {
//         screen: ServiceScreen,
//     },
//     Order: {
//         screen: OrderScreen,
//     },
//     Setting: {
//         screen: SettingScreen,
//     },
// });


const MainTabs = createBottomTabNavigator(
    {
        Home: {
            screen: AdminPanel,
            navigationOptions: {
                tabBarLabel: 'HOME',
                tabBarIcon: ({ tintColor }) => (
                    <Entypo name="home" color={tintColor} size={24} />
                )
            }
        },
        
        Order: {
            screen: OrderScreen,
            navigationOptions: {

                tabBarLabel: 'ORDER',
                tabBarIcon: ({ tintColor }) => (
                    <Entypo name="credit-card" color={tintColor} size={24} />
                )
            }
        },
        
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {

            activeTintColor: '#176ba7',
            inactiveTintColor: '#fdbe61',
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
            },
            style: {
                height: 50,
                backgroundColor: 'white',
            },
        },
    },
);

const MainStack = createStackNavigator({
    Home: {
        screen: MainTabs,
        navigationOptions: navOptionHandler
    },
    Order: {
        screen: OrderScreen,
        navigationOptions: navOptionHandler
    }
}, { initialRouteName: 'Home' })

const appDrawer = createDrawerNavigator(
    {
        drawer: MainStack
    },
    {
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width * 3 / 4
    }
)
export default createAppContainer(appDrawer);