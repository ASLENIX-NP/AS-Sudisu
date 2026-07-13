import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
/* REVIEW COMPONENT */
import Review from "./Review";

import "./ProductDetails.css";
import { supabase } from "../../lib/supabase";

const ProductDetails = () => {
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProduct();
  }, [id]);
  const fetchProduct = async () => {
    const products = await getProducts();

    setAllProducts(products);

    const selectedProduct = products.find((item) => item.id == id);

    setProduct(selectedProduct);
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="product-details-overlay">
        <div className="product-details-modal">
          <button
            className="product-details-close"
            onClick={() => navigate("/products")}
          >
            ✕
          </button>

          <div className="product-details-content">
            <div className="product-details-image">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-details-info">
              <h1>{product.name}</h1>

              <h2>Rs. {product.price}</h2>

              <p>
                <strong>Origin:</strong> {product.origin}
              </p>

              <p>
                <strong>Weight:</strong> {product.weight}
              </p>

              <p>
                <strong>Ingredients:</strong> {product.ingredients || "—"}
              </p>

              <button
                className="review-btn"
                onClick={() =>
                  document
                    .getElementById("review-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                ⭐ Write Review
              </button>
            </div>
          </div>

          <Review productId={product.id} productName={product.name} />
         
          
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
