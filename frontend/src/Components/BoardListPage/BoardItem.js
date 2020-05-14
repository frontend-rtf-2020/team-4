import React from "react";
import './boards.css';
import Field from "./Field";
class BoardItem extends React.Component {

    componentDidMount() {
    }

    onClick = () => {
        document.location.href = `/item/${this.props.id}`
        //window.
    };

    render() {
        console.log(this.props);
        return (
            <div className='content board'>
                <h2><Field description='Title'>{this.props.name}</Field></h2>
                <b>Creator</b> {this.props.creator.login} ({this.props.creator.email})
                <br/>
                <Field description='Description'>{this.props.description}</Field>
                <br/>
                <b>Begin:</b> {this.props.addingDate}
                <br/>
                <b>End:</b> {this.props.endDate}
                <br/>
                <button onClick={this.onClick}>Open</button>
                <details>
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
