import "./styles";

import React from "react";
import PropTypes from "prop-types";
import { compose, setDisplayName, getContext, lifecycle } from "recompose";
import { connect } from "react-redux";

export const Authenticated = ({ currentUser, children }) => (currentUser ? children : <div />);

export default compose(
  setDisplayName("Authenticated"),

  getContext({
    router: PropTypes.object.isRequired, 
  }),

  connect(({ currentUser }) => ({ currentUser })),

  lifecycle({
    componentWillMount() {
      const { currentUser, router } = this.props;
      if (!currentUser) router.push("/");
    },

    componentWillReceiveProps(nextProps) {
      const { currentUser, router } = nextProps;
      if (!currentUser) router.push("/");
    },
  }),
)(Authenticated);
