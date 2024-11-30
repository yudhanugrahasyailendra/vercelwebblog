'use client';  // This line is crucial to make this a client-side component

import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';

const DeletePost: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Untuk mengontrol modal
  const [loading, setLoading] = useState(false); // Untuk loading state
  const router = useRouter(); // Menggunakan useRouter hanya setelah menandai komponen ini sebagai client-side

  const { id } = router.query; // Mendapatkan ID post yang akan dihapus

  const showModal = () => {
    setIsModalOpen(true); // Menampilkan modal konfirmasi
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Menghapus post berdasarkan ID
      await axios.delete(`https://gorest.co.in/public/v2/posts/${id}`);
      message.success('Post deleted successfully!');
      router.push('/'); // Redirect setelah berhasil menghapus
    } catch (error) {
      message.error('Failed to delete the post!');
    } finally {
      setLoading(false);
      setIsModalOpen(false); // Menutup modal setelah operasi selesai
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Menutup modal jika cancel
  };

  return (
    <div>
      <Button onClick={showModal}>
        Delete Post
      </Button>
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
    </div>
  );
};

export default DeletePost;
