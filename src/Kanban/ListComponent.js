import React, { Component, PropTypes } from 'react';
import { _ } from 'underscore';

import { CardComponent } from './CardComponent.js';
import  FontAwesome  from 'react-fontawesome';

export class ListComponent extends Component {
  render(){
    var cards = _.map(this.props.cards, (card) => {
      return <CardComponent key={ card.id } id={ card.id }
                  title={ card.title }
                  description={ card.description }
                  color={ card.color }
                  tasks={ card.tasks } />
    });

    return (
      <div className="list">
        <h1>{this.props.title} <FontAwesome
        className='super-crazy-colors'
        name='rocket'
        size='2x'
        spin
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      /></h1>
        {cards}
      </div>
    );
  }
}

ListComponent.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  title : PropTypes.string.isRequired
};
