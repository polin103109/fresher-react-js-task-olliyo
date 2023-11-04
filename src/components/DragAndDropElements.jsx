import { useState, useRef } from "react";
import "./Drag.css";
import { ImageIcon } from "./icons";

function Drag() {
  const [selectedImages, setSelectedimages] = useState([]);
  const [overLay, setOverLay] = useState(true);
  const [clickedCount, setClickedCount] = useState(0);
  const [isChecked, setisChecked] = useState([]);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const onSelectfile = (event) => {
    const selectedfiles = event.target.files;
    const selectedFilesarray = Array.from(selectedfiles);
    const imagesarray = selectedFilesarray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedimages((previousImages) => previousImages.concat(imagesarray));
    setisChecked((prevState) => [
      ...prevState,
      ...new Array(imagesarray.length).fill(false),
    ]);
  };

  const handleClick = (index) => {
    const updatedIsChecked = [...isChecked];
    updatedIsChecked[index] = !updatedIsChecked[index];
    setisChecked(updatedIsChecked);
    const newClickedCount = updatedIsChecked.filter(
      (isChecked) => isChecked
    ).length;
    setClickedCount(newClickedCount);
  };

  const handleDelete = () => {
    const updatedSelectedImages = selectedImages.filter(
      (_, index) => !isChecked[index]
    );
    const updatedIsChecked = isChecked.filter((_, index) => !isChecked[index]);
    setSelectedimages(updatedSelectedImages);
    setisChecked(updatedIsChecked);
    setClickedCount(0);
  };

  const handleSort = () => {
    let _Selectedimages = [...selectedImages];
    const draggedItem = _Selectedimages.splice(dragItem.current, 1)[0];
    _Selectedimages.splice(dragOverItem.current, 0, draggedItem);
    dragItem.current = null;
    dragOverItem.current = null;
    setOverLay(true);
    setSelectedimages(_Selectedimages);
  };

  const isImageDraggable = (index) => {
    return dragItem.current === index;
  };

  return (
    <section>
      <div className="img-gallery">
        <div className="gallery-top">
          {clickedCount > 0 ? (
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={true}
                onChange={() => handleDelete()}
              />
              <span className="gallery-text">
                {clickedCount === 1
                  ? "1 File Selected"
                  : `${clickedCount} Files Selected`}
              </span>
            </div>
          ) : (
            <span className="gallery-text">Gallery</span>
          )}

          {clickedCount > 0 && (
            <button className="btn" onClick={handleDelete}>
              Delete {clickedCount === 1 ? "File" : "Files"}
            </button>
          )}
        </div>
        <div className="gallery-body">
          <div className="images">
            {selectedImages &&
              selectedImages.map((image, index) => {
                const isDraggable = isImageDraggable(index);

                return (
                  <div
                    key={index}
                    className={`imagediv ${
                      isDraggable ? "draggable-image" : ""
                    }`}
                    draggable
                    onDragStart={() => {
                      dragItem.current = index;
                      setOverLay(false);
                     
                    }}
                    onDragEnter={() => {
                      dragOverItem.current = index;
                      
                    }}
                    onDragEnd={handleSort}
                    onDragOver={(e) => {
                      e.preventDefault();
                      
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      
                    }}
                  >
                    <div className={overLay ? "overlay" : ""}>
                      {overLay ? (
                        <input
                          className="checkboxinput"
                          type="checkbox"
                          checked={isChecked[index]}
                          onChange={() => handleClick(index)}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <img
                      src={image}
                      alt={`Image ${index}`}
                      className={`${
                        isChecked[index] ? "checked-image" : "dragging-image"
                      } `}
                    />
                  </div>
                );
              })}

            <div className="upload-image">
              <label>
                <ImageIcon />
                <br />
                Add Images
                <input
                  className="custom-input hidden"
                  type="file"
                  name="images"
                  onChange={onSelectfile}
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Drag;
