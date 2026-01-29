import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BasicLearningMenuPage from './pages/BasicLearningMenuPage';
import BasicLearningTaskPage from './pages/BasicLearningTaskPage';
import AdvancedLearningTaskPage from './pages/AdvancedLearningTaskPage';
import AdminPage from './pages/AdminPage';
import ResultsPage from './pages/ResultsPage';
import SettingsPage from './pages/SettingsPage';
import PiMultiplicationTaskPage from './pages/PiMultiplicationTaskPage';
import HundredSquareCalculationPage from './pages/HundredSquareCalculationPage';
import HundredSquareAdditionPage from './pages/HundredSquareAdditionPage'; // Import the new page
import KarameJuurokuwariPage from './pages/KarameJuurokuwariPage';
import KarameJuurokuwariMenuPage from './pages/KarameJuurokuwariMenuPage';
import KarameJuurokuwariTaskPage from './pages/KarameJuurokuwariTaskPage';
import MultiplicationMenuPage from './pages/MultiplicationMenuPage';
import MultiplicationTaskPage from './pages/MultiplicationTaskPage';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic-learning-menu" element={<BasicLearningMenuPage />} />
          <Route path="/basic-learning-task" element={<BasicLearningTaskPage />} />
          <Route path="/pi-multiplication" element={<PiMultiplicationTaskPage />} />
          <Route path="/hundred-square-calculation" element={<HundredSquareCalculationPage />} />
          <Route path="/hundred-square-addition" element={<HundredSquareAdditionPage />} />
          <Route path="/karame-juurokuwari" element={<KarameJuurokuwariPage />} />
          <Route path="/karame-juurokuwari-menu" element={<KarameJuurokuwariMenuPage />} />
          <Route path="/karame-juurokuwari-task/:level" element={<KarameJuurokuwariTaskPage />} />
          <Route path="/advanced-learning" element={<AdvancedLearningTaskPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/multiplication-menu" element={<MultiplicationMenuPage />} />
          <Route path="/multiplication-task/:level" element={<MultiplicationTaskPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
