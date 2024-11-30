'use client';  // Marking this as a client-side component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Spin, message } from 'antd';
import axios from 'axios';

const DetailPost: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;  // Getting the post ID from the URL
  const [post, setPost] = useState<any>(null); // State to store the post data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`https://gorest.co.in/public/v2/posts/${id}`);
          setPost(response.data);
        } catch (err) {
          setError('Failed to fetch post data.');
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <Spin size="large" />; // Display a spinner while loading
  }

  if (error) {
    return <div>{error}</div>; // Display an error message if fetching fails
  }

  if (!post) {
    return <div>No post found.</div>; // Display a message if no post data is found
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card
        title={post.title}
        extra={<span>Author: {post.user_id}</span>}
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <p>{post.body}</p>
      </Card>
    </div>
  );
};

export default DetailPost;
