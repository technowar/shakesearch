import React, { useRef, useState } from 'react';
import './App.css';

const {
  REACT_APP_HOST,
  REACT_APP_PORT,
} = process.env;

function App() {
  const inputRef = useRef(null);
  const [{
    results,
    search,
  }, setState] = useState({
    results: false,
    search: '',
  });

  function onChange(evt) {
    const {
      value,
    } = evt.target;

    setState((prevState) => ({ ...prevState, search: value }));
  }

  function onClick(type) {
    const opts = {
      async search() {
        try {
          const response = await fetch(`${REACT_APP_HOST}:${REACT_APP_PORT}/search?q=${search}`);
          const data = await response.json();

          console.log(data);

          setState((prevState) => ({ ...prevState, results: true }));
        } catch (error) {
          console.log(error);
        }
      },
      input() {
        if (results && search) {
          inputRef.current.blur();
          setState((prevState) => ({
            results: false,
            search: '',
          }));
        }
      },
    };

    return opts[type]();
  }

  return (
    <div className="container">
      <header className="header">
        <span className="title">Shakesearch</span>
      </header>
      <div className="index">
        <div className="search">
          <div className="search-bar">
            <img
              alt="search"
              className="search-logo"
              src="/images/search.svg"
            />
            <input
              className="search-input"
              type="text"
              placeholder="What are thee looking f'r?"
              ref={inputRef}
              value={search}
              onChange={onChange}
              onClick={() => onClick('input')}
            />
            {(!results && search) && (
              <img
                alt="arrow"
                className="arrow-logo"
                src="/images/arrow.svg"
                onClick={() => onClick('search')}
              />
            )}
          </div>
          <img
            alt="line"
            className={results ? 'line-logo line-hide' : 'line-logo line-show'}
            src="/images/line.svg"
          />
        </div>
        <img
          alt="shakespeare"
          className={results ? 'shakespeare-logo shakespeare-hide' : 'shakespeare-logo shakespeare-show'}
          src="/images/shakespeare.svg"
        />
      </div>
    </div>
  );
};

export default App;
