import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setCurrentUser } from "./store/user/user.action";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import NavBar from "./routes/navbar/navbar.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import NotFound from "./routes/not-found/not-found.component";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //*fixme por algum motivo rodando 2vzs
    // console.log('estou rodando 2 vzs no app')
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      };
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route path='/' index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='/*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;