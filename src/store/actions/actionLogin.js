import { LOGIN, APP_VERSION, FORGOT_PASSWORD, FORGOT_PASSWORD_INFO, OTP_MODAL, SET_OTP, SET_LOCATION, SET_LOGOUT, SET_USER_INFO_OBJECT , SET_USER_TYPE } from './actionTypes';
import { startLoading, stopLoading } from './index';
import { DeviceUniqueId, LogError, ShowMessage } from '../../utils/UserTypeFunc';
// import { getOneSignalPlayerId} from '../../General/LoginUserInfo';
import axios from 'axios';

import { setUserInfo } from '../../components/General/LoginUserInfo';
import Constants from '../../utils/Constants';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import GLOABAL_PATH from '../../utils/GlobalPath';
import store from '../configureStore';

export const login = (userName, password, PlayerId, propsNavigate) => {
    return dispatch => {
        dispatch(startLoading());
        let AppVersion = '';
        if (Platform.OS === 'ios') {
            AppVersion = GLOABAL_PATH.APP_VERSION_IOS;
        }
        else {
            AppVersion = GLOABAL_PATH.APP_VERSION_ANDROID;
        }
        let url = GLOABAL_PATH.API_URL + 'Login/GetAppVersion?MobileNo=' + userName + '&CurrentVersion=' + AppVersion + '&Platform=' + Platform.OS + '&OSVersion=' + DeviceInfo.getSystemVersion()
        axios.get(url)
            .then((respAppVersion) => {

                let objAppVersion = respAppVersion.data.AppVersion;
                if (objAppVersion) {
                    if (objAppVersion.AppVersionAndroid !== GLOABAL_PATH.APP_VERSION_ANDROID) {
                        dispatch(stopLoading());
                        dispatch(setAppVersionInfo(objAppVersion));

                    }
                    else {
                        if (userName != '') {
                            url = GLOABAL_PATH.API_URL + 'Login/LoginVerify?username=' + userName + '&password=' + password + '&DeviceId=' + DeviceUniqueId() + '&PlayerId=' + PlayerId;

                            axios.get(url)


                                // axios.get('http://192.168.10.40:8002/api/LoginApi?username=01-002-30556&password=ngsparent')
                                //     axios.post('http://192.168.1.218:8002/ApiSMS/api/LoginApi?username=01-002-30556&password=ngsparent', {        
                                //     userName: 'test',
                                //     userusername: this.state.username,
                                //     userPassword: this.state.password
                                //   } )
                                .then(function (response, data) {
                                    // if (response.data.Message)
                                    // alert(response.data.Students[0]);
                                    // alert(response.data.UserType);
                                    //dispatch(stopLoading());
                                    let userData = response.data;
                                    
                                    // console.log(JSON.stringify(response.data.UserInfo[0]));
                                    // dispatch(setUserInfoObject(response.data.UserInfo[0]));
                                    // dispatch(setUserType(userData.UserType));

                                    let msg = userData.Message;
                                    // let userType = userData.UserType;
                                    // let UserInfo = userData.UserInfo[0];
                                    //alert(msg);
                                    if (msg === Constants.ApiResponse.Success) {
                                        
                                        console.log(JSON.stringify(response.data.UserInfo[0]));
                                        dispatch(setUserInfoObject(response.data.UserInfo[0]));
                                        dispatch(setUserType(userData.UserType));

                                        let userType = userData.UserType;
                                        let UserInfo = userData.UserInfo[0];

                                        if (userData.UserInfo) {
                                            if (!UserInfo.IsOTPVerified) {
                                                dispatch(ResendCode(userName));
                                                dispatch(stopLoading());
                                                propsNavigate.navigate('VerifyOTP');
                                            }
                                            setUserInfo(userName, password).then((response) => {
                                                //this callback is executed when your Promise is resolved
                                                // setUserInfo(userName,password);

                                                // alert(userData.StudentOrClassList[0].UserId);
                                                // let UserId = userData.StudentOrClassList[0].UserId;

                                                // if (!userData.StudentOrClassList[0].IsUserSubcribed) {
                                                //     let OneSignal = OneSignalInitialized();
                                                //     OneSignal.sendTags({ "UserPkId":  UserId });
                                                //     console.log(PlayerId);
                                                //     dispatch(UserSubscribedData(PlayerId,UserId));
                                                // }
                                                dispatch(stopLoading());
                                                // dispatch(setLogin(userData));



                                                propsNavigate.navigate("App");

                                            }).catch((error) => {
                                                //this callback is executed when your Promise is rejected
                                                //console.log('Promise is rejected with error: ' + error);
                                            });
                                        } else {
                                            dispatch(stopLoading());
                                            alert("Invalid Username or password");
                                        }

                                    } else if (msg === Constants.ApiResponse.InvalidUserNamePassword) {
                                        dispatch(stopLoading());
                                        alert("Invalid username or password");
                                    }
                                    else {
                                        dispatch(stopLoading());
                                        alert(msg);
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    dispatch(stopLoading());
                                    alert(error);
                                });
                        }//If USername is not empty
                        else {
                            dispatch(stopLoading());
                        }
                    }//If COndidtion of App Version Check
                }//If condition of objAppVersion
            })//Then Call back respAppVersion
            .catch((error) => {
                dispatch(stopLoading());
                console.log(error);
            });
    };
};


export const setLogin = (data) => {
    return {
        type: LOGIN,
        // StudentOrClassList: data.StudentOrClassList,
        UserType: data.UserType,
    };
};

export const setAppVersionInfo = (AppVersionInfo) => {
    return {
        type: APP_VERSION,
        appVersionModalVisible: true,
        AppVersionInfo: AppVersionInfo
    };
};

export const forgotPassword = (MobileNo) => {
    return (dispatch, getState) => {
        dispatch(startLoading());
        let url = GLOABAL_PATH.API_URL + 'Login/ForgotPassword?MobileNo=' + MobileNo;
        axios.get(url)
            .then((resp) => {
                if (resp.data.Message === Constants.ApiResponse.Success) {
                    dispatch(setForgotPasswordInfo(false, resp.data.LoginInfo));
                    alert(Constants.DisMsg.ForgotPasswordSuccesfull);
                }
                else {
                    alert(Constants.DisMsg.ForgotPasswordError);
                }
                dispatch(stopLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(stopLoading());
            });
    }
}

export const setForgotPassword = (forgotPasswordModalVisible) => {
    return {
        type: FORGOT_PASSWORD,
        forgotPasswordModalVisible: forgotPasswordModalVisible
    }
}

export const setOTPModal = (isVisible) => {
    return {
        type: OTP_MODAL,
        OTPVisible: isVisible
    }
}


export const setForgotPasswordInfo = (forgotPasswordModalVisible, LoginInfo) => {
    return {
        type: FORGOT_PASSWORD_INFO,
        forgotPasswordModalVisible: forgotPasswordModalVisible,
        LoginInfo: LoginInfo
    }
}


export const register = (mobileNo, name, email, password, propsNavigate) => {
    return dispatch => {
        dispatch(startLoading());
        let url = GLOABAL_PATH.API_URL + Constants.ApiController.Login + Constants.ApiActionLogin.Register;
        let registerData = {
            Password: password,
            Name: name,
            MobileNo: mobileNo,
            Email: email
        }
        axios({ method: 'post', url: url, data: registerData })
            .then(function (res, data) {
                dispatch(stopLoading());

                if (res.data.Message === Constants.ApiResponse.AleradyRegistered) {
                    ShowMessage(Constants.DisMsg.AleradyRegistered);
                    propsNavigate.navigate(Constants.Navigation.AuthLoading);
                }
                else if (res.data.Message === Constants.ApiResponse.SomeThingWrong) {
                    ShowMessage(Constants.DisMsg.AleradyRegistered);
                    propsNavigate.navigate(Constants.Navigation.AuthLoading);
                } else {
                    dispatch(setOTP(res.data.OTP, mobileNo));
                    propsNavigate.navigate(Constants.Navigation.VerifyOTP);
                }

            })
            .catch(function (error) {
                alert(error);
                dispatch(stopLoading());
            });
    }
}


export const ResendCode = (MobileNo) => {
    return dispatch => {
        let url = GLOABAL_PATH.API_URL + 'Login/ResendCode?MobileNo=' + MobileNo;
        axios.get(url)
            .then((resp) => {
                if (resp.data.Message === Constants.ApiResponse.Success) {
                    dispatch(setOTP(res.data.OTP, MobileNo));
                }
                else {
                    alert(resp.data.Message);
                }
            })
            .catch((err) => {
                console.log(err);

            });
    }
}
export const setOTP = (otp, MobileNo) => {
    return {
        type: SET_OTP,
        OTP: otp,
        MobileNo: MobileNo
    }
}

export const sendLocation = (latitute,longitude,comments,loginId,propsNavigate) => {
    return dispatch => {
        dispatch(startLoading());
        let url = GLOABAL_PATH.API_URL + Constants.ApiController.CustomerDetails + Constants.ApiActionLogin.UserLocationAndComments;
        let sendingData = {
            LoginId: loginId,
            LatitutePosition: latitute,
            LongitutePosition: longitude,
            Comments: comments,
        }
        axios({ method: 'post', url: url, data: sendingData })
            .then(function (res, data) {

                dispatch(stopLoading());
                // propsNavigate.navigate(Constants.Navigation.QueryDetails);
                // propsNavigate.navigate(Constants.Navigation.UserQuery);
            })
            .catch(function (error) {
                alert(error);
                dispatch(stopLoading());
            });
    }
} // end of sendLocation

export const setLocation = (latitude, longitude) => {
    return {
        type: SET_LOCATION,
        latitude: latitude,
        longitude: longitude
    }
} // end of setLocation

export const setLogoutValue = (islogout) => {
    return {
        type: SET_LOGOUT,
        islogout: islogout
    }
} // end of setLogoutValue

export const sendCategory = (catName) => {
    return dispatch => {
        dispatch(startLoading());
        let url = GLOABAL_PATH.API_URL + Constants.ApiController.CurrentLocation + Constants.ApiActionLogin.PostCategory;
        let sendingData = {
            CatName: catName,
        }
        axios({ method: 'post', url: url, data: sendingData })
            .then(function (res, data) {
                dispatch(stopLoading());
                // propsNavigate.navigate(Constants.Navigation.CustomerDetails);
            })
            .catch(function (error) {
                alert(error);
                dispatch(stopLoading());
            });
    }
} // end of sendCategory

export const setUserInfoObject = (userInfoObject) => {
    return {
        type: SET_USER_INFO_OBJECT,
        userInfoObject: userInfoObject
    }
}

export const setUserType = (userType) => {
    return {
        type: SET_USER_TYPE,
        userType: userType
    }
}

export const sendUserQueryAssign = (userQueryId, agentLoginId, agentStatus, propsNavigate) => {
    return dispatch => {
        dispatch(startLoading());
        let url = GLOABAL_PATH.API_URL + Constants.ApiController.UserQuery + Constants.ApiActionLogin.UserQueryAssign;
        let sendingData = {
            UserQueryId: userQueryId,
            AgentLoginId: agentLoginId,
            AgentStatus: agentStatus,
        }
        axios({ method: 'post', url: url, data: sendingData })
            .then(function (res, data) {
                dispatch(stopLoading());
                // propsNavigate.navigate(Constants.Navigation.AllUserQuery);
            })
            .catch(function (error) {
                alert(error);
                dispatch(stopLoading());
            });
    }
} // end of sendUserQueryAssign

export const CancelledAgentStauts = (userQueryId, agentStatus, propsNavigate) => {
    return dispatch => {
        dispatch(startLoading());
        let url = GLOABAL_PATH.API_URL + Constants.ApiController.UserQuery + Constants.ApiActionLogin.CancelledAgentStauts;
        let sendingData = {
            UserQueryId: userQueryId,
            AgentStatus: agentStatus,
        }
        axios({ method: 'post', url: url, data: sendingData })
            .then(function (res, data) {
                dispatch(stopLoading());
                // propsNavigate.navigate(Constants.Navigation.AllUserQuery);
            })
            .catch(function (error) {
                alert(error);
                dispatch(stopLoading());
            });
    }
} // end of CancelledAgentStauts