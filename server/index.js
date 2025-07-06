
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const connectToMongoDb = require('./connection.js');
const postRoutes = require('./routes/post.js');
const aiRoutes = require('./routes/ai.js');

const mongoUrl = process.env.MONGODB_URL
const PORT = process.env.PORT || 8080;

connectToMongoDb(mongoUrl)
.then(()=> console.log('MongoDB connected'))
.catch((err)=> console.log('MongoDB connection error:', err));


const app = express();

const allowedOrigins = [
  'https://your-frontend-app.onrender.com', 
  'http://localhost:5173' 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use('/api/post', postRoutes)
app.use('/api/ai' , aiRoutes)

app.get('/', async (_, res) => {
    res.send('Hello from the server!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})