import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'date': new Date()};
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    tick() {
        this.setState({
            'date': new Date()
        });
    }

    render() {
        return(
        <div>
            <h1>It is {this.state.date.toLocaleTimeString()}</h1>
        </div>
        );
    }
}


ReactDom.render(
    <Clock />,
    document.getElementById('root')
);