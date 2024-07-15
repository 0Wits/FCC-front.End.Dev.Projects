import React, { useState } from 'react';
import TreemapLogic from '../scripts/Treemap_Logic';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

const datasets = {
  videoGames: {
    url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",
    title: "Video Game Sales",
    description: "Top 100 Most Sold Video Games Grouped by Platform"
  },
  movies: {
    url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
    title: "Movie Sales",
    description: "Top 100 Highest Grossing Movies Grouped By Genre"
  },
  kickstarter: {
    url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
    title: "Kickstarter Pledges",
    description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category"
  }
};

function Treemap() {
  const [activeDataset, setActiveDataset] = useState('videoGames');

  const handleSelect = (selectedKey) => {
    setActiveDataset(selectedKey);
  };

  const { url, title, description } = datasets[activeDataset];

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Nav className="mx-auto" onSelect={handleSelect}>
          <Nav.Link eventKey="videoGames">Video Game Data Set</Nav.Link>
          <Nav.Link eventKey="movies">Movies Data Set</Nav.Link>
          <Nav.Link eventKey="kickstarter">Kickstarter Data Set</Nav.Link>
        </Nav>
      </Navbar>
      <TreemapLogic dataUrl={url} title={title} description={description} />
    </div>
  );
}

export default Treemap;
