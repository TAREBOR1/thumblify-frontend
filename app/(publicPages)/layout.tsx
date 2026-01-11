
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export const metadata = {
    title: "Thumblify-AI Thumbnail Generator",
    description: "Thumblify is a website for generating Thumbnail for your content creation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
           
            <Navbar />
            {children}
            <Footer />
        </>
    );
}