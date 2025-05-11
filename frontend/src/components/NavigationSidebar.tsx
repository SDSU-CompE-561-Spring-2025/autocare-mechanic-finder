//Made by Nathan Morris - Converted into component and modified by Giovanni Lopez

'use client'
import React, { useState, useEffect } from 'react';
import MenuButton from '@/components/ui/MenuButton';
import Sidebar from '@/components/ui/SideBar';



export default function NavigationSidebar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Listen for custom closeMenu events
    useEffect(() => {
        const handleCloseMenu = () => setMenuOpen(false);
        window.addEventListener('closeMenu', handleCloseMenu);
        return () => window.removeEventListener('closeMenu', handleCloseMenu);
    }, []);

    return(
        <div className="min-h-screen bg-cover bg-center relative"
             style={{ backgroundImage: 'url(/images/RoadSurface.jpg)' }}>
            {/* Sidebar + Menu button */};
            <Sidebar menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
            <MenuButton menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
        </div>
    )
}