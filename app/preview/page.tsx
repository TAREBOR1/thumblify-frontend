
import PreviewContent from "@/components/PreviewContent";
import { Suspense } from "react";

const Page = () => {

   <Suspense fallback={<div className="text-white">Loading Preview...</div>}>
    <PreviewContent/>
   </Suspense>
}
 
export default Page;