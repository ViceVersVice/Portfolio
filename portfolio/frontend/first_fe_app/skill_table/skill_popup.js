import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {StyledSkillCardText, BaseSpan} from './styledComponents.js';
import {flexBoxCss, marginCss, borderedCss} from '../base/baseStyles.js';
import {MainCommentForm} from './commentForms.js';
import {CommentButton} from './commentButton.js';


const PopupContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
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
	${borderedCss};
	${marginCss};
`

const PopupInlineFlexDiv = styled(PopupFlexDiv)`
	display: inline-flex;
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
			<PopupFlexDiv justifyContent={'center'} flexDirection={'column'}>
				<MainCommentForm skillId={this.props.data.id} margin={'2% 0 2% 0'}></MainCommentForm>
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
					<StyledSkillCardText fontSize={'20px'}>{this.props.data.description}</StyledSkillCardText>
				</PopupFlexDiv>
				<CommentButton onClick={this.toggleCommentForm} highlightColor={'#C0C0C0'} margin={'0 0 2% 0'}>
					<BaseSpan fontSize={'15px'}>{commentButtonText}</BaseSpan>
				</CommentButton>
				{commentForm}
			</PopupContainer>
		);
		return ReactDOM.createPortal(popup, document.body);
	}

}

export {SkillPopup};