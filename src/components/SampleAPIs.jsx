// components/SampleApis.js
import React from 'react';
import './SampleApis.css'; // For styling if needed

export default function SampleApis({ onSelectApi }) {
  const sampleApis = [
    {
      name: 'Random User API',
      url: 'https://randomuser.me/api/',
    },
    {
      name: 'JSONPlaceholder Posts',
      url: 'https://jsonplaceholder.typicode.com/posts',
    },
    {
      name: 'Cat Facts API',
      url: 'https://catfact.ninja/fact',
    },
    {
      name: 'Pokemon API',
      url: 'https://pokeapi.co/api/v2/pokemon/1',
    },
  ];

  return (
    <div className="sample-apis">
      <h2>Sample APIs</h2>
      <ul>
        {sampleApis.map((api) => (
          <li key={api.url}>
            <button className="sample-api-button" onClick={() => onSelectApi(api.url)}>
              {api.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}