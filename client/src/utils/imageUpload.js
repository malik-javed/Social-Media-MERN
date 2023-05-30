export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
    err = "Image format is incorrect."
    
    return err;
}


// export const imageUpload = async (images) => {
//     let imgArr = [];
//     for(const item of images){
//         const formData = new FormData()

//         if(item.camera){
//             formData.append("file", item.camera)
//         }else{
//             formData.append("file", item)
//         }
        
//         formData.append("upload_preset", "sociallink")
//         formData.append("cloud_name", "malllik")
//         console.log(item)

//         const res = await fetch("https://api.cloudinary.com/v1_1/malllik/upload", {
//             method: "POST",
//             body: formData
//         })
        
//         const data = await res.json()
//         imgArr.push({public_id: data.public_id, url: data.secure_url})
//     }
//     return imgArr;
// }

//--------------new -----------------
export const imageUpload = async (images) => {
    try {
      let imgArr = [];
  
      for (const item of images) {
        const formData = new FormData();
  
        if (item.camera) {
          formData.append("file", item.camera);
        } else {
          formData.append("file", item);
        }
  
        formData.append("upload_preset", "sociallink");
        formData.append("cloud_name", "malllik");
        console.log(item);
  
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/malllik/upload",
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (!res.ok) {
          const errorResponse = await res.json(); // Extract the error response
          console.error("Image upload failed:", errorResponse);
          throw new Error("Image upload failed.");
        }
  
        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
      }
  
      return imgArr;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };
  