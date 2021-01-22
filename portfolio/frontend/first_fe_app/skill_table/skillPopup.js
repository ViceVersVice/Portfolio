import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import {StyledSkillCardText, BaseDiv, appearElement, BaseSpan} from './styledComponents.js';
import {flexBoxCss, marginCss, borderedCss} from '../base/baseStyles.js';
import {CharacteristicLevels} from './skillTable.js';
import {SizeTrackerHoc} from './sizeTracker.js';

import {MainCommentForm} from './commentForms.js';
import {SkillCommentList} from './skillComments.js';
import {GenericButton} from './genericButton.js';
import {EndlessPaginationHoc} from './endlessPagination.js'
import {baseUrl, skillApiBaseNameUrl, staticFolderUrl} from '../base/baseUrls.js'


const PopupContainer = styled(BaseDiv)`
	display: inline-flex;
	flex-direction: column;
	width: 80%;
	max-height: 90%;
    padding: 1px;
    background: #ececf1;
    position: fixed;
    left: 50%;
	top: 5%;
  	transform: translate(-50%, -30px);
  	border: 1px solid #9e9e9e;
  	border-radius: 10px;
`


const AnimatedCommentForm = styled(BaseDiv)`
	animation: ${appearElement} 0.3s linear;
`


const EndOfComments = (props) => {
	return <BaseDiv width={'10px'} height={'40px'} ref={props.innerRef}></BaseDiv>
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
		this.sizeCoefficient = 60
		this.toggleCommentForm = this.toggleCommentForm.bind(this);
	};
	
	componentDidMount() {
		this.setState({
			PopupEndlessComments: EndlessPaginationHoc(
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

	getCharacteristicLevels(){
		const charProps = {
			characteristics: this.props.data.characteristics,
			trackedSize: this.props.trackedSize,
			sizeCoefficient: this.sizeCoefficient
		}
		
		return <CharacteristicLevels {...charProps}></CharacteristicLevels>
	}


	render() {
		const fontSize = this.props.trackedSize > 0 ? this.props.trackedSize / this.sizeCoefficient : 20;

		const commentForm = this.state.showCommentForm ? (
			<AnimatedCommentForm justifyContent={'center'} flexDirection={'column'}>
				<MainCommentForm hideCommentForm={this.toggleCommentForm} skillId={this.skillId}></MainCommentForm>
			</AnimatedCommentForm>
		): null;
		
		const commentButtonProps = {
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
							<h1>{this.props.data.name}</h1>
							{this.props.closeButton}
						</BaseDiv>
						<BaseDiv display={'inline-flex'} justifyContent={'space-between'} width={'100%'}>
							<BaseDiv display={'inline-flex'} flex={3}>
								<StyledSkillCardText marginBlockStart={'0em'} fontSize={`${Math.max(fontSize, 10)}px`}>{this.props.data.description}</StyledSkillCardText>
							</BaseDiv>
							<BaseDiv display={'inline-flex'} marginLeft={'2%'} boxShadow={'-2px 0px 0px 0px black'} flex={2}>
								<BaseDiv display={'inline-flex'} flexDirection={'column'} paddingLeft={'10px'}>
									<BaseSpan fontSize={`${Math.max(fontSize, 10) * 1.3}px`} fontWeight={'bold'} marginBot={'10px'}>My perception:</BaseSpan>
									{this.getCharacteristicLevels.bind(this)()}
								</BaseDiv>
							</BaseDiv>
						</BaseDiv>
					</BaseDiv>
					{commentButton}
					{commentForm}
				</BaseDiv>
				<BaseDiv display={'inline-flex'} overflow={'hidden'} flexDirection={'column'} padding={'20px'}>
					{this.state.PopupEndlessComments && this.props.data.commentsCount ? 
						(<>
							<BaseDiv display={'inline-flex'} width={'70%'}>
								<BaseSpan fontSize={`${Math.max(fontSize, 10) * 1.3}px`}>{this.props.data.commentsCount} comments</BaseSpan>
							</BaseDiv>
							<BaseDiv display={'inline-flex'} flexDirection={'column'} overflowY={"scroll"}>
								<this.state.PopupEndlessComments></this.state.PopupEndlessComments>
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