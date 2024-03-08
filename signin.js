document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
  
    signinForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Mencegah form untuk submit secara default
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Kirim data sign-in ke server
      fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(response => {
        if (response.ok) {
          // Redirect ke halaman setelah sign-in berhasil
          window.location.href = 'dashboard.html';
        } else {
          // Tampilkan pesan error jika sign-in gagal
          alert('Sign-in failed. Please check your username and password.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
    });
  });
  