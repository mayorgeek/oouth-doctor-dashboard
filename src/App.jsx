import './App.css';
import {Navigate, Route, Routes} from "react-router";
import Home from "./Pages/Home/Home";
import {createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import Default from "./Layouts/Default";
import Appointments from "./Pages/Appointments/Appointments";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Auth from "./Layouts/Auth";
import SendMessage from "./Pages/SendMessage/SendMessage";
import PrescribeDrug from "./Pages/PrescribeDrug/PrescribeDrug";

const router = createBrowserRouter(createRoutesFromElements([
    <Route path="/" element={<Default/>}>
        <Route index element={<Navigate to="/home"/>} />

        <Route path="/home" element={<Home/>} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/prescribe-drug" element={<PrescribeDrug />} />
        <Route path="/send-message" element={<SendMessage />} />
        <Route path="/profile" element={<Profile />} />
    </Route>,
    <Route path="/auth" element={<Auth />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
    </Route>
]));

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
