import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const PopupContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 1000px;
    padding: 20px;
    background: #fff;
    position: fixed;
    left: 50%;
  	top: 50%;
  	transform: translate(-50%, -50%);
`


const CloseButton = styled.button`
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
					<CloseButton>Close</CloseButton>
				</PopupFlexDiv>
				<PopupFlexDiv>
					<h1>{this.props.data.name}</h1>
				</PopupFlexDiv>
			</PopupContainer>
		);
		return ReactDOM.createPortal(popup, document.body);
	}

}

export {SkillPopup};