import { LOGIN,APP_VERSION, FORGOT_PASSWORD,FORGOT_PASSWORD_INFO,OTP_MODAL,SET_OTP , SET_LOGOUT,SET_USER_INFO_OBJECT , SET_USER_TYPE } from '../actions/actionTypes';


const initialState = {
    SelectedUser: null,
    appVersionModalVisible: false,
    forgotPasswordModalVisible: false,
    OTPVisible: false,
    AppVersionInfo: [],
    OTP: '',
    MobileNo: '',
    islogout: false,
    userInfoObject: [],
    userType: '',
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: 
        return {
                ...state,
                SelectedUser: action.SelectedUser,              
                appVersionModalVisible: false,
                islogout: true,
                // isLogined: action.isLogined,
            };
            case APP_VERSION:
            return {
                ...state,
                appVersionModalVisible: action.appVersionModalVisible,
                AppVersionInfo: action.AppVersionInfo
            };

        case FORGOT_PASSWORD: 
        return {
            ...state,
            forgotPasswordModalVisible : action.forgotPasswordModalVisible,
            OTPVisible: action.forgotPasswordModalVisible === true ? false: true
        };
        case FORGOT_PASSWORD_INFO: 
        return {
            ...state,
            // forgotPasswordModalVisible : action.forgotPasswordModalVisible,
            LoginInfo: action.LoginInfo,
            OTPVisible : true,
        };
        case OTP_MODAL: 
        return {
            ...state,
            OTPVisible : action.isVisible,
        };
        case SET_OTP:
        return {
            ...state,
            OTP: action.OTP,
            MobileNo: action.MobileNo,
        };
        case SET_LOGOUT:
        return {
            ...state,
            islogout: action.islogout,
        };
        case SET_USER_INFO_OBJECT:
        return {
            ...state,
            userInfoObject: action.userInfoObject,
        };
        case SET_USER_TYPE:
        return {
            ...state,
            userType: action.userType,
        };
        default:
            return state;
    }
}

export default reducer;