import axios from "axios";
import APIS from "../modules/APIS";

export const fetchFeedItems = async offset => {
  try {
    const feedResponse = await axios({
      method: "get",
      url: APIS.FEED,
      params: {
        version: 1,
        exp_variation: 2,
        goal: "KSCGY",
        limit: 7,
        offset
      }
    });

    const data = feedResponse.data;
    const { results = [] } = data;
    return results;
  } catch (error) {
    return [];
  }
};

export const fetchGoalStaticCard = async goal_uid => {
  try {
    const staticCardResponse = await axios({
      method: "get",
      url: APIS.UPLUS_GOAL_STATIC_CARD,
      params: {
        goal_uid
      }
    });

    const data = staticCardResponse.data;
    const { live_hours, languages, educators_count } = data;
    return {
      isSuccess: true,
      data: { live_hours, languages, educators_count }
    };
  } catch (error) {
    return { isSuccess: false };
  }
};

export const fetchGoalFeed = async (goal_uid, limit, offset) => {
  try {
    const goalFeedResponse = await axios({
      method: "get",
      url: APIS.UPLUS_GOAL_FEED,
      params: {
        goal_uid,
        limit,
        offset
      }
    });

    const data = goalFeedResponse.data;
    const { results = [] } = data;
    return results;
  } catch (error) {
    return [];
  }
};

export const fetchGoals = async () => {
  try {
    const goalsResponse = await axios({
      method: "get",
      url: APIS.UPLUS_GOALS
    });

    const data = goalsResponse.data;
    const { goals = [] } = data;
    return goals;
  } catch (error) {
    return [];
  }
};

export const fetchPostDetails = async post_id => {
  try {
    const postResponse = await axios({
      method: "get",
      url: APIS.POST + `${post_id}/`
    });
    const data = postResponse.data;
    return { data, isSuccess: true };
  } catch (error) {
    return { isSuccess: false };
  }
};

export const fetchCollectionItems = async collection_id => {
  try {
    const collectionItemsResponse = await axios({
      method: "get",
      url: APIS.COLLECTION_ITEMS + `${collection_id}/items/`,
      params: {
        limit: 75,
        offset: 0
      }
    });
    const data = collectionItemsResponse.data;
    return data.results;
  } catch (error) {
    return [];
  }
};

export const fetchCollectionDetails = async collection_id => {
  try {
    const collectionResponse = await axios({
      method: "get",
      url: APIS.COLLECTION + `${collection_id}/`
    });
    const data = collectionResponse.data;
    return { data, isSuccess: true };
  } catch (error) {
    return { isSuccess: false };
  }
};

export const fetchProgrammeDetails = async programme_id => {
  try {
    const programmeResponse = await axios({
      method: "get",
      url: APIS.PROGRAMMES + `${programme_id}/details/`
    });
    const data = programmeResponse.data;
    return { data, isSuccess: true };
  } catch (error) {
    return { isSuccess: false };
  }
};

export const fetchProgrammeItems = async programme_id => {
  try {
    const programmerItemsResponse = await axios({
      method: "get",
      url: APIS.PROGRAMMES + `${programme_id}/items/`,
      params: {
        limit: 150
      }
    });
    const data = programmerItemsResponse.data;
    return data.results;
  } catch (error) {
    return [];
  }
};

export const fetchUserDetails = async username => {
  try {
    const userDetailsResponse = await axios({
      method: "get",
      url: APIS.USER + `${username}/`
    });
    const data = userDetailsResponse.data;
    return { data, isSuccess: true };
  } catch (error) {
    return { isSuccess: false };
  }
};

export const fetchHats = async username => {
  try {
    const hatsResponse = await axios({
      method: "get",
      url: APIS.HATS,
      params: {
        username
      }
    });
    const data = hatsResponse.data;
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchChannelStories = async (channel_id, limit, offset) => {
  try {
    const storiesResponse = await axios({
      method: "get",
      url: APIS.CHANNEL + `${channel_id}/stories/`,
      params: {
        version: 1,
        limit,
        offset
      }
    });
    const data = storiesResponse.data;
    return data.results;
  } catch (error) {
    return [];
  }
};

export const fetchLiveClassesStats = async username => {
  try {
    const liveClassesResponse = await axios({
      method: "get",
      url: APIS.USER + `${username}/live_classes_stats/`
    });
    const data = liveClassesResponse.data;
    return { data, isSuccess: true };
  } catch (error) {
    return { isSuccess: false };
  }
};

export const fetchOngoingCourses = async (educator_username, goal_uid) => {
  try {
    const onGoingCoursesResponse = await axios({
      method: "get",
      url: APIS.UPLUS_ONGOING,
      params: {
        educator_username,
        goal_uid
      }
    });
    const data = onGoingCoursesResponse.data;
    return data.results;
  } catch (error) {
    return [];
  }
};

export const fetchUpcomingCourses = async (educator_username, goal_uid) => {
  try {
    const onUpcomingCoursesResponse = await axios({
      method: "get",
      url: APIS.UPLUS_UPCOMING,
      params: {
        educator_username,
        goal_uid
      }
    });
    const data = onUpcomingCoursesResponse.data;
    return data.results;
  } catch (error) {
    return [];
  }
};

export const fetchPopulars = async () => {
  try {
    const response = await axios({
      method: "get",
      url: APIS.POPULAR
    });
    const data = response.data;
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchAutocomplete = async q => {
  try {
    const response = await axios({
      method: "get",
      url: APIS.AUTO_COMPLETE,
      params: {
        q
      }
    });
    const data = response.data;
    return data;
  } catch (error) {
    return [];
  }
};

export const search = async query => {
  try {
    const liveClassesResponse = await axios({
      method: "get",
      url:
        APIS.SEARCH +
        "?limit=15&q=" +
        query +
        "&filters_applied={%22context%22:{%22name%22:%22All%20of%20Unacademy%22,%22context%22:%22generic%22},%22order%22:{%22id%22:%22relevance%22,%22name%22:%22Relevance%22},%22language%22:{%22id%22:%22any%22,%22name%22:%22Any%20Language%22}}"
    });
    const data = liveClassesResponse.data;
    return { data, isSuccess: true };
  } catch (error) {
    return { isSuccess: false };
  }
};

export const fetchOngoingTopicCourses = async topic_group_uid => {
  try {
    const response = await axios({
      method: "get",
      url: APIS.UPLUS_ONGOING,
      params: {
        topic_group_uid
      }
    });
    const data = response.data;
    return data.results;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export const fetchUpcomingTopicCourses = async topic_group_uid => {
  try {
    const response = await axios({
      method: "get",
      url: APIS.UPLUS_UPCOMING,
      params: {
        topic_group_uid
      }
    });
    const data = response.data;
    return data.results;
  } catch (error) {
    return [];
  }
};
