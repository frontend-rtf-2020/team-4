import React from "react";

export class StartComponent extends React.Component {
    constructor() {
        super();
        this.state = {data: ""};
    }

    componentDidMount() {
        fetch('/api/test')
            .then(d=>d.text())
            .then(t=>this.setState({data: t}));
    }

    render() {
        return (<><h1>Team 4:</h1>
            <ol>
                <li>Кальская Юлия</li>
                <li>Лукьянов Андрей</li>
                <li>Сатункин Владимир</li>
                <li>Ткачук Денис</li>
                {this.state.data}
            </ol>
        </>);
    }
}
