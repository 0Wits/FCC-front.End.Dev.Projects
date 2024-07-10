import { Link } from 'react-router-dom';
//import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item d-none d-lg-block"><p className="nav-link">|</p></li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="frontendDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Front End Projects
              </Link>
              <ul className="dropdown-menu" aria-labelledby="frontendDropdown">
                <li>
                  <Link className="dropdown-item" to="/randomqm">Random QM</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/markdownprev">Markdown Previewer</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/drummachine">Drum Machine</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/calculator">Calculator</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/pomodoro">Pomodoro</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item d-none d-lg-block"><p className="nav-link">|</p></li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="d3Dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                D3 Projects
              </Link>
              <ul className="dropdown-menu" aria-labelledby="d3Dropdown">
                <li>
                  <Link className="dropdown-item" to="/barchart">Bar Chart</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/scatterplot">Scatterplot Graph</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/heatmap">Heat Map</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/choropleth">Choropleth Map</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/treemap">Treemap Diagram</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
