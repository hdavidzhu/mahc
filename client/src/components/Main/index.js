import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui';
import ListPage from '../ListPage';
import MapPage from '../MapPage';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange} >
          <Tab label="Communities" value="communities">
            <ListPage />
          </Tab>
          <Tab label="Map" value="map">
            <MapPage />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
