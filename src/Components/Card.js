import React from 'react';

class Card extends React.Component {

  render() {
    return (
      <>
        <div className="flipCard">
          <div className="flipCardInner" ref={this.innerCard}>
            <div className="flipCardFront">{this.props.currentCardQuesstion}</div>
            <div className="flipCardBack">{this.props.currentCardAnswer}</div>
          </div>
        </div>
      </>
    );
  }
}
export default Card;
