import {
  POSTING_DISCUSSION_START,
  POSTING_DISCUSSION_SUCCESS,
  POSTING_DISCUSSION_FAILURE,
  UPDATE_DISCUSSION_TITLE,
  UPDATE_DISCUSSION_CONTENT,
  UPDATE_DISCUSSION_PIN_STATUS,
  UPDATE_DISCUSSION_TAGS,
  UPDATE_DISCUSSION_RLOC,
  UPDATE_DISCUSSION_PLOC,
  UPDATE_DISCUSSION_PNAME,
  UPDATE_DISCUSSION_PDATE,
  CLEAR_SUCCESS_MESSAGE,
  UPDATE_DISCUSSION_SUP_OR_REQ,
  UPDATE_DISCUSSION_PH_NO,
  UPDATE_DISCUSSION_RDATE,
  UPDATE_DISCUSSION_VEHICLE_TYPE
} from "./constants";

const initialState = {
  postingSuccess: false,
  errorMsg: null,
  postingDiscussion: false,
  title: "",
  rloc: "",
  ploc: "",
  ph_no: "",
  rdate: "",
  vehicleType: "",
  sup_or_req: "",
  pname: "",
  pdate: "",
  content: null,
  tags: [],
  pinned: false
};

export const newDiscussionReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTING_DISCUSSION_START:
      return Object.assign({}, state, {
        postingDiscussion: true
      });

    case POSTING_DISCUSSION_SUCCESS:
      return Object.assign({}, initialState, {
        postingSuccess: true,
        postingDiscussion: false,
        errorMsg: null
      });

    case POSTING_DISCUSSION_FAILURE:
      return Object.assign({}, state, {
        postingSuccess: false,
        postingDiscussion: false,
        errorMsg: action.payload || "Unable to post discussion."
      });

    case CLEAR_SUCCESS_MESSAGE:
      return Object.assign({}, initialState, {
        postingSuccess: false
      });

    case UPDATE_DISCUSSION_TITLE:
      return Object.assign({}, state, {
        title: action.payload
      });

    case UPDATE_DISCUSSION_CONTENT:
      return Object.assign({}, state, {
        content: action.payload
      });

    case UPDATE_DISCUSSION_PIN_STATUS:
      return Object.assign({}, state, {
        pinned: action.payload
      });
    case UPDATE_DISCUSSION_RLOC:
      return Object.assign({}, state, {
        rloc: action.payload
      });
    case UPDATE_DISCUSSION_PLOC:
      return Object.assign({}, state, {
        ploc: action.payload
      });

    case UPDATE_DISCUSSION_PNAME:
      return Object.assign({}, state, {
        pname: action.payload
      });

    case UPDATE_DISCUSSION_PH_NO:
      return Object.assign({}, state, {
        ph_no: action.payload
      });
    case UPDATE_DISCUSSION_RDATE:
      return Object.assign({}, state, {
        rdate: action.payload
      });
    case UPDATE_DISCUSSION_VEHICLE_TYPE:
      return Object.assign({}, state, {
        vehicleType: action.payload
      });
    case UPDATE_DISCUSSION_PDATE:
      return Object.assign({}, state, {
        pdate: action.payload
      });

    case UPDATE_DISCUSSION_TAGS:
      return Object.assign({}, state, {
        tags: action.payload
      });

    case UPDATE_DISCUSSION_SUP_OR_REQ:
      return Object.assign({}, state, {
        sup_or_req: action.payload
      });

    default:
      return state;
  }
};
