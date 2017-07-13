import React from 'react';
import axios from 'axios';
import CommunityForm from '../CommunityForm';
import CommunityTable from '../CommunityTable';

export default class ListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      communities: []
    }

    this.getCommunities = this.getCommunities.bind(this);
  }

  getCommunities() {
    axios.get('/api/communities').then((res) => {
      this.setState({ communities: res.data });
    });
  }

  render() {
    return (
      <list-page>
        Hello! This is the list page.
        <CommunityForm />
        <button onClick={this.getCommunities}>Click me!</button>
        <CommunityTable communities={this.state.communities}/>
      </list-page>
    );
  }
}
