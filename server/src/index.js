import app from './app.js';
import 'dotenv/config'
import { connectDB } from './db.js';
connectDB();
app.listen(process.env.PORT || 3000);
console.log('server en puerto ', process.env.PORT || 3000);