import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import {StyledSkillCardText, BaseDiv, appearElement, BaseSpan, StyledCloseButton} from '../base/styledComponents.js';
import {SizeTrackerHoc} from './sizeTracker.js';

import {MainCommentForm} from './commentForms.js';
import {getSkillCommentsCount, SkillCommentList} from './skillComments.js';
import {GenericButton} from './genericButton.js';
import {EndlessPaginationHoc} from './endlessPagination.js'
import {SKillLevelBadge} from './skillTable.js'
import {baseUrl, skillApiBaseNameUrl, staticFolderUrl} from '../base/baseUrls.js'


const PopupContainer = styled(BaseDiv)`
	display: inline-flex;
	flex-direction: column;
	width: 80%;
	max-height: 80%;
    padding: 1px;
    background: #ececf1;
    position: fixed;
    left: 50%;
	top: 110px;
  	transform: translate(-50%, -30px);
  	border: 1px solid #9e9e9e;
  	border-radius: 10px;
`


const AnimatedCommentForm = styled(BaseDiv)`
	animation: ${appearElement} 0.3s linear;
`


const EndOfComments = (props) => {
	return <BaseDiv width={'100%'} minHeight={'1px'} ref={props.innerRef}></BaseDiv>
}


const EndOfCommentsRef = React.forwardRef((props, ref) => {
	return <EndOfComments {...props} innerRef={ref}></EndOfComments>
})


const ClosePopupButton = (props) => {
	const closePopupButtonProps = {
		display: 'inline-flex', 
		alignSelf: 'center', 
		marginRight: '2%',
		onClick: props.onClick, 
	}

	return <StyledCloseButton {...closePopupButtonProps} />
}


class SkillPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showCommentForm: false,
			reload: false,
		};
		this.skillId = this.props.data.id
		this.sizeCoefficient = 60
		this.setCommentsCount = this.setCommentsCount.bind(this)
		this.setEndlessComments = this.setEndlessComments.bind(this)
		this.toggleCommentForm = this.toggleCommentForm.bind(this)
		this.reloadPopup = this.reloadPopup.bind(this)
	};

	setCommentsCount(data) {
		this.setState({...data})
	}

	setEndlessComments() {
		this.setState({
			PopupEndlessComments: EndlessPaginationHoc(
				SkillCommentList, 
				`${baseUrl}/${skillApiBaseNameUrl}/${this.skillId}/skill_comments`,
				EndOfCommentsRef,
				10
			)
		})
	}

	componentDidMount() {
		getSkillCommentsCount(this.skillId, this.setCommentsCount)
		this.setEndlessComments()
	}

	reloadPopup() {
		getSkillCommentsCount(this.skillId, this.setCommentsCount)
		this.setEndlessComments()
	}

	toggleCommentForm(e) {
		this.setState({showCommentForm: !this.state.showCommentForm});
	}

	render() {
		const fontSize = this.props.trackedSize > 0 ? this.props.trackedSize / this.sizeCoefficient : 20;

		const commentFormProps = {
			skillId: this.skillId,
			fontSize: fontSize,
			hideCommentForm: this.toggleCommentForm,
			reloadPopup: this.reloadPopup,
		}
		const commentForm = this.state.showCommentForm ? (
			<AnimatedCommentForm justifyContent={'center'} flexDirection={'column'}>
				<MainCommentForm {...commentFormProps}></MainCommentForm>
			</AnimatedCommentForm>
		): null;
		
		const commentButtonProps = {
			margin: '15px 0 0 0',
			backgroundColor: '#ececf1',
			highlightColor: this.state.showCommentForm ? '#dbb2b2': '#a3f590',
			width: '12%',
			buttonImage: `${staticFolderUrl}icons/comment.svg`,
			onClick: this.toggleCommentForm,
		}

		const commentButton = <GenericButton {...commentButtonProps}>
				{this.state.showCommentForm ? 'Close': 'Add comment'}
			</GenericButton>
		
		
		const popup = (
			<PopupContainer ref={this.props.trackSizeRef}>
				<BaseDiv padding={'20px'} borderRadius={'10px'} backgroundColor={'white'}>
					<BaseDiv>
						<BaseDiv display={'inline-flex'} justifyContent={'space-between'} width={'100%'}>
							<BaseDiv>
								<BaseSpan fontFamily={"'Coda Caption', sans-serif"} fontSize={'40px'}>{this.props.data.name}</BaseSpan>
								<SKillLevelBadge skillLevel={this.props.data.level} levelColor={this.props.data.levelColor} fontSize={'25px'} margin={'0 0 0 10px'} />
							</BaseDiv>
							<ClosePopupButton onClick={this.props.closePopup} />
						</BaseDiv>
						<BaseDiv display={'inline-flex'} justifyContent={'space-between'} width={'100%'} margin={'20px 0px 0px 0px'}>
							<BaseDiv display={'inline-flex'} maxHeight={'200px'} flex={4}>
								<StyledSkillCardText marginBlockStart={'0em'} fontSize={`${Math.max(fontSize, 10)}px`}>{this.props.data.description}</StyledSkillCardText>
							</BaseDiv>
						</BaseDiv>
					</BaseDiv>
					{commentButton}
					{commentForm}
				</BaseDiv>
				<BaseDiv display={'inline-flex'} overflow={'hidden'} flexDirection={'column'} padding={'20px'}>
					{this.state.PopupEndlessComments && this.state.commentsCount ? 
						(<>
							<BaseDiv display={'inline-flex'} width={'70%'}>
								<BaseSpan fontSize={`${Math.max(fontSize, 10) * 1.3}px`}>{this.state.commentsCount} comments</BaseSpan>
							</BaseDiv>
							<BaseDiv display={'inline-flex'} flexDirection={'column'} overflowY={"scroll"}>
								<this.state.PopupEndlessComments fontSize={fontSize} ></this.state.PopupEndlessComments>
							</BaseDiv>
						</>) : 	<BaseSpan>No comments</BaseSpan>
					}
				</BaseDiv>
			</PopupContainer>
		);
		return ReactDOM.createPortal(popup, document.getElementById('root'));
	}
}


const TrackedSizeSkillPopup = SizeTrackerHoc(SkillPopup);


export {TrackedSizeSkillPopup as SkillPopup};