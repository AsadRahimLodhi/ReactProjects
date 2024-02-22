import { React, useState, useEffect } from "react";
import "./style.css";

export const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProduct() {
    try {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (products && products.length === 100) {
      setDisableButton(true);
    }
  }, [products]);

  useEffect(() => {
    fetchProduct();
  }, [count]);

  if (loading) {
    <div>Loading Data Please wait</div>;
  }
  return (
    <div className="load-more-container ">
      <div className="product-container">
        {products && products.length
          ? products.map((item, index) => (
              <div className="product" key={index}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
                <p>{`$ ${item.price}`}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container flex justify-center items-center mb-4 ">
        <button
          disabled={disableButton}
          onClick={() => setCount(count + 1)}
          className={`border-2 p-2 text-white ${
            disableButton ? "bg-gray-400" : "bg-gray-700"
          }`}
        >
          Load More Product
        </button>
        {disableButton ? (
          <p className="pl-2">you have reach 100 products limit</p>
        ) : null}
      </div>
    </div>
  );
};
