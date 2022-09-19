import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import  Constants from '../../utils/Constants';
// import { getStudentOrClassName} from  '../../utils/UserTypeFunc';

class CustomHeader extends Component {
    constructor(props) {
        super(props);       
    }

    render() {
        // if (!this.props.SelectedUser) {
            return (
                <View style={styles.header}>
                    <Text style={styles.title}>Select Location</Text>
                    {/* <Text style={styles.subtitle}>{this.props.subtitle}</Text> */}
                </View>
            );
        // }
    }
}


const styles = StyleSheet.create({
    header: {

        flex: 1,
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 20,
        color: Constants.Colors.yellowColor,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: Constants.Colors.yellowColor,
        fontWeight: 'bold',
    },
});

const mapStateToProp = state => {
    return {
        SelectedUser: state.reducerLogin.SelectedUser      
    };
};


export default connect(null, null)(CustomHeader);
// this.props.StudentName
// export default CustomHeader;