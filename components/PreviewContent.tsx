"use client"

import { yt_html } from "@/assets/assets";
import { useSearchParams } from "next/navigation";

const PreviewContent = () => {
    const params = useSearchParams()
    const thumbnail_url = params.get('thumbnail_url')
    const title = params.get('title')

    // Check if parameters exist
    if (!thumbnail_url || !title) {
        return (
            <div className="fixed inset-0 z-100 bg-black flex items-center justify-center">
                <div className="text-white text-center">
                    <h2 className="text-2xl font-bold mb-2">Missing Parameters</h2>
                    <p className="text-gray-400">Thumbnail URL and title are required.</p>
                </div>
            </div>
        )
    }

    const new_html = yt_html
        .replace('%%THUMBNAIL_URL%%', thumbnail_url)
        .replace("%%TITLE%%", title)
   
    return ( 
        <>
            <div className="fixed inset-0 z-100 bg-black">
                <h1>hello preview</h1>
                <iframe srcDoc={new_html} width="100%" height="100%" allowFullScreen></iframe>
            </div>
        </> 
    )
}
 
export default PreviewContent;
