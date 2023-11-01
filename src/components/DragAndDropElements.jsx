import React, { useState } from 'react';
import './Drag.css';
function App()

{
    const [selectedImages,setSelectedimages] = useState([]);
    const onSelectfile = (event) =>{
    const selectedfiles = event.target.files;
    const selectedFilesarray = Array.from(selectedfiles);
    const imagesarray = selectedFilesarray.map((file) => {
        return URL.createObjectURL(file);
    });
    setSelectedimages(imagesarray);
    }
    return (
        <section>
            <label >
                Add images
                <br/>
                <span>upto 10 images</span>
                <input type='file' name='images' onChange={onSelectfile} 
                multiple accept="image/png, image/jpeg, image/webp"/>
            </label>
            <div className="images">
                {selectedImages && selectedImages.map((image,index)=> {
                    return (
                        <div key={index} className='image'>
                        <img src={image} height="200"/>
                        </div>
                       
                    )
                })}
            </div>
        </section>
  
    );
}
export default App;
