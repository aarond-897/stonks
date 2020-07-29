import {connect} from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import {select, axisBottom, axisLeft, scaleBand, scaleLinear, scaleDiverging, style, min, max, range} from 'd3';
import useResizeObserver from "./useResizeObserver";


const Candlestick = props =>{
    console.log(props)
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
            .domain(props.t.map((value, index)=>{
                // console.log(value) unixtimecode
                // console.log(index) index
            return index} ))
// //TODO insert range once measurements are figured out
            .range([0, width])

        console.log(xScale)
    

        const yScale = scaleLinear()
            .domain([min(props.h),max(props.h)])
            .range([height,0])

        console.log(props)
            
        const xAxis = axisBottom(xScale).ticks(props.c.length);
            svg 
                .select(".x-axis")
                .style("transform", `translateY(${height}px)`)
                .call(xAxis)
        console.log(xAxis)
        
        
        const yAxis = axisLeft(yScale)
        svg.select(".y-axis")
        .style("transform", `translateX(${width}px)`)
        .call(yAxis)
        
        console.log(yAxis)

        let xBand = scaleBand().domain(range(-1, props.c.length)).range([0, width]).padding(0.5)

        const unixDateConversion=time=>{
            let date = new Date(time *1000);
            console.log(date)
            console.log(date.getMonth()+1)
            console.log(date.getDate())
        }

        
        unixDateConversion(1565011800)

        let data=[];

        for (let i=0; i<props.c.length; i++){
            data.push(
                {
                    close:props.c[i],
                    high:props.h[i],
                    low:props.l[i],
                    open:props.o[i],
                    time:props.t[i]
                }
            )
        }
        console.log(data)

//     //join update pattern:
            svg.selectAll(".candle")
                .data(data)
                .join('rect')
                .attr("class", "candle")
                .attr('x', (d, i) => xScale(i) - xBand.bandwidth())
                .attr('y', d => yScale(Math.max(d.open, d.close)))
                .attr('width', xBand.bandwidth())
                .attr('height', d => (d.open === d.close) ? 1 : yScale(Math.min(d.open, d.close))-yScale(Math.max(d.open, d.close)))
                .attr("fill", d => (d.open === d.close) ? "silver" : (d.open > d.close) ? "red" : "green")

                // .style("transform","scale(1,-1)")
                // .attr("x", (value, index)=>xScale(index))
                // .attr("y", -height)
                // .attr("stroke", 'red')
                // .attr("width", xScale.bandwidth())
        
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