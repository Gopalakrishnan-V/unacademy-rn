import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { Button, Icon } from "native-base";
import dimens from "../modules/Dimens";
import colors from "../modules/Colors";
import { search } from "../services/ApiServices";
import { FlatList } from "react-native-gesture-handler";
import { getCondensedNumber } from "../modules/Util";

const { width, height } = Dimensions.get("window");

class SearchResultsScreen extends Component {
  constructor(props) {
    super(props);

    this.label = props.navigation.state.params.label;
    this.state = {
      isLoaded: false,
      users: [],
      results: []
    };
  }

  componentDidMount = async () => {
    const data = await search(this.label);
    if (data.isSuccess) {
      const { users, results } = data.data;
      this.setState({ isLoaded: true, users, results });
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

        <Text
          numberOfLines={1}
          style={{
            fontSize: dimens.largeText,
            fontWeight: "600",
            marginStart: 15,
            marginEnd: 60
          }}
        >
          {this.label}
        </Text>
      </View>
    );
  };

  getUserListUI = () => {
    let { users } = this.state;
    users = users.map((user, userIndex) => {
      return {
        ...user,
        key: userIndex + ""
      };
    });

    if (!users.length) {
      return null;
    }

    return (
      <View>
        <FlatList
          data={users}
          horizontal
          renderItem={item => {
            item = item.item;

            const { key, value } = item;
            const {
              username,
              avatar,
              first_name,
              last_name,
              is_verified_educator,
              followers_count,
              bio,
              courses_count
            } = value;

            return (
              <View
                style={{
                  width: width / 1.2,
                  backgroundColor: "white",
                  margin: 10,
                  padding: 5,
                  borderRadius: 5
                }}
                key={key}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    console.log("username", username);
                    this.props.navigation.push("UserProfileScreen", {
                      username
                    });
                  }}
                >
                  <Image
                    source={{ uri: avatar }}
                    style={{
                      flex: 1,
                      width: 40,
                      height: 40,
                      borderRadius: 40 / 2
                    }}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 4 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: dimens.largeText,
                          color: "black",
                          fontWeight: "500"
                        }}
                      >
                        {first_name + " " + last_name}
                      </Text>
                      {is_verified_educator ? (
                        <Image
                          source={require("../assets/images/verified.png")}
                          style={{
                            marginStart: 2,
                            width: 15,
                            height: 15,
                            borderRadius: 15 / 2
                          }}
                        />
                      ) : null}
                    </View>

                    <Text
                      style={{
                        color: colors.subTitleColor,
                        fontSize: dimens.miniText,
                        marginTop: 4
                      }}
                    >
                      {getCondensedNumber(followers_count) + " Followers"}
                    </Text>
                  </View>
                </TouchableOpacity>

                <Text
                  style={{ fontSize: dimens.normalText, margin: 10 }}
                  numberOfLines={3}
                >
                  {bio}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    marginHorizontal: 10,
                    alignItems: "center"
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: dimens.extraLargeText
                      }}
                    >
                      {courses_count}
                    </Text>
                    <Text style={{ fontSize: dimens.miniText }}>Courses</Text>
                  </View>

                  <Button
                    style={{
                      backgroundColor: colors.primary,
                      flex: 4,
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: dimens.largeText,
                        fontWeight: "600"
                      }}
                    >
                      Follow
                    </Text>
                  </Button>
                </View>
              </View>
            );
          }}
        />

        <Text
          style={{
            color: "black",
            fontSize: dimens.extraLargeText,
            fontWeight: "600",
            marginVertical: 10,
            marginHorizontal: 10
          }}
        >
          Results
        </Text>
      </View>
    );
  };

  getThumnail = (thumbnail, onThumbnailPress) => {
    return (
      <TouchableOpacity
        style={{
          height: width / 2,
          marginTop: 8,
          justifyContent: "center"
        }}
        onPress={onThumbnailPress}
      >
        <Image source={{ uri: thumbnail }} style={{ flex: 1 }} />
        <View
          style={{
            alignSelf: "stretch",
            flex: 1,
            backgroundColor: "#00000022",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        />
        <Image
          source={require("../assets/images/play_button_round.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            position: "absolute",
            alignSelf: "center"
          }}
        />
      </TouchableOpacity>
    );
  };

  onRenderResultItem = item => {
    item = item.item;
    const { value, key, type } = item;
    if (type !== "collection") {
      return null;
    }

    const {
      uid,
      name,
      author,
      thumbnail,
      language_display,
      concept_topology,
      avg_rating,
      total_ratings
    } = value;

    return (
      <View
        key={key}
        style={{ marginHorizontal: 10, borderRadius: 5, marginBottom: 40 }}
      >
        {this.getThumnail(thumbnail, () => {
          this.props.navigation.push("PostScreen", {
            collection_id: uid
          });
        })}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginStart: 10,
            marginEnd: 10,
            marginTop: 10
          }}
        >
          <View
            style={{
              backgroundColor: colors.chipBackground,
              padding: 3,
              borderRadius: 5
            }}
          >
            <Text
              style={{
                color: colors.chipText,
                fontSize: dimens.normalText
              }}
            >
              {language_display.toUpperCase()}
            </Text>
          </View>
          <Text style={{ color: colors.chipText, marginStart: 10 }}>
            {concept_topology.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginStart: 10,
            marginEnd: 10
          }}
        >
          <View style={{ flex: 1.5, marginTop: 8 }}>
            <Text style={{ fontSize: dimens.normalText }}>{name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Text
                style={{
                  color: colors.yellowRating,
                  fontSize: dimens.miniText
                }}
              >
                {avg_rating}
              </Text>
              <Icon
                name="star"
                style={{
                  fontSize: 14,
                  color: colors.yellowRating,
                  marginStart: 4
                }}
              />
              <Text
                style={{
                  fontSize: dimens.miniText,
                  marginStart: 4,
                  color: colors.subTitleColor
                }}
              >
                {`(${total_ratings} ratings)`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Image
                source={{ uri: author.avatar }}
                style={{ width: 20, height: 20, borderRadius: 20 / 2 }}
              />
              <Text style={{ marginStart: 8, fontSize: dimens.miniText }}>
                {author.first_name + " " + author.last_name}
              </Text>
              {author.is_verified_educator ? (
                <Image
                  source={require("../assets/images/verified.png")}
                  style={{
                    marginStart: 4,
                    width: 12,
                    height: 12,
                    borderRadius: 12 / 2
                  }}
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let { results } = this.state;
    results = results.map((result, resultIndex) => {
      return {
        ...result,
        key: resultIndex + ""
      };
    });

    return (
      <View style={{ backgroundColor: "#abb9d133" }}>
        {this.getStatusBar()}
        {this.getToolbar()}
        <FlatList
          data={results}
          renderItem={this.onRenderResultItem}
          ListHeaderComponent={() => {
            return this.getUserListUI();
          }}
        />
      </View>
    );
  }
}

export default SearchResultsScreen;
