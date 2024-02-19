import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Toaster} from "react-hot-toast"
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Home from './pages/Home.jsx';
import SignUp from './components/auth/SignUp.jsx';
import SignIn from './components/auth/SignIn.jsx';
import {store} from "./store/store.js";
import { Provider } from "react-redux";
import Profile from './components/auth/Profile.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<Home />} />
    <Route  path='/signup' element={<SignUp />} />
    <Route  path='/signin' element={<SignIn />} />
    <Route  path='/' element={<PrivateRoute />} >
        <Route  path='/profile' element={<Profile />} />
    </Route>
  </Route>
));
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    </React.StrictMode>,
  </Provider>
)
