import React from "react";
import { StatusBar } from "react-native";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator } from "react-navigation";
import MainScreen from "./app/views/MainScreen";
import GoalsScreen from "./app/views/GoalsScreen";
import PostScreen from "./app/views/PostScreen";
import PlusCourseScreen from "./app/views/PlusCourseScreen";
import UserProfileScreen from "./app/views//UserProfileScreen";
import EducatorProfileScreen from "./app/views//EducatorProfileScreen";
import SearchAutocompleteScreen from "./app/views//SearchAutocompleteScreen";
import SearchResultsScreen from "./app/views//SearchResultsScreen";
import WelcomeScreen from "./app/views//WelcomeScreen";
import TopicScreen from "./app/views//TopicScreen";

const AppStackNavigator = createStackNavigator(
  {
    MainScreen,
    GoalsScreen,
    PostScreen,
    PlusCourseScreen,
    UserProfileScreen,
    EducatorProfileScreen,
    SearchAutocompleteScreen,
    SearchResultsScreen,
    WelcomeScreen,
    TopicScreen
  },
  {
    defaultNavigationOptions: {
      title: "Unacademy",
      header: null
    },
    initialRouteName: "MainScreen"
  }
);

const AppContainer = createAppContainer(AppStackNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Root>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <AppContainer />
      </Root>
    );
  }
}

export default App;
