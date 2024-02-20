import { useEffect, useState } from "react";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import "./style.css";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setcurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&llimit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  function handlePrevious() {
    setcurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setcurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url]);

  if (loading) {
    return <div>Loading Data Please Wait!</div>;
  }

  if (errorMsg !== null) {
    return <div>Error Occurred {errorMsg}</div>;
  }

  console.log(images);

  return (
    <div className="container">
      <BsArrowBarLeft onClick={handlePrevious} className="arrow arrow-left" />
      {images && images.length
        ? images.map((imageItems, index) => (
            <img
              key={imageItems.id}
              alt={imageItems.download_url}
              src={imageItems.download_url}
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowBarRight onClick={handleNext} className="arrow arrow-right" />
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicato"
                }
                onClick={() => setcurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
