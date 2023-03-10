const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// loads in css
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact-me.html'));
});

//error 404 handling
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});