import { toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
    const defaultOptions: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const showError = (message: string) => {
        toast.error(message, defaultOptions);
    };

    const showAlert = (message: string) => {
        toast.warning(message, defaultOptions);
    };

    const showInfo = (message: string) => {
        toast.info(message, defaultOptions);
    };

    return { showError, showAlert, showInfo };
};

export default useToast;
