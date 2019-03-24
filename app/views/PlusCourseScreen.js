import React, { Component } from "react";
import { View, Text, Dimensions, WebView, Image } from "react-native";
import { Button, Icon } from "native-base";
import colors from "../modules/Colors";
import dimens from "../modules/Dimens";
import { getCondensedNumber } from "../modules/Util";
import {
  fetchProgrammeDetails,
  fetchProgrammeItems
} from "../services/ApiServices";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";
import { create } from "uuid-js";

const { width, height } = Dimensions.get("window");

class PlusCourseScreen extends Component {
  constructor(props) {
    super(props);
    this.programme_id = props.navigation.state.params.programme_id;
    // this.programme_id = "N1O9Z6TE";

    this.state = {
      isLoaded: false,
      programmeDetails: {},
      programmeItems: []
    };
  }

  componentDidMount = async () => {
    await this.onFetchProgrammeDetails();
    await this.onFetchProgrammeItems();
  };

  onFetchProgrammeDetails = async () => {
    const result = await fetchProgrammeDetails(this.programme_id);
    if (result.isSuccess) {
      this.setState({ isLoaded: true, programmeDetails: { ...result.data } });
    }
  };

  onFetchProgrammeItems = async () => {
    const results = await fetchProgrammeItems(this.programme_id);
    this.setState({ programmeItems: results });
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

  getProgrammeDetailsUI = () => {
    const { isLoaded, programmeDetails } = this.state;
    if (!isLoaded) {
      return null;
    }

    const {
      intro_video,
      language_display,
      name,
      author,
      starts_at,
      ends_at
    } = programmeDetails;

    return (
      <View style={{ marginBottom: 10 }}>
        <View name="video" style={{ height: 220, backgroundColor: "black" }}>
          <WebView
            source={{
              uri: intro_video
            }}
            style={{ height: width / 1.5, backgroundColor: "black" }}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <View
            style={{
              backgroundColor: colors.chipBackground,
              padding: 5,
              borderRadius: 5,
              marginStart: 10,
              marginTop: 15
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
        </View>

        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            fontSize: dimens.extraLargeText,
            fontWeight: "500"
          }}
        >
          {name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
            marginHorizontal: 10
          }}
        >
          <Image
            source={{ uri: author.avatar }}
            style={{ width: 25, height: 25, borderRadius: 25 / 2 }}
          />
          <Text
            style={{
              marginStart: 8,
              fontSize: dimens.normalText,
              color: "black",
              fontWeight: "500"
            }}
          >
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

        <View
          style={{
            height: 1,
            marginHorizontal: 15,
            marginTop: 15,
            backgroundColor: colors.divider
          }}
        />

        <View name="duration" style={{ flexDirection: "row", marginTop: 15 }}>
          <View
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: colors.subTitleColor,
                fontSize: dimens.normalText
              }}
            >
              STARTS
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: "black",
                fontSize: dimens.largeText
              }}
            >
              {`${moment(starts_at).format("MMM")} \n ${moment(
                starts_at
              ).format("DD")} `}
            </Text>
          </View>

          <View style={{ width: 1, backgroundColor: colors.divider }} />

          <View
            style={{
              flex: 5,
              alignItems: "flex-start",
              justifyContent: "center",
              marginStart: 15
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/icons/ic_calendar.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ marginStart: 10, fontSize: dimens.normalText }}>
                {`${moment(starts_at).format("MMM DD")} - ${moment(
                  ends_at
                ).format("MMM DD")}`}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center"
              }}
            >
              <Image
                source={require("../assets/icons/ic_subscriptions.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ marginStart: 10, fontSize: dimens.normalText }}>
                34 lessons, 7 quizzes
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ height: 10, backgroundColor: "#EDEDED", marginTop: 20 }}
        />
      </View>
    );
  };

  onRenderProgrammeItem = item => {
    item = item.item;
    const { key, created_at, properties, rank, type } = item;
    const { name } = properties;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 20,
            paddingHorizontal: 10
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: dimens.normalText }}>{`${moment(
              created_at
            ).format("MMM")} \n ${moment(properties.created_at).format(
              "DD"
            )}`}</Text>
          </View>

          <View
            style={{
              flex: 4,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "black", fontSize: dimens.largeText }}>
              {type === "quiz" ? properties.title : name}
            </Text>
            <Text
              style={{
                color: colors.subTitleColor,
                fontSize: dimens.normalText,
                marginTop: 5
              }}
            >{`${type === "post" ? `Lesson ${rank}` : "Quiz"} \u2022 ${moment(
              created_at
            ).format("hh: mm A")}`}</Text>
          </View>
        </View>

        <View style={{ height: 1, backgroundColor: colors.divider }} />
      </View>
    );
  };

  render() {
    let { programmeItems } = this.state;
    programmeItems = programmeItems.map((programmeItem, programmeItemIndex) => {
      return {
        ...programmeItem,
        key: programmeItemIndex + ""
      };
    });

    return (
      <View>
        {this.getStatusBar()}
        <FlatList
          data={programmeItems}
          renderItem={this.onRenderProgrammeItem}
          ListHeaderComponent={() => {
            return this.getProgrammeDetailsUI();
          }}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    );
  }
}

export default PlusCourseScreen;
