import { useState } from 'react';
import Spinner from './layout/Spinner';

const DatasetGen = () => {
  const [prompt, setPrompt] = useState('');
  const [rows, setRows] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [datasetUrl, setDatasetUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleFetchDataset = async () => {
    if (!prompt || !rows) {
      alert('Please enter a prompt and number of rows.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/services/generate-data/`, {
        method: 'POST',
        headers: {
          'X-AUG-KEY': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          rows: rows,
        }),
      });

      const result = await response.json();

      if (result.status) {
        setDatasetUrl(result.message);
        const datasetResponse = await fetch(result.message);
        const csvData = await datasetResponse.text();
        const jsonData = csvToJson(csvData);
        setData(jsonData);
        setModalOpen(true);
        setPrompt('');
        setRows('');
      } else {
        console.error('Failed to generate dataset');
      }
    } catch (error) {
      console.error('Error fetching dataset:', error);
    } finally {
      setLoading(false);
    }
  };

  const csvToJson = (csv) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');

      if (currentLine.length === headers.length) {
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j].trim()] = currentLine[j].trim();
        }
        result.push(obj);
      }
    }

    return result;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(datasetUrl);
    alert('Dataset link copied to clipboard!');
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableRows = () => {
    return currentItems.map((item, index) => (
      <tr key={index}>
        {Object.values(item).map((value, i) => (
          <td key={i}>{value}</td>
        ))}
      </tr>
    ));
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => setCurrentPage(number)}
        className={currentPage === number ? 'active' : ''}
        style={{ padding: '5px 10px', margin: '0 5px', cursor: 'pointer' }}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your dataset prompt"
          className="input-field"
        />
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
          placeholder="Number of rows"
          className="input-field"
        />
        <button onClick={handleFetchDataset} disabled={loading} className="fetch-button">
          {loading ? 'Loading...' : 'Generate Dataset'}
        </button>
      </div>
      {loading && <Spinner />}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <h2>Generated Dataset</h2>
            <p>Generate Synthetic Datasets</p>
            <table>
              <thead>
                <tr>
                  {data.length > 0 &&
                    Object.keys(data[0]).map((key, index) => (
                      <th key={index}>{key}</th>
                    ))}
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
            <div className="pagination">{renderPagination()}</div>
            <button onClick={handleCopyLink} style={{ marginTop: '20px' }}>
              Copy Dataset Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetGen;