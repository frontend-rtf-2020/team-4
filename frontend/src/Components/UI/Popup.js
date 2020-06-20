import React from "react";
import "../BoardPage/Column.css";
import $ from 'jquery';

class Popup extends React.Component {
    constructor() {
        super();
        this.identifier = React.createRef();
    }

    add = (event) => {
        event.preventDefault();
        const id = this.identifier.current.value;
        this.props.addMember(id);
        console.log(id);
    };

    render() {
        return (
            <div>
                <div className="popup_inner">
                    <h2 className="addMember">{this.props.text}</h2>
                    {this.props.error ?
                        <label className="error smallText">{this.props.error}</label>
                        :
                        null
                    }
                    {this.props.success ?
                        <label className="success smallText">{this.props.success}</label>
                        :
                        null
                    }
                    <input ref={this.identifier} placeholder="Email address or nickname"/>
                    <div className="row">
                        <button  onClick={this.add}>Add</button>
                        <button  onClick={this.closePopup}>Close</button>
                    </div>
                </div>
            </div>
        );
    }

    closePopup() {
        $('.popup_inner').fadeOut(400);
    }
}

export default Popup;
