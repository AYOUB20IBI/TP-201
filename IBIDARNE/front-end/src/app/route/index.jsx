import { createBrowserRouter } from "react-router-dom";

import Accueil from "../components/HomePage/Accueil";
import LayoutUsers from "../layouts/LayoutUsers";
import LayoutFormateur from "../layouts/LayoutFormateur";
import Layout from "../layouts/Layout";
import Ajouter from "../components/formateur/Ajouter";
import Login from "../auth/Login";
import Profile from './../components/users/Profile';


export const routerh = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<Accueil/>
            },
            {
                path:"/login",
                element:<Login/>
            }
        ]
    },
    {
        element:<LayoutUsers/>,
        children:[
            {
                path:"/users/home",
                element:<Accueil/>
            },
            {
                path:"/users/profile",
                element:<Profile/>
            }
        ]
    },
    {
        element:<LayoutFormateur/>,
        children:[
            {
                path:"/formateur/home",
                element:<Accueil/>
            },
            {
                path:"/formateur/ajouter",
                element:<Ajouter/>
            },
        ]
    }
    
])