import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  WebView,
  Image,
  TouchableOpacity
} from "react-native";
import { Button, Icon } from "native-base";
import colors from "../modules/Colors";
import dimens from "../modules/Dimens";
import {
  fetchUserDetails,
  fetchHats,
  fetchChannelStories
} from "../services/ApiServices";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";
import { getCondensedNumber } from "../modules/Util";
import FeedList from "../components/FeedList";

const { width, height } = Dimensions.get("window");

class UserProfileScreen extends Component {
  offset = 0;
  limit = 10;

  constructor(props) {
    super(props);
    this.username = props.navigation.state.params.username;

    this.state = {
      isLoaded: false,
      userDetails: {},
      hats: [],
      channelStories: []
    };
  }

  componentDidMount = async () => {
    await this.onFetchUserDetails();
    await this.onFetchHats();
  };

  onFetchUserDetails = async () => {
    const result = await fetchUserDetails(this.username);
    if (result.isSuccess) {
      this.setState(
        {
          isLoaded: true,
          userDetails: result.data,
          hats: [
            { count: 0, hat: { hat_icon: result.data.avatar } },
            ...this.state.hats
          ]
        },
        () => {
          this.onFetchFeedItems();
        }
      );
    }
  };

  onFetchHats = async () => {
    const hats = await fetchHats(this.username);
    this.setState({ hats: [...this.state.hats, ...hats] });
  };

  onFetchFeedItems = async () => {
    const stories = await fetchChannelStories(
      this.state.userDetails.channels[0].uid
    );
    if (stories.length) {
      this.offset += this.limit;
      this.setState({
        channelStories: [...this.state.channelStories, ...stories]
      });
    }
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

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../assets/icons/ic_forward.png")}
            style={{ width: 25, height: 25 }}
          />
          <Image
            source={require("../assets/icons/ic_three_dots.png")}
            style={{ width: 25, height: 25, marginStart: 25 }}
          />
        </View>
      </View>
    );
  };

  onRenderHatItem = item => {
    item = item.item;
    const { key, count, hat } = item;
    const { hat_icon } = hat;

    return (
      <View key={key} style={{ margin: 5 }}>
        <Image
          source={{ uri: hat_icon }}
          resizeMode="cover"
          style={[
            { width: width / 7 },
            { height: width / 7 },
            !count ? { borderRadius: width / (7 * 2) } : null
          ]}
        />
        {count ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 3,
              left: 0,
              right: 3,
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000000BB",
                width: 25,
                height: 25,
                borderRadius: 25 / 2
              }}
            >
              <Text style={{ color: "white", fontSize: dimens.miniText }}>
                {count}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  getProfileUI = () => {
    const { isLoaded, userDetails } = this.state;
    let { hats } = this.state;
    hats = hats.map((hat, hatIndex) => {
      return {
        ...hat,
        key: hatIndex + ""
      };
    });

    if (!isLoaded) {
      return null;
    }

    const {
      first_name,
      last_name,
      profile_since,
      bio,
      followers_count,
      follows_count
    } = userDetails;

    return (
      <View>
        <FlatList
          horizontal={true}
          data={hats}
          renderItem={this.onRenderHatItem}
          contentContainerStyle={{ marginStart: 5 }}
          showsHorizontalScrollIndicator={false}
        />

        <Text
          style={{
            color: "black",
            fontSize: 22,
            fontWeight: "600",
            marginTop: 15,
            marginStart: 10
          }}
        >
          {first_name + " " + last_name}
        </Text>

        <Text
          style={{
            marginTop: 5,
            marginHorizontal: 10,
            fontSize: dimens.normalText,
            color: colors.subTitleColor
          }}
        >
          {`Educator since ${moment(profile_since).format("MMMM YYYY")}`}
        </Text>

        <Text
          style={{
            marginTop: 10,
            marginStart: 10,
            fontSize: dimens.normalText,
            color: colors.subTitleColor
          }}
        >
          {bio}
        </Text>

        <View
          style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 10 }}
        >
          <View style={{ flex: 3, flexDirection: "row" }}>
            <View style={{ alignItems: "flex-start" }}>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: dimens.hugeText,
                  fontWeight: "600"
                }}
              >
                {getCondensedNumber(followers_count)}
              </Text>
              <Text
                style={{
                  color: colors.subTitleColor,
                  fontSize: dimens.miniText,
                  marginTop: 2
                }}
              >
                Followers
              </Text>
            </View>

            <View style={{ marginStart: 25, alignItems: "flex-start" }}>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: dimens.hugeText,
                  fontWeight: "600"
                }}
              >
                {getCondensedNumber(follows_count)}
              </Text>
              <Text
                style={{
                  color: colors.subTitleColor,
                  fontSize: dimens.miniText,
                  marginTop: 2
                }}
              >
                Following
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Button
              style={{
                alignSelf: "stretch",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.primary
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: dimens.normalText,
                  fontWeight: "700"
                }}
              >
                Follow
              </Text>
            </Button>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#abb9d133",
            marginTop: 15,
            paddingHorizontal: 10,
            paddingVertical: 25
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "600",
              fontSize: dimens.extraLargeText
            }}
          >{`${first_name}'s Feed`}</Text>
        </View>
      </View>
    );
  };

  render() {
    let { channelStories: stories } = this.state;
    const feedItems = stories.map((story, storyIndex) => {
      return {
        key: storyIndex + "",
        type: "story",
        data: { ...story }
      };
    });

    return (
      <View>
        {this.getStatusBar()}
        {this.getToolbar()}
        <FeedList
          header={this.getProfileUI()}
          feedItems={feedItems}
          fetchFeedItems={this.onFetchFeedItems}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default UserProfileScreen;
