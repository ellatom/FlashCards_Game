import React from 'react';
import api from './api';

class FlashCards extends React.Component {

  constructor(props) {
    super(props);

    this.innerCard = React.createRef();

    this.cards = [];
    this.state = { currentCard: "", completed: 0, loading: false,isNo:true };
  }


  async componentDidMount() {

    this.setState(
      { loading: true });
    this.initCardsDack();  
  };

  initCardsDack= async()=>{
      let cards =
        await api.getCards();

      let shuffeledCards =
        this.shuffleCards(cards);

      this.cards = shuffeledCards;
      this.cardsLength=shuffeledCards.length;

      this.setState({
        currentCard: shuffeledCards[0],
        loading: false
      });
  }
  shuffleCards = (cards) => {
    let shuffledCards = [];
    for (let i = 0; i < cards.length; i++) {
      let j = Math.floor(Math.random() * i);
      let temp = cards[i];
      shuffledCards[i] = cards[j];
      shuffledCards[j] = temp;
    }

    return shuffledCards;
  }
  flipCard = (card) => {
    if (!card.classList.contains('on')) {
      card.classList.remove('off');
      card.classList.add('on');
    }
    else {
      card.classList.remove('on');
      card.classList.add('off');
    }
  }

  revealCard = () => {
    let card =
      document.querySelector(".flipCardInner");

    this.flipCard(card);
  }

  setNotRemoveCard=()=>
  {
    this.setState({isNo:true});
  }

  setCompleted = () => {
    this.setState({completed:this.state.completed + 1, isNo:false});///bug only on end+1 completed
    if(this.state.completed ===this.cardsLength-1)
      this.showWinnerOverlay();

  }
  showWinnerOverlay=()=>
  {
     document.getElementById("overlay").setAttribute("style", "display:flex");
  }
  removeOverlay=()=>//click on start new game
  {
    document.getElementById("overlay").setAttribute("style", "display:none");
    this.setState({completed:0});
    this.initCardsDack();
  }
  addNewCard=()=> {
    if(this.cards===0)
      return;
    if(this.state.isNo===false)
    {  
      this.cards.shift();//remove first element
      let firstCardArr= this.cards[0];
      this.setState({currentCard: firstCardArr});
      document.querySelector(".flipCardInner").classList.remove('on');//bug fixed...flip card back
    }
    else{
      this.initCardsDack(this.cards);
      document.querySelector(".flipCardInner").classList.remove('on');
    }
  }
  currentCardQuesstion() {
    if (!this.state.currentCard)
      return "";

    return this.state.currentCard.question;

  }

  currentCardAnswer() {
    if (!this.state.currentCard)
      return "";

    return this.state.currentCard.answer;
  }

  render() {
    return (
      <>
        <div id="overlay">
          <div> <i className="fas fa-trophy"></i> You have completed all flash cards</div>
          <button className="reshuffle" onClick={this.removeOverlay}>Reshuffle again</button>
        </div>
        <div className="flipCard">
          <div className="flipCardInner" ref={this.innerCard}>
            <div className="flipCardFront"><i className="far fa-question-circle"></i>Question:<br/>{this.currentCardQuesstion()}</div>
            <div className="flipCardBack"><i className="fas fa-crown"></i>Answer:<br/>{this.currentCardAnswer()}</div>
          </div>
        </div>

        <button className="newCard" onClick={this.addNewCard}>New card</button>
        <button className="revealAnswer" onClick={this.revealCard}>Reveal Answer</button>
        <div>Did you get it right?</div>
        <button className="yes" onClick={this.setCompleted}>Yes</button>
        <button className="no" onClick={this.setNotRemoveCard}>No</button>
        <div>Completed</div>
        <div>{this.state.completed}/{this.cardsLength}</div>
      </>
    );
  }
}
export default FlashCards;
