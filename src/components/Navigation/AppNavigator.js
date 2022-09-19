import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, Image, StatusBar, TouchableOpacity, Animated, Easing } from "react-native";

//          navigation 
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { createDrawerNavigator, DrawerRouter } from 'react-navigation-drawer';
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";

//          Icons
// import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

//        Screens 
import ViewCustomerLocation from '../../Screens/ViewCustomerLocation';
import Login from "../../Screens/Login";
import Signup from "../../Screens/Signup";
import Map from '../../Screens/Map';
import VerifyOTP from '../../Screens/VerifyOTP';
import AllUserQuery from '../../Screens/AllUserQuery';
import Header from '../Navigation/Header';
import Logout from '../../Screens/Logout';
import ShowUserLocation from '../../Screens/ShowUserLocation';
import QueryDetails from '../../Screens/QueryDetails';
import AllUsers from '../../Screens/AllUsers';
import AllAgents from '../../Screens/AllAgents';
import MyProfile from '../../Screens/MyProfile';
import AllUsersQueryForAgent from '../../Screens/AllUsersQueryForAgent';
import UserPayment from '../../Screens/UserPayment';
import AllUsersQueryForUserOnly from '../../Screens/AllUsersQueryForUserOnly';
import ViewDetails from '../../Screens/ViewDetails';
import Register from "../../Screens/Register";
import Dashboard from "../../Screens/Dashboard";
import ListServices from "../../Screens/ListServices";
import ProfileScreen from "../../Screens/ProfileScreen";
import WorkerScreen from "../../Screens/WorkerScreen";
import AdminUser from "../../Screens/AdminUser";
import AdminWorker from "../../Screens/AdminWorker";
import AdminPanel from "../../Screens/AdminPanel";

//        custom Side Menu
import CustomSideMenu from "./CustomSideMenu"; //Class Compoenetns so no backets
import HamburgerIcon from './HamburgerIcon';
import CustomHeader from './CustomHeader';


//        Helper Text
import Constants from '../../utils/Constants';

const AppStack = createStackNavigator({
  Map: {
    screen: Map,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerTitle:()=> <CustomHeader title="" subtitle={""} />,

      // headerLeft:()=> 
      // <CustomSideMenu /> 
      // <HamburgerIcon navigationProps={navigation} />
      // ,

      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff',
    })
  },
  Logout: {
    screen: Logout,
    navigationOptions: ({ navigation }) => ({
      headerTitle: () => <CustomHeader title="Logout" subtitle="Logout" />,

      headerLeft: () => <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: Constants.Colors.headerBackColor
      },
      headerTintColor: '#fff',
    })
  },
  VerifyOTP: {
    screen: VerifyOTP,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      //   headerLeft:()=> (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("Signup")} />),
      //   title: "Verify Mobile No",
      //   headerStyle: {
      //     backgroundColor: Constants.Colors.headerBackColor
      //   },
      //   headerTintColor: Constants.Colors.yellowColor,
    }),
  },
  QueryDetails: {
    screen: QueryDetails,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerTitle: () => <Header />
      // headerLeft: ()=> (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("Map")} />),
      // title: "Query Details",
      // headerStyle: {
      //   backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: Constants.Colors.yellowColor,
    }),
  },
  AllUserQuery: {
    screen: AllUserQuery,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "All User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  ShowUserLocation: {
    screen: ShowUserLocation,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("AllUserQuery")} />),
      // title: "Show User Location",
      // headerStyle: {
      //   backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: Constants.Colors.yellowColor,
    }),
  },
  AllUsers: {
    screen: AllUsers,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  AllAgents: {
    screen: AllAgents,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  MyProfile: {
    screen: MyProfile,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  AllUsersQueryForAgent: {
    screen: AllUsersQueryForAgent,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  UserPayment: {
    screen: UserPayment,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  AllUsersQueryForUserOnly: {
    screen: AllUsersQueryForUserOnly,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  ViewDetails: {
    screen: ViewDetails,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      //headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },

  ListServices: {
    screen: ListServices,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },

  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },

  WorkerScreen: {
    screen: WorkerScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },

  AdminUser: {
    screen: AdminUser,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  AdminWorker: {
    screen: AdminWorker,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  },
  AdminPanel: {
    screen: AdminPanel,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
      // headerLeft:()=> <CustomHeader title="" subtitle={""} />,
      // (<HeaderBackButton tintColor={Constants.Colors.yellowColor} onPress={_ => navigation.navigate("QueryDetails")} />),
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // title: "User Query",
      // headerStyle: {
      // backgroundColor: Constants.Colors.headerBackColor
      // },
      // headerTintColor: '#fff'
    }),
  }

}); // end of Map createStackNavigator



const MyDrawerNavigator = createDrawerNavigator({
  Dashboard
});




const AuthStack = createStackNavigator({
  Login: Login
});

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AdminUser,
    Auth: AuthStack,
    App: MyDrawerNavigator,
    Signup: Signup,
    ViewCustomerLocation: ViewCustomerLocation,
    QueryDetails: QueryDetails,
    AllUserQuery: AllUserQuery,
    ShowUserLocation: ShowUserLocation,
    Map: Map,
    MyProfile: MyProfile,
    AllUsersQueryForAgent: AllUsersQueryForAgent,
    UserPayment: UserPayment,
    AllUsersQueryForUserOnly: AllUsersQueryForUserOnly,
    ViewDetails: ViewDetails,
    Register: Register,
    Dashboard: Dashboard,
    ListServices: ListServices,
    //Main: MainBottomTabNavigation
  },
  {
    initialRouteName: "AuthLoading",
  });

export default createAppContainer(AppNavigator);

