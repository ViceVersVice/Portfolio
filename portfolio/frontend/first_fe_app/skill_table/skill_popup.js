import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {StyledSkillCardText} from './styledComponents.js';
import {flexBoxCss} from '../base/baseStyles.js';
import {MainCommentForm} from './commentForms.js';
import {CommentButton} from './commentButton.js';


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
	${flexBoxCss};
	margin: ${props => props.margin || '2%'};
	align-self: ${props => props.alignSelf || 'center'};
`


class SkillPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showCommentForm: false};
		this.toggleCommentForm = this.toggleCommentForm.bind(this);
	};

	toggleCommentForm(e) {
		this.setState({showCommentForm: !this.state.showCommentForm});
	}


	render() {
		const commentForm = this.state.showCommentForm ? (
			<PopupFlexDiv alignSelf={'flex-start'}>
				<MainCommentForm skillId={this.props.data.id}></MainCommentForm>
			</PopupFlexDiv>
		): null;

		const commentButtonText = this.state.showCommentForm ? 'Close': 'Add comment';

		const popup = (
			<PopupContainer>
				<PopupFlexDiv alignSelf={'flex-end'} margin='none'>
					{this.props.closeButton}
				</PopupFlexDiv>
				<PopupFlexDiv>
					<h1>{this.props.data.name}</h1>
					<StyledSkillCardText>{this.props.data.description}</StyledSkillCardText>
				</PopupFlexDiv>
				<CommentButton onClick={this.toggleCommentForm} highlightColor={'#C0C0C0'} margin={'0 0 0 2%'}>
					{commentButtonText}
				</CommentButton>
				{commentForm}
			</PopupContainer>
		);
		return ReactDOM.createPortal(popup, document.body);
	}

}

export {SkillPopup};