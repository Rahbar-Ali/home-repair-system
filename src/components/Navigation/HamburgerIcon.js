
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Hamburger from 'react-native-animated-hamburger';

import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '../../utils/Constants';

class HamburgerIcon extends Component {
  constructor(props) {
    super(props);

    this.state ={
      active: false,
    }
  }
  toggleDrawer = () => {
    //console.log(this.props.navigationProps);
    this.props.navigationProps.toggleDrawer();
  }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity 
        onPress={this.toggleDrawer.bind(this)} 
        style={{ paddingLeft: 10 }} >
          <Hamburger 
            type="spinCross" active={this.state.active} 
            onPress={() => { this.setState({ active: !this.state.active },this.toggleDrawer.bind(this)) }}
            
            underlayColor="transparent"
            color={Constants.Colors.yellowColor}
            size={30}
          >
          </Hamburger>
          {/* <Icon
              style={{ paddingLeft: 10 }}
              color={Constants.Colors.yellowColor}
              name="md-menu"
              size={30}
            /> */}
        </TouchableOpacity>
      </View>
    );
  }
}
export default HamburgerIcon;