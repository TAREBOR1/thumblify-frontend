"use client"

import  { colorSchemes, type ThumbnailStyle, type AspectRatio, type IThumbnail, dummyThumbnails } from "@/assets/assets";
import AspectRatioSelector from "@/components/AspectRatio";
import ColorSchemeSelector from "@/components/ColorSchemeSelector";
import PreviewPanel from "@/components/PreviewPanel";
import SoftBackDrop from "@/components/SoftBackDrop";
import StyleSelector from "@/components/StyleSelector";
import api from "@/config/api";
import { useAuth } from "@/hooks/useAuth";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page(){
    const params=useParams<{id:string}>()
    const generateID= params?.id
     const{isAuthenticated}=useAuth()
     const pathname=usePathname()

     
    const [title,setTitle]=useState('')
    const [additionalDetails,setAdditionalDetails]=useState('')
    const [thumbnail,setThumbnail]=useState<IThumbnail|null>(null)
    const [loading,setLoading]=useState(false)
    const [colorScheme,setColorScheme]=useState<string>(colorSchemes[0].id)
    const [aspectRatios,setAspectRatios]=useState<AspectRatio>("16:9")
    const [style,setStyle]=useState<ThumbnailStyle>("Bold & Graphic")
    const [styleDropDownMenu,setStyleDropDownMenu]=useState(false)


   const fetchThumbnail=async()=>{
        try {
            const {data}=await api.get(`/api/user/fetch/${generateID}`) 
              setThumbnail(data?.thumbnail)
        setAdditionalDetails(data?.thumbnail?.user_prompt)
        setColorScheme(data?.thumbnail.color_scheme)
        setAspectRatios(data?.thumbnail.aspect_ratio)
        setTitle(data?.thumbnail.title)
        setStyle(data?.thumbnail.style)
        setLoading(!data?.thumbnail?.image_url)
        } catch (error:any) {
            toast.error(error?.response?.data?.message||error?.message)
        }
    }

  useEffect(()=>{
    if(generateID && isAuthenticated){
        fetchThumbnail()
    }
    if(generateID && isAuthenticated && loading){
        const interval= setInterval(()=>{
         fetchThumbnail()
        },5000);
        return ()=>clearInterval(interval)
    }
    },[generateID,loading,isAuthenticated])

    useEffect(()=>{
    if(!generateID && thumbnail){
        setThumbnail(null)
    }
    },[pathname])
    return (<>
    <SoftBackDrop/>
    <div className="p-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
      <div className="grid lg:grid-cols-[400px_1fr] gap-8">
       {/* LEFT PANEL */}
       <div className={`space-y-6 ${generateID && "pointer-events-none"}`}>
             <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
     <div>
        <h2 className="text-xl font-bold text-zinc-100 mb-1">Create your thumbnails</h2>
        <p className="text-sm text-zinc-400">Describe your vision let AI bring it to life</p>
     </div>

     <div className="space-y-5">
        {/* TITLE INPUT */}
        <div className="space-y-2">
            <label className="block text-sm font-medium">Topic or Title</label>
            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} maxLength={100} placeholder="e.g,..10 Tips for better sleep"
            className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
            <div className="flex justify-end">
                <span className="text-xs text-zinc-400">{title.length}/100</span>
            </div>
        </div>
        {/* ASPECTRATIOSELECTOR */}
        <AspectRatioSelector value={aspectRatios} onChange={setAspectRatios}/>
        {/* STYLESELECTOR */}
        <StyleSelector value={style} onChange={setStyle} isOpen={styleDropDownMenu} setIsOpen={setStyleDropDownMenu}/>
        {/* COLORSCHEMESELECTOR */}
        <ColorSchemeSelector value={colorScheme} onChange={setColorScheme}/>
        {/* DETAILS */}
        <div className="space-y-2">
         <label className="block text-sm font-medium">Addtional Prompt <span className="text-zinc-400 text-xs">(Optional)</span></label>
         <textarea value={additionalDetails} onChange={(e)=>{setAdditionalDetails(e.target.value)}} rows={3} placeholder="Add any specific elements, mood or style preferences..." className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"/>
        </div>
     </div>

     {/* BUTTON */}
    {!generateID && (
        <button onClick={handleGenerate} className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colors" disabled={loading}>{loading?"Generating...":"Generate Thumbnail"}</button>
    )}
             </div>
       </div>
       {/* RIGHT PANEL */}
       <div>
         <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">Preview</h2>
            <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatios}/>
         </div>
       </div>
      </div>
        </main>

    </div>
       
    </>  );
}
 
