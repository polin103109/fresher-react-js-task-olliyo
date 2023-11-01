import { useState } from "react";
import "./Drag.css";
function App() {
  const [selectedImages, setSelectedimages] = useState([]);
  const [clickedCount, setClickedCount] = useState(0);
  const [isChecked, setisChecked] = useState([]);

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

    // Calculateing the clickedCount based on checked checkboxes
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

    // Updating the selectedImages and isChecked states
    setSelectedimages(updatedSelectedImages);
    setisChecked(updatedIsChecked);

    // Reset the clickedCount
    setClickedCount(0);
  };

  return (
    <section>
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
        "Gallery"
      )}

      {clickedCount > 0 && (
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete {clickedCount === 1 ? "File" : "Files"}
        </button>
      )}
      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={index} className="image">
                <input
                  type="checkbox"
                  checked={isChecked[index]}
                  onChange={() => handleClick(index)}
                />
                <img src={image} height="200" />
              </div>
            );
          })}
      </div>

      <label>
        Add Images
        <br />
        <span>upto 10 images</span>
        <input
          className="custom-input hidden"
          type="file"
          name="images"
          onChange={onSelectfile}
          multiple
          accept="image/png, image/jpeg, image/webp"
        />
      </label>
    </section>
  );
}
export default App;
