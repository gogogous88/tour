import { browserHistory } from "react-router";
import {
  POSTING_DISCUSSION_START,
  POSTING_DISCUSSION_END,
  POSTING_DISCUSSION_SUCCESS,
  POSTING_DISCUSSION_FAILURE,
  UPDATE_DISCUSSION_TITLE,
  UPDATE_DISCUSSION_CONTENT,
  UPDATE_DISCUSSION_PIN_STATUS,
  UPDATE_DISCUSSION_TAGS,
  UPDATE_DISCUSSION_RLOC,
  UPDATE_DISCUSSION_PLOC,
  UPDATE_DISCUSSION_SUP_OR_REQ,
  UPDATE_DISCUSSION_PNAME,
  UPDATE_DISCUSSION_IMAGE,
  UPDATE_DISCUSSION_PDATE,
  UPDATE_DISCUSSION_RDATE,
  UPDATE_DISCUSSION_PH_NO,
  UPDATE_DISCUSSION_RATE,
  CLEAR_SUCCESS_MESSAGE,
  UPDATE_DISCUSSION_VEHICLE_TYPE
} from "./constants";
import { postDiscussionApi } from "./api";

/**
 * post a new discussion
 * @param  {ObjectId} userId
 * @param  {ObjectId} forumId
 * @param  {String} currentForum
 * @return {action}
 */
export const postDiscussion = (userId, forumId, currentForum) => {
  return (dispatch, getState) => {
    dispatch({ type: POSTING_DISCUSSION_START });

    // validate discussion inputs
    // discussion values are in redux state
    const {
      title,
      content,
      tags,
      vehicleType,
      pinned,
      rloc,
      ploc,
      sup_or_req,
      pname,
      image,
      rdate,
      ph_no,
      rate,
      pdate
    } = getState().newDiscussion;

    let validated = true;

    if (!userId || !forumId) {
      validated = false;
      return dispatch({
        type: POSTING_DISCUSSION_FAILURE,
        payload: "Something is wrong with user/forum."
      });
    }

    // if (title === null || title.length < 15) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "Title should be at least 15 characters."
    //   });
    // }

    // if (content === null || content.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "Please write some content before posting."
    //   });
    // }

    // if (rloc === null || rloc.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "请填写抵达城市."
    //   });
    // }

    // if (ploc === null || ploc.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "请填写出发地点"
    //   });
    // }

    // if (sup_or_req === null || sup_or_req.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "提供还是寻求"
    //   });
    // }

    // if (pname === null || pname.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "请填写联系人名字"
    //   });
    // }

    // if (image === null || image.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "请填写联系人名字"
    //   });
    // }

    // if (ph_no === null || ph_no.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "联系人电话格式不正确美国10位或11位，中国11位"
    //   });
    // }
    // if (rate === null || rate.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "价格不能为空"
    //   });
    // }

    // if (rdate === null || rdate.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "日期不能为空"
    //   });
    // }

    // if (pdate === null || pdate.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "请填写出发日期."
    //   });
    // }

    // if (tags === null || tags.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "Please provide some tags."
    //   });
    // }

    // if (vehicleType === null || vehicleType.length === 0) {
    //   validated = false;
    //   return dispatch({
    //     type: POSTING_DISCUSSION_FAILURE,
    //     payload: "请填写车型"
    //   });
    // }

    // make api call if post is validated
    if (validated) {
      postDiscussionApi({
        userId,
        forumId,
        title,
        content,
        rloc,
        ploc,

        sup_or_req,
        pname,
        image,
        ph_no,
        rate,
        rdate,
        pdate,
        tags,
        vehicleType,
        pinned
      }).then(
        data => {
          if (data.data.postCreated === true) {
            dispatch({ type: POSTING_DISCUSSION_SUCCESS });
            setTimeout(() => {
              dispatch({ type: CLEAR_SUCCESS_MESSAGE });
            }, 2000);

            // issue a redirect to the newly reacted discussion
            browserHistory.push(
              `/${currentForum}/discussion/${data.data.discussion_slug}`
            );
          } else {
            dispatch({
              type: POSTING_DISCUSSION_FAILURE,
              payload:
                "Something is wrong at our server end. Please try again later"
            });
          }
        },
        error => {
          dispatch({
            type: POSTING_DISCUSSION_FAILURE,
            payload: error
          });
        }
      );
    }
  };
};

/**
 * update the discussion title in redux state (controlled input)
 * @param  {String} value
 * @return {action}
 */
export const updateDiscussionTitle = value => {
  return {
    type: UPDATE_DISCUSSION_TITLE,
    payload: value
  };
};

/**
 * update discussion content in redux state (controlled input)
 * @param  {Object} value
 * @return {action}
 */
export const updateDiscussionContent = value => {
  return {
    type: UPDATE_DISCUSSION_CONTENT,
    payload: value
  };
};

/**
 * update discussion pinned status in redux state (controlled input)
 * @param  {Boolean} value
 * @return {action}
 */
export const updateDiscussionPinStatus = value => {
  return {
    type: UPDATE_DISCUSSION_PIN_STATUS,
    payload: value
  };
};

/**
 * update discussion tags in redux state (controlled input)
 * @param  {Array} value
 * @return {action}
 */
export const updateDiscussionTags = value => {
  return {
    type: UPDATE_DISCUSSION_TAGS,
    payload: value
  };
};

export const updateDiscussionRloc = value => {
  return {
    type: UPDATE_DISCUSSION_RLOC,
    payload: value
  };
};

export const updateDiscussionVehicleType = value => {
  return {
    type: UPDATE_DISCUSSION_VEHICLE_TYPE,
    payload: value
  };
};

export const updateDiscussionPloc = value => {
  return {
    type: UPDATE_DISCUSSION_PLOC,
    payload: value
  };
};

export const updateDiscussionSup_or_req = value => {
  return {
    type: UPDATE_DISCUSSION_SUP_OR_REQ,
    payload: value
  };
};

export const updateDiscussionPname = value => {
  return {
    type: UPDATE_DISCUSSION_PNAME,
    payload: value
  };
};

export const updateDiscussionImage = value => {
  return {
    type: UPDATE_DISCUSSION_IMAGE,
    payload: value
  };
};

export const updateDiscussionPh_no = value => {
  return {
    type: UPDATE_DISCUSSION_PH_NO,
    payload: value
  };
};

export const updateDiscussionRate = value => {
  return {
    type: UPDATE_DISCUSSION_RATE,
    payload: value
  };
};

export const updateDiscussionRdate = value => {
  return {
    type: UPDATE_DISCUSSION_RDATE,
    payload: value
  };
};

export const updateDiscussionPdate = value => {
  return {
    type: UPDATE_DISCUSSION_PDATE,
    payload: value
  };
};
