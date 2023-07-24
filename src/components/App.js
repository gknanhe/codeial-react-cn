import Loader from './Loader';
import { Home, Login, Signup, Settings } from '../pages/index';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import { useAuth } from '../hooks';
import UserProfile from '../pages/UserProfile';

//Creating Private Route

const PrivateRoute = () => {
  const auth = useAuth(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const auth = useAuth();

  console.log('auth App', auth);

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
          <Route excat path="/signup" element={<Signup />} />

          {/*PRIVATE ROUTES*/}
          <Route exact path="/settings" element={<PrivateRoute />}>
            {' '}
            {/*this will -> PrivateRoute   */}
            <Route exact path="/settings" element={<Settings />} />{' '}
            {/* ans pass this as children */}
          </Route>

          <Route exact path="/user/:userId" element={<PrivateRoute />}>
            {' '}
            {/*this will -> PrivateRoute   */}
            <Route exact path="/user/:userId" element={<UserProfile />} />{' '}
            {/* ans pass this as children */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
