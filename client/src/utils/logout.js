import { useContext } from 'react';
import { UserDataContext } from '../contexts/UserContext';
import { AdminDataContext } from '../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const { setUser } = useContext(UserDataContext);
  const { setAdmin } = useContext(AdminDataContext);
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    setUser && setUser({});
    setAdmin && setAdmin({});
    navigate('/login');
  };
}
