import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import {StyledSkillCardText, BaseSpan, BaseDiv, appearElement} from './styledComponents.js';
import {flexBoxCss, marginCss, borderedCss} from '../base/baseStyles.js';

import {MainCommentForm} from './commentForms.js';
import {SkillCommentList} from './skillComments.js';
import {CommentButton} from './commentButton.js';
import {EndlessPaginationHoc} from './skillTable.js'
import {baseUrl, skillApiBaseNameUrl} from '../base/baseUrls.js'


const PopupContainer = styled.div`
	display: inline-flex;
	flex-direction: column;
	width: 80%;
    padding: 20px;
    background: #ffffff;
    position: absolute;
    left: 50%;
	top: 20%;
  	transform: translate(-50%, -30px);
  	border: 0.2rem solid black;
  	border-radius: 10px;
`


const AnimatedCommentForm = styled(BaseDiv)`
	animation: ${appearElement} 0.3s linear;
`


const EndOfComments = (props) => {
	return <div ref={props.innerRef}></div>
}


const EndOfCommentsRef = React.forwardRef((props, ref) => {
	return <EndOfComments {...props} innerRef={ref}></EndOfComments>
})


class SkillPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showCommentForm: false, 
		};

		this.toggleCommentForm = this.toggleCommentForm.bind(this);
	};
	
	toggleCommentForm(e) {
		this.setState({showCommentForm: !this.state.showCommentForm});
	}

	render() {
		const skillId = this.props.data.id;

		const PopupWIthEndlessComments = EndlessPaginationHoc(
			SkillCommentList, 
			`${baseUrl}/${skillApiBaseNameUrl}/${skillId}/skill_comments`,
			EndOfCommentsRef,
			15
		)
		
		const commentForm = this.state.showCommentForm ? (
			<AnimatedCommentForm justifyContent={'center'} flexDirection={'column'}>
				<MainCommentForm hideCommentForm={this.toggleCommentForm} skillId={skillId} margin={'2% 0 2% 0'}></MainCommentForm>
			</AnimatedCommentForm>
		): null;

		const commentButtonText = this.state.showCommentForm ? 'Close': 'Add comment';
		const popup = (
			<PopupContainer>
				<BaseDiv alignSelf={'flex-end'} margin='none'>
					{this.props.closeButton}
				</BaseDiv>
				<BaseDiv>
					<h1>{this.props.data.name}</h1>
					<StyledSkillCardText fontSize={'20px'}>{this.props.data.description}</StyledSkillCardText>
				</BaseDiv>
				<CommentButton onClick={this.toggleCommentForm} highlightColor={'#C0C0C0'} margin={'0 0 2% 0'} width={'10%'}>
					{commentButtonText}
				</CommentButton>
				{commentForm}
				<PopupWIthEndlessComments></PopupWIthEndlessComments>
			</PopupContainer>
		);
		return ReactDOM.createPortal(popup, document.getElementById('root'));
	}
}



export {SkillPopup};