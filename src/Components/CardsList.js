import React from 'react';
import CardDetails from './CardDetails';

class CardsList extends React.Component {
  

  renderCardList = () => {
    return this.props.cards.map((card, index) => {
      return (
        <CardDetails 
          onDelete={this.props.onDelete} 
          onEdit={this.props.onEdit} 
          key={card.id} 
          keyCard={card.id}
          card={card}>
        </CardDetails>
        )
    });
  };

  render() {
    return <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap' }}>{this.renderCardList()}</div>
  }
}

export default CardsList;
