import React from 'react';
import axios from 'axios';

class CommmunityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: ''
    };

    // TODO: This seems a bit contrived. Is there a way to auto-bind?
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleAddressChange(event) {
    this.setState({address: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    axios.post('/api/communities', this.state).then(this.props.onSubmit)
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange} />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={this.state.address}
            onChange={this.handleAddressChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CommmunityForm;
