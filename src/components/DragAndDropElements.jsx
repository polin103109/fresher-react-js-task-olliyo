
import { useState } from 'react';
import './Drag.css';
function App(){
    const [selectedImages,setSelectedimages] = useState([]);
    const [clickedCount, setClickedCount] = useState(0);
    const onSelectfile = (event) =>{
    const selectedfiles = event.target.files;
    const selectedFilesarray = Array.from(selectedfiles);
    const imagesarray = selectedFilesarray.map((file) => {
        return URL.createObjectURL(file);
    });
    setSelectedimages((previousImages)=> previousImages.concat(imagesarray));

}
const handleClick = (index) => {
    setClickedCount(clickedCount + 1);
}
const galleryText = clickedCount > 0 ? `${clickedCount} Files Selected` : 'Gallery';
    return (
        <section>
             
              <h1>{galleryText}</h1>
            <div className="images">
                {selectedImages && selectedImages.map((image,index)=> {
                    return (
                        <div key={index} className='image'>
                        <input type='checkbox' onChange={() => handleClick(index)} />
                        <img src={image} height="200"/>
                       
                      
                      
                             <p>{index+1}</p>
                           
                          
                        </div>
                       
                    
                    )
                })}
            </div>
           
            <label >
                Add Images
                <br/>
                <span>upto 10 images</span>
                <input className='custom-input hidden' type='file'  name='images' onChange={onSelectfile} 
                multiple accept="image/png, image/jpeg, image/webp"/>
            </label>
        </section>
  
    );
}
export default App;