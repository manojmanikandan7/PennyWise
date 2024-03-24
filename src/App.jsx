import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts and pages
import RootLayout from "./layouts/RootLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import DevDash from "./pages/DevDash.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup.jsx";
import Calendar from "./pages/Calendar.jsx";

//import and add calendar page

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<DevDash />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="profile" element={<Profile />} />
      <Route path="calendar" element={<Calendar />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
