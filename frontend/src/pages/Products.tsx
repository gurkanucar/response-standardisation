import {Button, Input, Space, Table, Form, Modal, Popconfirm} from 'antd';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createProduct, deleteProduct, getProducts, updateProduct} from "../services/productService.ts";
import type {Product, ProductSearchParams} from "../services/productService.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {ColumnsType} from "antd/es/table";
import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined} from "@ant-design/icons";
import type {BaseResponse} from "../models/api.ts";

const Products = () => {
    const [searchParams, setSearchParams] = useState<ProductSearchParams>({
        page: 0,
        size: 10,
        sortBy: 'id',
        sortDir: 'desc'
    });
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [modalForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ['products', searchParams],
        queryFn: () => getProducts(searchParams),
    });

    const handleMutationError = (error: BaseResponse<any>) => {
        if (error.validationErrors) {
            const errorFields = Object.entries(error.validationErrors).map(([name, errors]) => ({
                name,
                errors: [errors],
            }));
            modalForm.setFields(errorFields);
        }
    };

    const createMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
            setIsModalVisible(false);
        },
        onError: handleMutationError,
    });

    const updateMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
            setIsModalVisible(false);
        },
        onError: handleMutationError,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
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

    const handleModalSubmit = (values: any) => {
        if (selectedProduct) {
            updateMutation.mutate({...selectedProduct, ...values});
        } else {
            createMutation.mutate(values);
        }
    };

    const showModal = (product?: Product) => {
        setSelectedProduct(product || null);
        modalForm.setFieldsValue(product || {name: '', description: ''});
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
                    <Button icon={<EyeOutlined/>} onClick={() => navigate(`/dashboard/products/${record.id}`)}/>
                    <Button icon={<EditOutlined/>} onClick={() => showModal(record)}/>
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteMutation.mutate(record.id)}>
                        <Button icon={<DeleteOutlined/>} danger loading={deleteMutation.isPending && deleteMutation.variables === record.id}/>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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
                <Button type="primary" htmlType="submit" loading={isLoading}>Search</Button>
                <Button type="primary" icon={<PlusOutlined/>} onClick={() => showModal()} style={{marginLeft: 8}}>
                    Create
                </Button>
            </Form>
            <Table
                columns={columns}
                dataSource={data?.data.content}
                loading={isLoading}
                rowKey="id"
                pagination={{
                    current: (searchParams.page ?? 0) + 1,
                    pageSize: searchParams.size,
                    total: data?.data.pageable.totalElements,
                }}
                onChange={handleTableChange}
                locale={{
                    emptyText: data?.data.pageable.empty ? data.message : 'No Data'
                }}
            />
            <Modal
                title={selectedProduct ? "Update Product" : "Create Product"}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => modalForm.submit()}
                confirmLoading={createMutation.isPending || updateMutation.isPending}
            >
                <Form form={modalForm} onFinish={handleModalSubmit} layout="vertical">
                    <Form.Item label="Name" name="name" rules={[{required: true}]}>
                        <Input disabled={!!selectedProduct}/>
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