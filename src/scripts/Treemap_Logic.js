import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../styles/Treemap_Style.css';

const TreemapLogic = ({ dataUrl, title, description }) => {
  useEffect(() => {
    d3.select("#treemap-chart").selectAll("*").remove();
    d3.select("#legend").selectAll("*").remove();

    const width = 960;
    const height = 600;

    const svg = d3.select("#treemap-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const tooltip = d3.select("#tooltip");

    d3.json(dataUrl).then(data => {
      const root = d3.hierarchy(data)
        .eachBefore(d => {
          d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
        })
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

      const treemap = d3.treemap()
        .size([width, height])
        .paddingInner(1);

      treemap(root);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const cell = svg.selectAll("g")
        .data(root.leaves())
        .enter().append("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

      cell.append("rect")
        .attr("id", d => d.data.id)
        .attr("class", "tile")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("data-name", d => d.data.name)
        .attr("data-category", d => d.data.category)
        .attr("data-value", d => d.data.value)
        .attr("fill", d => color(d.data.category))
        .on("mouseover", (event, d) => {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(`
            <strong>${d.data.name}</strong><br/>
            Category: ${d.data.category}<br/>
            Value: ${d.data.value}
          `)
            .attr("data-value", d.data.value)
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });

      cell.append("text")
        .attr("class", "tile-text")
        .selectAll("tspan")
        .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
        .enter().append("tspan")
        .attr("x", 4)
        .attr("y", (d, i) => 13 + i * 10)
        .text(d => d);

      // Leyenda
      const categories = [...new Set(root.leaves().map(d => d.data.category))];
      const legend = d3.select("#legend")
        .append("svg")
        .attr("width", width)
        .attr("height", 50 * Math.ceil(categories.length / (width / 100)));

      const legendItem = legend.selectAll(".legend-item")
        .data(categories)
        .enter().append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(${(i % (width / 100)) * 100}, ${Math.floor(i / (width / 100)) * 20})`);

      legendItem.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", d => color(d));

      legendItem.append("text")
        .attr("x", 30)
        .attr("y", 15)
        .text(d => d);

    });
  }, [dataUrl]);

  return (
    <div className='treemap-container'>
      <div className='title text-center my-3'>
        <h2 id='title'>{title}</h2>
        <p id='description'>{description}</p>
      </div>
      <div id='treemap-chart'></div>
      <div id="tooltip" className="tooltip-treemap"></div>
      <div id="legend" className="legend"></div>
    </div>
  );
};

export default TreemapLogic;
