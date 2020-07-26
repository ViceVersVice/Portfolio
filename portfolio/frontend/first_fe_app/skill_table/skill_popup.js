import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {StyledSkillCardText} from './styledComponents.js';

const PopupContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 1000px;
    padding: 20px;
    background: #ffffff;
    position: fixed;
    left: 50%;
  	top: 50%;
  	transform: translate(-50%, -50%);
  	border: 0.2rem solid black;
  	border-radius: 10px;
`



const PopupFlexDiv = styled.div`
	margin: ${props => props.margin || '10px'};
	align-self: ${props => props.alignSelf || 'center'};
`


class SkillPopup extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		let popup = (
			<PopupContainer>
				<PopupFlexDiv alignSelf={'flex-end'} margin='none'>
					{this.props.closeButton}
				</PopupFlexDiv>
				<PopupFlexDiv>
					<h1>{this.props.data.name}</h1>
					<StyledSkillCardText>{this.props.data.description}</StyledSkillCardText>
				</PopupFlexDiv>
			</PopupContainer>
		);
		return ReactDOM.createPortal(popup, document.body);
	}

}

export {SkillPopup};