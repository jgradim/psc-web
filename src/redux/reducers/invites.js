import { SET_INVITES, FETCH_INVITES } from "action-types";

export default function(state = [], action) {
  const { payload, type } = action;

  switch(type) {
    case SET_INVITES:
      return payload;

    case FETCH_INVITES:
    default:
      return state;
  }
}
