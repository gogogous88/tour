import { SHOW_COMFIRM } from "./actions";

const INIT = { showComfirm: false };

export default function(state = INIT, action) {
  switch (action.type) {
    case SHOW_COMFIRM:
      return (state.showComfirm = action.payload);

    default:
      return state;
  }
}
