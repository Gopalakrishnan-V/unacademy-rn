import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Icon, Container, Content } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import FeedList from "../components/FeedList";
import { fetchFeedItems } from "../services/ApiServices";

const { width, height } = Dimensions.get("window");

class HomeTab extends Component {
  offset = 0;
  limit = 7;

  constructor(props) {
    super(props);
    this.state = {
      feedItems: []
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon ios="ios-home" android="md-home" style={{ color: tintColor }} />
    ),
    tabBarLabel: "Home",
    header: null
  };

  componentDidMount = async () => {
    await this.fetchFeedItems();
  };

  fetchFeedItems = async () => {
    const feedItems = await fetchFeedItems(this.offset);
    if (feedItems.length) {
      this.offset += this.limit;
      this.setState({ feedItems: [...this.state.feedItems, ...feedItems] });
    }
  };

  getTopView = () => {
    return (
      <View
        style={{
          backgroundColor: colors.primaryDark,
          height: height / 8,
          alignSelf: "stretch",
          justifyContent: "flex-end"
        }}
      >
        <View
          name="header"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingStart: 10,
            paddingEnd: 10,
            height: height / 12
          }}
        >
          <TouchableOpacity
            name="searchBar"
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              height: height / 17,
              backgroundColor: colors.searchBarContainer,
              marginEnd: 30,
              borderRadius: 5
            }}
            onPress={() => {
              this.props.navigation.navigate("SearchAutocompleteScreen");
            }}
          >
            <Icon
              ios="ios-search"
              android="md-search"
              style={{ fontSize: 24, color: "white", marginStart: 10 }}
            />

            <Text
              style={{
                color: "white",
                marginStart: 12,
                fontSize: 14
              }}
            >
              Search for courses, educators
            </Text>
          </TouchableOpacity>

          <Icon
            ios="ios-notifications-outline"
            android="md-notifications-outline"
            style={{ fontSize: 28, color: "white" }}
          />
        </View>
      </View>
    );
  };

  render() {
    let { feedItems } = this.state;
    feedItems = feedItems.map((feedItem, feedIndex) => {
      return {
        ...feedItem,
        key: feedIndex + ""
      };
    });

    return (
      <View style={styles.container}>
        {this.getTopView()}
        <FeedList
          feedItems={feedItems}
          fetchFeedItems={this.fetchFeedItems}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomeTab;
