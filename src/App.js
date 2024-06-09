//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import BrowseJobs from './components/BrowseJobs';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateJob from './pages/CreateJob';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-job' element={<CreateJob />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
