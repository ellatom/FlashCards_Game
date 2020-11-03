import React from 'react';
import api from './api';
import CardsList from './CardsList';
import FormCreateEdit from './FormCreateEdit';

class ManageCards extends React.Component {

  state = { cards: [], loading: false, currentCard: {} };

  componentDidMount() {
    this.setState({ loading: true });
    this.getCardsDack();
  }
  //API CRUD:GET
  getCardsDack = async () => {
    let cards =
      await api.getCards();

    this.setState({
      cards: cards,
      loading: false
    });
  }
  //API CRUD:DELETE
  setDelete = async (event, key) => {
    debugger;
    this.setState(
      { loading: true },

      async () => {
        await api.deleteCard(key);
        this.setState({
          loading: false
        });
        await this.getCardsDack();
      });
  }
  /////API CRUD:EDIT CARD
  setEdit = async (event, key) => {

    let card =
      this.state.cards.find(c => c.id === key);

    this.setState({
      currentCard: card
    });
  }

  saveCard = async (card) => {///in case there are no more than 100 cards in each dack. this random wont be bug and easy to know created from gui by user and not mockapi.
    
    if (card.id) {
      await api.updateCard(card);
    }
    else {
      card.id =
        String(Math.floor(Math.random() * 200) + 100);

      await api.createCard(card);
    }

    await this.getCardsDack();
    
    this.setState({
      loading: false
    });

  }
  updateCard = async (card) => {
    await api.updateCard(card);
  }
  ////API CRUD:CREATE NEW CARD
  onAdd = async (card) => {

    card.id =
      String(Math.floor(Math.random() * 200) + 100);

    this.setState({ loading: true },
      async () => {
        await api.createCard(card);

        this.setState({
          loading: false
        });
      });
  }

  render() {
    console.log(`ManageCards.render ${this.state.currentCard.id}`);
    return (
      <div>
        <CardsList
          cards={this.state.cards}
          onDelete={this.setDelete}
          onEdit={this.setEdit}>
        </CardsList>
        <FormCreateEdit
          card={this.state.currentCard}
          saveCard={this.saveCard}>
        </FormCreateEdit>
      </div>
    )
  }
};

export default ManageCards;
