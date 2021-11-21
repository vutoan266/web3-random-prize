import React from 'react';
import Head from 'next/head';
import { Form, Input, Button, message, Table } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import fetcher from '../utils/request';
import { abi, smAddress } from '../contract';
import Web3 from 'web3';

const columns = [
    {
        title: 'Address',
        dataIndex: '_wallet'
        // key: 'address'
        // render: (text) => <a>{text}</a>
    },
    {
        title: 'Id',
        dataIndex: '_id'
        // key: 'id'
    }
];

export default function Index() {
    const [account, setAccount] = React.useState(null);
    const [tableData, setTableData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const contractMM = React.useMemo(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            return new web3.eth.Contract(abi, smAddress);
        }
        return null;
    }, []);

    const contractInfura = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const provider = new Web3.providers.WebsocketProvider(
                'wss://ropsten.infura.io/ws/v3/0d157abe7bd64e07bf8ed60559c80820'
            );
            const web3Infura = new Web3(provider);
            return new web3Infura.eth.Contract(abi, smAddress);
        }
        return null;
    }, []);

    React.useEffect(() => {
        contractInfura?.events.emitData({ filter: {}, fromBlock: 'latest' }, (err, event) => {
            if (err) message.error(err);
            else {
                console.log('event', event);
                const { _id, _wallet } = event.returnValues;
                setTableData((current) => [...current, { _id, _wallet }]);
            }
        });
    }, [contractInfura]);

    const onFinish = async (values) => {
        if (!account) {
            message.error('Please connect wallet!');
            return;
        }
        try {
            setLoading(true);
            const response = await fetcher.post('/api/registry', values);
            const scResponse = await contractMM.methods.registry(response._id).send({
                from: account
            });
        } finally {
            setLoading(false);
        }
    };

    const handleConnectMetamaskClick = async () => {
        if (typeof window.ethereum === 'undefined') {
            message.error('MetaMask is NOT installed!');
            return;
        }
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts?.[0]);
            message.success('MetaMask is connected!');
        } catch (err) {
            message.error(err);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '100px 25px 25px 25px' }}>
            <Head>
                <title>Random Prize</title>
            </Head>
            <Button
                type={account && 'primary'}
                onClick={handleConnectMetamaskClick}
                icon={account && <CheckOutlined />}>
                {account ? 'Wallet connected! Change Wallet?' : 'Connect Wallet'}
            </Button>
            <Form
                title="Registry"
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                style={{ margin: '50px auto', width: 500 }}>
                <Form.Item
                    label="Full Name"
                    name="full_name"
                    rules={[{ required: true, message: 'Please input your Full name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, type: 'email', message: 'Please input your Email!' }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your Phone!' }]}>
                    <Input type="number" />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form>

            <Table columns={columns} dataSource={tableData} key="_id" />
        </div>
    );
}
