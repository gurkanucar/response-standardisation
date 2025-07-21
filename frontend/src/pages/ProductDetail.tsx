import {useParams} from "react-router-dom";

const ProductDetail = () => {
    const {id} = useParams<{ id: string }>();
    return (
        <div>
            <h1>Product Detail Page</h1>
            <p>Product ID: {id}</p>
        </div>
    );
};

export default ProductDetail; 