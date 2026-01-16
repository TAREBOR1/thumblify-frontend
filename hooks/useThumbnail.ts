import { fetchAll, generate } from "@/services/thumbnail"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



export const useThumbnail=()=>{


    const queryClient=useQueryClient()

     const thumbnailQuery=useQuery({
        queryKey:['Thumbnail'],
        queryFn:fetchAll,
        retry:false
     })


     const generateMutation=useMutation({
        mutationFn:generate,
        onSuccess:()=>{
       queryClient.invalidateQueries({queryKey:['Thumbnail']})
        }
     })

return{
    thumbnails:thumbnailQuery.data,
    isLoading:thumbnailQuery.isLoading,
    generateThumbnail:generateMutation
}
}