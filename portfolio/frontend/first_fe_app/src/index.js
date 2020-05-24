import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';


class Clock extends React.Component {
    render() {
        return(
        <div>
            <h1>It is {this.props.date.toLocaleTimeString()}</h1>
        </div>
    )
}


function tick() {
    ReactDom.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}
setInterval(tick, 1000);