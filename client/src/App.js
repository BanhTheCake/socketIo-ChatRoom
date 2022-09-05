import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Chat from "./component/Chat/Chat";
import Home from "./component/Home/Home";
import './App.css'

const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App; 
