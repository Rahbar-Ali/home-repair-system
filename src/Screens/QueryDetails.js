import React, { Component } from 'react';
import { Button, View, Text, ActivityIndicator, StyleSheet, Dimensions, Image, BackHandler, TouchableOpacity, FlatList, ScrollView, NativeModules, ImageBackground, TouchableHighlight, Modal, SafeAreaView, TextInput } from 'react-native';
import { connect } from 'react-redux';

// import { setLocation } from '../store/actions/index';
// import bgImage from '../assets/images/background.png';

import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";

// import {} from '../store/reducers/reducerMap';
// import { login, forgotPassword, setForgotPassword, setOTPModal } from '../store/actions/index';

import GLOABAL_PATH from '../utils/GlobalPath';
import Constants from '../utils/Constants';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


import { getUserInfo } from '../components/General/LoginUserInfo';
import { sendLocation, setLocation } from '../store/actions/index';
import { Container } from 'native-base';

import * as Animatable from 'react-native-animatable';

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { createDrawerNavigator, DrawerRouter } from 'react-navigation-drawer';

// import { TextInput } from 'react-native-paper';

var formData = new FormData();
let maxIndex = 0;
class QueryDetails extends Component {

    SendFilesButtonBounceRef = ref => this.view = ref;

    // RegisterSwingRef = ref2 => this.TouchableOpacity  = ref2;
    // ForgetPasswordRubberBandRef = ref => this.TouchableHighlight = ref;

    SendFilesButtonBounce = () => this.view.swing(800).then(endState => console.log(endState.finished ? 'sds' : 'Swing cancelled'));
    // RegisterSwing = () => this.TouchableOpacity.swing(800).then(endState2 => console.log(endState2.finished ? this.onClickRegister() : 'bounce cancelled'));
    // ForgetPasswordBubber = () => this.TouchableHighlight.rubberBand(800).then(endState3 => console.log(endState3.finished ? this.onClickListener('forgot') : 'rubberBand cancelled'));




    constructor(props) {
        super(props);
        this.state = {
            comments: '',
            image: '',
            myImages: [],
            loginId: 0,
            isVisible: false,
            deleteImageKey: '',
            imageKey: '',
            // doc:[],
        };
    }
    componentWillMount() {
        // BackHandler.addEventListener('hardwarBackPress', () => this.props.navigation.navigate('Map') );
        getUserInfo().then((response) => { // get Mobile No: From Async Storage
            var UserInfo = response.UserInfo;
            this.setState({ loginId: UserInfo.loginId });
            // console.log('LoginId :'+this.state.loginId)
        }).catch((error) => { });  // end of getUserInfo
        // console.log("Lat :" + this.props.latiRedux);
        // console.log("Long :" + this.props.longRedux);
        // console.log("Long :" + this.props.loginId);
    }// end of componentWillMount

    imagesFromGallery = () => {

        // var formData = new FormData();
        // var file = this.state.ImageData;//this is image data

        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
        }).then(image => {
            let lstImages = this.state.myImages;
            if (lstImages.length > 0) {
                maxIndex = lstImages[lstImages.length - 1].key;
                maxIndex = maxIndex + 2;
            }
            image.map((i, index) => {
                // console.log('received image: ', i);
                // maxIndex= index;

                var photo = {
                    uri: i.path,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                };
                let Obj = {
                    ImageDetail: i,
                    ImageData: photo,
                    ImagePath: { uri: i.path },
                    key: maxIndex + index,
                }
                lstImages.push(Obj);
            });
            this.setState({ myImages: lstImages });
            this.RBSheet.close();
        }).catch(error => {
            console.log(error);
        });
    } // end of imageFromGallery
    imageFromCamera = () => {
        ImagePicker.openCamera({
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            cropping: true,
        }).then(image => {
            let lstImages = this.state.myImages;
            // let maxIndex = 0;
            if (lstImages.length > 0) {
                maxIndex = lstImages[lstImages.length - 1].key;
                maxIndex = maxIndex + 2;
            }
            // image.map((i,index) => {
            var photo = {
                uri: image.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            };
            let Obj = {
                ImageDetail: image,
                ImageData: photo,
                ImagePath: { uri: image.path },
                key: maxIndex + 1,
            }
            lstImages.push(Obj);
            // });
            this.setState({ myImages: lstImages });
            // image.map(i => {
            //     var photo = {
            //         uri: i.path,
            //         type: 'image/jpeg',
            //         name: 'photo.jpg',
            //     };
            //     formData.append("image", photo);
            // });

            // let url = GLOABAL_PATH.API_URL + Constants.ApiController.CustomerDetails + Constants.ApiActionLogin.UploadImages;

            // axios({
            //     url: url,
            //     method: "POST",
            //     data: formData
            // })
            //     .then((resp) => {
            //         // this.SaveActivity(resp.data, Ids);
            //         console.log('RESP : ' + JSON.stringify(resp));
            //         // resp.data.list
            //         // console.log('Uploading Successfull');
            //     })
            //     .catch((err) => {
            //         alert(err);
            //     });

            //   console.log(images);
            //   this.setState({images: [...this.state.images,images.map(i => {
            //     console.log('received image', i);
            //     return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
            // })]});
            this.RBSheet.close();
        }).catch(error => {
            console.log(error);
        });
    } // end of imageFromCamera

    onSubmit = () => {
        if (this.state.comments === '') {
            alert("Please Enter Some Comments About The Problem");
        } else if (this.state.myImages.length < 1) {
            alert("Please Attest Some Images");
        } else {
            this.SaveImages();
            this.props.onConfirm(this.props.latiRedux, this.props.longRedux, this.state.comments, this.props.loginId, this.props.navigation);
            alert("Location And Comments Send Succefully...");
            this.props.navigation.navigate('Map');
        }
    }
    SaveImages = () => {
        // this.state.myImages.map(i => {
        //     // var photo = {
        //     //     uri: i.path,
        //     //     type: 'image/jpeg',
        //     //     name: 'photo.jpg',
        //     // };
        //     formData.append("image", photo);
        // });

        let lstImages = this.state.myImages;

        lstImages.forEach((i, index) => {
            // var photo = {
            //     uri: i.ImagePath,
            //     type: 'image/jpeg',
            //     name: 'photo.jpg',
            // };
            formData.append("image" + index, i.ImageData);
        });

        let url = GLOABAL_PATH.API_URL + Constants.ApiController.CustomerDetails + Constants.ApiActionLogin.UploadImages;

        axios({
            url: url,
            method: "POST",
            data: formData
        }).then((resp) => {
            // this.SaveActivity(resp.data, Ids);
            console.log('RESP : ' + JSON.stringify(resp));
            // resp.data.list
            // console.log('Uploading Successfull');
        })
            .catch((err) => {
                alert(err);
                console.log('ERROR ' + err);
            });
    } // end of SaveImages 

    // sendCustomerLocationAndComments=(latitude, longitude, comments , loginId )=>{
    //     let Obj = {
    //         userLatitude: this.props.latiRedux,
    //         userLongitute: this.props.longRedux,
    //         userComments: this.state.comments,
    //         loginId : this.props.loginId,
    //     }
    //     let url = GLOABAL_PATH.API_URL + Constants.ApiController.CustomerDetails + Constants.ApiActionLogin.CustomerQueryRequestData;

    //     axios({
    //         url: url,
    //         method: "POST",
    //         data: Obj
    //     }).then((resp) => {
    //         // this.SaveActivity(resp.data, Ids);
    //         console.log('RESP : ' + JSON.stringify(resp));
    //         // resp.data.list
    //         console.log('Uploading Successfull');
    //     }).catch((err) => {
    //         alert(err);
    //     });
    // }
    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.item}>
                <ImageBackground style={{
                    // width: 80,
                    width: Dimensions.get("screen").width/4,
                    height: 80,
                    resizeMode: 'contain',
                    borderColor: 'black',
                    // borderRadius: 5,
                    // borderWidth: 1.2,
                    // backgroundColor: 'red',
                    // opacity: 0.8,
                    // color: '#fff',
                    marginLeft: '2%',
                    marginRight: '2%',
                    marginTop: '2%',
                    // right: 15,
                    // left: 14,
                    flex: 1,
                }}
                    source={item.ImagePath}
                    >

                    <Text
                        onPress={() =>
                            // this.confirmBox(item.key,true)
                            // this.removeImage(item.key)
                            this.setState({ isVisible: true, imageKey: item.key })
                            // alert(item.key) 
                        }>
                        <MaterialCommunityIcons
                            // name='close-circle-outline'
                            name='close-box'
                            size={22}
                            color='white' style={{
                                margin: 2,
                                // position: "absolute",
                                top: 0,
                                left: 0,
                                width: 25,
                                height: 25,

                            }} />
                    </Text>
                </ImageBackground>
            </View>
        )
    }
    deleteImageConfirm(key) {
        var arr = this.state.myImages;
        var res = arr.filter(item => item.key !== key);
        this.setState({ myImages: res, isVisible: false });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>

                {/*  Header Bar Start */}
                <View style={{ flexDirection: 'row', height: 55, backgroundColor: Constants.Colors.whiteColor, position: 'relative', shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24 }}>
                    <TouchableOpacity style={{ width: 45, paddingLeft: 20, justifyContent: 'center' }}
                        onPress={ () => this.props.navigation.navigate('Map') }>

                        <MaterialIcons name="keyboard-arrow-left" size={32} style={{ color: Constants.Colors.appThemeColor, paddingRight: 2, fontWeight: 'bold' }} />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '70%', height: '70%', backgroundColor: '#ededed', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                            <Text style={{ fontSize: 18, color: '#00517b', fontWeight: 'bold' }}>QUERY DETAILS</Text>
                        </View>
                    </View>
                </View>
                {/*  Header Bar End */}

                <ScrollView style={{
                    marginBottom: 30
                }}
                >
                    <View style={styles.container}>

                        <View style={styles.innerContainer}>
                            <Text style={styles.TitleText}>COMMENTS</Text>
                            <View style={styles.hr}></View>
                            <View style={styles.btnContainer}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={[styles.inputComments, { height: 100, paddingVertical: 10, textAlignVertical: 'top' }]} 
                                    value={this.state.comments}
                                    onChangeText={(comments) => this.setState({ comments })}
                                    multiline={true} placeholder={'comments'} />
                                </View>
                            </View>
                        </View>

                        <View style={[styles.innerContainer, { marginBottom: '30%' }]}>
                            
                            <Text style={styles.TitleText}>PHOTOS</Text>
                            <View style={styles.hr}></View>
                            <View style={styles.btnContainer}>

                                <View style={[styles.inputContainer, { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                                // onPress={this.SendFilesButtonBounce}
                                >
                                    {/* <TouchableOpacity
                                        style={styles.roundButton}
                                        onPress={() => this.RBSheet.open()}
                                    >
                                        <MaterialCommunityIcons name="file-send" size={26} style={{ color: 'black', paddingRight: 8 }} />
                                        <Text>Send Files</Text>
                                    </TouchableOpacity> */}
                                    

                                    <RBSheet ref={ref => { this.RBSheet = ref; }}
                                        height={300} openDuration={250} customStyles={{
                                            container: { alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 11 }, shadowOpacity: 0.55, shadowRadius: 14.78, elevation: 22 }
                                        }}
                                        closeOnDragDown={true}
                                    >
                                        <View style={{
                                            // flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{ marginTop: '3%', marginBottom: '10%', color: '#1F618D', fontSize: 28, fontWeight: 'bold' }}>UPLOAD IMAGES</Text>
                                        </View>
                                        <TouchableOpacity style={{ height: '15%', width: '90%', backgroundColor: '#1F618D', borderRadius: 13, marginBottom: '1%' }}
                                            onPress={() => this.imageFromCamera()}>
                                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.loginText}>IMAGE FROM CAMERA</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ height: '15%', width: '90%', backgroundColor: '#1F618D', borderRadius: 13, marginBottom: '1%' }}
                                            onPress={() => this.imagesFromGallery()}>
                                            <View style={{ flex: 1, fblexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.loginText}>IMAGE FROM GALLERY</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ height: '15%', width: '90%', backgroundColor: '#1F618D', borderRadius: 13, marginBottom: '1%' }}
                                            onPress={() => this.RBSheet.close()}>
                                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.loginText}>CANCEL</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </RBSheet>
                                </View>

                            </View>

                            {/* <Text style={styles.TitleText}>PHOTOS</Text>
                            <View style={styles.hr}></View> */}
                            <View style={[styles.btnContainer, { flexDirection: 'column' }]}>
                                {/* <View style={{ width: 60, height: 70, backgroundColor: 'red' }}></View>
                                <View style={{ width: 60, height: 70, backgroundColor: 'yellow' }}></View> */}
                                {/* <View style={{ width: 60, height: 0 , backgroundColor: 'red' }}></View> */}

                                {this.state.myImages.length != 0 ? 
                                <FlatList
                                    data={this.state.myImages}
                                    renderItem={this._renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={3}
                                /> 
                                : 
                                <View>
                                     <TouchableOpacity style={{backgroundColor: '#e8e7e7', width: 60, height: 60 , borderRadius: 5 , justifyContent: 'center' , alignItems: 'center' ,  }}
                                     onPress={() => this.RBSheet.open()}
                                     >
                                     <AntDesign name="plus" size={21} style={{ color: 'black' }} />
                                     
                                     </TouchableOpacity>
                                 </View> }


                            </View>

                            <View style={{
                                width: '100%',
                                // alignItems: 'center', 
                                justifyContent: 'center',
                                // left: 20,
                                marginTop: '12%',
                                marginBottom: '1%',
                            }}>
                                {/* <Animatable.View ref={this.NextSwingRef}> */}
                                <TouchableOpacity style={[styles.loginButton, { height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 13 }]}
                                onPress={() => this.onSubmit()}>
                                    <View style={{
                                        flex: 1, 
                                        flexDirection: 'row', 
                                        // alignItems: 'flex-start', 
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={styles.loginText}>SEND</Text>
                                        <MaterialIcons name="navigate-next" size={32} style={{ color: '#fff', paddingRight: 8 }} />

                                    </View>
                                </TouchableOpacity>
                                {/* </Animatable.View> */}
                            </View>
                        </View>


                    </View>

                    {/* Modal is here */}
                    <View visible={this.state.isVisible}>
                        <Modal animationType={"fade"} transparent={true} visible={this.state.isVisible} onRequestClose={() => { console.log("Modal has been closed.") }}>
                            <View style={styles.a}>
                                <View style={styles.containerModal}>
                                    <View style={styles.middlePart}>
                                        <Text style={styles.alertMessageTextStyle}>Do you want to delete this photo?</Text>
                                    </View>
                                    <View style={styles.bottomPart}>
                                        <TouchableOpacity style={styles.alertMsgButton} onPress={() => { this.setState({ isVisible: false }) }}><Text style={styles.alerMsgText}>Cancel</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton}
                                            onPress={() => this.deleteImageConfirm(this.state.imageKey)}>
                                            <Text style={styles.alerMsgText}>Confirm</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    {/* End OF Model */}
                </ScrollView>
            </View>
        );
    } // end of render
}
const styles = StyleSheet.create({
    roundButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
    },
    TitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 3,
    },
    hr: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#444',
        marginTop: 6,
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
        marginTop: 10
    },
    container1: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    imageContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        width: 200,
        height: 200,
        // backgroundColor: 'red',
        // color: 'red'
    },
    container: {
        display: "flex",
        // backgroundColor: Constants.Colors.appThemeColor,
        // backgroundColor: '#ededed',
        height: Dimensions.get("screen").height - 30,
        width: Dimensions.get("screen").width
    },
    input: {
        width: 200,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
    },
    innerContainer: {
        backgroundColor: '#ffffff',
        marginTop: '4%',
        marginRight: '3%',
        marginLeft: '3%',
        // marginBottom: ,
        padding: '4%',

        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,


        shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 11,
        // },
        // shadowOpacity: 0.55,
        // shadowRadius: 14.78,
        // elevation: 22,
        
        borderRadius: 2,
        // borderBottomColor: '#000000',
        borderWidth: 0.4,
        // display: 'flex',
        // flexDirection: 'column',
    },
    buttonContainer: {
        height: 45,
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        // marginLeft: '5%',

        // width: 300,
        borderRadius: 13,
        backgroundColor: 'transparent'
    },
    btnContainer1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        marginTop: 20
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
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnContinue: {
        marginTop: '40%',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '3%',
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    imgContainer: {
        borderColor: '#002efc',
        borderRadius: 2,
    },
    imgView: {
        width: 120,
        height: '7%',
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: 'red',
        // color: 'red',
        marginVertical: 10,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : "#00BCD4",
        height: 90,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        // marginTop: 80,
        marginLeft: 40,
    },
    containerModal: {
        flexDirection: 'column',
        // height: 200,
        // width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ecf0f1',
        // borderWidth: 2,
        borderColor: '#1F618D',
        // borderRadius: 10,
        // padding: 4,

    },
    middlePart: {
        flex: 0.6,
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#FF6608',
        textAlign: 'center',
        textAlignVertical: 'center',
        // padding: 4,
        marginTop: 28,
        color: '#FFFFFF',
        fontSize: 16,
        marginVertical: 1
    },
    bottomPart: {
        flex: 0.4,
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#FF6608',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    a: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',


        justifyContent: 'center',
        alignItems: 'center',
        //   backgroundColor : "#00BCD4",
        backgroundColor: "white",
        height: 170,
        width: '80%',
        //   borderRadius:10,  
        borderWidth: 1.2,
        //   borderColor: '#fff',
        borderColor: '#000000',
        marginTop: Dimensions.get("screen").height * 0.3,
        marginLeft: Dimensions.get("screen").width * 0.1,
    },
    alertMessageTextStyle: {
        color: 'black',
        textAlign: 'justify',
        fontSize: 18,
        // padding: 2,
    },
    alertMsgButton: {
        paddingHorizontal: '18%',
        // marginVertical: 4,
        // borderRadius: 10,
        backgroundColor: '#c6c9cc',
        justifyContent: 'center',
        paddingBottom: 0
    },
    confirmButton: {
        paddingHorizontal: '18%',
        // marginVertical: 4,
        // borderRadius: 10,
        // backgroundColor: '#808FFF',
        backgroundColor: '#1F618D',
        justifyContent: 'center',
        paddingBottom: 0
    },
    alerMsgText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    item: {
        // backgroundColor: '#3232ff',
        alignItems: 'center',
        // justifyContent: 'center',
        // height: 80,
        // margin: 3,
        marginBottom: '2%',
    },
    itemText: {
        color: '#fff',
        fontSize: 20
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
        // borderColor: 'orange',
        borderColor: '#0a5386',
        borderWidth: 2
    }

});
const mapStateToProps = state => {
    return {
        latiRedux: state.reducerMap.latitude,
        longRedux: state.reducerMap.longitude,
        loginId: state.reducerLogin.userInfoObject.LoginId,
    };
};
const mapsDispatchToProps = dispatch => {
    return {
        onConfirm: (latitute, longitude, comments, loginId, navigation) => dispatch(sendLocation(latitute, longitude, comments, loginId, navigation)),
    };
}
export default connect(mapStateToProps, mapsDispatchToProps)(QueryDetails);