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
            const _resizeObserver = new ResizeObserver(this.setSize.bind(this));
            _resizeObserver.observe(this.trackElementRef.current)
        }
    
        setSize() {
            if(
                this.trackElementRef.current
                && Math.round(this.trackElementRef.current.clientWidth) != this.state.elementWidth
            ){
                const width = Math.round(this.trackElementRef.current.clientWidth)
                
                this.setState({
                    elementWidth: width
                })
            }
        }

        render() {
            return <this.Reffed ref={this.trackElementRef} {...this.props}></this.Reffed>
        }
    }
}

export {SizeTrackerHoc};