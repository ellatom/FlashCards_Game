import React from 'react';


class FormCreateEdit extends React.Component {

    state={question:"",answer:""}

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.props.card[name] = value;

        this.setState({[name]: value});
    }

    newCard = (event) => {
        event.preventDefault();

        this.props.card.id = "";
        this.props.card.question = "";
        this.props.card.answer = "";
        
        this.setState({question: "", answer: ""});
    }

    saveCard = async (event) => {
      
        document.querySelector(".msg").innerHTML="";
        event.preventDefault();
        
        if(this.props.card.question==="" || this.props.card.answer==="")
        {
            document.querySelector(".msg").innerHTML="Field shouldnt be empty";
            return;
        }
        this.props.saveCard(this.props.card);
        this.newCard(event);
    }

    render() {
        console.log(`FormCreateEdit.render ${this.props.card.id}`);
        return (
            <div>
                <br/>
                {/* <div>Add/Edit More Cards</div> */}
                <div>{this.props.card.id ? `Editting card with id=${this.props.card.id}` : "Adding a new card"}</div>
                <form id="myForm" className="form">
                    <label htmlFor="Question">Question:</label>
                    <br/>
                    <textarea 
                        id="question" 
                        name="question" 
                        value={this.props.card.question} 
                        onChange={this.handleChange} 
                        rows="3" cols="50" 
                        placeholder="Insert Question here">
                    </textarea>
                    <br/>
                    <label htmlFor="Answer">Answer:</label>
                    <br/>
                    <textarea 
                        id="answer"  
                        name="answer" 
                        value={this.props.card.answer} 
                        onChange={this.handleChange} 
                        rows="3" cols="50" 
                        placeholder="Insert Answer here">
                    </textarea>
                    <br/>
                    <button onClick={this.saveCard}>{this.props.card.id ? "Save" : "Add"}</button>
                    <div className="msg"></div>
                </form>
            </div>
        )
    }
}
export default FormCreateEdit;
