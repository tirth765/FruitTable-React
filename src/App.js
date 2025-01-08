import { Route, Routes } from "react-router-dom";
import UserRoute from "./Route/UserRoute";
import PrivateRoute from "./Route/PrivateRoute";
import AdminRoute from "./Route/AdminRoute";
import { Provider } from "react-redux";
import { createStore } from "./redux/store";



function App() {
  const store = createStore()

  return (


    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route element={<PrivateRoute />}>
        <Route path="/admin/*" element={<AdminRoute />} />
      </Route>
      </Routes>
    </Provider>

  );
}

export default App;
