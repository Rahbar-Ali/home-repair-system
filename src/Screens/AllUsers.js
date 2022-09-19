// import { View } from 'native-base';
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button, ScrollView, ActivityIndicator, TouchableHighlight, Image, MenuItem, MenuDivider, FlatList, UIManager, findNodeHandle, Linking, TouchableWithoutFeedback, Dimensions } from 'react-native';
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
// import { Provider } from 'react-native-paper';

const optionIcon = (<Icon name='more-vert' size={30} color={'black'} />)
const agentIcon = (<Octicons name="person" size={18} color="#000000" />)

class AllUsers extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        listOfAllUsers: [],
        listOfAllAgents: [],
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
        this.onRefresh();
        // this.getUserInfoList();
        console.log("conponent runs");
    }  // end of componentDidMount

    onRefresh = () => {
        console.log('OnRefreshing start');
        // this.setState({ listOfAllUsers: [ ], arrayNew: [ ] });
        this.setState({ refreshing: true });
        this.getUserInfoList();

        this.setState({ refreshing: false });
        console.log('OnRefreshing Stop');
    };

    getUserInfoList = () => {
        // this.setState({ loading : true });
        this.setState({ listOfAllUsers: [] })
        let url = GLOABAL_PATH.API_URL + Constants.ApiController.Login + Constants.ApiActionLogin.GetAllUsersList;

        axios({
            url: url,
            method: "GET",
            // data: Obj
        })
            .then(res => {
                console.log("User List Data =====================>" + JSON.stringify(res.data.UserList));
                if (!res.data.UserList.length) {
                    console.log("If Runnn========");
                    this.setState({
                        // listOfAllUsers,
                        loading: false
                    });
                }
                else {
                    const listOfAllUsers = res.data.UserList;
                    this.setState({
                        listOfAllUsers,
                        loading: false
                    });
                    // this.onRefresh();
                }
                
            })// end of UserList Axios
            
            
    } // end of getUserInfoList



    SendItem = (item) => {
        this.props.navigation.navigate("ShowUserLocation", {
            id: item.Id,
            username: item.Username,
            lat: item.LatitutePosition,
            long: item.LongitutePosition,
            dateTime: item.CreatedDate,
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
    makeAgentFunction = () => {
        // console.log(this.state.onSelectOptionMenu);
        let LoginId = { Id: this.state.onSelectOptionMenu };

        this.setState({ loading: true });

        let url = GLOABAL_PATH.API_URL + Constants.ApiController.Login + Constants.ApiActionLogin.MakeAgent;

        axios({
            url: url,
            method: "POST",
            data: LoginId,
        })
            .then(res => {
                // console.log("ITem NO: "+this.state.onSelectOptionMenu);
                // console.log('RESP : ' + JSON.stringify(res));
                this.onRefresh();
                this.setState({
                    loading: false
                });
                // console.log("Make agent Done");

            })
            .catch((err) => {
                alert(err);
                // console.log('ERROR ' + err);
                this.setState({
                    loading: false

                });
            }); // end of UserList Axios
            
        } // end of makeAgentFunction

    modalOpen = () => {
        // console.log("Array New "+JSON.stringify(this.state.arrayNew));
        this.setState({ isVisible: true });
        // console.log(this.state.onSelectOptionMenu);
    }
    modalCloseButton = () => {
        if (this.state.agentDropDownSelectedItem === '') {
            this.setState({ isVisible: false });
        }
        else {
            this.props.sendUserQueryAssign(this.state.onSelectOptionMenu, this.state.agentDropDownSelectedItem.Id, Constants.DisMsg.Assigned, this.props.navigation);
            this.ReloadList();
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
        // console.log("Cancel pressed");
        this.props.CancelledAgentStauts(this.state.onSelectOptionMenu, Constants.DisMsg.Cancelled, this.props.navigation);
        this.ReloadList();
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
                            <Text style={{ fontSize: 18, color: '#00517b', fontWeight: 'bold' }}>ALL USERS</Text>
                        </View>
                    </View>
                </View>
                {/*  Header Bar End */}


                {/* <Image style={styles.bgImage} source={bgImage} /> */}
                {!!this.state.listOfAllUsers &&
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                        }>
                        <View>
                            {this.state.listOfAllUsers != 0 ? this.state.listOfAllUsers.map((item, index) => {
                                return (

                                    <ListItem
                                        key={item.id}
                                        style={styles.container}
                                    // onPress={() => this.SendItem(item)}
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
                                                <Text style={styles.heading}>Email: </Text>
                                                <Text style={styles.normalText}>{item.Email.length < 15 ? `${item.Email}` : `${item.Email.substring(0, 13)}...`}</Text>
                                            </View>

                                            {/* <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Comments: </Text>
                                                <Text numberOfLines={1} style={styles.normalText}>
                                                    {item.Comments.length < 14 ? `${item.Comments}` : `${item.Comments.substring(0, 14)}...`}
                                                </Text>
                                            </View> */}

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>DateTime: </Text>
                                                <Text style={styles.normalText}>
                                                    {item.CreatedDate.length < 14 ? `${moment(item.CreatedDate).format("LLL")}` : `${moment(item.CreatedDate).format("LLL").substring(0, 14)}...`}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Status: Active </Text>
                                                {/* <Text style={styles.normalText}>{item.AgentStatus}</Text> */}
                                            </View>

                                        </ListItem.Content>
                                        <RefreshControl>

                                        </RefreshControl>
                                        <Right>
                                            <View onTouchStart={() => this.setState({ onSelectOptionMenu: item.Id })}>
                                                <OptionsMenu customButton={optionIcon} buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                                                    // destructiveIndex={1}             // only for IOS
                                                    options={["Make Agent", "Cancel"]}
                                                    actions={[this.makeAgentFunction]}
                                                />
                                            </View>

                                        </Right>
                                    </ListItem>
                                )

                            }) : <Text style={{ fontSize: 18 , textAlign: 'center' , marginTop: '8%' }}>No Record Found</Text> }

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
                                <DropDownPicker
                                    items={this.state.arrayNew}
                                    // defaultValue="Select Agent"
                                    containerStyle={{ height: '40%', marginTop: '4%', marginRight: '1%', marginLeft: '1%' }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeItem={item => this.setState({ agentDropDownSelectedItem: item })}
                                />
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

        backgroundColor: '#fff',
        flex: 1,
        // padding: 4,
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 4
    },
    container: {
        marginTop: 4,
        marginBottom: 3,
        // backgroundColor: 'red',
        // backgroundColor: '#ff0000',

        marginLeft: 7,
        marginRight: 7,

        borderRadius: 2,
        borderWidth: 0.1,

        // shadowColor: "#000",
        // shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

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

    }
})
const mapStateToProps = state => {
    return {
        latiRedux: state.reducerMap.latitude,
        longRedux: state.reducerMap.longitude,
        UserType: state.reducerLogin.userType,
    };
};
const mapsDispatchToProps = dispatch => {
    return {
        sendUserQueryAssign: (userQueryId, agentId, status, propsNavigate) => dispatch(sendUserQueryAssign(userQueryId, agentId, status, propsNavigate)),
        CancelledAgentStauts: (userQueryId, status, propsNavigate) => dispatch(CancelledAgentStauts(userQueryId, status, propsNavigate)),
    };
}
export default connect(null, mapsDispatchToProps)(AllUsers);