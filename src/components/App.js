import Loader from './Loader';
import { Home, Login } from '../pages/index';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks';

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <Navbar /> {/* as its there on all pages add it begor routes */}
        <Routes>
          <Route excat path="/" element={<Home />} />
          <Route excat path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
