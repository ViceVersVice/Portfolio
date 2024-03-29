import React from 'react';
import styled from 'styled-components';

import {BaseDiv, BaseImg, BaseSpan} from '../base/styledComponents.js';
import {baseUrl, skillApiBaseNameUrl} from '../base/baseUrls.js';


const StyledMainComment = styled(BaseDiv)`
	${'' /* margin-top: 40px; */}
`


const getSkillCommentsCount = (skillId, updStateCallback) => {
	fetch(`${baseUrl}/${skillApiBaseNameUrl}/${skillId}/comments_count/`)
		.then(response => response.json())
		.then(data => {
			updStateCallback(data)
		})
}


const MainComment = (props) => {
	const commentProfileImageContainerProps = {
		maxWidth: '60px',
		maxHeight: '60px',
	}

	const commentProfileImageProps = {
		objectFit: 'cover',
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		src: props.data.avatar || '/static/icons/profile.png',
	}

	return (
		<BaseDiv display={'inline-flex'} margin={'2% 0% 0% 0%'}>
			<BaseDiv display={'inline-flex'} {...commentProfileImageContainerProps}>
				<BaseImg {...commentProfileImageProps}></BaseImg>
			</BaseDiv>
			<BaseDiv margin={'0% 0% 0% 2%'} display={'inline-flex'} flexDirection={'column'}>
				<BaseSpan fontSize={`${props.fontSize * 0.8}px`}>
					<b>{`${props.data.username} `}</b>
					{props.data.dateAdded}
				</BaseSpan>
				<BaseSpan fontSize={`${props.fontSize}px`} marginTop={'2%'}>{props.data.commentText}</BaseSpan> 
			</BaseDiv>
			
		</BaseDiv>
	)
}


const SkillCommentList = (props) => {
	if(props.apiData) {
		const comments = props.apiData.map((data, n) => {
			return(
				<MainComment key={n} fontSize={props.fontSize} data={data} />
			)
		})
		
		// EndlessPaginationHoc refs
		if(props.observedElementRef){
			const ObservedEndOfComments = <props.observedElementRef key={-1} ref={props.hocRef}></props.observedElementRef>;
			comments.push(ObservedEndOfComments)
		}

		return comments;
	}

	return <MainComment></MainComment>
}


const SubComment = () => {

	return <div></div>
}


export {getSkillCommentsCount, SkillCommentList, SubComment};
