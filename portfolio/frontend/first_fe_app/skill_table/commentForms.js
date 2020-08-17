import React, {useState} from 'react';
import {baseUrl, skillApiBaseNameUrl} from '../base/baseUrls.js'
import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, BaseParagraph} from './styledComponents.js';


const MainCommentForm = (props) => {
	const [showForm, setShowForm] = useState(false);

	const addCommentUrl = `${baseUrl}/${skillApiBaseNameUrl}/${props.skillId}/add_comment/`;


	const BaseInput = (props) => {
		const inputProps = {type: props.type};
		if(props.value) {
			inputProps.value = props.value;
		};

		return <input {...inputProps}></input>
	}

	const formFieldProps = {margin: '0 0 5% 0'}

	return (
		<>
			<StyledRow {...formFieldProps}>
				<BaseInput type={'text'}></BaseInput>
			</StyledRow>
			<StyledRow {...formFieldProps}>
				<button>Add comment</button>
			</StyledRow>
		</>
	);

};



export {MainCommentForm};