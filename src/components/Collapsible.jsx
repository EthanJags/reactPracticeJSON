// components/Collapsible.js
import React, { useEffect } from 'react';
import './Collapsible.css';

export default function Collapsible({ jsonPart, defaultOpen }) {
  const [openItems, setOpenItems] = React.useState(() =>
    Object.keys(jsonPart).reduce(
      (acc, key) => ({ ...acc, [key]: defaultOpen }),
      {}
    )
  );

  useEffect(() => {
    setOpenItems(
      Object.keys(jsonPart).reduce(
        (acc, key) => ({ ...acc, [key]: defaultOpen }),
        {}
      )
    );
  }, [defaultOpen, jsonPart]);

  return (
    <div className="collapsible">
      {Object.entries(jsonPart).map(([key, value]) => {
        const isObject =
          (typeof value === 'object' && value !== null) || Array.isArray(value);
        const displayValue =
          typeof value === 'boolean' || value === null ? String(value) : value;
        const valueType = Array.isArray(value)
          ? 'array'
          : typeof value === 'object' && value !== null
          ? 'object'
          : typeof value;

        return (
          <div key={key} className="collapsible-item">
            <div className="collapsible-header">
              {isObject ? (
                <button
                  className="collapsible-button"
                  onClick={() =>
                    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                >
                  {openItems[key] ? '▼' : '▶'}{' '}
                  <span className="key">{key}</span>{' '}
                  <span className="value-type">
                    {Array.isArray(value) ? `[${value.length}]` : '{ }'}
                  </span>
                </button>
              ) : (
                <div className="collapsible-line">
                  <span className="key">{key}:</span>{' '}
                  <span className={`value ${valueType}`}>
                    {JSON.stringify(displayValue)}
                  </span>
                </div>
              )}
            </div>
            {openItems[key] && isObject && (
              <div className="collapsible-content">
                <Collapsible jsonPart={value} defaultOpen={defaultOpen} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}