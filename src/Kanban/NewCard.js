import React, { PropTypes, Component } from 'react';

import CardFormComponent from './CardFormComponent';

class NewCard extends Component {

  componentWillMount(){
    this.setState({
      id: Date.now(),
      title: '',
      description: '',
      status: '',
      color: '#c9c9c9',
      tasks:[]
    });
  }

  handleChange(field, value){
    this.setState({ [field]: value  });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.cardCallbacks.addCard(this.state);
    this.props.history.pushState(null, '/');
  }

  handleClose(e){
    this.props.history.pushState(null, '/');
  }

  render(){
    return (
      <CardFormComponent draftCard={this.state}
                         buttonLabel1="Create Card"
                         handleChange={ this.handleChange.bind(this) }
                         handleSubmit={ this.handleSubmit.bind(this) }
                         handleClose={ this.handleClose.bind(this) } />
    );
  }
}

NewCard.propTypes = {
  cardCallbacks: PropTypes.object,
};

export default NewCard;
