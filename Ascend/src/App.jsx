import './App.css';
import Login from './login';

function App() {
  return (
    <div className="container">
      <div className="left">
        <h1 id='Heading'>Ascend</h1>
        <p id='des'>Every thought recorded is a step upward.</p>
        <div className="pattern-bg"></div>
      </div>
      <div className="right">
        <Login />
      </div>
    </div>
  );
}

export default App;