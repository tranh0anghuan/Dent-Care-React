import React, { useEffect, useState } from 'react';
import { Table, Tag, Image, message, Popconfirm, Button } from 'antd';
import api from '../../config/axios';

const AdminService = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/service');
                if (Array.isArray(response.data)) {
                    setServices(response.data);
                } else {
                    message.error('Invalid response data');
                }
            } catch (error) {
                console.error("There was an error fetching the services!", error);
                message.error('Error fetching services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/service/${id}`);
            setServices(services.filter(service => service.id !== id));
            message.success('Service deleted successfully');
        } catch (error) {
            console.error("There was an error deleting the service!", error);
            message.error('Error deleting service');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        // },
        {
            title: 'Status',
            dataIndex: 'serviceDetailEnum',
            key: 'serviceDetailEnum',
            // render: status => (
            //     <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>
            //         {status}
            //     </Tag>
            // ),
        },
        {
            title: 'Image',
            dataIndex: 'url',
            key: 'url',
            render: url => <Image width={100} src={url} />,
        },
        {
            title: 'Action',
            key: 'action',
            render: ( record) => (
                <Popconfirm
                    title="Are you sure to delete this service?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <h1>Admin Service Management</h1>
            <Table 
                columns={columns} 
                dataSource={services} 
                rowKey="id" 
                loading={loading} 
            />
        </div>
    );
};

export default AdminService;
