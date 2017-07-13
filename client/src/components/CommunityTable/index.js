import React, { Component } from 'react';
import axios from 'axios';


export default class CommunityTable extends Component {

  constructor(props) {
    super(props);

    this.deleteCommunity = this.deleteCommunity.bind(this);
  }

  deleteCommunity(communityId) {
    console.log(communityId);
    axios
      .delete('/api/communities', {params: {id: communityId}})
      .then((res) => {
        console.log("deleted");
      });
  }

  render() {
    return (
      <table>
        <tbody>
          {
            this.props.communities.map((community, index) => {
              return (
                <tr key={community.id} id={`row${community.id}`}>
                  <td>
                    <button onClick={() => this.deleteCommunity(community.id)}>Delete</button>
                  </td>
                  <td>{community.name}</td>
                  <td>{community.address}</td>
                  <td>{community.longitude}, {community.latitude  }</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
