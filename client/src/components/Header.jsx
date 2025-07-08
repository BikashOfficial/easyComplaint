import React from 'react'
import Logo from './Logo';
import { useLogout } from '../utils/logout';

const Header = ({ isAdmin }) => {
    const logout = useLogout();
    return (
        <div className="py-4 px-3 border-b-2 flex items-center flex-wrap sm:flex-nowrap">

            <div className="flex items-center space-x-2 mr-2 flex-shrink-0">
                <Logo />
            </div>

            {/* Admin Badge */}
            {isAdmin && <span className="ml-0 sm:ml-2 mt-2 sm:mt-0 bg-gray-200 text-xs sm:text-sm inline-block px-2 py-1 rounded items-center">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1 sm:mr-2 align-middle animate-pulse"></span>
                <span className="align-middle font-semibold">Admin</span>
            </span>}


            <div className="flex-grow"></div>

            {/* Logout Button */}
            <button
                className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 font-semibold text-sm sm:text-base"
                onClick={logout}
            >

                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-0 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
            </button>
        </div>
    )
}

export default Header