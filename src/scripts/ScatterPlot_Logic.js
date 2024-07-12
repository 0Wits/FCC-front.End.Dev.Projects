import React, { useEffect } from 'react';
import * as d3 from 'd3';

const ScatterplotLogic = () => {
  const w = 900;
  const h = 500;
  const padding = 60;

  useEffect(() => {
    const fetchData = async () => {
      const data = await d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json');

      d3.select("#chart").selectAll("*").remove();

      const svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h + 50) 
        .style("margin", "auto");

      svg.append("text")
        .attr("id", "title")
        .attr("x", w / 2)
        .attr("y", padding / 2)
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .text("Doping in Professional Bicycle Racing");

      svg.append("text")
        .attr("x", w / 2)
        .attr("y", padding / 2 + 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "15px")
        .text("35 Fastest times up Alpe d'Huez");

      const xScale = d3.scaleLinear()
        .domain([d3.min(data, (d) => d.Year) - 1, d3.max(data, (d) => d.Year) + 1])
        .range([padding, w - padding]);

      const yScale = d3.scaleTime()
        .domain([d3.min(data, (d) => new Date(`1970-01-01T00:${d.Time}`)), d3.max(data, (d) => new Date(`1970-01-01T00:${d.Time}`))])
        .range([padding, h - padding]);

      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.Year))
        .attr("cy", d => yScale(new Date(`1970-01-01T00:${d.Time}`)))
        .attr("r", 5)
        .attr("class", "dot")
        .attr("data-xvalue", d => d.Year)
        .attr("data-yvalue", d => new Date(`1970-01-01T00:${d.Time}`))
        .attr("fill", d => d.Doping ? "blue" : "orange")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill", "red");

          const tooltipHtml = `
            <strong>${d.Name}</strong><br/>
            Year: ${d.Year}<br/>
            Time: ${d.Time}<br/>
            ${d.Doping}
          `;
          d3.select("#tooltip")
            .style("opacity", 0.9)
            .html(tooltipHtml);
        })
        .on("mousemove", function (event) {
          const [mouseX, mouseY] = d3.pointer(event);
          d3.select("#tooltip")
            .style("left", `${mouseX + 55}px`)
            .style("top", `${mouseY + 15}px`);
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", d => d.Doping ? "blue" : "orange");

          d3.select("#tooltip")
            .style("opacity", 0);
        });

      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

      const yAxis = d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat("%M:%S"));

      svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${h - padding})`)
        .call(xAxis)
        .selectAll(".tick");

      svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${padding}, 0)`)
        .call(yAxis)
        .selectAll(".tick");

      // Leyenda
      const legend = svg.append("g")
        .attr("id", "legend")
        .attr("transform", `translate(${w - padding}, ${padding})`);

      legend.append("rect")
        .attr("x", 35)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "orange");

      legend.append("text")
        .attr("x", -120)
        .attr("y", 10)
        .text("No doping allegations");

      legend.append("rect")
        .attr("x", 35)
        .attr("y", 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "blue");

      legend.append("text")
        .attr("x", -175)
        .attr("y", 30)
        .text("Riders with doping allegations");
    };

    fetchData();
  }, []);
//For some REASON I CANNOT ADD THE DESIRED STYLE IN SCATTERPLOT_STYLE.CSS WHYYYYY!!!  
  return (
    <div className='centered-container'>
      <div id='chart'></div>
      <div id="tooltip" className="tooltip"></div>
    </div>
  );
}

export default ScatterplotLogic;
