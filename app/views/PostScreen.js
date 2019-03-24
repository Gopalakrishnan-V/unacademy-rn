import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  WebView,
  Image,
  TouchableOpacity
} from "react-native";
import { Button, Icon } from "native-base";
import colors from "../modules/Colors";
import dimens from "../modules/Dimens";
import PostActions from "../components/PostActions";
import {
  fetchPostDetails,
  fetchCollectionItems,
  fetchCollectionDetails
} from "../services/ApiServices";
import { FlatList } from "react-native-gesture-handler";
import { getCondensedNumber } from "../modules/Util";

const { width, height } = Dimensions.get("window");

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      postDetails: {
        post_id: props.navigation.state.params.post_id
      },
      collectionItems: []
    };
    this.collection_id = props.navigation.state.params.collection_id;
  }

  componentDidMount = async () => {
    if (this.state.postDetails.post_id) {
      await this.onFetchPostDetails();
    } else {
      this.onFetchPostIdByCollectionId();
    }
  };

  onFetchPostIdByCollectionId = async () => {
    const result = await fetchCollectionDetails(this.collection_id);
    if (result.isSuccess) {
      const post_id = result.data.progress.next_lesson_uid;
      this.setState(
        { postDetails: { ...this.state.postDetails, post_id } },
        () => {
          this.onFetchPostDetails();
        }
      );
    }
  };

  onFetchPostDetails = async () => {
    const { post_id } = this.state.postDetails;
    const result = await fetchPostDetails(post_id);
    if (result.isSuccess) {
      this.setState(
        { isLoaded: true, postDetails: { ...result.data, post_id } },
        () => {
          this.onFetchCollectionItems();
        }
      );
    }
  };

  onFetchCollectionItems = async () => {
    const { collection } = this.state.postDetails;
    const results = await fetchCollectionItems(collection.uid);
    this.setState({ collectionItems: results });
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
          height: height / 12
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
            source={require("../assets/icons/ic_playlist_add.png")}
            style={{ width: 25, height: 25 }}
          />
          <Image
            source={require("../assets/icons/ic_download.png")}
            style={{ width: 25, height: 25, marginStart: 25 }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              borderRadius: 4,
              marginStart: 25
            }}
          >
            <Image
              source={require("../assets/icons/ic_bookmark_border.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: dimens.normalText,
                marginStart: 5
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  getProfileUI = () => {
    const { isLoaded, postDetails } = this.state;
    const { author } = postDetails;

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginStart: 10,
            marginEnd: 10,
            marginTop: 20
          }}
        >
          <View
            style={{
              backgroundColor: colors.chipBackground,
              padding: 5,
              borderRadius: 5
            }}
          >
            <Text
              style={{
                color: colors.chipText,
                fontSize: dimens.normalText
              }}
            >
              {postDetails.language.toUpperCase()}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={{
              color: colors.chipText,
              marginStart: 10,
              marginEnd: 60
            }}
          >
            {postDetails.collection.name}
          </Text>
        </View>

        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            fontSize: dimens.extraLargeText,
            fontWeight: "500"
          }}
        >
          {postDetails.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginHorizontal: 10
          }}
        >
          <TouchableOpacity
            style={{ flex: 3, flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              this.props.navigation.push("UserProfileScreen", {
                username: author.username
              });
            }}
          >
            <Image
              source={{ uri: author.avatar }}
              style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
            />
            <View style={{ marginStart: 10 }}>
              <Text style={{ fontSize: dimens.largeText }}>
                {author.first_name + " " + author.last_name}
              </Text>
              <Text
                style={{
                  fontSize: dimens.normalText,
                  color: colors.subTitleColor,
                  marginTop: 3
                }}
              >
                {getCondensedNumber(author.followers_count) + " followers"}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 20,
                alignSelf: "stretch",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: dimens.largeText,
                  fontWeight: "500"
                }}
              >
                Follow
              </Text>
            </Button>
          </View>
          <View />
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: colors.divider,
            marginTop: 15,
            marginHorizontal: 15
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 15,
            marginHorizontal: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: colors.yellowRating,
                fontSize: dimens.normalText
              }}
            >
              {4.9}
            </Text>
            <Icon
              name="star"
              style={{
                fontSize: 14,
                color: colors.yellowRating,
                marginStart: 5
              }}
            />
            <Text
              style={{
                fontSize: dimens.normalText,
                marginStart: 5,
                color: colors.subTitleColor
              }}
            >
              {`(${27} ratings)`}
            </Text>
          </View>

          <Text
            style={{
              color: colors.primary,
              fontSize: dimens.normalText,
              fontWeight: "500"
            }}
          >
            Write a review
          </Text>
        </View>
      </View>
    );
  };

  onRenderCollectionItem = item => {
    item = item.item;
    const { key, rank, value } = item;
    const { uid, title, video } = value;

    const textColor =
      this.state.postDetails.post_id === uid
        ? colors.primary
        : colors.subTitleColor;

    return (
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", padding: 10 }}
          onPress={() => {
            const updatedPostDetails = {
              ...this.state.postDetails,
              post_id: uid
            };
            this.setState({ postDetails: updatedPostDetails }, () => {
              this.onFetchPostDetails();
            });
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: dimens.normalText,
                color: textColor
              }}
            >
              {rank < 10 ? "0" + rank : rank}
            </Text>
          </View>

          <View style={{ flex: 5 }}>
            <Text
              style={{
                fontSize: dimens.largeText,
                color: textColor
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: dimens.normalText,
                marginTop: 6,
                color: textColor
              }}
            >
              {`${this.addDigits(
                Math.round(video.duration / 60)
              )} : ${this.addDigits(Math.round(video.duration % 60))}`}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="bookmark" style={{ fontSize: 25, color: "gray" }} />
          </View>
        </TouchableOpacity>

        <View style={{ height: 1, backgroundColor: colors.divider }} />
      </View>
    );
  };

  addDigits = num => {
    return num < 10 ? "0" + num : num;
  };

  render() {
    const { isLoaded, postDetails } = this.state;
    const { author } = postDetails;

    let { collectionItems = [] } = this.state;
    collectionItems = collectionItems.map(
      (collectionItem, collectionItemIndex) => {
        return {
          ...collectionItem,
          key: collectionItemIndex + ""
        };
      }
    );

    return (
      <View style={{ flex: 1 }}>
        {this.getStatusBar()}
        {this.getToolbar()}
        {isLoaded ? (
          <View>
            <View style={{ height: width / 1.8, backgroundColor: "black" }}>
              <WebView
                source={{
                  uri: postDetails.video.url
                }}
                style={{ backgroundColor: "black" }}
              />
            </View>
            <PostActions
              likes_count={postDetails.recommend_count}
              comments_count={postDetails.comments_count}
              navigation={this.props.navigation}
            />
            <View style={{ height: 1, backgroundColor: colors.divider }} />
          </View>
        ) : null}

        {collectionItems.length ? (
          <FlatList
            data={collectionItems}
            ListHeaderComponent={() => {
              return this.getProfileUI();
            }}
            renderItem={this.onRenderCollectionItem}
          />
        ) : null}
      </View>
    );
  }
}

export default componentName;
