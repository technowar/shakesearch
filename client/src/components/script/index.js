import React, { createElement } from 'react';
import './index.css';

function Script(props) {
  const {
    results,
  } = props;

  return (
    <div className="script">
      <div className="content content-show">
        <div className="text">
          {results.map((result, resultIdx) => (
            createElement('div', {
              className: 'section',
              key: resultIdx,
            }, result.split('\n').map((item, itemIdx) => item.trim().length ? (
              createElement('p', {
                className: /^[^a-z]*$/.test(item) ? 'bold item' : 'item',
                key: itemIdx,
              }, item)
            ) : null))
          ))}
        </div>
      </div>
    </div>
  );
}

export default Script;
