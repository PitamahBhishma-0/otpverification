const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// POST endpoint for code verification
app.post('/verify', (req, res) => {
  const { code } = req.body;

  if (!code || code.length !== 6 || code.charAt(5) === '7') {
    return res.status(400).json({ error: 'Verification Error' });
  }

  // Success case
  res.status(200).json({ message: 'Verification successful' });
});

app.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});
