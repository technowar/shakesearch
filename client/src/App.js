import React, { Suspense, lazy, useRef, useState } from 'react';
import services from './services';
import './App.css';

function App() {
  const Script = lazy(() => import('./components/script'));
  const inputRef = useRef(null);
  const [{
    results,
    search,
  }, setState] = useState({
    results: [],
    search: '',
  });

  function onChange(evt) {
    const {
      key,
      target: {
        value,
      },
    } = evt;
    const opts = {
      async enter() {
        try {
          const results = await services(search);

          if (!Array.isArray(results)) {
            throw results;
          }

          inputRef.current.blur();
          setState((prevState) => ({ ...prevState, results }));
        } catch (error) {
          console.log(error);
        }
      },
      escape() {
        inputRef.current.value = '';
      },
      defaults() {},
    };

    setState((prevState) => ({ ...prevState, search: value }));

    return (opts[key.toLowerCase()] || opts['defaults'])();
  }

  function onClick(type) {
    const opts = {
      async search() {
        try {
          const results = await services(search);

          if (!Array.isArray(results)) {
            throw results;
          }

          setState((prevState) => ({ ...prevState, results }));
        } catch (error) {
          console.log(error);
        }
      },
      input() {
        if (results.length && search) {
          setState((prevState) => ({
            ...prevState,
            results: [],
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
        <div className={results.length ? 'search search-hide' : 'search search-show'}>
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
              onKeyUp={onChange}
              onClick={() => onClick('input')}
            />
            {(!results.length && search) && (
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
            className={results.length ? 'line-logo line-hide' : 'line-logo line-show'}
            src="/images/line.svg"
          />
        </div>
        <img
          alt="shakespeare"
          className={results.length ? 'shakespeare-logo shakespeare-hide' : 'shakespeare-logo shakespeare-show'}
          src="/images/shakespeare.svg"
        />
        {results.length ? (
          <Suspense fallback={null}>
            <Script results={results} />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
};

export default App;
