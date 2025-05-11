'use client'
import { useEffect, useState } from "react";
import NavigationSidebar from "./NavigationSidebar";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";

export default function NavigationBar(){
    const [token, hasToken] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('accesstoken');	// Get the token from local storage, nonexistent if not logged in
        if(token){
            hasToken(true);
        }
    }, []);

    if(token){
        return(
            <nav className="flex w-screen bg-black/90 justify-between items-center">
                <NavigationSidebar/>
                <img className="max-h-20" src='/images/MyCarCare_NoBG.png'/>
                <SignOutButton/>
            </nav>
        );
    } else{
        return(
            <nav className="w-screen bg-black/90 flex justify-between items-center">
                <div></div>
                <img className="max-h-20" src='/images/MyCarCare_NoBG.png'/>
                <SignInButton/>
            </nav>
        );
    }
}