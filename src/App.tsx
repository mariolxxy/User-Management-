import { Provider } from "react-redux";
import store from "./store/store";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserDetails from "./components/UserDetails";
import "./App.css"; // Import CSS file

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <nav className="app-nav">
            <Link to="/users" className="app-nav__link">
              Users
            </Link>
            <Link to="/add-user" className="app-nav__link">
              Add User
            </Link>
          </nav>
          <div className="app-content">
            <Routes>
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/add-user" element={<UserForm />} />
              <Route path="/edit-user/:id" element={<UserForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
