import React, { component } from 'react';

import { KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';

const KeyboardAvoid = ({ children }) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1, }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoid;