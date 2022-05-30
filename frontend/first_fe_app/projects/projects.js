import React, { useEffect, useState } from 'react'
import { baseUrl, skillProjectsBaseUrl } from '../base/baseUrls.js'
import { BaseDiv, BaseParagraph, StyledRow, StyledFlexInlineRow, BaseImg, BaseSpan } from '../base/styledComponents.js'
import { EndlessPaginationHoc } from '../skill_table/endlessPagination.js'
import { SizeTrackerHoc } from '../skill_table/sizeTracker.js'
import { SkillPopup } from '../skill_table/skillPopup.js'


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
        minWidth: `${props.trackedSize / 6}px`,
        maxWidth: `${props.trackedSize / 3}px`,
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

    const onClick = (e) => {
        props.togglePopup(props.skill)
    }

    const containerWidth = props.trackedSize / 14

    const snippetContainerProps = {
        flexDirection: 'column',
        padding: '0 0 5px 0',
        margin: '15px 20px 0 0',
        background: 'linear-gradient(0deg, #dee3de, white)',
        backgroundSize: '100% 100%',
        borderRadius: '15px',
        boxShadow: '5px 5px 5px #b3b1b1',
        width: `${containerWidth}px`,
        title: props.skill.name,
        cursor: 'pointer',
        onMouseEnter: toHighlight,
        onMouseLeave: unHighlight,
        onClick: onClick,
    }

    const snippetImageProps = {
        backgroundPosition: '50% 50%',
        backgroundSize: '100% 100%',
        height: `${containerWidth - 10}px`,
        width: '100%',
		backgroundImage: `url('${props.skill.image}')`,
        borderRadius: '15px',
    }

    const techNameProps = {
        textAlign: 'center',
        fontSize: props.textFontSize,
        margin: '8px 0 0 0',
    }


    if(highlight){
        snippetContainerProps.background = 'linear-gradient(0deg, #eff797, white)'
    }

    return(
        <StyledRow {...snippetContainerProps}>
            <BaseDiv {...snippetImageProps} />
            <BaseSpan {...techNameProps}>{props.skill.name}</BaseSpan>
        </StyledRow>
        
    )
}


const ProjectsList = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupSkillData, setPopupskillData] = useState(null);
    
    const nameFontSize = props.trackedSize > 0 ? `${props.trackedSize / 35}px` : '30px'
    const textFontSize = props.trackedSize > 0 ? `${props.trackedSize / 60}px` : '25px'

    const togglePopup = (skillData) => {
        setShowPopup(!showPopup)
        setPopupskillData(skillData || null)
    };

	if(props.apiData) {
		const projects = props.apiData.map((data, n) => {
			return(
                <StyledRow key={n} flexDirection={'column'} marginTop={'1%'} padding={'0 3% 2% 3%'} boxShadow={'0px 20px 2px -20px black'}>
                    <StyledRow>
                        <ProjectImage src={data.image} trackedSize={props.trackedSize} />
                        <StyledRow flexDirection={'column'} margin={'0 0 0 2%'}>
                            <BaseParagraph fontSize={nameFontSize} fontFamily={"'Coda Caption', sans-serif"} margin={'0'}>
                                <b>{data.name}</b>
                            </BaseParagraph>
                            <BaseParagraph fontSize={textFontSize} margin={'10px 10px 10px 0'}>
                                <b>Duration: </b>
                                {data.duration}
                            </BaseParagraph>
                            <StyledRow flexWrap={'wrap'}>
                                {
                                    data.technologies.length ? 
                                    data.technologies.map((skill, n) => {
                                        const snippetProps = {
                                            key: n,
                                            skill: skill,
                                            trackedSize: props.trackedSize,
                                            textFontSize: textFontSize,
                                            togglePopup: togglePopup,
                                        }
                                        return <ProjectTechnologySnippet {...snippetProps} />
                                    }) : <></>
                                }
                            </StyledRow>
                        </StyledRow>
                    </StyledRow>
                    <StyledRow margin={'2% 0 0 0'}>
                        <BaseSpan fontSize={textFontSize} >{data.text}</BaseSpan>
                    </StyledRow>
                </StyledRow>
			)
		})
		
        if(showPopup){
            const popupProps = {
                data: popupSkillData,
                key: projects.length + 1,
                closePopup: togglePopup,
            }
            projects.push(<SkillPopup {...popupProps} />)
        }


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


export {TrackedSizeProjectsTable as ProjectsTablePage};