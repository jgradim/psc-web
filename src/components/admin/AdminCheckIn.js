import React, { Component, Fragment } from "react";
import { compose, setDisplayName, withState } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { fullTeam, competition, fullUser } from "fragments";
import { last, every } from "lodash";
import { waitForData } from "enhancers";
import { DataTable, CollapsibleContainer, Btn } from "components/uikit";

export class AdminCheckIn extends Component {
  componentDidMount() {
    const { data: { competitions }, competitionId, setCompetitionId } = this.props;
    if (!competitionId) setCompetitionId(competitions.find(c => c.isDefault).id);
  }

  // gets the users filtered based on which competition they are in
  getFilteredUsers = () => {
    const { data: { users, teams }, competitionId } = this.props;
    const cleanUsers = users.edges.map(e => e.node);
    const cleanTeams = teams.edges.map(e => e.node);

    const usersFilteredIds = [].concat.apply(
      [],
      cleanTeams.filter(t => t.competition.id === competitionId)
        .map(t => t.memberships.map(m => m.userId))
    );

    return cleanUsers.filter(u => usersFilteredIds.indexOf(u.id) > -1);
  }

  toggleUserCheckin = ({ id }) => {
    const { toggleUserCheckin, data } = this.props;
    return toggleUserCheckin({ variables: { id }})
      .then(() => data.refetch());
  }

  renderActions = (selected) => (
    <Fragment>
      {
        every(selected, user => !user.currentAttendance.checkedIn) &&
          <Btn
            className="icon icon--small icon--check-circle"
            confirmation={`Really check in ${selected.length} users?`}
            onClick={() => selected.forEach(this.toggleUserCheckin)}
          >
            Check in {selected.length} users
          </Btn>
      }

      {every(selected, user => user.currentAttendance.checkedIn) &&
        <Btn
          className="icon icon--small icon--check-circle"
          confirmation={`Really check out ${selected.length} users?`}
          onClick={() => selected.forEach(this.toggleUserCheckin)}
        >
          Check out {selected.length} users
        </Btn>
      }
    </Fragment>
  )

  render() {
    const { data: { competitions }, competitionId, setCompetitionId } = this.props;

    return (
      <div className="admin--container admin--teams">
        <div className="admin--container--header">
          <h3>
            Competition:
            <select value={competitionId} onChange={ev => setCompetitionId(ev.target.value)}>
              <option value="" disabled>Choose a competition</option>
              {competitions.map(competition => (
                <option key={competition.id} value={competition.id}>
                  {competition.name}{competition.isDefault && " (default)"}
                </option>
              ))}
            </select>
          </h3>
        </div>

        <DataTable
          filter
          source={this.getFilteredUsers()}
          labels={["Name", "Email", "Role", "Size", "Workshops", "Team", "GitHub", "Checked in"]}
          mobile={[true, true, true, true, false, true, true, true]}
          sorter={["displayName", "email", "role", null, null, "currentTeam.name", null, null]}
          search={["displayName", "role", "tshirtSize", "currentTeam.name"]}
          actions={this.renderActions}
          render={(user, select) => (
            <tr key={user.id} className={user.role}>
              {select}
              <td className="mobile">{user.displayName}</td>
              <td className="mobile">{user.email}</td>
              <td className="mobile">{user.role}</td>
              <td className="mobile">{user.tshirtSize}</td>
              <td className="desktop">
                <CollapsibleContainer
                  preview={`${user.workshops.length} workshops`}
                >
                  {user.workshops && user.workshops.map(({ slug }) => (
                    <div key={slug}>
                      <span className="tag purple">{slug}</span>
                    </div>
                  ))}
                </CollapsibleContainer>
              </td>
              <td className="mobile">{user.currentTeam && user.currentTeam.name}</td>
              <td className="github mobile">{last((user.githubHandle || "").split("/"))}</td>
              <td className="mobile">{user.currentAttendance && user.currentAttendance.checkedIn.toString()}</td>
            </tr>
          )}
        />
      </div>
    );
  }
}

export default compose(
  setDisplayName("AdminCheckIn"),

  withState("competitionId", "setCompetitionId", ""),

  graphql(
    gql`query teams($competitionId: String!, $skip: Boolean!) {
      users(first: 1000) { edges { node { ...fullUser } } }
      teams(first: 1000) { edges { node { id memberships { userId } competition { id } } } }
      competitions { ...competition }
      competition(id: $competitionId) @skip(if: $skip) { id teams { ...fullTeam } }
    } ${competition} ${fullTeam} ${fullUser}`,
    {
      options: ({ competitionId }) => ({
        variables: {
          competitionId,
          skip: !competitionId,
        },
      }),
    },
  ),

  waitForData,

  graphql(
    gql`mutation toggleUserCheckin($id: String!) {
      toggleUserCheckin(id: $id) { ...fullUser }
    } ${fullUser}`,
    { name: "toggleUserCheckin" },
  ),

)(AdminCheckIn);