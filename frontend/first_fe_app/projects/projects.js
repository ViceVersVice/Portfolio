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


const ProjectImage = (props) => {
    const imageProps ={
        backgroundImage: `url(${props.src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        objectFit: 'fill',
        minWidth: `${props.trackedSize / 8}px`,
        maxWidth: `${props.trackedSize / 4}px`,
        maxHeight: '100%',
    }

    return <BaseDiv {...imageProps} />
}


const ProjectTechnologySnippet = (props) => {
    const [highlight, setHighlight] = useState(false);
	
	const toHighlight = (e) => {
		setHighlight(true);
	}

	const unHighlight = (e) => {
		setHighlight(false);
	};
    
    const snippetProps = {
        padding: '3%',
        margin: '0 5% 0 0',
        background: 'linear-gradient(0deg, #dee3de, white)',
        borderRadius: '15px',
        width: `${props.trackedSize / 40}px`,
        src: props.skill.image,
        onMouseEnter: toHighlight,
        onMouseLeave: unHighlight,
    }

    if(highlight){
        snippetProps.background = 'linear-gradient(0deg, #eff797, white)'
        snippetProps.cursor = 'pointer'
    }

    return <BaseImg {...snippetProps} />
}


const ProjectsList = (props) => {
    const nameFontSize = props.trackedSize > 0 ? `${props.trackedSize / 60}px` : '30px'
    const textFontSize = props.trackedSize > 0 ? `${props.trackedSize / 70}px` : '25px'

	if(props.apiData) {
		const projects = props.apiData.map((data, n) => {
			return(
                <StyledRow key={n} flexDirection={'column'} marginTop={'1%'} padding={'0 0 0 2%'} boxShadow={'0px 20px 2px -20px black'}>
                    <StyledRow>
                        <ProjectImage src={data.image} trackedSize={props.trackedSize} />
                        <StyledRow flexDirection={'column'} margin={'0 0 0 2%'}>
                            <BaseParagraph margin={'1em 0 0 0'} fontSize={nameFontSize} fontFamily={"'Coda Caption', sans-serif"} borderBottom={'2px solid'}>
                                {data.name}
                            </BaseParagraph>
                            <BaseParagraph fontSize={textFontSize}>{`Duration: ${data.duration}`}</BaseParagraph>
                            <StyledRow>
                                {
                                    data.technologies.length ? 
                                    data.technologies.map((skill, n) => {
                                        return <ProjectTechnologySnippet skill={skill} key={n} trackedSize={props.trackedSize} />
                                    }) : <></>
                                }
                            </StyledRow>
                        </StyledRow>
                    </StyledRow>
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
        <StyledRow justifyContent={'space-around'} flexDirection={'column'} ref={props.trackSizeRef}>
            <EndlessProjectsList trackedSize={props.trackedSize} />
        </StyledRow>
    )
}


const TrackedSizeProjectsTable = SizeTrackerHoc(ProjectsTable)


export {TrackedSizeProjectsTable};