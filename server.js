const express = require('express');

// Constants
const PORT = 3000;
const app = express();


// App
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

// Endpoints
app.get('/foo', (req, res) => {
  res.json({"foo": "bar"});
});

app.use(express.urlencoded({
  extended: true
}));

app.post('/bar', function(req, res) {
    var body = req.body;
    console.log(req.body.foo);
    res.send(req.body.foo);
});

