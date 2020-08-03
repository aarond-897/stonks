import {connect} from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import {select, scaleBand, scaleLinear, scaleDiverging, style, min, max, range, timeFormat,scaleTime} from 'd3';
import useResizeObserver from "../stock/stockComponents/useResizeObserver";


const Treemap = props =>{
    console.log(props)
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions =useResizeObserver(wrapperRef);

    useEffect(()=>{
        console.log(svgRef)
        const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
            console.log(width, height)
        const svg=select(svgRef.current);

    },[props,dimensions])



return(
    <React.Fragment>
        <div ref={wrapperRef}>
            <svg ref={svgRef}>
            </svg>
        </div>
    </React.Fragment>
)
}

const mapStateToProps=reduxState=>reduxState.portfolio;

export default connect(mapStateToProps)(Treemap);