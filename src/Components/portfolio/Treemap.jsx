import {connect} from 'react-redux';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useResizeObserver from "../stock/stockComponents/useResizeObserver";
import * as stc from 'string-to-color';
import { withRouter } from 'react-router-dom';
import {setStock} from '../../redux/reducers/stockReducer';
import axios from 'axios';
import styled from 'styled-components';


const TreemapSvg = styled.svg`
    width:60vw;
    height:94vh;
    cursor: pointer;
`

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

        svg.selectAll("*").remove();    
        const data={children:props.portfolio}
        console.log(data)


        // Give the data to this cluster layout:
        const root = d3.hierarchy(data).sum(d=>d.total).sort((a, b) => b.industry - a.industry);
        console.log(root)

        // initialize treemap
        d3.treemap()
            .size([width, height])
            (root);

        const nodes = svg
                    .selectAll("g")
                    .data(root.leaves())
                    .join("g")
                    console.log(nodes)

        // draw rectangles

        

        nodes
            .append("rect")
            .attr('x', d=>d.x0 )
            .attr('y', d => d.y0)
            .attr('width', d =>d.x1 - d.x0)
            .attr('height', d =>d.y1 - d.y0)
            .attr('class', d=>d.data.industry)
            // .style('margin','20px')
            .style('fill', d=>stc(d.data.industry))
            .style("stroke", "black")
            .style('padding','2px')
            .on("click",d=>{
                axios.get(`/api/ticker/${d.data.ticker}`)
                .then(res=>{
                    props.setStock(res.data)
                    props.history.push(`/stock/${d.data.ticker}`)
            }
            )
        })
            

            
        console.log(nodes)
      
        const nodeText = svg
        .selectAll("g")
        .data(root.leaves())
        .join("g")

    // add the text
    nodeText
        .append("text")
        .attr("x", d=>d.x0+2)
        .attr("y", d=> d.y0+13) 
        .text(d => d.data.ticker.toUpperCase())
        .attr("font-size", "15px")
        .attr("fill", "black")

        nodeText
        .append("text")
        .attr("x", d=>d.x0+2)
        .attr("y", d=> d.y0+40) 
        .text(d => d.data.industry)
        .attr("font-size", "15px")
        .attr("fill", "black")
    
    // select node titles
    const nodeVals = svg
        .selectAll("g")
        .data(root.leaves())
        .join("g")  

    // add the values
    nodeVals
        .append("text")
        .attr("x", d => d.x0+2)
        .attr("y", d=>d.y0+27) 
        .text(d => `$${d.data.total}`)
        .attr("font-size", "15px")
        .attr("fill", "black")

    },[
        props.portfolio,
        dimensions
    ])



return(
    <React.Fragment>
        <div ref={wrapperRef}>
            <TreemapSvg ref={svgRef}>
            </TreemapSvg>
        </div>
    </React.Fragment>
)
}

const mapStateToProps=reduxState=>reduxState.portfolio;

export default connect(mapStateToProps,{setStock})(withRouter(Treemap));