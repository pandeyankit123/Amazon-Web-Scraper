import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Scrap from './components/Scrapper';
import Comp from './components/Comparator';
import Alert from './components/Alert';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <Router>
        <div style={{ minHeight: "100vh" }}>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Scrap showAlert={showAlert} />} />
            <Route exact path="/comp" element={<Comp showAlert={showAlert} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;