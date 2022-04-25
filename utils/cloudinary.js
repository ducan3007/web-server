import cloudinary from "cloudinary";

export const uploadImage = (base64) => {
    try {
        return cloudinary.uploader.upload(base64, {});
    } catch (error) {
        throw error;
    }
};
export const deleteImage = (url) => {
    try {
        let imgURL = url[url.length - 1].split('.')[0];
        return cloudinary.uploader.destroy(imgURL);
    } catch (error) {
        throw error
    }
}