import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getProductById} from "../services/productService.ts";
import {Card, Spin} from "antd";

const ProductDetail = () => {
    const {id} = useParams<{ id: string }>();

    const {data: product, isLoading, isFetching, isError, error} = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(Number(id)),
        enabled: !!id,
        refetchOnMount: 'always',
    });

    if (isLoading || isFetching) return <Spin/>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Product Detail Page</h1>
            <Card title={product?.name}>
                <p>{product?.description}</p>
            </Card>
        </div>
    );
};

export default ProductDetail; 