import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { Header, Item, Icon, Input, Button } from "native-base";
import { SearchBar } from "react-native-elements";
import { fetchPopulars, fetchAutocomplete } from "../services/ApiServices";
import { FlatList } from "react-native-gesture-handler";
import dimens from "../modules/Dimens";
import colors from "../modules/Colors";
import { getCondensedNumber } from "../modules/Util";

const { width, height } = Dimensions.get("window");

class SearchAutocompleteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: [],
      populars: []
    };
  }

  componentDidMount = async () => {
    await this.onFetchPopulars();
  };

  onFetchPopulars = async () => {
    const populars = await fetchPopulars();
    this.setState({ results: populars, populars });
  };

  onFetchAutocomplete = async () => {
    let { query, populars } = this.state;
    query = query.toLowerCase().trim();
    if (!query) {
      this.setState({ results: [...populars] });
    } else {
      const results = await fetchAutocomplete(query);
      this.setState({ results });
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

  getSearchBar = () => {
    const { query } = this.state;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.pop();
          }}
          style={{
            width: 25,
            height: 25,
            marginStart: 20
          }}
        >
          <Image
            source={require("../assets/icons/ic_back.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>

        <SearchBar
          placeholder="Search Topic, Courses & Educators"
          onChangeText={query => {
            this.setState({ query }, () => {
              this.onFetchAutocomplete();
            });
          }}
          value={query}
          lightTheme={true}
          containerStyle={{
            backgroundColor: "white",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            width: "90%",
            marginStart: 10,
            marginEnd: 10
          }}
        />
      </View>
    );
  };

  onRenderItem = item => {
    item = item.item;

    const { key, type } = item;
    if (type === "popular") {
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
          onPress={() => {
            this.props.navigation.push("SearchResultsScreen", {
              label: item.query
            });
          }}
        >
          <Image
            source={require("../assets/icons/ic_trending.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text
            numberOfLines={1}
            style={{
              marginStart: 15,
              fontSize: dimens.normalText,
              marginEnd: 60
            }}
          >
            {item.query}
          </Text>
        </TouchableOpacity>
      );
    } else if (type === "search" || type === "keyword") {
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
          onPress={() => {
            this.props.navigation.push("SearchResultsScreen", {
              label: item.label
            });
          }}
        >
          <Image
            source={require("../assets/icons/ic_search_cirlcle.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text
            numberOfLines={1}
            style={{
              marginStart: 15,
              fontSize: dimens.normalText,
              marginEnd: 60
            }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    } else if (type === "user") {
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
          onPress={() => {
            this.props.navigation.push("UserProfileScreen", {
              username: item.details.username
            });
          }}
        >
          <Image
            source={{ uri: item.details.avatar }}
            style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />

          <View style={{ marginStart: 15, marginEnd: 60 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: dimens.normalText
              }}
            >
              {item.label}
            </Text>

            <Text
              style={{
                fontSize: dimens.miniText,
                color: colors.subTitleColor,
                marginTop: 3
              }}
            >{`${getCondensedNumber(
              item.details.followers
            )} followers  \u2022   ${item.details.courses} courses`}</Text>
          </View>
        </TouchableOpacity>
      );
    }
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
      <View>
        {this.getStatusBar()}
        {this.getSearchBar()}
        <FlatList data={results} renderItem={this.onRenderItem} />
      </View>
    );
  }
}

export default SearchAutocompleteScreen;
