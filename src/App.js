import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";

import { ContextFunction } from "./contexts/citiesContext";
import Home from './pages/Homepage'
import Product from './pages/Product';
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import AppLayout from './components/AppLayout'
import CityList from './components/cityList';
import CountryList from './components/countryList';
import City from './components/City';
import Form from './components/form'
import { Authenticate } from "./contexts/authContext";
import ProtectedRoute from "./pages/protectedRoutes";

function App() {
  return (
    <Authenticate>
    <ContextFunction>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/pricing' element={<Pricing></Pricing>}></Route>
      <Route path='/product' element={<Product></Product>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
     
      <Route path='/app' element={<ProtectedRoute><AppLayout></AppLayout></ProtectedRoute>}>
      <Route index element= {<Navigate replace to='cities' />}></Route>
      <Route path='cities' element= {<CityList></CityList>}></Route>
      <Route path='cities/:id' element={<City></City>}></Route>
      <Route path='countries' element= {<CountryList ></CountryList>}></Route>
      <Route path='form' element= {<Form></Form>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
   
    </ContextFunction>
    </Authenticate>
  );
}

export default App;

