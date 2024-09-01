import { createBrowserRouter } from "react-router-dom";

import NotFound from "./layouts/NotFound";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import FeedBack from "./pages/FeedBack";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

const router = createBrowserRouter([
    {
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/job-section",
                element: <About />,
            },
            {
                path: "/resume-build",
                element: <About />,
            },
            {
                path: "/course",
                element: <About />,
            },
            {
                path: "/feedback",
                element: <FeedBack />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
