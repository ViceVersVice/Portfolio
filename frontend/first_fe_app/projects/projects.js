import React, { useEffect, useState } from 'react'
import { baseUrl, skillProjectsBaseUrl } from '../base/baseUrls.js'
import { BaseDiv, BaseParagraph, StyledRow, StyledFlexInlineRow, BaseImg } from '../base/styledComponents.js'
import { EndlessPaginationHoc } from '../skill_table/endlessPagination.js'
import { SizeTrackerHoc } from '../skill_table/sizeTracker.js'


const EndOfProjects = (props) => {
	return <BaseDiv width={'100%'} minHeight={'1px'} ref={props.innerRef}></BaseDiv>
}


const EndOfProjectsRef = React.forwardRef((props, ref) => {
	return <EndOfProjects {...props} innerRef={ref}></EndOfProjects>
})


const ProjectTechnologySnippet = (props) => {
    const [highlight, setHighlight] = useState(false);
	
	const toHighlight = (e) => {
		setHighlight(true);
	}

	const unHighlight = (e) => {
		setHighlight(false);
	};

    const snippetProps = {
        padding: '5%',
        margin: '0 10% 0 0',
        onMouseEnter: toHighlight,
        onMouseLeave: unHighlight,
    }

    if(highlight){
        snippetProps.background = 'linear-gradient(0deg, #dee3de, white)'
        snippetProps.borderRadius = '15px'
        snippetProps.cursor = 'pointer'
    }
        

    return(
        <BaseDiv {...snippetProps}>
            <BaseImg src={props.skill.image} maxHeight={'70px'}></BaseImg>
        </BaseDiv>
    )
}


const ProjectsList = (props) => {
    const nameFontSize = props.trackedSize > 0 ? `${props.trackedSize / 50}px` : '30px'
    const textFontSize = props.trackedSize > 0 ? `${props.trackedSize / 60}px` : '25px'

	if(props.apiData) {
		const projects = props.apiData.map((data, n) => {
			return(
                <StyledRow key={n} flexDirection={'column'} padding={'0 0 0 2%'} boxShadow={'0px 20px 2px -20px black'}>
                    <StyledRow>
                        <BaseParagraph margin={'1em 0 0 0'} fontSize={nameFontSize} fontFamily={"'Coda Caption', sans-serif"}>
                            {data.name}
                        </BaseParagraph>
                    </StyledRow>
                    <StyledRow>
                        <BaseParagraph fontSize={textFontSize}>{`Duration: ${data.duration}`}</BaseParagraph>
                    </StyledRow>
                    <StyledFlexInlineRow>
                        <StyledRow>
                            {
                                data.technologies.length ? 
                                data.technologies.map((skill, n) => {
                                    return <ProjectTechnologySnippet skill={skill} key={n}></ProjectTechnologySnippet>
                                }) : <></>
                            }
                        </StyledRow>
                    </StyledFlexInlineRow>
                    <StyledRow>
                        <BaseParagraph fontSize={textFontSize}>{data.text}</BaseParagraph>
                    </StyledRow>
                </StyledRow>
			)
		})
		
		// EndlessPaginationHoc refs
		if(props.observedElementRef){
			const ObservedEndOfProjects = <props.observedElementRef key={-1} ref={props.hocRef}></props.observedElementRef>;
			projects.push(ObservedEndOfProjects)
		}
		return projects;
	}
	
    return <BaseParagraph>No projects</BaseParagraph>
}


const EndlessProjectsList = EndlessPaginationHoc(
    ProjectsList, 
    `${baseUrl}/${skillProjectsBaseUrl}/list`,
    EndOfProjectsRef,
    4
)


const ProjectsTable = (props) => {
    return (
        <StyledRow justifyContent={'center'} flexDirection={'column'} ref={props.trackSizeRef}>
            <EndlessProjectsList trackedSize={props.trackedSize} />
        </StyledRow>
    )
}


const TrackedSizeProjectsTable = SizeTrackerHoc(ProjectsTable)


export {TrackedSizeProjectsTable};