import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { Button, Icon } from "native-base";
import dimens from "../modules/Dimens";
import colors from "../modules/Colors";
import TopicGroup from "../components/TopicGroup";
import { ScrollView } from "react-native-gesture-handler";
import {
  fetchOngoingTopicCourses,
  fetchUpcomingTopicCourses
} from "../services/ApiServices";

const { width, height } = Dimensions.get("window");

class TopicScreen extends Component {
  constructor(props) {
    super(props);

    // this.title = "Polity";
    // this.topic_group_uid = "TQECO";

    this.title = props.navigation.state.params.title;
    this.topic_group_uid = props.navigation.state.params.topic_group_uid;

    this.state = {
      onGoingCourses: [],
      upcomingCourses: []
    };
  }

  componentDidMount = async () => {
    await this.onFetchOnGoingCourses();
    await this.onFetchUpcomingCourses();
  };

  onFetchOnGoingCourses = async () => {
    const results = await fetchOngoingTopicCourses(this.topic_group_uid);
    this.setState({ onGoingCourses: results });
  };

  onFetchUpcomingCourses = async () => {
    const results = await fetchUpcomingTopicCourses(this.topic_group_uid);
    this.setState({ upcomingCourses: results });
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
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          alignSelf: "stretch",
          alignItems: "center",
          paddingStart: 15,
          paddingEnd: 15,
          height: height / 14
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.pop();
          }}
          style={{ width: 25, height: 25 }}
        >
          <Image
            source={require("../assets/icons/ic_back.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>

        <Text
          numberOfLines={1}
          style={{
            fontSize: dimens.largeText,
            fontWeight: "600",
            marginStart: 15,
            marginEnd: 60
          }}
        >
          {this.title}
        </Text>
      </View>
    );
  };

  render() {
    const { onGoingCourses, upcomingCourses } = this.state;

    return (
      <View>
        {this.getStatusBar()}
        {this.getToolbar()}
        <ScrollView>
          {onGoingCourses.length ? (
            <TopicGroup
              title={"Ongoing courses"}
              data={onGoingCourses}
              horizontal={true}
              navigation={this.props.navigation}
            />
          ) : null}
          {upcomingCourses.length ? (
            <TopicGroup
              title={"Upcoming"}
              data={upcomingCourses}
              horizontal={false}
              navigation={this.props.navigation}
            />
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

export default TopicScreen;
