import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import profileRoutes from './routes/profile.routes.js'
import cors from 'cors';
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use(authRoutes);

app.use(productRoutes);

app.use(profileRoutes);
export default app;