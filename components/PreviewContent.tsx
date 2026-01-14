"use client"

import { yt_html } from "@/assets/assets";
import { useSearchParams } from "next/navigation";

const PreviewContent = () => {

    const params =useSearchParams()
    const thumbnail_url=params.get('thumbnail_url')
    const title=params.get('title')

    const new_html= yt_html.replace('%%THUMBNAIL_URL%%',thumbnail_url!).replace("%%TITLE%%",title!)
   
    return ( <>
    <div className="fixed inset-0 z-100 bg-black">
          <iframe srcDoc={new_html} width="100%" height="100%" allowFullScreen></iframe>
    </div>
    </> );
}
 
export default PreviewContent;