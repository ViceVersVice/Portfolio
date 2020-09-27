import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import {BaseDiv} from './styledComponents.js';
import {baseUrl} from '../base/baseUrls.js';


const StyledMainComment = styled(BaseDiv)`
	margin-top: 20px;
`


const MainComment = (props) => {
	return <StyledMainComment>{props.children}</StyledMainComment> 
}


const SkillCommentList = (props) => {
	if(props.apiData) {
		const comments = props.apiData.map(data => {
			return(
				<MainComment>{data.commentText}</MainComment>
			)
		})
		const ObservedEndOfComments = <props.observedElementRef key={-1} ref={props.hocRef}></props.observedElementRef>;
		comments.push(ObservedEndOfComments) 

		return comments;
	}
	return <MainComment></MainComment>

}


const SubComment = () => {

	return <div></div>
}


export {SkillCommentList, SubComment};