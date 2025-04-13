import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/testSignUp.js';
function App() {
  return (
    <Router>
      <div className="App">
        <div className="Content">
          <Routes>
            <Route exact path='/' element={<SignUp />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
