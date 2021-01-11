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
		this.sizeCoefficient = 60
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

		const commentButtonText = this.state.showCommentForm ? 'Close': 'Add comment';
		
		const popup = (
			<PopupContainer ref={this.props.trackSizeRef}> 
				<BaseDiv>
					<BaseDiv display={'inline-flex'} justifyContent={'space-between'} width={'100%'}>
						<h1>{this.props.data.name}</h1>
						{this.props.closeButton}
					</BaseDiv>
					<BaseDiv display={'inline-flex'} justifyContent={'space-between'} width={'100%'}>
						<BaseDiv display={'inline-flex'} flex={3}>
							<StyledSkillCardText marginBlockStart={'0em'} fontSize={`${Math.max(fontSize, 10)}px`}>{this.props.data.description}</StyledSkillCardText>
						</BaseDiv>
						<BaseDiv display={'inline-flex'} marginLeft={'2%'} boxShadow={'-2px 0px 0px 0px black'} flex={1}>
							<BaseDiv display={'inline-flex'} flexDirection={'column'} paddingLeft={'10px'}>
								<BaseSpan fontSize={`${Math.max(fontSize, 10) * 1.5}px`} fontWeight={'bold'} marginBot={'10px'}>My perception:</BaseSpan>
								{this.getCharacteristicLevels.bind(this)()}
							</BaseDiv>
						</BaseDiv>
					</BaseDiv>
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


const TrackedSizeSkillPopup = SizeTrackerHoc(SkillPopup);


export {TrackedSizeSkillPopup as SkillPopup};