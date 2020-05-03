import React from "react";
class BoardItem extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <div >
                <h2>{this.props.name}</h2>
            </div>
        );
    }
}

export default BoardItem;
