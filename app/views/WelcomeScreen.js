import React, { Component } from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { Button, Label, Input, Item, Form } from "native-base";
import colors from "../modules/Colors";
import dimens from "../modules/Dimens";

const { width, height } = Dimensions.get("window");

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerForm: {
        name: "",
        email: "",
        password: ""
      }
    };
  }

  getStatusBar = () => {
    return (
      <View
        style={{
          backgroundColor: colors.primaryDark,
          height: height / 26,
          width: "100%",
          justifyContent: "flex-end"
        }}
      />
    );
  };

  render() {
    const { registerForm } = this.state;

    return (
      <View>
        {this.getStatusBar()}

        <Text
          style={{
            color: "black",
            fontSize: dimens.extraLargeText,
            fontWeight: "600",
            alignSelf: "center",
            marginHorizontal: 10,
            marginTop: 40
          }}
        >
          Welcome to Unacademy
        </Text>

        <Text
          style={{
            color: colors.subTitleColor,
            fontSize: dimens.normalText,
            alignSelf: "center",
            marginHorizontal: 10,
            marginTop: 20,
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          Enroll in courses and watch lessons from India's best educators.
        </Text>

        <View
          style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 20 }}
        >
          <View style={{ flex: 1 }}>
            <Button
              bordered
              style={{
                borderColor: colors.primary,
                alignSelf: "stretch",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../assets/images/google.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ color: colors.primary, marginStart: 10 }}>
                Google
              </Text>
            </Button>
          </View>

          <View style={{ flex: 1, marginStart: 10 }}>
            <Button
              style={{
                backgroundColor: colors.facebook,
                alignSelf: "stretch",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../assets/images/facebook.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ color: "white", marginStart: 10 }}>Facebook</Text>
            </Button>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginHorizontal: 20,
            alignItems: "center"
          }}
        >
          <View
            style={{ flex: 1, height: 1, backgroundColor: colors.divider }}
          />

          <View
            style={{
              flex: 0.3,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                color: colors.subTitleColor
              }}
            >
              OR
            </Text>
          </View>

          <View
            style={{ flex: 1, height: 1, backgroundColor: colors.divider }}
          />
        </View>

        <Form
          style={{ alignSelf: "stretch", marginTop: 10, marginHorizontal: 20 }}
        >
          <Item floatingLabel last>
            <Label style={{ color: "gray" }}>Name</Label>
            <Input
              value={registerForm.name}
              onChangeText={value => {
                this.setState({
                  registerForm: { ...registerForm, name: value }
                });
              }}
              getRef={input => {
                this.nameRef = input;
              }}
              onSubmitEditing={() => {
                this.emailRef._root.focus();
              }}
              returnKeyType={"next"}
            />
          </Item>

          <Item floatingLabel last>
            <Label style={{ color: "gray" }}>Email</Label>
            <Input
              value={registerForm.email}
              onChangeText={value => {
                this.setState({
                  registerForm: { ...registerForm, email: value }
                });
              }}
              getRef={input => {
                this.emailRef = input;
              }}
              onSubmitEditing={() => {
                this.passwordRef._root.focus();
              }}
              autoCapitalize="none"
              returnKeyType={"next"}
              secureTextEntry={false}
            />
          </Item>

          <Item floatingLabel last>
            <Label style={{ color: "gray" }}>Password</Label>
            <Input
              value={registerForm.password}
              onChangeText={value => {
                this.setState({
                  registerForm: { ...registerForm, password: value }
                });
              }}
              getRef={input => {
                this.passwordRef = input;
              }}
              secureTextEntry
            />
          </Item>

          <Button
            style={{
              alignSelf: "stretch",
              justifyContent: "center",
              marginTop: 30,
              backgroundColor: colors.primary
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: dimens.normalText,
                fontWeight: "600"
              }}
            >
              Create an Account
            </Text>
          </Button>
        </Form>

        <Text
          style={{
            color: colors.subTitleColor,
            textAlign: "center",
            marginHorizontal: 20,
            marginTop: 5,
            fontSize: dimens.normalText
          }}
        >
          By signing up, you agree to our Terms and Privacy Policy
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            justifyContent: "center"
          }}
        >
          <Text>Already have an account?</Text>
          <Text
            onPress={() => {
              this.setState({ loginMode: true });
            }}
            style={{ marginStart: 10, color: colors.primary }}
          >
            Log in
          </Text>
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;
