// import { View } from 'native-base';
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button, ScrollView, ActivityIndicator, TouchableHighlight, Image, MenuItem, MenuDivider, FlatList, UIManager, findNodeHandle, Linking, TouchableWithoutFeedback, Dimensions, TextInput } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import GLOABAL_PATH from '../utils/GlobalPath';
import Constants from '../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OptionsMenu from "react-native-option-menu";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from "react-native-responsive-dimensions";

import IconEntypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import moment from "moment";

import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { Right, Left, Form, Container, Input, Item, Label, Picker, Title } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import IconF from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import { sendUserQueryAssign, CancelledAgentStauts } from '../store/actions/actionLogin';
import { ListItem, List, Avatar } from 'react-native-elements';
import { RefreshControl } from 'react-native';
import bgImage from '../assets/images/backgroundLogo.png';
import GlobalPath from '../utils/GlobalPath';
// import { Provider } from 'react-native-paper';

const optionIcon = (<Icon name='more-vert' size={30} color={'black'} />)
const agentIcon = (<Octicons name="person" size={18} color="#000000" />)

class AllUsersQueryForAgent extends Component {
    constructor(props) {
        super(props);
        // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }
    state = {
        AllAssignedUsers: [],
        loading: true,
        icon: null,
        visible: false,
        _menu: null,
        isVisible: false,
        // country: 'uk',
        onSelectOptionMenu: '',
        arrayNew: [],
        agentDropDownSelectedItem: '',
        image: '23',
        refreshing: false,
        

    }
    componentDidMount() {
        this.GetAllUserQueryForAgentsOnly();

    }  // end of componentDidMount

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.GetAllUserQueryForAgentsOnly();
        this.setState({ refreshing: false });
    };

    // ReloadList = () => {
    // this.setState({ loading: true });
    // this.getUserInfoList();
    // this.getAllAgentList();
    // this.render();
    // this.setState({ loading: false });
    // }



    GetAllUserQueryForAgentsOnly = () => {
        this.setState({ loading: true });
        this.setState({ AllAssignedUsers: [] })
        let url = GLOABAL_PATH.API_URL + Constants.ApiController.Login + Constants.ApiActionLogin.GetAllUserQueryForAgentsOnly;

        axios({
            url: url,
            method: "GET",
            // data: Obj
        })
            .then(res => {
                console.log("OnlY Assigned data =====================>" + JSON.stringify(res.data.UserList));
                const AllAssignedUsers = res.data.UserList;
                this.setState({
                    AllAssignedUsers,
                    loading: false
                });
            })// end of UserList Axios
            
    } // end of getUserInfoList

    



    SendItem = (item) => {
        this.props.navigation.navigate("UserPayment", {
            Login_Id: item.LoginId,
            // username: item.Username,
            // lat: item.LatitutePosition,
            // long: item.LongitutePosition,
            // dateTime: item.CreatedDate,
        });
        // console.log(item.CreatedDate);
    } // end of SendItem

    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
            //   Linking.openURL(`tel:${item.MobileNo}`)
        }
        else {
            phoneNumber = 'telprompt:${1234567890}';
        }

        Linking.openURL(phoneNumber);
    };
    modalOpen = () => {
        // console.log("Array New "+JSON.stringify(this.state.arrayNew));
        this.setState({ isVisible: true });
        console.log(this.state.onSelectOptionMenu);
    }
    modalCloseButton = () => {
        if (this.state.amount === '') {
            this.setState({ isVisible: false });
        }
        else {
            this.SendPaymentAndCommentsAndLoginId();
            this.setState({ isVisible: false });

            // this.setState({ isVisible: true });
            // this.getUserInfoList();
            // this.forceUpdateHandler();
            // this.ReloadList();

        }
    }
    onCancel = () => {
        // alert('pressed');
        // this.setState({ loading: true });
        console.log("Cancel pressed");
        this.props.CancelledAgentStauts(this.state.onSelectOptionMenu, Constants.DisMsg.Cancelled, this.props.navigation);
        // this.ReloadList();
        // this.forceUpdateHandler();
        // this.setState({ loading: false });
    }
    renderAllUserQuery = () => {
        // console.log('=============================================> Render ======= runs');
        return (


            <View style={styles.backgroundOfApp}>
                {/*  Header Bar Start */}
                <View style={{ flexDirection: 'row', height: 55, backgroundColor: Constants.Colors.whiteColor, shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24 }}>
                    <TouchableOpacity style={{ width: 45, paddingLeft: 20, justifyContent: 'center' }}
                        onPress={() => this.props.navigation.openDrawer()}>
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
                            <Text style={{ fontSize: 18, color: '#00517b', fontWeight: 'bold' }}>USER QUERY</Text>
                        </View>
                    </View>
                </View>
                {/*  Header Bar End */}


                {/* <Image style={styles.bgImage} source={bgImage} /> */}
                {!!this.state.AllAssignedUsers &&
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                        }>
                        <View>
                            {this.state.AllAssignedUsers.map((item, index) => {
                                return (

                                    <ListItem
                                        key={item.id}
                                        style={styles.container}
                                        onPress={() => this.SendItem(item)}
                                    // bottomDivider
                                    >

                                        <Avatar
                                            // style={[styles.profileImgContainer,styles.profileImg, { borderColor: 'green', borderWidth: 1 }]}
                                            style={{
                                                // width: 50, height: 50,
                                                // borderRadius: 40,

                                                borderColor: Constants.Colors.lightWhite,
                                                borderWidth: 2,

                                                width: 60,
                                                height: 90,
                                                // justifyContent: 'center',
                                                // alignItems: 'center',
                                                padding: 2,
                                                borderRadius: 100,
                                                backgroundColor: 'blue'
                                            }}
                                            rounded
                                            title= {moment(item.CreatedDate).format("MMM Do YY")}
                                            // source={{ uri: "https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }}
                                        />
                                        {/* <leftAvatar source={{title: 'MD'}} /> */}
                                        <ListItem.Content>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Name: </Text>
                                                <Text style={styles.normalText}>{item.Name.length < 15 ? `${item.Name}` : `${item.Name.substring(0, 15)}...`}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Mobile No: </Text>
                                                <Text style={styles.normalText}>{item.MobileNo}</Text>
                                                <TouchableOpacity style={styles.IconText} onPress={() => this.dialCall(item.MobileNo)} activeOpacity={0.7}>
                                                    <IconEntypo name="phone" size={responsiveScreenFontSize(2.1)} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Category: </Text>
                                                <Text style={styles.normalText}>{item.Category}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Comments: </Text>
                                                <Text numberOfLines={1} style={styles.normalText}>
                                                    {item.Comments.length < 14 ? `${item.Comments}` : `${item.Comments.substring(0, 14)}...`}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>DateTime: </Text>
                                                <Text style={styles.normalText}>
                                                    {/* {item.CreatedDate.length < 14 ? `${item.CreatedDate}` : `${item.CreatedDate.substring(0, 14)}...`} */}
                                                    {item.CreatedDate.length < 14 ? `${moment(item.CreatedDate).format("LLL")}` : `${moment(item.CreatedDate).format("LLL").substring(0, 14)}...`}
                                                    
                                                    </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Status: </Text>
                                                {item.AgentStatus === 'Assigned' ? <View style={styles.statusActive}>
                                                    <Text style={styles.StautsText}>{item.AgentStatus}</Text>
                                                </View> : <View style={styles.statusCancelled}>
                                                    <Text style={styles.StautsText}>{item.AgentStatus}</Text>
                                                </View>}

                                            </View>

                                        </ListItem.Content>
                                        <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                        >
                                            
                                        </RefreshControl>
                                        <Right>
                                            <View onTouchStart={() => this.setState({ onSelectOptionMenu: item.LoginId })}>
                                                <OptionsMenu customButton={optionIcon} buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                                                    // destructiveIndex={1}             // only for IOS
                                                    options={["ADD PAYMENT", "Cancel"]}
                                                    actions={[() => this.SendItem(item)]}
                                                />
                                            </View>

                                        </Right>
                                    </ListItem>
                                )

                            })}

                            {/* {this.state.listOqfAllUsers.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    // style = {styles.container}
                                    onPress={() => this.SendItem(item)}>
                                    <View style={styles.container}>
                                        <TouchableHighlight
                                            style={[styles.profileImgContainer, { borderColor: 'green', borderWidth: 1 }]}>
                                            <Image  
                                            source={{ uri: "https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }}
                                                // title={'MD'}
                                                style={styles.profileImg} />
                                        </TouchableHighlight>
                                        <View>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.heading}>Name: </Text>
                                                <Text style={styles.normalText}>{item.Name.length < 20 ? `${item.Name}` : `${item.Name.substring(0, 20)}...`}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.heading}>Mobile No: </Text>
                                                <Text style={styles.normalText}>{item.MobileNo}</Text>
                                                <TouchableOpacity style={styles.IconText} onPress={() => this.dialCall(item.MobileNo)} activeOpacity={0.7}>
                                                    <IconEntypo name="phone" size={responsiveScreenFontSize(2.2)} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.heading}>Category: </Text>
                                                <Text style={styles.normalText}>{item.Category}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.heading}>Comments: </Text>
                                                <Text numberOfLines={1} style={styles.normalText}>
                                                    {item.Comments.length < 20 ? `${item.Comments}` : `${item.Comments.substring(0, 20)}...`}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.heading}>DateTime: </Text>
                                                <Text style={styles.normalText}>{item.CreatedDate.length < 20 ? `${item.CreatedDate}` : `${item.CreatedDate.substring(0, 20)}...`}</Text>
                                            </View>
                                            
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.heading}>Status: </Text>
                                                <Text style={styles.normalText}> none</Text>
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }} onTouchStart={() => this.sendAgent(item.Id)}>
                                            <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: 2 }}>
                                                <OptionsMenu customButton={optionIcon} buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                                                    // destructiveIndex={1}             // only for IOS
                                                    options={["Assign To User Agent", "Cancel"]} 
                                                    actions={[this.modalOpen,this.onCancel]}
                                                    
                                                /></TouchableOpacity></View>
                                    </View>
                                </TouchableOpacity>))} */}
                        </View>

                        {/* Agent Modal */}

                        <Modal visible={this.state.isVisible}
                            // style={{ marginLeft: '2%',marginRight: '2%', }}
                            modalTitle={<ModalTitle title='Select Agent' textStyle={{ color: Constants.Colors.headerBackColor, fontWeight: 'bold' }} />}
                            maxHeight={200}
                            // maxHeight={Dimensions.Height - 20}
                            width={0.9}
                            footer={
                                <ModalFooter style={{ height: 40, marginTop: 50 }}>
                                    <Right>
                                        <View style={{ paddingRight: 20, paddingTop: 6 }}>
                                            <ModalButton text="Close" onPress={this.modalCloseButton} />
                                        </View>
                                    </Right>
                                </ModalFooter>
                            }
                            modalAnimation={new SlideAnimation({
                                slideFrom: 'left',
                            })}
                            onTouchOutside={() => this.ModalOutsiderClickHandler}>
                            <ModalContent>
                                <View style={styles.btnContainer}>
                                    <View style={styles.inputContainer}>
                                        <TextInput style={[styles.inputComments, { height: 100, paddingVertical: 10, textAlignVertical: 'top' }]} multiline={true} placeholder={'Amount'}
                                            value={this.state.amount}
                                            onChangeText={(amount) => this.setState({ amount })}
                                        />
                                    </View>
                                </View>
                                <View style={styles.btnContainer}>
                                    <View style={styles.inputContainer}>
                                        <TextInput style={[styles.inputComments, { height: 100, paddingVertical: 10, textAlignVertical: 'top' }]} multiline={true} placeholder={'comments'}
                                            value={this.state.comments}
                                            onChangeText={(comments) => this.setState({ comments })}
                                        />
                                    </View>
                                </View>
                            </ModalContent>
                        </Modal>
                    </ScrollView>
                }
            </View>
        );
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.spinnerView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                this.renderAllUserQuery()
            )
        }
    }
}
const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    backgroundOfApp: {
        // backgroundColor: '#e3e3e3',

        backgroundColor: Constants.Colors.lightGray,
        flex: 1,
        // padding: 4,
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 4
    },
    container: {
        marginTop: 4,
        marginBottom: 3,
        // backgroundColor: '#ffffff',
        backgroundColor: '#ff0000',

        marginLeft: 7,
        marginRight: 7,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: '#fff',
        // flexDirection: 'row',
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        // backgroundColor: "#000000a0",

        // backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    text: {
        color: '#030000',
        fontSize: 11,
    },
    dateTime: {
        color: '#030000',
        fontSize: responsiveScreenFontSize(1), // 2% of total screen size
        // textAlign: 'right'
    },
    heading: {
        fontSize: responsiveScreenFontSize(1.6), // 1.6% of total screen size
        fontWeight: "bold",
    },
    normalText: {
        fontSize: responsiveScreenFontSize(1.6), // 1.6% of total screen size
        color: '#000000',
        // color: '#c72104'        
    },
    StautsText: {
        fontSize: responsiveScreenFontSize(1.6), // 1.6% of total screen size
        color: '#fff',
        // color: Constants.Colors.appThemeColor
    },
    IconText: {
        // position: 'relative',
        // right: 8,
        marginLeft: '15%'

    },
    spinnerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImgContainer: {
        marginLeft: 2,
        // margin: 10,
        marginRight: 12,
        marginTop: 15,
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    dateTimeAndCategory: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center'
    },
    categoryText: {

    },
    bgImage: {
        // flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '27%',
        // top: -10,
        justifyContent: 'center',
        // flexDirection: 'column'
    },
    statusActive: {
        marginLeft: 4,
        backgroundColor: '#63cf5d',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 2,
        paddingTop: 2,
        borderRadius: 35

    },
    statusCancelled: {
        marginLeft: 4,
        backgroundColor: '#ed1c24',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 2,
        paddingTop: 2,
        borderRadius: 35
    },
    btnContainer: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        marginTop: 20
    },
    inputContainer: {
        // borderBottomColor: '#F5FCFF',
        // backgroundColor: '#FFFFFF',
        // borderRadius: 30,
        // borderBottomWidth: 1,
        // width: 300,
        // height: 45,
        // marginBottom: 20,
        // flexDirection: 'row',
        // alignItems: 'center',
        width: '100%',
        // marginLeft: '5%',

        // shadowColor: "#808080",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        elevation: 2,
    },
    btnContainer: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        marginTop: 20
    },
    inputComments: {
        width: '100%',
        height: 44,
        // backgroundColor: '#f1f3f6',
        backgroundColor: Constants.Colors.lightWhite,
        borderRadius: 5,
        // paddingHorizontal: 10,
        // borderColor: 'blue',
        // borderColor: Constants.Colors.appThemeColor,
        borderColor: 'orange',
        borderWidth: 2
    }
})
const mapStateToProps = state => {
    return {
        // latiRedux: state.reducerMap.latitude,
        // longRedux: state.reducerMap.longitude,
        UserType: state.reducerLogin.userType,
    };
};
const mapsDispatchToProps = dispatch => {
    return {
        sendUserQueryAssign: (userQueryId, agentId, status, propsNavigate) => dispatch(sendUserQueryAssign(userQueryId, agentId, status, propsNavigate)),
        CancelledAgentStauts: (userQueryId, status, propsNavigate) => dispatch(CancelledAgentStauts(userQueryId, status, propsNavigate)),
    };
}
export default connect(mapStateToProps, mapsDispatchToProps)(AllUsersQueryForAgent);