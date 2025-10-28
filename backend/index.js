const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const authRouter = require('./routes/auth');       
const productsRouter = require('./routes/products'); 

 app.use('/auth', authRouter);
 app.use('/products', productsRouter);


app.get('/', (req, res) => res.json({ message: 'Server running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));