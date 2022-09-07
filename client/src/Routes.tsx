import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import { Bye } from "./pages/Bye";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <div>
              <Link to='/'>Home</Link>
            </div>
            <div>
              <Link to='/register'>Register</Link>
            </div>
            <div>
              <Link to='/login'>Login</Link>
            </div>
            <div>
              <Link to='/bye'>Bye</Link>
            </div>
          </div>
        </header>
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
