import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Provider } from "react-redux";
import styles from "./styles";

// app store
import appStore from "./store";

// app views
import AppContainer from "./App";
import AdminContainer from "./Admin";
import Dashboard from "../Views/AdminDashboard";
import Header from "Containers/Header";
import ForumFeed from "../Views/ForumFeed";
import SingleDiscussion from "../Views/SingleDiscussion";
import NewDiscussion from "../Views/NewDiscussion";
import UserProfile from "../Views/UserProfile";
import NotFound from "../Views/NotFound";
import MapHome from "../Views/Map/MapHome";
import MapAttr from "../Views/Map/MapAttr";
import MapDetail from "../Views/Map/MapDetail";
import GoogleSheet from "../Views/googleSheet";
import Search from "../Views/CarRental/search/Search";
import Success from "../Views/CarRental/search/Success";
import Result from "../Views/CarRental/search/Result";
import Extras from "../Views/CarRental/search/Extras";
import Form from "../Views/CarRental/search/Form";
import TourGuideWiki from "../Views/TourGuideWiki/TourGuideWiki";
import MapResult from "../Views/CarRental/search/map/MapHome";
import Test from "../Views/Test";
import Profile from "../Views/Profile";
import ListUser from "../Views/UserList/ListUser";
import Login from "../Components/Header/UserMenu/Login";
import MapUser from "../Views/UserList/MapUser";
import Plan from "../Views/Plan";

//mark - materialize css

// import "materialize-css/dist/css/materialize.min.css";
// import "materialize-css/dist/js/materialize.min.js";

ReactDOM.render(
  <Provider store={appStore}>
    <Router history={browserHistory}>
      <Route path="/admin" component={AdminContainer}>
        <IndexRoute component={Dashboard} />
      </Route>

      <Route path="/" component={AppContainer}>
        <IndexRoute component={ForumFeed} />
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/map/attr" component={MapAttr} />

        <Route path="/map/:id" component={MapDetail} />
        <Route exact path="/map" component={MapHome} />

        <Route path="/googlesheet" component={GoogleSheet} />

        <Route path="/car-rental" component={Search} />

        {/* profile部分 */}
        <Route path="/profile" component={Profile} />

        {/*用户列表*/}

        <Route path="/list/user" component={ListUser} />
        <Route path="/user/map" component={MapUser} />

        <Route exact path="/result" component={Result} />
        <Route path="/result/map" component={MapResult} />

        <Route path="/extras" component={Extras} />
        <Route path="/success" component={Success} />

        <Route path="/form" component={Form} />

        <Route path="/wiki" component={TourGuideWiki} />

        <Route path="/:forum" component={ForumFeed} />
        <Route
          path=":forum/discussion/:discussion"
          component={SingleDiscussion}
        />
        {/* 发布一个寻求信息 */}
        <Route
          path=":forum/new_discussion/req"
          component={NewDiscussion}
          sup_or_req="寻求"
        />
        {/* 发布一个供应信息 */}
        <Route
          path=":forum/new_discussion/sup"
          component={NewDiscussion}
          sup_or_req="提供"
        />
        {/*地图部分*/}

        <Route path="user/:username" component={UserProfile} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
