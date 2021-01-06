import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import {StyledSkillCardText, BaseDiv, appearElement} from './styledComponents.js';
import {flexBoxCss, marginCss, borderedCss} from '../base/baseStyles.js';

import {MainCommentForm} from './commentForms.js';
import {SkillCommentList} from './skillComments.js';
import {GenericButton} from './genericButton.js';
import {EndlessPaginationHoc} from './endlessPagination.js'
import {baseUrl, skillApiBaseNameUrl, staticFolderUrl} from '../base/baseUrls.js'


const PopupContainer = styled(BaseDiv)`
	display: inline-flex;
	flex-direction: column;
	width: 80%;
	max-height: 70%;
    padding: 20px;
    background: #ffffff;
    position: fixed;
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
		this.skillId = this.props.data.id;
		this.toggleCommentForm = this.toggleCommentForm.bind(this);
	};
	
	componentDidMount() {
		this.setState({
			PopupWIthEndlessComments: EndlessPaginationHoc(
				SkillCommentList, 
				`${baseUrl}/${skillApiBaseNameUrl}/${this.skillId}/skill_comments`,
				EndOfCommentsRef,
				15
			)
		})
	}

	toggleCommentForm(e) {
		this.setState({showCommentForm: !this.state.showCommentForm});
	}

	render() {
		const commentForm = this.state.showCommentForm ? (
			<AnimatedCommentForm justifyContent={'center'} flexDirection={'column'}>
				<MainCommentForm hideCommentForm={this.toggleCommentForm} skillId={this.skillId}></MainCommentForm>
			</AnimatedCommentForm>
		): null;

		const commentButtonText = this.state.showCommentForm ? 'Close': 'Add comment';
		const popup = (
			<PopupContainer> 
				<BaseDiv>
					<BaseDiv display={'inline-flex'} justifyContent={'space-between'} width={'100%'}>
						<h1>{this.props.data.name}</h1>
						{this.props.closeButton}
					</BaseDiv>
					<StyledSkillCardText fontSize={'20px'}>{this.props.data.description}</StyledSkillCardText>
				</BaseDiv>
				<GenericButton onClick={this.toggleCommentForm} highlightColor={'#C0C0C0'} width={'10%'} buttonImage={`${staticFolderUrl}icons/comment.svg`}>
					{commentButtonText}
				</GenericButton>
				{commentForm}
				{this.state.PopupWIthEndlessComments ? 
					(<BaseDiv overflowY={"scroll"}>
						<this.state.PopupWIthEndlessComments></this.state.PopupWIthEndlessComments>
					</BaseDiv>) : null
				}
			</PopupContainer>
		);
		return ReactDOM.createPortal(popup, document.getElementById('root'));
	}
}



export {SkillPopup};