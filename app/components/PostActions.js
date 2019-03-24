import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

class PostActions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { likes_count, comments_count } = this.props;

    return (
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 15,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            this.props.navigation.navigate("WelcomeScreen");
          }}
        >
          <Image
            source={require("../assets/images/like.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ marginStart: 10 }}>{likes_count} likes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 15,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            this.props.navigation.navigate("WelcomeScreen");
          }}
        >
          <Image
            source={require("../assets/images/chat.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ marginStart: 10 }}>{comments_count} comments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 15,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            this.props.navigation.navigate("WelcomeScreen");
          }}
        >
          <Image
            source={require("../assets/images/whatsapp.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ marginStart: 10 }}>share</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PostActions;
