
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "@/components/Provider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preload" href="/assets/background-splash.svg" as="image" />
            </head>
            <body>
                <LenisScroll />
                <ScrollToTop/>
                 <Toaster/>
                <Providers>
                   {children}
                </Providers>  
            </body>
        </html>
    );
}