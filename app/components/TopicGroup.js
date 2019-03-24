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

const { width, height } = Dimensions.get("window");

class TopicGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRenderItem = item => {
    const { horizontal = false } = this.props;
    item = item.item;
    const itemWidth = horizontal ? width / 1.3 : width - 20;

    const {
      key,
      uid,
      cover_photo,
      name,
      topic_groups,
      start_date,
      item_count,
      author
    } = item;

    return (
      <TouchableOpacity
        style={{ width: itemWidth, margin: 10 }}
        key={key}
        onPress={() => {
          this.props.navigation.navigate("PlusCourseScreen", {
            programme_id: uid
          });
        }}
      >
        <Image
          source={{ uri: cover_photo }}
          resizeMode="cover"
          style={{ height: width / 2.5, width: itemWidth }}
        />

        <Text
          style={{
            color: colors.blue,
            fontSize: dimens.normalText,
            marginTop: 15
          }}
        >
          {topic_groups
            .map(topic_group => topic_group.name)
            .join(" ")
            .toUpperCase()}
        </Text>

        <Text
          style={{ color: "black", fontSize: dimens.largeText, marginTop: 5 }}
        >
          {name}
        </Text>

        <Text
          style={{
            fontSize: dimens.normalText,
            color: colors.subTitleColor,
            marginTop: 7
          }}
        >
          {`Starts on ${moment(start_date).format(
            "MMM DD, h:mm A"
          )}  \u2022  ${item_count} lessons`}
        </Text>

        <Text
          style={{
            fontSize: dimens.normalText,
            color: colors.subTitleColor,
            marginTop: 7
          }}
        >
          {author.first_name + " " + author.last_name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { title, horizontal = false } = this.props;
    let { data } = this.props;
    data = data.map((dataItem, dataIndex) => {
      return {
        ...dataItem,
        key: dataIndex + ""
      };
    });

    return (
      <View style={{ marginTop: 10, paddingBottom: 10 }}>
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default TopicGroup;
