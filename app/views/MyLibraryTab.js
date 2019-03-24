import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Icon, Button } from "native-base";
import colors from "../modules/Colors";
import dimens from "../modules/Dimens";

const { width, height } = Dimensions.get("window");

class MyLibraryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        ios="ios-bookmark"
        android="md-bookmark"
        style={{ color: tintColor }}
      />
    ),
    tabBarLabel: "My Library"
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: colors.primaryDark,
            height: height / 8,
            alignSelf: "stretch",
            justifyContent: "flex-end"
          }}
        >
          <View
            name="header"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingStart: 10,
              paddingEnd: 10,
              height: height / 12
            }}
          >
            <View
              name="searchBar"
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                height: height / 17,
                backgroundColor: colors.searchBarContainer,
                marginEnd: 30,
                borderRadius: 5
              }}
            >
              <Icon
                ios="ios-search"
                android="md-search"
                style={{ fontSize: 24, color: "white", marginStart: 15 }}
              />

              <Text
                style={{
                  color: "white",
                  marginStart: 17,
                  fontSize: dimens.normalText
                }}
              >
                Search in My Library
              </Text>
            </View>

            <Icon
              ios="ios-settings"
              android="md-settings"
              style={{ fontSize: 28, color: "white" }}
            />
          </View>
        </View>

        <Image
          style={{
            width: width / 2,
            height: width / 2,
            resizeMode: "contain",
            marginTop: 20
          }}
          source={require(".././assets/images/library.png")}
        />

        <Text
          style={{
            marginTop: 10,
            marginStart: 10,
            marginEnd: 10,
            marginBottom: 8,
            color: "black",
            fontSize: dimens.largeText,
            fontWeight: "600",
            textAlign: "center"
          }}
        >
          Sign up or Login to save and download
        </Text>

        <Text
          style={{
            marginTop: 0,
            marginStart: 10,
            marginEnd: 10,
            textAlign: "center",
            fontSize: dimens.normalText,
            color: colors.subTitleColor
          }}
        >
          To save courses you have watched and to keep credits earned, login or
          create a new account.
        </Text>

        <Button
          style={{
            alignSelf: "center",
            marginTop: 30,
            padding: 10,
            fontSize: dimens.normalText,
            fontWeight: "500",
            backgroundColor: colors.primary
          }}
          onPress={() => {
            this.props.navigation.navigate("WelcomeScreen");
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: dimens.normalText,
              fontWeight: "600"
            }}
          >
            Login / Signup
          </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});

export default MyLibraryTab;
