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

    this.loadCommunities = this.loadCommunities.bind(this);
  }

  componentDidMount() {
    this.loadCommunities();
  }

  loadCommunities() {
    axios.get('/api/communities').then((res) => {
      this.setState({ communities: res.data });
    });
  }

  render() {
    return (
      <list-page>
        <CommunityForm onSubmit={this.loadCommunities}/>
        <CommunityTable
          communities={this.state.communities}
          onUpdate={this.loadCommunities} />
      </list-page>
    );
  }
}
