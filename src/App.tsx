import MainLayout from './Layouts/MainLayout';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <MainLayout />
      <ToastContainer />
    </div>
  )
}

export default App
