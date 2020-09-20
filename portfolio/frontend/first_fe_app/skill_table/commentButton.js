import React from 'react';

import {StyledCommentButton, StyledSkillCardText} from './styledComponents.js';


class CommentButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'highlight': false, buttonWidth: 0};
        this.highlightButton = this.highlightButton.bind(this);
        this.unhighlightButton = this.unhighlightButton.bind(this);
        this.self = React.createRef(null)
    };

    highlightButton(e) {
        this.setState({highlight: true});
    };

    unhighlightButton(e) {
        this.setState({highlight: false});
    };

    componentDidMount(){
        this.setState({...this.state, buttonWidth: this.self.clientWidth});
        const resizeObserver = new ResizeObserver(this.handleResizeObserver.bind(this));
        resizeObserver.observe(this.self.current)
    }

    handleResizeObserver(entries){
        // We are tracking button width
        this.setState({...this.state, buttonWidth: this.self.current.clientWidth})
    }

    render() {
        const buttontTextSize = this.state.buttonWidth ? `${this.state.buttonWidth / 10}px` : '15px';
        const backgrounImageSize = this.state.buttonWidth ? `${this.state.buttonWidth / 7}px`: '25px';

        const buttonProps = {
            border: 'solid 0.1rem',
            onMouseEnter: this.highlightButton,
            onMouseLeave: this.unhighlightButton,
            backgroundSize: backgrounImageSize, 
            ...this.props
        };
        if (this.state.highlight) {
            buttonProps.backgroundColor = this.props.highlightColor || '#FFFFFF';
        };
        
        console.log('Butt', buttontTextSize, backgrounImageSize)
        return (
            <StyledCommentButton ref={this.self} {...buttonProps}>
                <StyledSkillCardText margin={'0'} fontSize={buttontTextSize} margin={'5% 5% 5% 35%'}>{this.props.children}</StyledSkillCardText>
            </StyledCommentButton>
        );
    };
}


export {CommentButton};