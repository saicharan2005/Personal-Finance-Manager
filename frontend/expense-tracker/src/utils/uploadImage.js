import { API_ENDPOINTS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
      const formData = new FormData();
      formData.append("image", imageFile);
    try {
        
    
        const response = await axiosInstance.post(API_ENDPOINTS.IMAGE.UPLOAD_IMAGE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        });
    
        return response.data; // Assuming the response contains the image URL or relevant data
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}
    export default uploadImage;