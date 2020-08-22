import React, {useState} from 'react';
import styled from 'styled-components';

import {baseUrl, skillApiBaseNameUrl} from '../base/baseUrls.js'
import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, BaseParagraph, BaseInput, BaseSpan} 
        from './styledComponents.js';
import {CommentButton} from './commentButton.js';


const MainCommentForm = (props) => {
	const addCommentUrl = `${baseUrl}/${skillApiBaseNameUrl}/${props.skillId}/add_comment/`;


	const CommentTextInput = (props) => {
		const [showPlaceholder, setShowPlaceholder] = useState(true);

		const TextAreaSpan = styled(BaseSpan)`
			outline: 0px solid transparent;
			display: block;
			width: 100%;
		`

		const togglePlaceholder = (e) => {
			setShowPlaceholder(false);
		}

		const placeholder = showPlaceholder ? <BaseSpan opacity={'0.5'}>Write comment here</BaseSpan>: '';

		return <TextAreaSpan role={'textbox'} contentEditable={true} placeholder="Enter weight…" onClick={togglePlaceholder} {...props}>{placeholder}</TextAreaSpan>
	}


	return (
		<>
			<BaseParagraph borderBottom={'solid 0.1rem'}><CommentTextInput {...props}></CommentTextInput></BaseParagraph>
			<CommentButton highlightColor={'#a3f590'} margin={'0 0 2% 0'}>
				<BaseSpan fontSize={'15px'}>Leave comment</BaseSpan>
			</CommentButton>
		</>
	);

};



export {MainCommentForm};