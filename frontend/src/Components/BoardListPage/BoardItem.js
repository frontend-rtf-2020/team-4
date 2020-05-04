import React from "react";
import './boards.css';
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
            <div className='content board' onClick={this.onClick}>
                <h2>{this.props.name}</h2>
                <b>Creator</b> {this.props.creator.login} ({this.props.creator.email})
                <br/>
                <b>Begin:</b> {this.props.addingDate}
                <br/>
                <b>End:</b> {this.props.endDate}
                <br/>
                <b>Members:</b> {this.props.members.map(m => <div key={m[0].login}>{m[0].login} ({m[0].email})</div>)}
            </div>
        );
    }
}

export default BoardItem;
