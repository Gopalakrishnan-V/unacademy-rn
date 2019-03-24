import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Icon, Button } from "native-base";
import colors from "../modules/Colors";
import dimens from "../modules/Dimens";

const { width, height } = Dimensions.get("window");

class ProfileTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-person" style={{ color: tintColor }} />
    ),
    tabBarLabel: "Profile"
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
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingStart: 15,
              paddingEnd: 15,
              height: height / 13
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: dimens.extraLargeText,
                fontWeight: "600"
              }}
            >
              Unacademy
            </Text>

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
            marginTop: 20,
            resizeMode: "contain"
          }}
          source={require(".././assets/images/create_profile.png")}
        />

        <Text
          style={{
            marginTop: 10,
            marginStart: 10,
            marginEnd: 10,
            marginBottom: 8,
            color: "black",
            fontSize: dimens.largeText,
            fontWeight: "600"
          }}
        >
          Create your profile
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
          You can signup via Facebook, Google or directly by email to save
          courses in your feed to watch later. You can also save for offline
          viewing.
        </Text>

        <Button
          style={{
            alignSelf: "center",
            marginTop: 30,
            padding: 10,
            fontSize: dimens.normalText,
            fontWeight: "600",
            backgroundColor: colors.primary
          }}
          onPress={() => {
            this.props.navigation.navigate("WelcomeScreen");
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            Continue to Signup
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

export default ProfileTab;
