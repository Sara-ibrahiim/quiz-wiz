import { RootState } from '@/store/store';
import React from 'react'
import {useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children?: React.ReactNode;
  }
 
export default function ProtectedRoute({children}:ProtectedRouteProps) {
    const profile = useSelector((state: RootState) => state.auth.profile?.role);

  if(localStorage.getItem("accessToken") || profile ) return children 
  else return<Navigate to="/"/>
}
