import React from 'react';
import { BaseDiv, BaseParagraph, StyledRow, StyledFlexInlineRow, BaseImg } from '../base/styledComponents.js'

const AboutMePage = (props) => {
    const mainPhotoProps = {
		objectFit: 'contain',
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		src: 'http://127.0.0.1:8000/static/photos/hujoto.jpg'
	}

    return (
            <StyledRow justifyContent={'center'}>
                <StyledFlexInlineRow flex={'2'}>
                    <BaseParagraph fontSize={'150%'} padding={'5%'}>
                        Hello, I am a passionate Python web developer, team player with ability to think abstractly and learn quickly.
                    </BaseParagraph>
                </StyledFlexInlineRow>
                <StyledFlexInlineRow justifyContent={'center'} flex={'1'} padding={'2%'}>
                    <BaseImg {...mainPhotoProps}></BaseImg>
                </StyledFlexInlineRow>
            </StyledRow>
    )
}

export {AboutMePage};