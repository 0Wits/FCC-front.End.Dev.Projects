import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../styles/Choroplet_Style.css';
import * as topojson from 'topojson-client';

const ChoropletLogic = () => {
  useEffect(() => {
    const fetchData = async () => {
      const educationData = await d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');
      const countyData = await d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json');

      d3.select("#choroplet-chart").selectAll("*").remove();

      createChoropleth(educationData, countyData);
    };

    fetchData();
  }, []);

  const createChoropleth = (educationData, countyData) => {
    const width = 960;
    const height = 600;

    const svg = d3.select('#choroplet-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const path = d3.geoPath();

    const color = d3.scaleThreshold()
      .domain([3, 12, 21, 30, 39, 48, 57, 66])
      .range(d3.schemeGreens[9]);

    svg.append('g')
      .selectAll('path')
      .data(topojson.feature(countyData, countyData.objects.counties).features)
      .enter().append('path')
      .attr('class', 'county')
      .attr('d', path)
      .attr('data-fips', d => d.id)
      .attr('data-education', d => {
        const result = educationData.find(obj => obj.fips === d.id);
        return result ? result.bachelorsOrHigher : 0;
      })
      .attr('fill', d => {
        const result = educationData.find(obj => obj.fips === d.id);
        return result ? color(result.bachelorsOrHigher) : color(0);
      })
      .on('mouseover', (event, d) => {
        const result = educationData.find(obj => obj.fips === d.id);
        d3.select('#tooltip')
          .style('opacity', 1)
          .html(`
            <strong>${result.area_name}, ${result.state}</strong><br/>
            ${result.bachelorsOrHigher}%
          `)
          .attr('data-education', result.bachelorsOrHigher)
          .style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 168) + 'px');
      })
      .on('mouseout', () => {
        d3.select('#tooltip')
          .style('opacity', 0);
      });

    // Leyenda
    const legend = svg.append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width - 600}, ${height - 30})`);

    const legendScale = d3.scaleLinear()
      .domain([3, 66])
      .range([0, 240]);

    const legendAxis = d3.axisBottom(legendScale)
      .tickValues(color.domain())
      .tickFormat(d => d + '%');

    legend.selectAll('rect')
      .data(color.range().map(d => {
        const invertExtent = color.invertExtent(d);
        if (!invertExtent[0]) invertExtent[0] = legendScale.domain()[0];
        if (!invertExtent[1]) invertExtent[1] = legendScale.domain()[1];
        return invertExtent;
      }))
      .enter().append('rect')
      .attr('x', d => legendScale(d[0]))
      .attr('y', -10)
      .attr('width', d => legendScale(d[1]) - legendScale(d[0]))
      .attr('height', 10)
      .attr('fill', d => color(d[0]));

    legend.append('g')
      .attr('transform', 'translate(0,0)')
      .call(legendAxis);
  };

  return (
    <div className='choroplet-container'>
      <div className='title text-center my-3'>
        <h2 id='title'>United States Educational Attainment</h2>
        <p id='description'>Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</p>
      </div>
      <div id='choroplet-chart'></div>
      <div id="tooltip" className="tooltip-choroplet"></div>
    </div>
  );
};

export default ChoropletLogic;
