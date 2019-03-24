import React, { Component } from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { Button, Icon } from "native-base";
import colors from "../modules/Colors";
import dimens from "../modules/Dimens";
import {
  fetchLiveClassesStats,
  fetchOngoingCourses,
  fetchUpcomingCourses
} from "../services/ApiServices";
import { ScrollView } from "react-native-gesture-handler";
import { getCondensedNumber } from "../modules/Util";
import TopicGroup from "../components/TopicGroup";

const { width, height } = Dimensions.get("window");

class EducatorProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.username = props.navigation.state.params.username;
    this.goal_uid = props.navigation.state.params.goal_uid;
    // this.username = "AyusshSanghi";
    // this.goal_uid = "KSCGY";

    this.state = {
      isLoaded: false,
      liveClassesStats: {},
      onGoingCourses: [],
      upcomingCourses: []
    };
  }

  componentDidMount = async () => {
    await this.onFetchLiveClassesStats();
  };

  onFetchLiveClassesStats = async () => {
    const result = await fetchLiveClassesStats(this.username);
    if (result.isSuccess) {
      this.setState(
        { isLoaded: true, liveClassesStats: { ...result.data } },
        async () => {
          await this.onFetchOnGoingCourses();
          await this.onFetchUpcomingCourses();
        }
      );
    }
  };

  onFetchOnGoingCourses = async () => {
    const results = await fetchOngoingCourses(this.username, this.goal_uid);
    this.setState({ onGoingCourses: results });
  };

  onFetchUpcomingCourses = async () => {
    const results = await fetchUpcomingCourses(this.username, this.goal_uid);
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

  getEducatorProfileUI = () => {
    const { isLoaded, liveClassesStats } = this.state;
    const {
      username,
      intro_photo,
      first_name,
      last_name,
      live_minutes,
      live_classes,
      upvotes
    } = liveClassesStats;

    if (!isLoaded) {
      return null;
    }

    return (
      <View>
        <Image
          source={{ uri: intro_photo }}
          style={{ width, height: width / 1.8 }}
        />

        <Text
          style={{
            color: "black",
            fontSize: dimens.extraLargeText,
            fontWeight: "600",
            marginStart: 10,
            marginTop: 15
          }}
        >
          {first_name + " " + last_name}
        </Text>

        <Text
          onPress={() => {
            this.props.navigation.push("UserProfileScreen", {
              username
            });
          }}
          style={{
            color: colors.blue,
            fontSize: dimens.normalText,
            marginStart: 10,
            marginTop: 8
          }}
        >
          View complete profile
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 20
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "black",
                fontSize: dimens.hugeText
              }}
            >
              {getCondensedNumber(live_minutes / 60).toLowerCase()}
            </Text>
            <Text
              style={{
                marginTop: 3,
                color: colors.subTitleColor,
                fontSize: dimens.normalText
              }}
            >
              Live minutes
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "black",
                fontSize: dimens.hugeText
              }}
            >
              {live_classes}
            </Text>
            <Text
              style={{
                marginTop: 3,
                color: colors.subTitleColor,
                fontSize: dimens.normalText
              }}
            >
              Classes taught
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "black",
                fontSize: dimens.hugeText
              }}
            >
              {Math.round(upvotes)}%
            </Text>
            <Text
              style={{
                marginTop: 3,
                color: colors.subTitleColor,
                fontSize: dimens.normalText
              }}
            >
              Rating
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { onGoingCourses, upcomingCourses } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        {this.getStatusBar()}

        <ScrollView>
          {this.getEducatorProfileUI()}
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

export default EducatorProfileScreen;
