import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import UsersList from "./screens/users";
import store from "./redux/store";
import { Provider } from "react-redux";
import UserDetails from "./screens/user-details";
import { Navigate } from "react-router";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />

          <Route path="/users" element={<UsersList />} />
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
