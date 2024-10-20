import {useState} from "react"
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom';
import Login from "./components/Login"
import Service from "./components/Service"
import CategoriesOfPooja from "./components/CategoriesOfPooja"
import ProtectedRoute from "./components/ProtectedRoute"
import PoojaContext from './context/PoojaContext';

import './App.css';
import ProfileDetails from "./components/ProfileDetails";



function App() {
  const [activeId,setActiveId] = useState(null);
  const updateActiveId=(id)=>{
    setActiveId(id);
  }
  return (
    <PoojaContext.Provider value={{activeId,updateActiveId}}>
    <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/profile-details" component={ProfileDetails} />
      <ProtectedRoute exact path="/service" component={Service} />
      <ProtectedRoute exact path="/categories" component={CategoriesOfPooja} />
      <Redirect to="/login"/>
    </Switch>
    </BrowserRouter>
    </PoojaContext.Provider>
    
  );
}

export default App;
