import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import dimens from "../modules/Dimens";
import colors from "../modules/Colors";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";
import { getCondensedNumber } from "../modules/Util";

const { width, height } = Dimensions.get("window");

class EducatorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRenderItem = item => {
    const { horizontal = true, goal_uid } = this.props;
    item = item.item;
    const itemWidth = horizontal ? width / 2.5 : width;

    const {
      key,
      intro_photo,
      first_name,
      last_name,
      username,
      live_minutes
    } = item;

    return (
      <TouchableOpacity
        style={{
          width: itemWidth,
          backgroundColor: "white",
          margin: 3
        }}
        key={key}
        onPress={() => {
          this.props.navigation.push("EducatorProfileScreen", {
            username,
            goal_uid
          });
        }}
      >
        <Image
          source={{ uri: intro_photo }}
          resizeMode="cover"
          style={{ width: itemWidth, height: width / 2, borderRadius: 4 }}
        />

        <Text
          style={{ color: "black", fontSize: dimens.normalText, marginTop: 8 }}
        >
          {first_name + " " + last_name}
        </Text>

        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Image
            source={require("../assets/icons/ic_wifi.png")}
            style={{ width: 15, height: 15 }}
          />
          <Text
            style={{
              color: colors.subTitleColor,
              fontSize: dimens.normalText,
              marginStart: 5
            }}
          >
            {getCondensedNumber(live_minutes / 60).toLowerCase()} live minutes
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { title, indexKey, horizontal = false } = this.props;
    let { data } = this.props;
    data = data.map((dataItem, dataIndex) => {
      return {
        ...dataItem,
        key: dataIndex + ""
      };
    });

    return (
      <View style={{ marginTop: 10, paddingBottom: 10 }} key={indexKey}>
        <Text
          style={{
            fontSize: dimens.extraLargeText,
            color: "black",
            fontWeight: "600",
            marginStart: 10,
            marginTop: 10,
            marginBottom: 5
          }}
        >
          {title}
        </Text>

        <FlatList
          data={data}
          renderItem={this.onRenderItem}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginStart: 5
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default EducatorsList;
