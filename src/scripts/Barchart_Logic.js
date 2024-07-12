import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../styles/Barchart_Style.css';

const BarchartLogic = () => {
  const w = 900;
  const h = 460;
  const padding = 50;

  useEffect(() => {
    const fetchData = async () => {
      const data = await d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json');
      const dataset = data.data;

      d3.select("#chart").selectAll("*").remove();

      const svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h + 50) 
        .style("margin", "auto");

      svg.append("text")
        .attr("x", w / 2)
        .attr("y", padding / 2)
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .text("Federal Reserve Economic Data");

      const xScale = d3.scaleTime()
        .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0])])
        .range([padding, w - padding]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([h - padding, padding]);

      svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(new Date(d[0])))
        .attr("y", (d) => yScale(d[1]))
        .attr("width", (w - 2 * padding) / dataset.length)
        .attr("height", (d) => h - padding - yScale(d[1]))
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill", "orange");

          const date = new Date(d[0]);
          const tooltipHtml = `
            <strong>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</strong><br/>
            ${d[1]}
          `;
          d3.select("#tooltip")
            .style("opacity", 0.9)
            .html(tooltipHtml);
        })
        .on("mousemove", function (event, d) {
          const [mouseX, mouseY] = d3.pointer(event);
          d3.select("#tooltip")
            .style("left", `${mouseX + 15}px`)
            .style("top", `${mouseY + 15}px`);
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "steelblue");

          d3.select("#tooltip")
            .style("opacity", 0);
        });

      const xAxis = d3.axisBottom(xScale)
        .ticks(d3.timeYear.every(5));

      const yAxis = d3.axisLeft(yScale);

      svg.append("g")
        .attr("transform", `translate(0, ${h - padding})`)
        .call(xAxis);

      svg.append("g")
        .attr("transform", `translate(${padding}, 0)`)
        .call(yAxis);
    };

    fetchData();
  }, []);

  return (
    <div className='centered-container'>
      <div id='chart'></div>
      <div id="tooltip" className="tooltip"></div>
    </div>
  );
}

export default BarchartLogic;
