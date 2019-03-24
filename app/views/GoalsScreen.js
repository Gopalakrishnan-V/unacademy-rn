import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { fetchGoals } from "../services/ApiServices";
import dimens from "../modules/Dimens";
import colors from "../modules/Colors";

const { width, height } = Dimensions.get("window");

class GoalsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: []
    };
  }

  componentDidMount = async () => {
    await this.onFetchGoals();
  };

  onFetchGoals = async () => {
    const goals = await fetchGoals();
    this.setState({ goals });
  };

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

  getToolbar = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          alignSelf: "stretch",
          alignItems: "center",
          paddingStart: 15,
          paddingEnd: 15,
          height: 60
        }}
        onPress={() => {
          this.props.navigation.pop();
        }}
      >
        <Image
          source={require("../assets/icons/ic_cancel.png")}
          style={{ width: 20, height: 20 }}
        />

        <Text
          style={{
            fontSize: dimens.extraLargeText,
            fontWeight: "600",
            marginStart: 20
          }}
        >
          {"Pick a goal"}
        </Text>
      </TouchableOpacity>
    );
  };

  onRenderGoalItem = item => {
    item = item.item;
    const { key, icon_url, name, uid } = item;

    return (
      <View>
        <TouchableOpacity
          key={key}
          style={{
            flexDirection: "row",
            paddingTop: 20,
            paddingBottom: 20,
            alignItems: "center",
            paddingHorizontal: 15
          }}
          onPress={() => {
            const { onGoalChange } = this.props.navigation.state.params;
            onGoalChange(uid, name);
            this.props.navigation.pop();
            
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={{
                uri: icon_url
              }}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          </View>

          <Text
            style={{
              flex: 5,
              color: "black",
              fontSize: dimens.largeText,
              fontWeight: "600",
              marginStart: 10
            }}
          >
            {name}
          </Text>
        </TouchableOpacity>
        <View style={{ height: 0.7, backgroundColor: colors.divider }} />
      </View>
    );
  };

  render() {
    let { goals } = this.state;
    goals = goals.map((goal, goalIndex) => {
      return {
        ...goal,
        key: goalIndex + ""
      };
    });

    return (
      <View style={styles.container}>
        {this.getStatusBar()}
        {this.getToolbar()}
        <FlatList
          data={goals}
          renderItem={this.onRenderGoalItem}
          ListHeaderComponent={() => {
            return (
              <Image
                source={require("../assets/images/subscription_banner.jpg")}
                resizeMode="contain"
                style={{
                  width,
                  height: width / 2
                }}
              />
            );
          }}
        />
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

export default GoalsScreen;
