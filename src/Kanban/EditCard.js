import React, { PropTypes, Component } from 'react';

import CardFormComponent from './CardFormComponent';
import 'babel-polyfill';

class EditCard extends Component {

  componentWillMount(){
    let card = this.props.cards.find((card) => card.id === this.props.params.card_id);
    this.setState(Object.assign({},card));
  }

  handleChange(field, value){
    this.setState({ [field] : value });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.cardCallbacks.updateCard(this.state);
    this.props.history.pushState(null, '/');
  }

  handleClose(e){
    this.props.history.pushState(null, '/');
  }

  render(){
    return(
      <CardFormComponent draftCard={this.state}
                         buttonLabel1="Edit Card"
                         handleChange={this.handleChange.bind(this)}
                         handleSubmit={this.handleSubmit.bind(this)}
                         handleClose={this.handleClose.bind(this)} />
    )
  }
}
EditCard.propTypes = {
  cardCallbacks: PropTypes.object
};

export default EditCard;
