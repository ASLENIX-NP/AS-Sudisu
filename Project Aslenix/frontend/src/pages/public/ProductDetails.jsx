import { useEffect, useState } from "react";

import {
  useParams,
} from "react-router-dom";

import { supabase } from "../../lib/supabase";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";


import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();


  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      console.log(error);
    } else {
      setProduct(data);
    }
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="details-page">
        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="details-content">
          <h1>{product.name}</h1>

          <h2>
            Rs. {product.price}
          </h2>

          <p>
            <strong>
              Weight:
            </strong>{" "}
            {product.weight}
          </p>

          <p>
            <strong>
              Origin:
            </strong>{" "}
            {product.origin}
          </p>

          <p>
            <strong>
              Stock:
            </strong>{" "}
            {product.stock}
          </p>

          <p className="product-desc">
            Premium quality Nepali spice
            crafted with authentic
            ingredients and traditional
            flavor.
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;