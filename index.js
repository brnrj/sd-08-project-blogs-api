const express = require('express');

const app = express();
app.use(express.json());

app.use(require('./routers/index'));

app.listen(3000, () => console.log('ouvindo porta 3000!'));