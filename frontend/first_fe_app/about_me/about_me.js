import React from 'react';
import { BaseDiv, BaseParagraph, StyledRow, StyledFlexInlineRow, BaseImg } from '../base/styledComponents.js'
import {SizeTrackerHoc} from '../skill_table/sizeTracker.js';

const AboutMePage = (props) => {
    const imageSize = props.trackedSize > 0 ? props.trackedSize * 0.15 : 100

    const mainPhotoProps = {
        float: 'right',

        justifyContent: 'center',
        flex: '2',
        padding: '2%',
		borderRadius: '50%',
        width: `${imageSize * 0.9}px`,
        height: `${imageSize}px`,
        backgroundPosition: '50% 50%',
        backgroundSize: '100% 100%',
		backgroundImage: "url('/static/photos/hujoto.jpg')"
	}

    return (
            <StyledRow justifyContent={'center'} padding={'30px'} ref={props.trackSizeRef}>
                <StyledFlexInlineRow flex={'10'}>
                    <BaseParagraph fontSize={'150%'} margin={'0'}>
                        <BaseDiv {...mainPhotoProps} />
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                    </BaseParagraph>
                </StyledFlexInlineRow>
                
            </StyledRow>
    )
}


const TrackedSizeAboutMePage = SizeTrackerHoc(AboutMePage)


export {TrackedSizeAboutMePage as AboutMePage};