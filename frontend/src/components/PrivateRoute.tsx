import { useNavigate } from 'react-router-dom';
import { useToken } from '../hooks';
import { ReactNode, useEffect } from 'react';

export function PrivateRoute({ children }:{ children: ReactNode}) {
  const navigate = useNavigate();
  const isAuthenticated = useToken() ? true : false;
  
  useEffect(() => {
    if(!isAuthenticated) 
      navigate('/');
  },[]);

  return isAuthenticated ? children : null;
}