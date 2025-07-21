import {Button, Input, Space, Table, Form, Modal} from 'antd';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProducts, updateProduct} from "../services/productService.ts";
import type {Product, ProductSearchParams} from "../services/productService.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {ColumnsType} from "antd/es/table";

const Products = () => {
    const [searchParams, setSearchParams] = useState<ProductSearchParams>({
        page: 0,
        size: 10,
        sortBy: 'id',
        sortDir: 'desc'
    });
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const queryClient = useQueryClient();

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['products', searchParams],
        queryFn: () => getProducts(searchParams)
    });

    const updateMutation = useMutation({
        mutationFn: ({id, description}: { id: number, description: string }) => updateProduct(id, description),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
            setIsModalVisible(false);
        }
    });

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const newSortDir = sorter.order === 'ascend' ? 'asc' : 'desc';
        setSearchParams(prev => ({
            ...prev,
            page: pagination.current - 1,
            size: pagination.pageSize,
            sortBy: sorter.field || 'id',
            sortDir: newSortDir
        }));
    };

    const onFinish = (values: any) => {
        setSearchParams(prev => ({...prev, ...values, page: 0}));
    };

    const handleUpdate = (values: any) => {
        if (selectedProduct) {
            updateMutation.mutate({id: selectedProduct.id, description: values.description});
        }
    };

    const showUpdateModal = (product: Product) => {
        setSelectedProduct(product);
        updateForm.setFieldsValue({name: product.name, description: product.description});
        setIsModalVisible(true);
    };

    const columns: ColumnsType<Product> = [
        {title: 'ID', dataIndex: 'id', key: 'id', sorter: true},
        {title: 'Name', dataIndex: 'name', key: 'name', sorter: true},
        {title: 'Description', dataIndex: 'description', key: 'description', sorter: true},
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Product) => (
                <Space size="middle">
                    <Button onClick={() => navigate(`/dashboard/products/${record.id}`)}>View</Button>
                    <Button onClick={() => showUpdateModal(record)}>Update</Button>
                </Space>
            ),
        },
    ];

    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <Form
                form={form}
                onFinish={onFinish}
                layout="inline"
                style={{marginBottom: 16}}
            >
                <Form.Item name="name">
                    <Input placeholder="Search by name"/>
                </Form.Item>
                <Form.Item name="description">
                    <Input placeholder="Search by description"/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Search</Button>
            </Form>
            <Table
                columns={columns}
                dataSource={data?.content}
                loading={isLoading}
                rowKey="id"
                pagination={{
                    current: (searchParams.page ?? 0) + 1,
                    pageSize: searchParams.size,
                    total: data?.pageable.totalElements,
                }}
                onChange={handleTableChange}
            />
            <Modal
                title="Update Product"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => updateForm.submit()}
                confirmLoading={updateMutation.isPending}
            >
                <Form form={updateForm} onFinish={handleUpdate} layout="vertical">
                    <Form.Item label="Name" name="name">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Products;