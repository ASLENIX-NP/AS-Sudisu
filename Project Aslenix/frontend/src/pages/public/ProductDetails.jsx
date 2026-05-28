import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getProducts } from "../../services/productService";

import Navbar from "../../components/common/Navbar";

import Footer from "../../components/common/Footer";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const products = await getProducts();

    const selectedProduct = products.find(
      (item) => item.id == id
    );

    setProduct(selectedProduct);
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="details-page">
        {/* IMAGE */}
        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* DETAILS */}
        <div className="details-content">
          <h1>{product.name}</h1>

          <h2>
            Rs. {product.price}
          </h2>

          <p>
            <strong>Origin:</strong>{" "}
            {product.origin}
          </p>

          <p>
            <strong>Weight:</strong>{" "}
            {product.weight}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {product.stock}
          </p>

          <p className="product-desc">
            {product.description}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;