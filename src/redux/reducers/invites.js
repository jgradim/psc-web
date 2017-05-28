import { SET_INVITES, FETCH_INVITES, ACCEPT_INVITE, REJECT_INVITE } from "action-types";

import { omit } from "lodash";

export default function(state = [], action) {
  const { payload, type } = action;

  switch(type) {
    case SET_INVITES:
      return payload;

    case ACCEPT_INVITE:
    case REJECT_INVITE:
      return omit(state, o => o.id === payload);

    case FETCH_INVITES:
    default:
      return state;
  }
}