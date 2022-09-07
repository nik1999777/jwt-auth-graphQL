import { Route, Routes, BrowserRouter } from "react-router-dom";

export const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>yo</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
