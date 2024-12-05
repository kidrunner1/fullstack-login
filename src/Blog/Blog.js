import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from '../Blog/components/AppAppBar';
import MainContent from '../Blog/components/MainContent';
import Latest from '../Blog/components/Latest';
import Footer from '../Blog/components/Footer';
import AppTheme from '../shared-theme/AppTheme';
import Button from '@mui/material/Button';

export default function Blog(props) {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // หากไม่มี token ให้เปลี่ยนเส้นทางไปที่หน้า login
      alert('No token found. Redirecting to login.');
      window.location = '/';
      return;
    }

    fetch('http://localhost:3333/authen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // ใช้ Template Literal
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data); // Debug การตอบกลับของ API

        if (data.status === 'ok') {
        } else {
          alert('Authentication failed. Redirecting to login.');
          localStorage.removeItem('token'); // ลบ key "token" อย่างถูกต้อง
          window.location = '/'; // เปลี่ยนเส้นทาง
        }
      })
      .catch((error) => {
        console.error('Error during authentication:', error);
        alert('Authentication error. Redirecting to login.');
        localStorage.removeItem('token'); // ลบ token กรณีมีข้อผิดพลาด
        window.location = '/';
      });

  }, []); // ทำงานครั้งเดียวตอน component โหลด

  const handleLogout = (event) => {
    localStorage.removeItem('token'); // ลบ key "token" อย่างถูกต้อง
    window.location = '/'; // เปลี่ยนเส้นทาง
  }

  return (
    <AppTheme {...props}>

      <CssBaseline enableColorScheme />
      <AppAppBar />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Button variant='contained' onClick={handleLogout}>Logout</Button>
        <MainContent />
        <Latest />
      </Container>

      <Footer />
    </AppTheme>
  );
}