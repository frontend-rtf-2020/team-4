import React from "react";
class BoardItem extends React.Component {

    componentDidMount() {
    }

    render() {
        console.log(this.props);
        return (
            <div >
                <h2>{this.props.name}</h2>
                Creator {this.props.creator.login} ({this.props.creator.email})
                Begin: {this.props.addingDate}
                End: {this.props.endDate}
                <br/>
                Members: {this.props.members.map(m => <div key={m[0].login}>{m[0].login} ({m[0].email})</div>)}
            </div>
        );
    }
}

export default BoardItem;
