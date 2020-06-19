import React from "react";
import './boards.css';
import Field from "../Field";
class BoardItem extends React.Component {

    componentDidMount() {
    }

    onClick = () => {
        document.location.href = `/item/${this.props.id}`
    };
    delete = event => {
        event.stopPropagation();
        this.props.delete(this.props.id)
    };

    edit = (name, value) =>
        this.props.onEdit(name, value, this.props.id);

    click = event => {
        event.stopPropagation();
    };
    render() {
        console.log(this.props);
        return (
            <div onClick={this.onClick} className='content board'>
                <span className='arrow board-delete' onClick={this.delete}>&#10006;</span>
                <h2>
                    <Field onEdit={this.edit} description='Title' name='name'>{this.props.name}</Field>
                </h2>
                <b>Creator</b> {this.props.creator.login} ({this.props.creator.email})
                <br/>
                <Field onEdit={this.edit} description='Description' name='description'>{this.props.description}</Field>

                <details onClick={this.click}>
                    <summary>
                        <b>Members:</b>
                    </summary>
                    {this.props.members.map(m => <div key={m.login}>{m.login} ({m.email})</div>)}
                </details>
            </div>
        );
    }
}

export default BoardItem;
