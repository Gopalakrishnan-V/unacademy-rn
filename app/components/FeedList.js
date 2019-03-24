import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Button, Icon, Toast } from "native-base";
import TimeAgo from "javascript-time-ago";
import Hyperlink from "react-native-hyperlink";

const { width, height } = Dimensions.get("window");
import en from "javascript-time-ago/locale/en";
import colors from "../modules/Colors";
import dimens from "../modules/Dimens";
import PostActions from "./PostActions";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

class FeedList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAuthorHeader = data => {
    const { author, verb_text, created_at } = data;
    const { username, first_name, last_name, avatar } = author;

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignSelf: "stretch",
          alignItems: "center",
          justifyContent: "center",
          padding: 10
        }}
        onPress={() => {
          this.props.navigation.push("UserProfileScreen", {
            username: username
          });
        }}
      >
        <Image
          source={{ uri: avatar }}
          style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
        />
        <View
          style={{
            flexDirection: "column",
            marginStart: 12,
            justifyContent: "center",
            alignSelf: "stretch",
            flex: 1
          }}
        >
          <Text
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: dimens.normalText,
                fontWeight: "500"
              }}
            >
              {first_name + " " + last_name}{" "}
            </Text>
            <Text
              style={{
                fontSize: dimens.miniText,
                color: colors.subTitleColor,
                marginStart: 2
              }}
            >
              {verb_text}
            </Text>
          </Text>

          <Text
            style={{
              marginTop: 2,
              color: colors.subTitleColor,
              fontSize: dimens.miniText
            }}
          >
            {timeAgo.format(new Date(created_at))}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  getDescription = message => {
    return (
      <Hyperlink
        style={{ marginStart: 10, marginEnd: 10 }}
        linkDefault={true}
        linkStyle={{ color: "#2980b9" }}
      >
        <Text
          name="message"
          numberOfLines={3}
          style={{
            fontSize: dimens.normalText
          }}
        >
          {message}
        </Text>
      </Hyperlink>
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

  renderPeekCourse = item => {
    item = item.item;
    const { course, key } = item;
    const {
      uid,
      name,
      author,
      thumbnail,
      language_display,
      concept_topology,
      avg_rating,
      total_ratings
    } = course;

    return (
      <View key={key} style={{ margin: 5, width: width / 1.1 }}>
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
            {concept_topology ? concept_topology.name : ""}
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

  getStoryItem = item => {
    const { data } = item;
    const { object_type, message } = data;
    switch (object_type) {
      case 4: {
        const { object, reactions_count, comments_count } = data;
        const {
          name,
          author,
          thumbnail,
          language_display,
          concept_topology,
          avg_rating,
          total_ratings
        } = object;
        return (
          <View style={{ marginBottom: 20 }}>
            {this.getAuthorHeader(data)}
            {this.getDescription(message)}
            {this.getThumnail(thumbnail, () => {
              this.props.navigation.push("PostScreen", {
                collection_id: data.object_meta
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
                  {language_display.toUpperCase()}
                </Text>
              </View>
              <Text style={{ color: colors.chipText, marginStart: 10 }}>
                {concept_topology ? concept_topology.name : ""}
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

              <View style={{ flex: 1, alignItems: "center" }}>
                <View
                  name="saveButton"
                  style={{
                    borderColor: colors.primary,
                    borderWidth: 2,
                    borderRadius: 5,
                    paddingStart: 20,
                    paddingEnd: 20,
                    paddingTop: 5,
                    paddingBottom: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon
                    style={{ color: colors.primary, fontSize: 20 }}
                    name="bookmark"
                  />
                  <Text
                    style={{
                      marginStart: 5,
                      fontWeight: "600",
                      fontSize: dimens.normalText,
                      color: colors.primary
                    }}
                  >
                    SAVE
                  </Text>
                </View>
              </View>
            </View>

            <PostActions
              likes_count={reactions_count}
              comments_count={comments_count}
              navigation={this.props.navigation}
            />
          </View>
        );
      }
      case 5: {
        const { object, reactions_count, comments_count } = data;
        const { author, video } = object;
        const { title, collection_name, language } = object;
        return (
          <View style={{ marginBottom: 20 }}>
            {this.getAuthorHeader(data)}
            {this.getDescription(message)}
            {this.getThumnail(video.thumbnail, () => {
              this.props.navigation.push("PostScreen", {
                post_id: data.object_meta
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
                  {language.toUpperCase()}
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
                {collection_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginStart: 10,
                marginEnd: 10,
                marginTop: 10
              }}
            >
              <View style={{ flex: 1.5, marginTop: 0 }}>
                <Text style={{ fontSize: dimens.normalText }}>{title}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10
                  }}
                >
                  <Icon
                    name="time"
                    style={{
                      fontSize: 14,
                      color: "#999999",
                      marginStart: 4
                    }}
                  />

                  <Text
                    style={{
                      color: colors.subTitleColor,
                      fontSize: dimens.miniText,
                      marginStart: 5
                    }}
                  >
                    2m 44s
                  </Text>

                  <Text
                    style={{
                      fontSize: dimens.miniText,
                      marginStart: 6,
                      color: colors.subTitleColor
                    }}
                  >
                    {`\u2022  904 views`}
                  </Text>
                </View>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <View
                  name="saveButton"
                  style={{
                    borderColor: colors.primary,
                    borderWidth: 2,
                    borderRadius: 5,
                    paddingStart: 20,
                    paddingEnd: 20,
                    paddingTop: 5,
                    paddingBottom: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon
                    style={{ color: colors.primary, fontSize: 20 }}
                    name="bookmark"
                  />
                  <Text
                    style={{
                      marginStart: 5,
                      fontWeight: "600",
                      fontSize: dimens.normalText,
                      color: colors.primary
                    }}
                  >
                    SAVE
                  </Text>
                </View>
              </View>
            </View>

            <PostActions
              likes_count={reactions_count}
              comments_count={comments_count}
              navigation={this.props.navigation}
            />
          </View>
        );
      }
      case 8: {
        const { object, reactions_count, comments_count } = data;
        const { name } = object;
        let { peek_courses } = object;
        peek_courses = peek_courses.map((peek_course, peek_course_index) => {
          return {
            ...peek_course,
            key: peek_course_index + ""
          };
        });

        return (
          <View style={{ marginBottom: 20 }}>
            {this.getAuthorHeader(data)}
            {this.getDescription(message)}

            {
              <FlatList
                data={peek_courses}
                renderItem={this.renderPeekCourse}
                horizontal={true}
              />
            }

            <View
              style={{
                flexDirection: "row",
                marginStart: 10,
                marginEnd: 10,
                marginTop: 10
              }}
            >
              <View
                style={{
                  flex: 1.5,
                  margiTop: 0,
                  justifyContent: "center",
                  alignSelf: "stretch"
                }}
              >
                <Text style={{ fontSize: dimens.normalText }}>{name}</Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <View
                  name="saveButton"
                  style={{
                    borderColor: colors.primary,
                    borderWidth: 2,
                    borderRadius: 5,
                    paddingStart: 20,
                    paddingEnd: 20,
                    paddingTop: 5,
                    paddingBottom: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon
                    style={{ color: colors.primary, fontSize: 20 }}
                    name="bookmark"
                  />
                  <Text
                    style={{
                      marginStart: 5,
                      fontWeight: "600",
                      fontSize: dimens.normalText,
                      color: colors.primary
                    }}
                  >
                    SAVE
                  </Text>
                </View>
              </View>
            </View>

            <PostActions
              likes_count={reactions_count}
              comments_count={comments_count}
              navigation={this.props.navigation}
            />
          </View>
        );
      }
    }
  };

  renderItem = item => {
    item = item.item;
    if (item.type === "story") {
      return this.getStoryItem(item);
    }
  };

  render() {
    const { feedItems, fetchFeedItems } = this.props;
    return (
      <FlatList
        data={feedItems}
        renderItem={this.renderItem}
        onEndReachedThreshold={1}
        onEndReached={() => {
          fetchFeedItems();
        }}
        ListHeaderComponent={() => {
          return this.props.header ? this.props.header : null;
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default FeedList;
