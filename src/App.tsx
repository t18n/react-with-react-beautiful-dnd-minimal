import SimpleOrderableList from './SimpleOrderableList';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Overly simplified React DND example.
      </h1>

      <h4 style={{ color: 'red' }}>
        Drag the items around to test, open Console on your browser to see the result of the reordered array.
      </h4>

      <SimpleOrderableList />
    </div>
  );
}

export default App;
