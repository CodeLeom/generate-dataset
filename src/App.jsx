import DatasetGen from "./component/DatasetGen";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Synthetic Dataset Generator</h1>
        <p style={{width: '450px'}}>Sample prompt: generate 6 column dataset on antibiotics drugs, its uses, and its implications on some people</p>
        <p style={{width: '450px'}}>Rows: 40</p>
        <DatasetGen />
      </header>
    </div>
  );
}

export default App;