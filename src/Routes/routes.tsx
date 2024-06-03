import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import App from "../App";
import MenageGadgets from "../Pages/MenageGadgets/MenageGadgets";
import UpdateGadget from "../Pages/MenageGadgets/UpdateGadget";
import AddGadgetForm from "../Pages/MenageGadgets/AddGadgetForm";


export const router = createBrowserRouter([
    {
        path: '/dashbord',
        element: <App />,
        children: [
            {
                path: 'admin/menage-gadgets',
                element: <MenageGadgets />
            },
            {
                path: "admin/add-gadgets",
                element: <AddGadgetForm />
            },
            {
                path: "admin/update-gadgets/:id",
                element: <UpdateGadget />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegistrationPage />
    }
]) 