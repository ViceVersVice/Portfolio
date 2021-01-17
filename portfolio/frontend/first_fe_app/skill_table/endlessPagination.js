import React, { useState } from 'react';


function EndlessPaginationHoc(WrappedComponent, fetchUrl, observedElementRef_, itemsPerPage_) {
    const observedElementRef = observedElementRef_ || EndOfPageRef
    const itemsPerPage = itemsPerPage_ || 4; 
    
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.hocRef = React.createRef(null);
            this.getAPIData = this.getAPIData.bind(this);
            this.blockDataLoading = this.blockDataLoading.bind(this);
            this.unBlockDataLoading = this.unBlockDataLoading.bind(this);

            this.Reffed = React.forwardRef((props, ref) => {
                const WrappedProps = {
                    ...props,
                    observedElementRef: observedElementRef,
                    apiData: this.state.data,
                    dataIsLoading: this.state.dataIsLoading
                };
                return <WrappedComponent hocRef={ref} {...WrappedProps}></WrappedComponent>
            });
            
            this.state = {
                data: [],
                dataCountStart: 0,
                dataIsLoading: false,
                totalItems: -1,
                blockLoading: false
            };
        };

        getAPIData(getNextPage) {
            // If nextPage is requested, it just adds next page data to actual data --> not refetches all data
            this.setState({...this.state, dataIsLoading: true });
            const start = getNextPage ? this.state.dataCountStart + itemsPerPage: this.state.dataCountStart;
            fetch(`${fetchUrl}/?start=${start}&count=${itemsPerPage}`)
                .then(response => response.json())
                .then(data => {
                    const updState = {
                        data: [...this.state.data, ...data.data],
                        dataCountStart: start,
                        dataIsLoading: false
                    }
                    // Will be needed to prevent redundant requests when all items are obtained
                    if(!getNextPage){
                        updState.totalItems = data.totalItems || -1;
                    };
                    this.setState(updState)
                });
        };

        handlePaginationObserver(entities, observer) {
            // Tracks visibility of EndOfPage element and fetches additional data if EndOfPage becomes visible
            const dataLength = this.state.data.length;
            if (!this.state.blockLoading
                && dataLength 
                && dataLength < this.state.totalItems 
                && entities.length 
                && entities[0].isIntersecting) {
                this.getAPIData(true);
            };
        }; 

        componentDidMount() {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
    
            this.paginationObserver = new IntersectionObserver(
                this.handlePaginationObserver.bind(this),
                observerOptions,
            );
            
            if (this.hocRef.current) {
                this.paginationObserver.observe(this.hocRef.current);
            };

            if(!this.state.blockLoading){
                this.getAPIData();
            } 
        };
        
        blockDataLoading() {
            this.setState({blockLoading: true})
        };

        unBlockDataLoading() {
            this.setState({blockLoading: false})
        };


        render() {
            const props = {
                blockDataLoading: this.blockDataLoading,
                unBlockDataLoading: this.unBlockDataLoading,
                ...this.props
            };
            return <this.Reffed ref={this.hocRef} {...props}></this.Reffed>
        };
    };
};


export {EndlessPaginationHoc};