'use client';

import React, { useEffect, useState } from 'react';
import { Table, Input, Select, Pagination, Spin, message } from 'antd';
import axios from 'axios';

const { Search } = Input;
const { Option } = Select;

interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const postsPerPage = 10; // Jumlah post per halaman
  const token = localStorage.getItem('goRestToken');

  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchTerm, selectedUser]);

  const fetchPosts = async () => {
    if (!token) {
      message.error('Token not found. Please provide a valid token.');
      return;
    }

    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        per_page: postsPerPage,
      };

      if (searchTerm) {
        params['title'] = searchTerm; // Menambahkan pencarian berdasarkan judul
      }

      if (selectedUser) {
        params['user_id'] = selectedUser; // Menambahkan filter berdasarkan user_id
      }

      const response = await axios.get('https://gorest.co.in/public/v2/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      setPosts(response.data);
      setTotalPosts(parseInt(response.headers['x-pagination-total'], 10)); // Total postingan dari header
    } catch (error) {
      message.error('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset halaman saat pencarian dilakukan
  };

  const handleUserFilter = (value: number | null) => {
    setSelectedUser(value);
    setCurrentPage(1); // Reset halaman saat filter diubah
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      render: (text: string) => <span>{text.substring(0, 100)}...</span>, // Potong body untuk ringkasan
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
  ];

  return (
    <div>
      <h1>Post List</h1>

      {/* Search Input */}
      <Search
        placeholder="Search posts by title"
        enterButton="Search"
        onSearch={handleSearch}
        style={{ marginBottom: 16, width: '300px' }}
      />

      {/* User Filter */}
      <Select
        placeholder="Filter by User ID"
        allowClear
        style={{ marginBottom: 16, width: '200px', marginLeft: 16 }}
        onChange={handleUserFilter}
      >
        <Option value={1}>User 1</Option>
        <Option value={2}>User 2</Option>
        <Option value={3}>User 3</Option>
        {/* Tambahkan opsi lebih banyak user jika perlu */}
      </Select>

      {/* Post Table */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={posts}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      )}

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={postsPerPage}
        total={totalPosts}
        onChange={handlePaginationChange}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default PostList;
