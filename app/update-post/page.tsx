// app/update-post/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';

const UpdatePost: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // id post yang ingin diupdate
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Ambil data post yang ingin diupdate
      axios
        .get(`https://gorest.co.in/public/v2/posts/${id}`)
        .then((response) => {
          setPost(response.data); // Set data post ke state
        })
        .catch((error) => {
          message.error('Failed to fetch post data');
        });
    }
  }, [id]);

  const handleUpdate = async (values: { title: string; body: string }) => {
    setLoading(true);
    try {
      // Kirim request update ke API
      const response = await axios.put(
        `https://gorest.co.in/public/v2/posts/${id}`,
        {
          title: values.title,
          body: values.body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('goRestToken')}`,
          },
        }
      );

      if (response.status === 200) {
        message.success('Post updated successfully!');
        router.push('/postlist'); // Redirect ke halaman daftar post setelah berhasil
      }
    } catch (error) {
      message.error('Failed to update the post');
    } finally {
      setLoading(false);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Post</h2>
      <Form
        layout="vertical"
        onFinish={handleUpdate}
        initialValues={{
          title: post.title,
          body: post.body,
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the post title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: 'Please enter the post body!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePost;
