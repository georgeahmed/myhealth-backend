import express, { Request, Response } from 'express';
const app = express();
app.get('/', (req: Request, res: Response) => { res.send('Hello'); });
app.listen(3000, () => { console.log('Running on port 3000'); });