import Promise from "bluebird";
import { createAction } from "redux-actions";

//
// Util
import request, { processSubmissionError } from "util/http";

//
// Redux
import {
  INVITE_USER_TO_TEAM,
  REVOKE_INVITE,
  SET_INVITES,
  FETCH_INVITES,
  ACCEPT_INVITE,
  REJECT_INVITE,
} from "action-types";

import { fetchTeam } from "actions/teams";

export const inviteUserToTeam = (userId) => {
  return (dispatch) => {
    dispatch(createAction(INVITE_USER_TO_TEAM)());

    return request
    .post("/invites", {
      invite: {
        invitee_id: userId,
      },
    })
    .then(response => {
      const { data } = response.data;

      return dispatch(fetchTeam(data.team.id))
      .then(() => Promise.resolve(data));
    })
    .catch(error => Promise.reject(processSubmissionError(error)));
  };
};

export const revokeInvite = (id, teamId) => {
  return (dispatch) => {
    dispatch(createAction(REVOKE_INVITE)());

    return request
    .delete(`/invites/${id}`)
    .then(() => dispatch(fetchTeam(teamId)))
    .catch(error => Promise.reject(processSubmissionError(error)));
  };
};

export const setInvites = createAction(SET_INVITES);

export const fetchInvites = () => {
  return (dispatch) => {
    dispatch(createAction(FETCH_INVITES)());

    return request
    .get("/invites")
    .then(response => {
      const { data } = response.data;

      dispatch(setInvites(data));

      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(processSubmissionError(error)));
  };
};

export const acceptInvite = (id, teamId) => {
  return (dispatch) => {
    dispatch(createAction(ACCEPT_INVITE)(id));

    return request
    .put(`/invites/${id}/accept`)
    .then(() => dispatch(fetchTeam(teamId)))
    .catch(error => Promise.reject(processSubmissionError(error)));
  };
};

export const rejectInvite = (id) => {
  return (dispatch) => {
    dispatch(createAction(REJECT_INVITE)(id));

    return request
    .delete(`/invites/${id}`)
    .then(() => {})
    .catch(error => Promise.reject(processSubmissionError(error)));
  };
};
