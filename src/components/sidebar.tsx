"use client";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { CalendarDays, Home, LayoutDashboard, Lock, LogOut, Menu, MessageSquare, Ticket, Users, X } from "lucide-react"; // Import Ticket icon
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SideBar = () => {
    const currentPath = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login"); // Redirect to login after logout
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

    // Define menu items
    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={24} /> },
        { name: "Properties", path: "/dashboard/properties", icon: <Home size={24} /> },
        { name: "Users", path: "/dashboard/users", icon: <Users size={24} /> },
        { name: "Bookings", path: "/dashboard/bookings", icon: <CalendarDays size={24} /> },
        { name: "Vouchers", path: "/dashboard/vouchers", icon: <Ticket size={24} /> }, // New Vouchers Section
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button onClick={toggleSidebar} className="lg:hidden p-3 fixed top-4 left-4 bg-gray-200 rounded-md">
                <Menu size={24} />
            </button>

            {/* Sidebar Overlay (Only visible on mobile when open) */}
            {isOpen && <div className="fixed md:hidden inset-0 bg-black bg-opacity-40 z-40" onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <div
                className={`fixed md:relative top-0 left-0 h-screen w-64 bg-gray-100 shadow-md p-6 flex flex-col justify-between transition-transform z-50
                ${isOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0`}
            >
                {/* Close Button (Mobile Only) */}
                <button onClick={toggleSidebar} className="lg:hidden absolute top-4 right-4">
                    <X size={24} />
                </button>

                {/* Logo */}
                <div>
                    <img className="w-48 mx-auto mb-10" src="/logo.png" alt="Logo" />

                    {/* Menu Items */}
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.path}
                                    onClick={toggleSidebar} // Close sidebar when clicking a link
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        currentPath === item.path
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 hover:bg-blue-100"
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Locked Conversations Section */}
                    <div className="flex items-center justify-between px-4 py-3 mt-4 text-gray-400 cursor-not-allowed pointer-events-none">
                        <div className="flex items-center gap-3">
                            <MessageSquare size={24} />
                            <span>Conversations</span>
                        </div>
                        <Lock size={20} />
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition mb-18 md:mb-0"
                >
                    <LogOut size={24} />
                    <span>Logout</span>
                </button> 
            </div>
        </>
    );
};

export default SideBar;