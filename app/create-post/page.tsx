'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const CreatePost: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('goRestToken') : null;

  const onFinish = async (values: { title: string; body: string }) => {
    if (!token) {
      message.error('Token not found. Please provide a valid token.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://gorest.co.in/public/v2/posts',
        {
          title: values.title,
          body: values.body,
          user_id: 1, // Ganti dengan ID user Anda (misalnya, 1 sebagai default)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        message.success('Post created successfully!');
      } else {
        message.error('Failed to create the post. Please try again.');
      }
    } catch (error) {
      message.error('Error occurred while creating the post. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Create a New Post</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Post Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the post title!' }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>
        <Form.Item
          label="Post Body"
          name="body"
          rules={[{ required: true, message: 'Please enter the post content!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter post content" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePost;
