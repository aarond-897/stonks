import {connect} from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import {select, axisBottom, axisLeft, scaleBand, scaleLinear, scaleDiverging, style, min, max} from 'd3';
import useResizeObserver from "./useResizeObserver";


const Candlestick = props =>{
    console.log(props)
    console.log(props.length)
    console.log(props.c.length)
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions =useResizeObserver(wrapperRef);
    console.log(dimensions)
    console.log(svgRef)
    
//called initially and on every data change
    useEffect(()=>{
            console.log(svgRef)
        const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
            console.log(width, height)
        const svg=select(svgRef.current);



        const xScale = scaleBand()
// //TODO insert domain dates once time is converted. check responsive vid
            .domain(props.t.map((value, index)=> index))
// //TODO insert range once measurements are figured out
            .range([0, width])
    

        const yScale = scaleLinear()
            .domain([min(props.h),max(props.h)])
            .range([height,0])

            
        const xAxis = axisBottom(xScale).ticks(props.c.length);
            svg 
                .select(".x-axis")
                .style("transform", `translateY(${height}px)`)
                .call(xAxis)

            

        const yAxis = axisLeft(yScale)
        svg.select(".y-axis")
            .style("transform", `translateX(${width}px)`)
            .call(yAxis)

//     //join update pattern:
            svg.selectAll(".candle")
                .data(props)
                .join('rect')
                .attr("class", "candle")
                .style("transform","scale(1,-1)")
                .attr("x", (value, index)=>xScale(index))
                .attr("y", -height)
                .attr("width", xScale.bandwidth())
        
    },[props, dimensions])


    return(
        <React.Fragment>
            <div ref={wrapperRef}>
                <svg ref={svgRef}>
                    <g className='x-axis' />
                    <g className='y-axis' />
                </svg>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps=reduxState=>reduxState.stockReducer.stockCandles;

export default connect(mapStateToProps)(Candlestick);



// !!!!!go back to later

  //maybe use hooks to and useState to update data values using filter
    //might make a usestate for each property on props
    // const [data, setData] = useState(props)
    // console.log(props)
    // console.log(data)

    //TODO determine if unix conversion should take place on front or back end
    //converts time to yyyy-mm-dd
    // const unixTimeConverter=(date)=>{

    // }


    // let dateFormat = d3.timeParse("%Y-%m-%d");
    //loops through time prop and applies conversion
    // for(let i=0; i<props.t.length; i++){
        // data.t[i] = unixTimeConverter(data.t[i]);
    // }
    // console.log(data)
    // console.log(props)