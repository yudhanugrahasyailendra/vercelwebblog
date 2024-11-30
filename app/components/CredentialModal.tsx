'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const CredentialModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Show modal on first load
  useEffect(() => {
    const token = localStorage.getItem('goRestToken');
    if (!token) {
      setIsModalOpen(true);
    }
  }, []);

  const handleOk = async (values: { name: string; token: string }) => {
    setLoading(true);
    try {
      // Validate the token with a test API call
      const response = await axios.get('https://gorest.co.in/public/v2/users', {
        headers: {
          Authorization: `Bearer ${values.token}`,
        },
      });

      // If the token is valid, save to localStorage
      if (response.status === 200) {
        localStorage.setItem('goRestToken', values.token);
        localStorage.setItem('userName', values.name);
        message.success('Token valid! Welcome to the Blog App!');
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error('Invalid token! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    message.warning('You need to provide credentials to proceed.');
  };

  return (
    <Modal
      title="Welcome to the Blog App"
      open={isModalOpen}
      footer={null}
      closable={false}
    >
      <Form
        layout="vertical"
        onFinish={handleOk}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label="Go Rest Token"
          name="token"
          rules={[{ required: true, message: 'Please enter your GoRest token!' }]}
        >
          <Input.Password placeholder="Enter your GoRest token" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CredentialModal;
