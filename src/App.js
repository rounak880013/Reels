import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./component/home";
import Login from "./component/login";
import AuthProvider from "./AuthProvider";
import { useEffect } from "react";
import { firestore } from "./firebase";
function App() {
  return(
    <>
    <AuthProvider>
        <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}
export default App;
