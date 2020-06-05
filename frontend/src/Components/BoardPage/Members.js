import React from "react";
import $ from "jquery";
import Member from "./Member";

export class Members extends React.Component {
    show = () => {
        $('#members-cont').fadeIn(400);
    };
    hide = () => {
        $('#members-cont').fadeOut(400);
    };

    render() {
        return (
            <header id='memsHeader'>
                <h4>{this.props.board.name}
                    <span className='arrow' id='showMems' onClick={this.show}>v</span>
                </h4>
                <div id='members-cont' className='members-cont'>
                    <b>Creator:</b>
                    <Member>{this.props.board.creatorId.login}</Member>
                    <b>Participants:</b>
                    <div className='members'>
                        {this.props.board.members.map(m => <Member key={m.login}>{m.login}</Member>)}
                        <AddMember onAdd={this.props.onAdd}/>
                    </div>
                    <div align='center'>
                        <span className='arrow' id='hideMems' onClick={this.hide}>^</span>
                    </div>
                </div>
                <a className='link-button back' href='/list'>&lt;</a>
            </header>
        );
    }
}

class AddMember extends React.Component {
    add() {
        const identifier = prompt("Enter user id/login/email");
        //alert(identifier)
        this.props.onAdd(identifier);
        //TODO: send adding
    }

    render() {
        return (<div className='member add-member' onClick={this.add}>
            +
        </div>);
    }
}
