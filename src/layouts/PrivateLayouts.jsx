import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated, isAuthorized } from '../utilities/authHelper'
import { AuthContext } from '../context/authContext'

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useContext(AuthContext)
    
    if (!isAuthenticated() || !isAuthorized(allowedRoles, user)) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default PrivateRoute