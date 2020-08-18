import React, {useState} from 'react';
import {baseUrl, skillApiBaseNameUrl} from '../base/baseUrls.js'
import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, BaseParagraph, BaseInput} from './styledComponents.js';


const MainCommentForm = (props) => {
	const [showForm, setShowForm] = useState(false);

	const addCommentUrl = `${baseUrl}/${skillApiBaseNameUrl}/${props.skillId}/add_comment/`;


	const CommentTextInput = (props) => {
		return <BaseInput type={'text'} borderRadius={'0.2rem'} width={'100%'} padding={'1.5rem 2rem'}></BaseInput>
	}

	const betweenFields = {margin: '0 0 5% 0'}

	return (
		<>
			<StyledRow {...betweenFields}>
				<CommentTextInput></CommentTextInput>
			</StyledRow>
			<StyledRow {...betweenFields}>
				<button>Add comment</button>
			</StyledRow>
		</>
	);

};



export {MainCommentForm};