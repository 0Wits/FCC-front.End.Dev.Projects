import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../styles/Heatmap_Style.css';

const HeatmapLogic = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json');
      const data = await response.json();
      const { baseTemperature, monthlyVariance } = data;

      d3.select("#heatmap").selectAll("*").remove();

      createHeatmap(baseTemperature, monthlyVariance);
    };

    fetchData();
  }, []);

  const createHeatmap = (baseTemperature, monthlyVariance) => {
    const w = 1200;
    const h = 600;
    const padding = 60;

    const svg = d3.select("#heatmap")
      .append("svg")
      .attr("width", w)
      .attr("height", h + 100) 
      .style("margin", "auto");

    svg.append("text")
      .attr("x", w / 2)
      .attr("y", padding / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .text("Monthly Global Land-Surface Temperature");

    svg.append("text")
      .attr("x", w / 2)
      .attr("y", padding / 1.2)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text("1753 - 2015: base temperature 8.66℃");

    const xScale = d3.scaleTime()
      .domain([new Date(d3.min(monthlyVariance, d => d.year), 0), new Date(d3.max(monthlyVariance, d => d.year), 0)])
      .range([padding, w - padding]);

    const yScale = d3.scaleBand()
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      .range([padding, h - padding]);

    const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
      .domain([d3.max(monthlyVariance, d => baseTemperature + d.variance), d3.min(monthlyVariance, d => baseTemperature + d.variance)]);

    svg.selectAll("rect")
      .data(monthlyVariance)
      .enter()
      .append("rect")
      .attr("x", d => xScale(new Date(d.year, 0)))
      .attr("y", d => yScale(d.month - 1))
      .attr("width", (w - 2 * padding) / (monthlyVariance.length / 12))
      .attr("height", yScale.bandwidth())
      .attr("fill", d => colorScale(baseTemperature + d.variance))
      .on("mouseover", (event, d) => {
        d3.select(event.target).attr("stroke", "black");
        const [x, y] = d3.pointer(event);
        const date = new Date(d.year, d.month - 1);
        const tooltipHtml = `
          <strong>${date.toLocaleString('default', { month: 'long' })} ${d.year}</strong><br/>
          Variance: ${d.variance.toFixed(2)}℃<br/>
          Temperature: ${(baseTemperature + d.variance).toFixed(2)}℃
        `;

        d3.select("#tooltip")
          .html(tooltipHtml)
          .style("left", `${x + 5}px`)
          .style("top", `${y - 28}px`)
          .style("opacity", 1);
      })
      .on("mouseout", (event) => {
        d3.select(event.target).attr("stroke", "none");
        d3.select("#tooltip")
          .style("opacity", 0);
      });

    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeYear.every(10));

    const yAxis = d3.axisLeft(yScale)
      .tickFormat((d, i) => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][i]);

    svg.append("g")
      .attr("transform", `translate(0, ${h - padding})`)
      .call(xAxis);

    svg.append("g")
      .attr("transform", `translate(${padding}, 0)`)
      .call(yAxis);

    // Barra de colores
    const legendWidth = 400;
    const legendHeight = 20;

    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${(w - legendWidth) / 2}, ${h + 40})`);

    const legendScale = d3.scaleLinear()
      .domain([2.8, 12.8])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(10);

    legend.selectAll("rect")
      .data(d3.range(2.8, 12.8, (12.8 - 2.8) / legendWidth))
      .enter().append("rect")
      .attr("x", (d, i) => i)
      .attr("y", 0)
      .attr("width", 1)
      .attr("height", legendHeight)
      .attr("fill", d => d3.interpolateRdYlBu((d - 2.8) / (12.8 - 2.8)));

    legend.append("g")
      .attr("transform", `translate(0, ${legendHeight})`)
      .call(legendAxis);
  };

  return (
    <div className='heatmap-container'>
      <div id='heatmap'></div>
      <div id="tooltip" className="tooltip-heatmap"></div>
    </div>
  );
}

export default HeatmapLogic;
