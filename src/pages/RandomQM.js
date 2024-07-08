// src/pages/RandomQM.js
import React from 'react';
import '../styles/RandomQM.css';
import { useQuote } from '../scripts/randomqmlogic';

function RandomQM() {
  const { quote, visible, bgColor } = useQuote();

  return (
    <div className={`bg-container ${bgColor}`}>
      <div className={`px-5 py-5 my-5 text-center fade-container`}>
        <div id="quote-box" className="col-lg-5 mx-auto">
          <p id="text" className={`lead mb-4 text-white ${visible ? 'fade-in' : 'fade-out'}`}>
            {quote ? quote.text : ''}
          </p>
          <p id="author" className={`text-end text-white ${visible ? 'fade-in' : 'fade-out'}`}>
            {quote ? `- ${quote.author}` : ''}
          </p>
          <div className="container">
            <div className="row">
              <div className="col text-start">
                <button id="tweet-quote" type="button" className="btn btn-dark btn-lg bg-dark">
                <a
                  className="twitter-share-button"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote ? quote.text : ''}" - ${quote ? quote.author : ''} #quotes`)}`}
                  data-size="large"
                >
                  <i className="text-white fa-brands fa-twitter"></i>
                </a>
                </button>
              </div>
              <div className="col text-end">
                <button id="new-quote" type="button" className="btn btn-dark btn-lg bg-dark">New Quote</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandomQM;
