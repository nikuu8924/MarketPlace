const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const username = 'nikuu_8924';
const password = encodeURIComponent('Niku@3007'); // URL encode the password
const cluster = 'ac-p3phboz';
const dbName = 'myFirstDatabase';
//const mongoURI = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const db = `mongodb+srv://nikuu_8924:${password}@marketplacecluster.slibxky.mongodb.net/Marketplace?retryWrites=true&w=majority&appName=MarketplaceCluste`;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome To Marketplace' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});