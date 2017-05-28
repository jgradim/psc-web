import Promise from "bluebird";
import { createAction } from "redux-actions";

import request, { processSubmissionError } from "util/http";

import {
  FETCH_INVITES,
  SET_INVITES,
} from "action-types";

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
