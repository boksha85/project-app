import React, {Component} from 'react';

export default class UsersCount extends Component {
  constructor(props)
  {
    super(props);
    this.unseenEmails = this.props.mails.unseenEmails;
    this.pseudopolisEmails = this.props.mails.pseudopolisEmails;
    this.mendedDrumEmails = this.props.mails.mendedDrumEmails;
  }

  render()
  {
    return (
      <table className="table table-hover table-fixed">
        <thead className="thead-dark">
        <tr>
          <th>Network</th>
          <th>Number of users imported</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Unseen network users</td>
          <td>{this.unseenEmails.length}</td>
        </tr>
        <tr>
          <td>Pseudopolis network users</td>
          <td>{this.pseudopolisEmails.length}</td>
        </tr>
        <tr>
          <td>Mended Drum users</td>
          <td>{this.mendedDrumEmails.length}</td>
        </tr>
        </tbody>
      </table>
    )
  }

}