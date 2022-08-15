import { Routes, Route } from "react-router-dom";
import NavBar from "./routes/navbar/navbar.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";

const Shop = () => {
  
  return (
    <h1>I am the shop</h1>
  )
};

const App = () => {

  return (
    <Routes>
      <Route path='/clothing-ecommerce' element={<NavBar />}>
        <Route path='/clothing-ecommerce' index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
