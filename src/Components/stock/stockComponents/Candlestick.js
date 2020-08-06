import {connect} from 'react-redux';
import React, { useEffect, useRef } from 'react';
import {select, axisBottom, axisLeft, scaleBand, scaleLinear, style, min, max, range, timeFormat,scaleTime, mouse} from 'd3';
import useResizeObserver from "./useResizeObserver";


const Candlestick = props =>{
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions =useResizeObserver(wrapperRef);
    
//called initially and on every data change
    useEffect(()=>{
        const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
            console.log(width, height)
        const svg=select(svgRef.current);
        svg.style("background-color","#161920")

        const unixDateConversion=time=>{
            let date = new Date(time *1000);
            let format = timeFormat("%Y-%m-%d");
            let dateTick = format(date)
            return dateTick;
        }

        let data=[];
        let time=[];

        for (let i=0; i<props.c.length; i++){
            data.push(
                {
                    close:props.c[i],
                    high:props.h[i],
                    low:props.l[i],
                    open:props.o[i],
                    time:unixDateConversion(props.t[i])
                }
            )
            data[i].time=unixDateConversion(props.t[i])
            time.push(unixDateConversion(props.t[i]))
        }
        console.log(data)

        const xScale =scaleTime()
            .domain([new Date(time[0]), new Date(time[time.length-1])] )
            .range([0, width*.97])

        console.log(xScale)
    

        const yScale = scaleLinear()
            .domain([min(props.l),max(props.h)])
            .range([height*.9,0])

        console.log(props)
            
        const xAxis = axisBottom(xScale).ticks(12);
            svg.select(".x-axis")
                .style("transform", `translateY(${height-25}px)`)
                .style("color", "white")
                .call(xAxis)
        console.log(xAxis)
        
        
        const yAxis = axisLeft(yScale)
        svg.select(".y-axis")
        .style("transform", `translateX(${width}px)`)
        .style("color", "white")
        .call(yAxis)
        
        console.log(yAxis)

        let xBand = scaleBand().domain(range(0, props.c.length)).range([0, width]).padding(0.5)

        let tooltip = select("svg")
        .append("div")
        .style("opacity", 1)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style('position', 'fixed')
        .style('left', 100)
        .style('top', 1000)
        .style('z-index', 1000)
        console.log(tooltip)
        

        let mouseover = function(d) {
            console.log('mouseover works')
            console.log(tooltip)
            tooltip.style("opacity", 1)
          }
        
          let mousemove = function(d) {
              console.log('mousemove works')
            //   console.log(mouse(this))
            tooltip
              .html(`${d.high}`)
            //   .style("left", (mouse(this)[0]+90) + "px") 
            //   .style("top", (mouse(this)[1]) + "px")
          }
        
          // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
          let mouseleave = function(d) {
            tooltip
              .transition()
              .duration(200)
              .style("opacity", 1)
          }

//     //join update pattern:
            svg.selectAll(".candle")
                .data(data)
                .join('rect')
                .attr("class", "candle")
                .attr('x', (d, i) => xScale(new Date(d.time)) - xBand.bandwidth())
                .attr('y', d => yScale(Math.max(d.open, d.close)))
                .attr('width', xBand.bandwidth())
                .attr('height', d => (d.open === d.close) ? 1 : yScale(Math.min(d.open, d.close))-yScale(Math.max(d.open, d.close)))
                .attr("fill", d => (d.open === d.close) ? "silver" : (d.open > d.close) ? "red" : "green")
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)
 


            svg.selectAll(".stem")
                .data(data)
                .join('line')
                .attr("class", "stem")
                .attr("x1", (d, i) => xScale(new Date(d.time)) - xBand.bandwidth()/2)
                .attr("x2", (d, i) => xScale(new Date(d.time)) - xBand.bandwidth()/2)
                .attr("y1", d => yScale(d.high))
                .attr("y2", d => yScale(d.low))
                .attr("stroke", d => (d.open === d.close) ? "white" : (d.open > d.close) ? "red" : "green");
                
        
    },[props, dimensions])


    return(
        <React.Fragment>
            <div ref={wrapperRef}>
                <svg ref={svgRef}>
                    <g className='y-axis' />
                    <g className='x-axis' />
                </svg>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps=reduxState=>reduxState.stockReducer.stockCandles;

export default connect(mapStateToProps)(Candlestick);

