import api from "@/config/api"

// ---------------------------
// STRICT TYPE UNIONS
// ---------------------------
 type ThumbnailStyle = "Bold & Graphic" | "Minimalist" | "Photorealistic" | "Illustrated" | "Tech/Futuristic";
 type AspectRatio = "16:9" | "1:1" | "9:16";
 type ColorScheme = "vibrant" | "sunset" | "ocean" | "forest" | "purple" | "monochrome" | "neon" | "pastel";

// ---------------------------
// COLOR SCHEMES DATA
// ---------------------------
 const colorSchemes: Record<ColorScheme, { name: string; colors: string[] }> = {
    vibrant: { name: "Vibrant", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"] },
    sunset: { name: "Sunset", colors: ["#FF8C42", "#FF3C38", "#A23B72"] },
    ocean: { name: "Ocean", colors: ["#0077B6", "#00B4D8", "#90E0EF"] },
    forest: { name: "Forest", colors: ["#2D6A4F", "#40916C", "#95D5B2"] },
    purple: { name: "Purple Dream", colors: ["#7B2CBF", "#9D4EDD", "#C77DFF"] },
    monochrome: { name: "Monochrome", colors: ["#212529", "#495057", "#ADB5BD"] },
    neon: { name: "Neon", colors: ["#FF00FF", "#00FFFF", "#FFFF00"] },
    pastel: { name: "Pastel", colors: ["#FFB5A7", "#FCD5CE", "#F8EDEB"] },
} as const;

// ---------------------------
// THUMBNAIL TYPES
// ---------------------------
export interface ThumbnailInput {
    style:string;
    title: string;
    aspect_ratio: string;
    color_scheme: string;
    prompt_used: string;
    text_overlay: boolean;
}

export interface Thumbnail {
    _id: string;
    userId: string;
    title: string;
    style: ThumbnailStyle;
    aspect_ratio: AspectRatio;
    color_scheme: ColorScheme;
    text_overlay: boolean;
    image_url: string;
    isGenerating: boolean;
}

export interface GenerateThumbnailResponse {
    message: string;
    thumbnail: Thumbnail;
}

// ---------------------------
// API CALLS
// ---------------------------
export const generate = async (data: ThumbnailInput): Promise<GenerateThumbnailResponse> => {
    const res = await api.post('/api/thumbnail/generate', data);
    return res.data;
}

export const fetchAll = async (): Promise<GenerateThumbnailResponse[]> => {
    const res = await api.get('/api/user/fetchAll');
    return res.data;
}
