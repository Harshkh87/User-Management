import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Nav/Navbar';
import Add from './Components/Add/Add';
import List1 from './Components/List1/List1';
import UpdateUser from './Components/UpdateUser/UpateUser';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Add />} ></Route>
        <Route path="/add" element={<Add />} ></Route>
        <Route path="/update/:id" element={<UpdateUser />} ></Route>
        <Route path="/list" element={<List1/>} ></Route>
      </Routes>
    </>
  );
}

export default App;
