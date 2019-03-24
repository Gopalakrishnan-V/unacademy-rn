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

class AllTopicGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRenderItem = item => {
    const { horizontal = true } = this.props;
    item = item.item;
    const itemWidth = horizontal ? width / 2.5 : width;

    const { key, count, name, uid } = item;

    return (
      <TouchableOpacity
        style={{
          width: itemWidth,
          height: width / 1.75,
          backgroundColor: "#415364",
          margin: 3
        }}
        key={key}
        onPress={() => {
          this.props.navigation.push("TopicScreen", {
            title: name,
            topic_group_uid: uid
          });
        }}
      >
        <View
          style={{
            flex: 3,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: dimens.largeText,
              fontWeight: "800"
            }}
          >
            {name}
          </Text>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{ color: "white", fontSize: dimens.normalText }}
          >{`${count} courses`}</Text>
          <View
            style={{
              width: itemWidth / 4,
              height: 2,
              marginTop: 5,
              backgroundColor: colors.primary
            }}
          />
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

export default AllTopicGroup;
