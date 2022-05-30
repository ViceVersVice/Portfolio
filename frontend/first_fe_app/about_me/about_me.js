import React from 'react';
import {
    BaseDiv, BaseParagraph, StyledRow, StyledFlexInlineRow,
    BaseImg, BaseSpan, RouterCustomLink 
} from '../base/styledComponents.js'
import {staticFolderUrl} from '../base/baseUrls.js'
import {GenericButton} from '../skill_table/genericButton.js';
import {SizeTrackerHoc} from '../skill_table/sizeTracker.js';


const AboutMePage = (props) => {
    const mainFontSize = props.trackedSize > 0 ? props.trackedSize / 50 : 20
    const headerFontSize = props.trackedSize > 0 ? props.trackedSize / 25 : 20
    const imageSize = props.trackedSize > 0 ? props.trackedSize * 0.25 : 100
    const contactButtonsWidth = props.trackedSize > 0 ? props.trackedSize * 0.15 : 60
    
    const mainPhotoProps = {
        float: 'right',
        justifyContent: 'center',
        flex: '2',
        margin: '0 0 0 3%',
        width: `${imageSize * 0.8}px`,
        height: `${imageSize}px`,
        backgroundPosition: '50% 50%',
        backgroundSize: '100% 100%',
		backgroundImage: "url('/static/photos/hujoto.jpg')",
        borderRadius: '15%',
	}

    const baseButtonProps = {
        width: `${contactButtonsWidth}px`,
        backgroundColor: '#e4ebf0',
        justifyContent: 'center',
        textSizeCoefficient: 15,
        backgroundSizeCoefficient: 6,
        margin: '0px 20px 0px 0px',
        boxShadow: '10px 5px 5px #b3b1b1',
        padding: '20px 15px 20px 0',
    }

    const githubProps = {
        buttonImage: `${staticFolderUrl}icons/github.png`,
        onClick: () => window.open('https://github.com/ViceVersVice/'),
        ...baseButtonProps
    }

    const linkedinProps = {
        buttonImage: `${staticFolderUrl}icons/linkedin.png`,
        onClick: () => window.open('https://www.linkedin.com/in/oleksandr-kholiavskyi-858103124/'),
        ...baseButtonProps
    }

    const upworkProps = {
        buttonImage: `${staticFolderUrl}icons/upwork.png`,
        onClick: () => window.open('https://www.upwork.com/freelancers/~01bdab9360792ec959'),
        ...baseButtonProps
    }

    return (
            <StyledRow justifyContent={'flex-start'} flexDirection={'column'} padding={'30px'} height={'100%'} ref={props.trackSizeRef}>
                <StyledFlexInlineRow>
                    <BaseParagraph fontSize={`${mainFontSize}px`} margin={'0'}>
                        <BaseDiv {...mainPhotoProps} />
                        <BaseSpan fontSize={`${headerFontSize}px`} fontWeight={'bold'} lineHeight={`${headerFontSize * 2}px`}>
                            Web developer
                        </BaseSpan>
                        <br></br>
                        Hello, my name is Oleksandr Kholiavskyi and I am a passionate Python web developer with 2.5+ years of commercial experience.
                        In this app you can find in interactive manner my skills and projects. 
                    </BaseParagraph>
                </StyledFlexInlineRow>
                <StyledFlexInlineRow margin={'1% 0 0 0'}>
                    <GenericButton {...githubProps}>
                        GitHub
                    </GenericButton>
                    <GenericButton {...linkedinProps}>
                        LinkedIn
                    </GenericButton>
                    <GenericButton {...upworkProps}>
                        Upwork
                    </GenericButton>
                </StyledFlexInlineRow>
            </StyledRow>
    )
}


const TrackedSizeAboutMePage = SizeTrackerHoc(AboutMePage)


export {TrackedSizeAboutMePage as AboutMePage};