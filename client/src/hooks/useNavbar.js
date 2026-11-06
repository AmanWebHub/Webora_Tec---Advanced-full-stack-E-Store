import {useNavigate} from 'react-router-dom';
import {useAuthStore} from '../stores/authStore';


export const useNavbar = () => {
    const navigate = useNavigate();


    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const isCheckingAuth = useAuthStore((state) => state.checkingAuth);

    const isAdmin = user?.role === 'admin';

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return {
        user,
        isAdmin,
        isCheckingAuth,
        handleLogout
    }

}