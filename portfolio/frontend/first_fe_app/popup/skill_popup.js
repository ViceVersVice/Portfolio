import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const PopupContainer = styled.div`
	width: 400px;
    padding: 20px;
    background: #fff;
    position: absolute;
    left: 50%;
  	top: 50%;
  	transform: translate(-50%, -50%);
`


class SkillPopup extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		let popup = (
			<PopupContainer>
				<h1>{this.props.data.name}</h1>
			</PopupContainer>
		);
		return ReactDOM.createPortal(popup, document.body);
	}

}

export {SkillPopup};