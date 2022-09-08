import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { Bye } from "./pages/Bye";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/bye' element={<Bye />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Routing;
