import React, { Component } from 'react';
import axios from 'axios';


export default class CommunityTable extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log(this.props.communities);

    return (
      <table>
        <tbody>
          {
            this.props.communities.map((community, index) => {
              return (
                <tr key={index} id={`row${index}`}>
                  <td>{community.name}</td>
                  <td>{community.address}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
