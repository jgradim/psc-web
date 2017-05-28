import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import currentUser from "./current_user";
import jwt from "./jwt";
import ready from "./ready";
import teams from "./teams";
import projects from "./projects";
import users from "./users";
import invites from "./invites";

export default combineReducers({
  form,
  currentUser,
  jwt,
  ready,
  teams,
  projects,
  users,
  invites,
});
