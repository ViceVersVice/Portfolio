import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {StyledSkillCardText, BaseSpan, BaseDiv} from './styledComponents.js';
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


const PopupInlineFlexDiv = styled(BaseSpan)`
	display: inline-flex;
`


class SkillPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showCommentForm: false, 
			skillCommentsData: {},
			dataCountStart: 0,
            dataIsLoading: false

		};
		this.toggleCommentForm = this.toggleCommentForm.bind(this);
	};
	
	getSkillCommentsData(getNextPage) {
        // If nextPage is requested, it just adds next page data to actual data --> not refetches all data
        setState({ dataIsLoading: true });
        const count = 4;
        const start = getNextPage ? this.state.dataCountStart + count: this.state.dataCountStart;
        fetch(`${baseUrl}/${skillApiBaseNameUrl}/${this.props.data.id}/comments/?start=${start}&count=${count}`)
            .then(response => response.json())
            .then(skillCommentsData => this.setState({
                skillCommentsData: [...this.state.skillCommentsData, ...skillCommentsData],
                dataCountStart: start,
                dataIsLoading: false
            }));
	};
	
	toggleCommentForm(e) {
		this.setState({showCommentForm: !this.state.showCommentForm});
	}

	render() {
		const commentForm = this.state.showCommentForm ? (
			<BaseDiv justifyContent={'center'} flexDirection={'column'}>
				<MainCommentForm hideCommentForm={this.toggleCommentForm} skillId={this.props.data.id} margin={'2% 0 2% 0'}></MainCommentForm>
			</BaseDiv>
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