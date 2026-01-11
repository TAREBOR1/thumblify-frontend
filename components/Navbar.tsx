'use client'
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { navlinks } from "@/data/navlinks";
import { INavLink } from "@/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
     const {user,isAuthenticated,logout}=useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const router= useRouter()

     const handleLogout = async() => {
     await logout.mutateAsync()
   
  
    setOpen(false);
  };

   const formatName = (name: any): string => {
    if (!name) return ''; // handle empty strings
    return name[0].toUpperCase();
}

    return (
        <>
            <motion.nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link href="/">
                    <Image className="h-8.5 w-auto" src="/assets/logo.svg" alt="logo" width={130} height={34} priority />
                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    <Link href={"/"} className="hover:text-pink-500 transition">Home</Link>
                    <Link href={"/generate"} className="hover:text-pink-500 transition">Generate</Link>
 {isAuthenticated ? <Link  href={"/my-generate"} >My Generation</Link>:<Link  href="#" >About</Link>}
                    <Link href={"#"} className="hover:text-pink-500 transition">Contact Us</Link>
                </div>
             <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <div className="relative">
          <button
            className="rounded-full w-8 h-8 bg-white/20 border-2 border-white/10"
            onClick={() => setOpen(!open)}
          >
            {formatName(user?.user?.name)}
          </button>

          {open && (
            <div className="absolute top-10 right-0 pt-2">
              <button
               onClick={handleLogout}
                className="bg-white/20 border-2 border-white/10 px-5 py-1.5 rounded w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full"
          onClick={() => router.push("/login")}
        >
          Get started
        </button>
      )}
       <button onClick={() => setIsOpen(true)} className="md:hidden">
                    <MenuIcon size={26} className="active:scale-90 transition" />
                </button>
    </div>
    
               
            </motion.nav>

            <div className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <Link href={"/"} >Home</Link>
                    <Link onClick={() => setIsOpen(false)} href={"/generate"} >Generate</Link>
                    {isAuthenticated ? <Link onClick={() => setIsOpen(false)} href={"/my-generate"} >My Generation</Link>: <Link onClick={() => setIsOpen(false)} href={"#"} >About</Link>}
                    <Link onClick={() => setIsOpen(false)} href={"#"} >Contact Us</Link>
    
                    {isAuthenticated? <button onClick={() =>{ setIsOpen(false); logout}} > Logout</button> :<Link onClick={() => setIsOpen(false)} href={"/login"} >Login</Link>}
                <button onClick={() => setIsOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex">
                    <XIcon />
                </button>
            </div>
        </>
    );
}