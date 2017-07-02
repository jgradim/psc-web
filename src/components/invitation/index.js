import "./styles";

import React from "react";
import PropTypes from "prop-types";
import { compose, setDisplayName, setPropTypes, defaultProps } from "recompose";
import { connect } from "react-redux";

//
// Components
import { Button } from "uikit";

//
// Redux
import { acceptInvite, rejectInvite } from "actions/invites";

export const Invitation = ({
  disabled,
  invitation: {
    id,
    host,
    team,
  },
  dispatch,
}) => {
  return (
    <div className="Invitation">
      <span>
        You have been invited by <b>{host.display_name}</b> to join their team <b>{team.name}</b>
      </span>

      <div className="Actions">
        <Button small success disabled={disabled} onClick={() => dispatch(acceptInvite(id))}>Accept</Button>
        <Button small danger onClick={() => dispatch(rejectInvite(id))}>Reject</Button>
      </div>
    </div>
  );
};

export default compose(
  setDisplayName("Invitation"),

  connect(),

  setPropTypes({
    disabled: PropTypes.bool.isRequired,
  }),

  defaultProps({
    disabled: false,
  }),
)(Invitation);
