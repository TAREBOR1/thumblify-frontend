import PreviewContent from "@/components/PreviewContent";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div className="text-white">Loading Preview...</div>}>
      <PreviewContent />
    </Suspense>
  );
}

export default Page;
