import React, {useState} from 'react';
import styled from 'styled-components';

import {baseUrl, skillApiBaseNameUrl} from '../base/baseUrls.js'
import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, BaseParagraph, BaseInput, BaseSpan, BaseDiv} 
        from './styledComponents.js';
import {CommentButton} from './commentButton.js';


const TextAreaDiv = styled(BaseDiv)`
	outline: 0px solid transparent;
	display: block;
	width: 100%;
	&:empty:before {
		content: attr(placeholder);
	}
`;


const CommentTextInput = (props) => {
	const [showPlaceholder, setShowPlaceholder] = useState(true);
	return <TextAreaDiv role={'textbox'} contentEditable={true} placeholder="Enter weight…" {...props}></TextAreaDiv>
};


const MainCommentForm = (props) => {
	const [formData, setFormData] = useState({commentText: ''})

	const addCommentUrl = `${baseUrl}/${skillApiBaseNameUrl}/${props.skillId}/add_comment/`;
	const sendFormData = (e) => {
		fetch(`${baseUrl}/${skillApiBaseNameUrl}/${props.skillId}/add_comment/`,
			{	
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			}
		).then(response => response.json()).then(response => console.log('RES', response))
	};
	
	const storeFormData = (e) => {
		setFormData({
			...formData,
			[e.target.getAttribute('name')]: e.target.textContent,
		});
	};

	return (
		<>
			<CommentTextInput name={'commentText'} onInput={storeFormData} borderBottom={'solid 0.1rem'} {...props}></CommentTextInput>
			<CommentButton onClick={sendFormData} highlightColor={'#a3f590'} margin={'0 0 2% 0'}>
				<BaseSpan fontSize={'15px'}>Leave comment</BaseSpan>
			</CommentButton>
		</>
	);

};



export {MainCommentForm};