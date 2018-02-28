import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import { appReducer, userReducer } from "./reducers";
import { feedReducer } from "../Views/ForumFeed/reducers";
import { singleDiscussionReducer } from "../Views/SingleDiscussion/reducers";
import { newDiscussionReducer } from "../Views/NewDiscussion/reducers";
import { adminInfoReducer } from "../Views/AdminDashboard/reducers";
import { userProfileReducer } from "../Views/UserProfile/reducers";
import { mapReducer } from "../Views/Map/reducers";
import { nightReducer } from "../Views/googleSheet/reducers";
import rentalReducer from "../Views/CarRental/reducers";
import { reducer as form } from "redux-form";
import userList from "../Views/UserList/reducers";
import gnc from "../Views/TourGuideWiki/reducers";
import hotelRsvp from "../Views/HotelRsvp/reducers";
import city from "../Views/Test/reducers";
import allHotelRsvp from "../Components/Admin/HotelRsvp/reducers";

// root reducer for app
const rootReducer = combineReducers({
  MapDataMore: mapReducer,
  nightData: nightReducer,
  user: userReducer,
  app: appReducer,
  feed: feedReducer,
  discussion: singleDiscussionReducer,
  newDiscussion: newDiscussionReducer,
  adminInfo: adminInfoReducer,
  userProfile: userProfileReducer,
  rentalReducer: rentalReducer,
  userList: userList,
  form,
  gnc,
  hotelRsvp,
  city,
  allHotelRsvp
});

// dev tool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// application store
let store = createStore(
  rootReducer,
  /* preloaded state, */
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
