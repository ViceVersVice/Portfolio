import React, {useState} from 'react';
import styled from 'styled-components';

import {baseUrl, skillApiBaseNameUrl, staticFolderUrl} from '../base/baseUrls.js'
import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, BaseParagraph, BaseInput, BaseSpan, BaseDiv} 
        from './styledComponents.js';
import {GenericButton} from './genericButton.js';


const TextAreaDiv = styled(BaseDiv)`
	outline: 0px solid transparent;
	display: block;
	width: 100%;
	&:empty:before {
		content: attr(placeholder);
	}
`;


const CommentTextInput = (props) => {
	return <TextAreaDiv role={'textbox'} contentEditable={true} placeholder="Write comment..." {...props}></TextAreaDiv>
};


const MainCommentForm = (props) => {
	const [formData, setFormData] = useState({skill: props.skillId, commentText: ''});
	const [formErrors, setFormErrors] = useState({});

	const handleResponse = (response) => {
		response.json().then(data => {
			if (data.errors) {
				setFormErrors({formErrors: data.errors});
			} else {
				props.hideCommentForm();
			};
		}).catch( () => {setFormErrors({formErrors: ['Server error']})} )
	};

	const sendFormData = (e) => {
		fetch(`${baseUrl}/${skillApiBaseNameUrl}/${props.skillId}/add_comment/`,
			{	
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			}
		).then(handleResponse);
	};
	
	const storeFormData = (e) => {
		setFormData({
			...formData,
			[e.target.getAttribute('name')]: e.target.innerText,
		});
	};

	const ErrorMessages =  formErrors.formErrors ? <BaseDiv marginBot={'2%'}><BaseSpan color={'red'}>{Object.values(formErrors.formErrors).join(', ')}</BaseSpan></BaseDiv>: null;
	const commentInputProps = {
		name: 'commentText',
		borderBottom: 'solid 0.1rem',
		margin: '2% 0% 2% 0%',
		onInput: storeFormData,
		...props
	}
	
	return (
		<>
			<CommentTextInput {...commentInputProps}></CommentTextInput>
			{ErrorMessages}
			<GenericButton onClick={sendFormData} highlightColor={'#a3f590'} width={'10%'} buttonImage={`${staticFolderUrl}icons/comment.svg`}>
				Comment
			</GenericButton>
		</>
	);

};



export {MainCommentForm};