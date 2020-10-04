import React, { useState } from 'react';


function SizeTrackerHoc(WrappedComponent) {
    return class extends React.Component {
        constructor(props){
            super(props);
            this.trackElementRef = React.createRef(null);
            this.state = {
                elementWidth: 0
            }

            this.Reffed = React.forwardRef((props, ref) => {
                return <WrappedComponent trackSizeRef={ref} trackedSize={this.state.elementWidth} {...props}></WrappedComponent>
            })
        }

        componentDidMount(){
            const skillDescriptionResizeObserver = new ResizeObserver(this.setSize.bind(this));
            skillDescriptionResizeObserver.observe(this.trackElementRef.current)
        }
    
        setSize() {
            if(this.trackElementRef.current){
                this.setState({
                    elementWidth: this.trackElementRef.current.clientWidth
                })
            }
        }

        render() {
            return <this.Reffed ref={this.trackElementRef} {...this.props}></this.Reffed>
        }
    }
}

export {SizeTrackerHoc};