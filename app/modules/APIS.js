const baseUrl = "https://unacademy.com/api";

export default (APIS = {
  FEED: `${baseUrl}/v1/feeds/user/goal/`,
  UPLUS_GOAL_STATIC_CARD: `${baseUrl}/v1/uplus/subscription/goal_static_card/`,
  UPLUS_GOAL_FEED: `${baseUrl}/v1/uplus/subscription/home/`,
  UPLUS_GOALS: `${baseUrl}/v1/uplus/subscription/goals/`,
  POST: `${baseUrl}/v1/post/`,
  COLLECTION_ITEMS: `${baseUrl}/v2/collection/`,
  COLLECTION: `${baseUrl}/v1/collection/`,
  PROGRAMMES: `${baseUrl}/v1/uplus/programmes/`,
  USER: `${baseUrl}/v1/user/`,
  HATS: `${baseUrl}/v1/gamification/educator/hat/achieved/`,
  CHANNEL: `${baseUrl}/v1/channel/`,
  UPLUS_ONGOING: `${baseUrl}/v1/uplus/subscription/ongoing/`,
  UPLUS_UPCOMING: `${baseUrl}/v1/uplus/subscription/upcoming/`,
  POPULAR: `${baseUrl}/v1/search_v3/populars/`,
  AUTO_COMPLETE: `${baseUrl}/v1/search/autocomplete/elaborated/3/`,
  SEARCH: `${baseUrl}/v1/search_v3/search/`
});
