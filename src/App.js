import React from 'react';
import './App.css'; // Import the CSS file
import Collapsible from './components/Collapsible';
import SampleAPIs from './components/SampleAPIs'; // Import the new component

function App() {
  const [defaultOpen, setDefaultOpen] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [isValidUrl, setIsValidUrl] = React.useState(false);
  const [payload, setPayload] = React.useState(null);
  const [requestData, setRequestData] = React.useState('');
  const [isValidJson, setIsValidJson] = React.useState(true);

  function handleOpenAll() {
    setDefaultOpen(true);
  }

  function handleCloseAll() {
    setDefaultOpen(false);
  }

  function handleUrlChange(event) {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    setIsValidUrl(validateUrl(inputUrl));
  }

  function handleDataChange(event) {
    const inputData = event.target.value;
    setRequestData(inputData);
    setIsValidJson(validateJson(inputData));
  }

  function validateUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }

  function validateJson(value) {
    if (!value.trim()) {
      // Empty string is considered valid
      return true;
    }
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      return false;
    }
  }

  function fetchData(fetchUrl, data) {
    const options = {
      method: data ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = data;
    }

    fetch(fetchUrl, options)
      .then((response) => response.json())
      .then((data) => {
        setPayload(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data from the URL provided.');
      });
    console.log(payload);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isValidUrl && isValidJson) {
      fetchData(url, requestData);
    } else {
      if (!isValidUrl) {
        alert('Please enter a valid URL.');
      }
      if (!isValidJson) {
        alert('Please enter valid JSON data.');
      }
    }
  }

  function handleSelectApi(selectedUrl) {
    setUrl(selectedUrl);
    const valid = validateUrl(selectedUrl);
    setIsValidUrl(valid);
    if (valid) {
      setRequestData(''); // Clear any request data
      setIsValidJson(true);
      fetchData(selectedUrl, null);
    }
  }

  return (
    <div className="app-container">
      <h1>JSON Viewer!</h1>
      

      {/* Include the SampleAPIs component */}
      <SampleAPIs onSelectApi={handleSelectApi} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter API URL"
          className={!isValidUrl && url ? 'invalid' : ''}
        />
        {!isValidUrl && url && (
          <span className="error-message">Invalid URL</span>
        )}
        <textarea
          value={requestData}
          onChange={handleDataChange}
          placeholder="Enter data to send (optional)"
          rows="5"
          className={!isValidJson ? 'invalid' : ''}
        />
        {!isValidJson && (
          <span className="error-message">Invalid JSON data</span>
        )}
        <div className="button-group">
          <button type="submit" disabled={!isValidUrl || !isValidJson}>
            Submit
          </button>
        </div>
      </form>

      {payload && (
        <>
          <div className="button-group">
            <div style={{ textAlign: 'left' }}>
              <button 
                style={{
                  backgroundColor: '#a8d8ff',
                  color: '#333',
                  padding: '5px 10px',
                  fontSize: '0.8em',
                  margin: '2px',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
                onClick={handleOpenAll}
              >
                Open All
              </button>
              <button 
                style={{
                  backgroundColor: '#a8d8ff',
                  color: '#333',
                  padding: '5px 10px',
                  fontSize: '0.8em',
                  margin: '2px',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
                onClick={handleCloseAll}
              >
                Collapse All
              </button>
            </div>
          </div>
          <Collapsible jsonPart={payload} defaultOpen={defaultOpen} />
          <p style={{ textAlign: 'center', fontSize: '0.8em' }}>
            Made with ❤️ by <a href="https://ethanjagoda.com" target="_blank" rel="noopener noreferrer">Ethan Jagoda</a>
          </p>
        </>
      )}
    </div>
  );
}

export default App;