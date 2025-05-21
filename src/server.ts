// src/server.ts
import dotenv from 'dotenv';
dotenv.config(); // .env



console.log('JWT_SECRET (debug):', process.env.JWT_SECRET); // <--- add this


import app from './app';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
