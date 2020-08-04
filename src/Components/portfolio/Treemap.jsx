import {connect} from 'react-redux';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useResizeObserver from "../stock/stockComponents/useResizeObserver";
import * as stc from 'string-to-color';


const Treemap = props =>{
    console.log(props)
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions =useResizeObserver(wrapperRef);

    useEffect(()=>{
        const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
            // console.log(width, height)
        const svg=d3.select(svgRef.current)
            .attr("width",width)
            .attr("height", height)
        const data={children:props.portfolio}


        // Give the data to this cluster layout:
        var root = d3.hierarchy(data).sum(d=>d.total);
        console.log(root)

        // initialize treemap
        d3.treemap()
            .size([width*.5, height])
            (root);

        var nodes = svg
                    .selectAll("rect")
                    .data(root.descendants())
                    console.log(nodes)

        // draw rectangles
        nodes.enter()
            .append("rect")
            .attr('x', d=>d.x0 )
            .attr('y', d => d.y0)
            .attr('width', d =>d.x1 - d.x0)
            .attr('height', d =>d.y1 - d.y0)
            .attr('class', d=>d.data.industry)
            .style('fill', d=>stc(d.data.industry))
            .style("stroke", "black")
            .style('padding','2px')
        console.log(nodes)
      
        var nodeText = svg
        .selectAll("text")
        .data(root.leaves())

    // add the text
    nodeText.enter()
        .append("text")
        .attr("x", d=>d.x0+2)
        .attr("y", d=> d.y0+13) 
        .text(d => d.data.ticker)
        .attr("font-size", "15px")
        .attr("fill", "black")
    
    // select node titles
    var nodeVals = svg
        .selectAll("vals")
        .data(root.descendants())  

    // add the values
    nodeVals.enter()
        .append("text")
        .attr("x", d => d.x0+2)
        .attr("y", d=>d.y0+27) 
        .text(d => d.data.total)
        .attr("font-size", "15px")
        .attr("fill", "black")

    },[props.data,dimensions])



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