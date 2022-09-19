import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { DeviceUniqueId } from '../../utils/UserTypeFunc';
import { setOneSignalPlayerId, OneSignalInitialized } from './LoginUserInfo';
// import OneSignal from 'react-native-onesignal';


let OneSignal = OneSignalInitialized();
class OneSignalPushNotication extends React.Component {
    constructor(properties) {
        super(properties);

        let requiresConsent = false;

        this.state = {
            emailEnabled: false,
            animatingEmailButton: false,
            initialOpenFromPush: 'Did NOT open from push',
            activityWidth: 0,
            width: 0,
            activityMargin: 0,
            buttonColor: Platform.OS == 'ios' ? '#ffffff' : '#d45653',
            jsonDebugText: '',
            privacyButtonTitle: 'Privacy Consent: Not Granted',
            inAppIsPaused: true,
            requirePrivacyConsent: requiresConsent,

        };
       
        // OneSignal.init(' 352bacb9-bac2-4942-9c70-432d4b7d8709', {
        //     kOSSettingsKeyAutoPrompt: true,
        // });
        //OneSignal.setRequiresUserPrivacyConsent(requiresConsent);
        // OneSignal.init('77218782-8c69-437e-805f-240623ce8198', {
        //     kOSSettingsKeyAutoPrompt: true,
        // });

        OneSignal.setLogLevel(6, 0);

        // Examples for using native IAM public methods
        // this.oneSignalInAppMessagingExamples();

        // Examples for using native Outcome Event public methods
        // this.oneSignalOutcomeEventsExamples();

    }

    async componentDidMount() {
        var providedConsent = await OneSignal.userProvidedPrivacyConsent();

        this.setState({
            privacyButtonTitle: `Privacy Consent: ${
                providedConsent ? 'Granted' : 'Not Granted'
                }`,
            privacyGranted: providedConsent,
        });

        OneSignal.setLocationShared(true);

        OneSignal.inFocusDisplaying(2);

        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
        this.onIds = this.onIds.bind(this);
        this.onEmailRegistrationChange = this.onEmailRegistrationChange.bind(this);
        this.onInAppMessageClicked = this.onInAppMessageClicked.bind(this);

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        OneSignal.addEventListener(
            'emailSubscription',
            this.onEmailRegistrationChange,
        );
        OneSignal.addEventListener(
            'inAppMessageClicked',
            this.onInAppMessageClicked,
        );

        
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
        OneSignal.removeEventListener(
            'emailSubscription',
            this.onEmailRegistrationChange,
        );
        OneSignal.removeEventListener(
            'inAppMessageClicked',
            this.onInAppMessageClicked,
        );
    }


    onEmailRegistrationChange(registration) {
        console.log('onEmailRegistrationChange: ', registration);
    }

    onReceived(notification) {
        console.log('Notification received: ', notification);

        this.setState({
            jsonDebugText: 'RECEIVED: \n' + JSON.stringify(notification, null, 2),
        });
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);

        this.setState({
            jsonDebugText:
                'OPENED: \n' + JSON.stringify(openResult.notification, null, 2),
        });
    }

    onIds(device) {
        var id = DeviceUniqueId();
        setOneSignalPlayerId(device.userId);
        OneSignal.sendTags({ "DeviceUniqueId": id });
        // console.log("Device Unique Id:" + id);
        // console.log('Device info: ', device);
    }

    onInAppMessageClicked(actionResult) {
        console.log('actionResult: ', actionResult);
        this.setState({
            jsonDebugText: 'CLICKED: \n' + JSON.stringify(actionResult, null, 2),
        });
    }
    render() {
        return (
            <View />
        );
    }
}




export default OneSignalPushNotication;