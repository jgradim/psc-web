import "./styles";

import React, { Component } from "react";
import { compose, setDisplayName, mapProps } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router";
import { isNull } from "lodash";

//
// Components
import AccountMenu from "components/account_menu";
import Button from "uikit/button";

export class Navbar extends Component {

  state = {
    menuVisible: false,
  }

  //---------------------------------------------------------------------------
  // Callbacks
  //---------------------------------------------------------------------------

  toggleAccountMenu = () => {
    const { menuVisible } = this.state;
    this.setState({ menuVisible: !menuVisible });
  }


  //---------------------------------------------------------------------------
  // Helpers
  //---------------------------------------------------------------------------
  renderInviteNotification = () => {
    const { invites } = this.props;

    return (
      <Link className="Invite-Notification" to="/account/team">
        {`${invites.length} pending invite(s)!`}
      </Link>
    );
  }

  //---------------------------------------------------------------------------
  // Render
  //---------------------------------------------------------------------------

  render() {
    const { currentUser, displayName, invites } = this.props;
    const { menuVisible } = this.state;

    return (
      <div className="Navbar">
        <AccountMenu isOpen={menuVisible} />

        {invites.length > 0 && this.renderInviteNotification()}

        <Button
          className="AccountMenuToggle"
          onClick={this.toggleAccountMenu}
          success
          hollow
        >
          {currentUser && displayName}
          {!currentUser && "Login"}
        </Button>
      </div>
    );
  }

}

export default compose(
  setDisplayName("Navbar"),

  connect(({ currentUser, invites }) => ({ currentUser, invites })),

  mapProps(({ currentUser, invites }) => ({
    currentUser,
    displayName: isNull(currentUser) ? "" : (currentUser.first_name || currentUser.email),
    invites: invites.filter((invite) => !invite.accepted),
  })),
)(Navbar);
