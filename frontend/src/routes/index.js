import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React,{lazy} from "react";
import RegisterPage from "../pages/RegisterPage";
import ChectEmailPage from "../pages/ChectEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import MessagePage from "../component/MessagePage";
import AuthLayouts from "../layout";
import ForgetPassword from "../pages/ForgetPassword";
const Home=lazy(()=>import("../pages/Home"));

const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"register",
                element:<AuthLayouts><RegisterPage/></AuthLayouts>
            },
            {
                path:"email",
                element:<AuthLayouts><ChectEmailPage/></AuthLayouts>
            },
            {
                path:"password",
                element:<AuthLayouts><CheckPasswordPage/></AuthLayouts>
            },
            {
                path:"forgot-password",
                element:<AuthLayouts><ForgetPassword/></AuthLayouts>

            },
            {
                path:"",
                element:<Home/>,
                children:[
                    {
                        path:":userId",
                        element:<MessagePage/>
                    }
                ]
            }
        ]
    }

])
export default router;