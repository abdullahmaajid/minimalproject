const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Tambahkan kode untuk menangani permintaan login dan sign-up di sini

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/login', (req, res) => {
    // Logika untuk memeriksa login
  });
  
  app.post('/signup', (req, res) => {
    // Logika untuk menangani pendaftaran pengguna baru
  });
  