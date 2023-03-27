import './App.css';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <DashboardPage></DashboardPage>
      </BrowserRouter>
    </div>
  );
}

export default App;

