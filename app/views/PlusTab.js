import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { Icon, Button } from "native-base";
import dimens from "../modules/Dimens";
import { fetchGoalStaticCard, fetchGoalFeed } from "../services/ApiServices";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import TopicGroup from "../components/TopicGroup";
import AllTopicGroup from "../components/AllTopicGroup";
import EducatorsList from "../components/EducatorsList";

const { width, height } = Dimensions.get("window");

class PlusTab extends Component {
  limit = 3;
  offset = 1;

  constructor(props) {
    super(props);
    this.state = {
      goal_uid: "KSCGY",
      goal_name: "UPSC CSE",
      goal_static_card: {
        isLoaded: false,
        live_hours: "",
        educators_count: "",
        languages: []
      },
      feedItems: []
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon ios="ios-tv" android="md-tv" style={{ color: tintColor }} />
    ),
    tabBarLabel: "Plus"
  };

  componentDidMount = async () => {
    await this.onFetchStaticCardData();
    await this.onFetchGoalFeed();
  };

  onGoalChange = (goal_uid, goal_name) => {
    this.offset = 1;
    this.setState({ feedItems: [], goal_uid, goal_name }, () => {
      this.onFetchStaticCardData();
      this.onFetchGoalFeed();
    });
  };

  onFetchStaticCardData = async () => {
    const result = await fetchGoalStaticCard(this.state.goal_uid);
    if (result.isSuccess) {
      const { data } = result;
      this.setState({ goal_static_card: { isLoaded: true, ...data } });
    }
  };

  onFetchGoalFeed = async () => {
    const { goal_uid } = this.state;
    const results = await fetchGoalFeed(goal_uid, this.limit, this.offset);
    this.setState({ feedItems: [...this.state.feedItems, ...results] }, () => {
      this.offset += this.limit;
    });
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
    const { goal_name } = this.state;
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
          this.props.navigation.navigate("GoalsScreen", {
            onGoalChange: this.onGoalChange
          });
        }}
      >
        <Text style={{ fontSize: dimens.extraLargeText, fontWeight: "600" }}>
          {goal_name}
        </Text>
        <Image
          source={require("../assets/icons/ic_arrow_down.png")}
          style={{ width: 25, height: 25, marginStart: 10 }}
        />
      </TouchableOpacity>
    );
  };

  getStaticCard = () => {
    const { goal_static_card } = this.state;
    const {
      isLoaded,
      live_hours,
      educators_count,
      languages
    } = goal_static_card;

    if (!isLoaded) {
      return null;
    }

    return (
      <View
        style={{
          backgroundColor: "#e2e6ea8f",
          paddingBottom: 15
        }}
      >
        <Image
          source={require("../assets/images/subscription_banner.jpg")}
          resizeMode="contain"
          style={{
            width,
            height: width / 2
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 0
          }}
        >
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <Image
              source={require("../assets/icons/ic_wifi.png")}
              style={{ width: 25, height: 25 }}
            />
          </View>

          <Text
            style={{ marginStart: 20, fontSize: dimens.normalText, flex: 3 }}
          >
            {live_hours} hours of live sessions every day
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15
          }}
        >
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <Image
              source={require("../assets/icons/ic_subscriptions.png")}
              style={{ width: 25, height: 25 }}
            />
          </View>

          <Text
            style={{ marginStart: 20, fontSize: dimens.normalText, flex: 3 }}
          >
            Structured courses in {languages.join(", ")}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15
          }}
        >
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <Image
              source={require("../assets/icons/ic_people.png")}
              style={{ width: 25, height: 25 }}
            />
          </View>

          <Text
            style={{ marginStart: 20, fontSize: dimens.normalText, flex: 3 }}
          >
            {educators_count} Top Educators
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15
          }}
        >
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <Image
              source={require("../assets/icons/ic_star_border.png")}
              style={{ width: 25, height: 25 }}
            />
          </View>

          <Text
            style={{ marginStart: 20, fontSize: dimens.normalText, flex: 3 }}
          >
            New courses published every month
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginStart: 15,
            marginEnd: 15
          }}
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
              <Text style={{ color: colors.primary }}>Learn more</Text>
            </Button>
          </View>

          <View style={{ flex: 1, marginStart: 10 }}>
            <Button
              style={{
                backgroundColor: colors.primary,
                alignSelf: "stretch",
                justifyContent: "center"
              }}
              onPress={() => {
                this.props.navigation.navigate("WelcomeScreen");
              }}
            >
              <Text style={{ color: "white" }}>Get Subscription</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  };

  onRenderFeedItem = item => {
    item = item.item;

    const { key, type, data } = item;
    switch (type) {
      case "upcoming": {
        return (
          <TopicGroup
            title={"Upcoming courses"}
            data={data}
            horizontal={true}
            navigation={this.props.navigation}
          />
        );
      }
      case "all_topic_groups": {
        return (
          <AllTopicGroup
            title={"Topics"}
            data={data}
            horizontal={true}
            navigation={this.props.navigation}
          />
        );
      }
      case "educators": {
        return (
          <EducatorsList
            title={"Educators"}
            data={data}
            horizontal={true}
            goal_uid={this.state.goal_uid}
            navigation={this.props.navigation}
          />
        );
      }
      case "topic_group": {
        const { extra_block_info } = item;
        const { name } = extra_block_info;
        return (
          <TopicGroup
            title={name}
            data={data}
            horizontal={true}
            navigation={this.props.navigation}
          />
        );
      }
    }
  };

  render() {
    let { feedItems } = this.state;
    feedItems = feedItems.map((feedItem, feedItemIndex) => {
      return {
        ...feedItem,
        key: feedItemIndex + ""
      };
    });

    return (
      <View style={styles.container}>
        {this.getStatusBar()}
        {this.getToolbar()}
        <FlatList
          data={feedItems}
          renderItem={this.onRenderFeedItem}
          onEndReachedThreshold={1}
          onEndReached={async () => {
            await this.onFetchGoalFeed();
          }}
          ListHeaderComponent={() => this.getStaticCard()}
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

export default PlusTab;
