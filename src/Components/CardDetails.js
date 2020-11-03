import React from 'react';

class CardsDetail extends React.Component {  

    onDelete = async (event) => {
        this.props.onDelete(event, this.props.keyCard);
    }
    onEdit = async (event) => {
        this.props.onEdit(event, this.props.card.id);
    }   
    

    render()
    {
        return(  
           <div className="cardView">
               <div className="question" key={this.props.card.id}><i className="far fa-question-circle"></i>Question:<br/>{this.props.card.question}</div>
               <div className="answer"><i className="fas fa-crown"></i>Answer:<br/>{this.props.card.answer}</div>
               <button className="delete" onClick={this.onDelete}>Delete</button>
               <button className="edit" onClick={this.onEdit}>Edit</button>
           </div> 
        )
    }
}
export default CardsDetail;
