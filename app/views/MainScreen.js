import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import colors from "../modules/Colors";
import HomeTab from "./HomeTab";
import MyLibraryTab from "./MyLibraryTab";
import PlusTab from "./PlusTab";
import ProfileTab from "./ProfileTab";

const BottomTabNavigator = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeTab
    },
    MyLibraryTab: {
      screen: MyLibraryTab
    },
    PlusTab: {
      screen: PlusTab
    },
    ProfileTab: {
      screen: ProfileTab
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.inActiveTintColor
    },
    initialRouteName: "HomeTab"
  }
);

export default BottomTabNavigator;
