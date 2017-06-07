import "./styles";

import React, { Component } from "react";
import { compose, setDisplayName } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router";

//
// Components
import { Button } from "uikit";
import AccountMenu from "components/account_menu";
import NotificationCenter from "components/notification_center";

//
// Assets
import logo from "assets/images/logo-purple.svg";

export class Navbar extends Component {

  state = {
    menuVisible: false,
  }

  toggleAccountMenu = () => {
    const { menuVisible } = this.state;
    this.setState({ menuVisible: !menuVisible });
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="Navbar">
        <div className="content">
          <h1 className="Logo">
            <Link to="/">
              <img src={logo} alt="Make or Break." height="60" />
            </Link>
          </h1>

          {/* temporarily disable logged out links in navbar */}
          {!currentUser && false && <Link activeClassName="active" to="/"><Button primary>Home</Button></Link>}
          {!currentUser && false && <Link activeClassName="active" to="/login"><Button primary>Sign In</Button></Link>}
          {!currentUser && false && <Link activeClassName="active" to="/signup"><Button success bold>Sign Up</Button></Link>}

          {currentUser && <NotificationCenter />}
          {currentUser && <AccountMenu />}
        </div>
      </div>
    );
  }

}

export default compose(
  setDisplayName("Navbar"),

  connect(({ currentUser }) => ({ currentUser })),
)(Navbar);
