import cors from 'cors';

const whitelist = (process.env.FRONTEND_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export default cors({
  origin: (origin, callback) => {
    // allow server-to-server & Jest (no origin)
    if (!origin) return callback(null, true);
    return whitelist.includes(origin)
      ? callback(null, true)
      : callback(new Error('CORS not allowed by policy'));
  },
  credentials: true,   // you’ll need this when you add refresh-token cookies
});
