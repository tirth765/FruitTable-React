import { Route, Routes } from "react-router-dom";
import UserRoute from "./Route/UserRoute";
import PrivateRoute from "./Route/PrivateRoute";
import AdminRoute from "./Route/AdminRoute";



function App() {
  return (
    <>
   
    <Routes>
      <Route path="/*" element={<UserRoute />} />
      <Route element={<PrivateRoute />}>
          <Route path="/admin/*" element={<AdminRoute/>}/>
      </Route>
    </Routes>

    
    </>
  );
}

export default App;
