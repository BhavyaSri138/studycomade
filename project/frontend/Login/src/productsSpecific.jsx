import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductsSpecific() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);

   

    const fetchProduct = async () => {
        try {
            console.log("Product ID:", id);

            

            const url = `http://localhost:5000/api/products/${_id}`;
            console.log("Fetch URL:", url);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProduct(data);
            setError(null);
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Failed to fetch product. Please try again later.");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [_id]);

    if (error) {
        return (
            <div className="bg-primary p-2 text-dark bg-opacity-25">
                <div className="m-5 container border border-dark w-50 p-5">
                    <h3>Error</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary p-2 text-dark bg-opacity-25">
            <div className="m-5 container border border-dark w-50 p-5">
                <h5>{product.title}</h5>
                <div className="mb-2">
                    {product.image ? (
                        <img src={product.image} alt={product.title} width="100px" height="100px" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <h2><sup>$</sup>{product.price}</h2>
                <div>{product.description}</div>
            </div>
        </div>
    );
}

export default ProductsSpecific;
