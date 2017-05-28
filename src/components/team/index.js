import "./styles";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose, setDisplayName, setPropTypes, defaultProps } from "recompose";
import { connect } from "react-redux";

//
// Components
import Editable from "./editable";
import Static from "./static";

//
// Redux
import { fetchTeam } from "actions/teams";
import { fetchInvites } from "actions/invites";

export class Team extends Component {

  //---------------------------------------------------------------------------
  // Lifecycle
  //---------------------------------------------------------------------------
  componentWillMount() {
    this.requestTeam(this.props);
    this.requestInvites(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const prevId = this.props.id;
    const { id } = nextProps;

    if (prevId !== id) this.requestTeam(nextProps);
  }

  //---------------------------------------------------------------------------
  // Helpers
  //---------------------------------------------------------------------------
  requestTeam = (props) => {
    const { id, dispatch } = props;

    if (id) return dispatch(fetchTeam(id));
  }

  requestInvites = (props) => {
    const { dispatch } = props;

    dispatch(fetchInvites());
  }

  //---------------------------------------------------------------------------
  // Render
  //---------------------------------------------------------------------------
  render() {
    const { editable, team, invite } = this.props;

    if (invite.length > 0) return <div>I have an invite to responde to.</div>;
    return editable
    ? <Editable team={team} />
    : <Static team={team} />;
  }

}

export default compose(
  setDisplayName("Team"),

  connect((state, props) => ({
    team: state.teams[props.id],
    invite: state.invites.filter((invite) => invite.invitee === state.currentUser.id),
  })),

  setPropTypes({
    id: PropTypes.string,
    editable: PropTypes.bool.isRequired,
  }),

  defaultProps({
    editable: false,
  }),
)(Team);
