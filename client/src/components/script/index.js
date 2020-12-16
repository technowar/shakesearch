import React from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import './index.css';

function Script(props) {
  const {
    results,
  } = props;
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50,
  });

  function rowRenderer({ index, parent, key, style }) {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div className="section" style={style}>
          {results[index].split('\n').map((result, resultIdx) => (
            <p className={/^[^a-z]*$/.test(result) ? 'bold item' : 'item'} key={resultIdx}>{result}</p>
          ))}
        </div>
      </CellMeasurer>
    );
  }

  return (
    <div className="script">
      <div className="content content-show">
        <div className="text">
          <AutoSizer>
            {({ height, width }) => (
              <List
                deferredMeasurementCache={cache}
                height={height}
                rowCount={results.length}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
}

export default Script;
