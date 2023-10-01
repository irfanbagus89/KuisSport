import './App.css';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Kuis from './pages/Kuis';
import Review from './pages/Review';

function App() {
  return (
    <div className="App w-full min-h-screen">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/kuis' element={<Kuis/>}/>
          <Route exact path='/kuis/review' element={<Review/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
