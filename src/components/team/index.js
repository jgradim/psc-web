import "./styles";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose, setDisplayName, setPropTypes, defaultProps } from "recompose";
import { connect } from "react-redux";

//
// Components
import Editable from "./editable";
import Static from "./static";
import Button from "uikit/button";

//
// Redux
import { fetchTeam } from "actions/teams";
import { fetchInvites, acceptInvite, rejectInvite } from "actions/members";

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
  // Callbacks
  //---------------------------------------------------------------------------
  acceptInviteCallback = (id, teamId) => {
    const { dispatch } = this.props;

    return dispatch(acceptInvite(id, teamId));
  }

  rejectInviteCallback = (id) => {
    const { dispatch } = this.props;

    return dispatch(rejectInvite(id));
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

  renderInviteLinks = (invite, index) => {
    return (
      <div key={`invite-${index}`}>
        <p>You have been invited to Team {invite.team.name}</p>
        <Button onClick={this.acceptInviteCallback(invite.id, invite.team.id)} fakelink>Accept</Button>
        <Button onClick={this.rejectInviteCallback(invite.id)} fakelink>Reject</Button>
      </div>
    );
  }

  //---------------------------------------------------------------------------
  // Render
  //---------------------------------------------------------------------------
  render() {
    const { editable, team, invites } = this.props;

    if (invites.length > 0) return <div>{invites.map((invite, index) => this.renderInviteLinks(invite, index))}</div>;

    return editable
    ? <Editable team={team} />
    : <Static team={team} />;
  }

}

export default compose(
  setDisplayName("Team"),

  connect((state, props) => ({
    team: state.teams[props.id],
    invites: state.invites,
  })),

  setPropTypes({
    id: PropTypes.string,
    editable: PropTypes.bool.isRequired,
  }),

  defaultProps({
    editable: false,
  }),
)(Team);
