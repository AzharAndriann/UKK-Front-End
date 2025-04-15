import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import HomePage from './page/home';
import { AddPage } from './page/add';
import { ArchivePage } from './page/archive';


const App = () =>
{

  return (
    <BrowserRouter>
      <div className="bg-gray-200 flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="ps-1 pe-5 h-screen mt-5 mb-5">
            <Routes>
              <Route path="/" element={ <HomePage /> } />
              <Route path="/add" element={ <AddPage /> } />
              <Route path="/archive" element={ <ArchivePage /> } />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
