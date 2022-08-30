import express, { Express, Request, Response, query } from 'express';
import { print } from 'pdf-to-printer';
import fs from 'fs';
import path from 'path';
import { Options } from './types';

const app: Express = express();
const port = 3000;

app.post('/', express.raw({ type: 'application/pdf' }), async(req: Request, res: Response) => {
    const options: Options = {};
    if (req.query.printer) {
        options.printer = req.query.printer as string;
    }
    const tmpFilePath: string = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);
    
    fs.writeFileSync(tmpFilePath, req.body, 'binary');
    await print(tmpFilePath, options);
    fs.unlinkSync(tmpFilePath);

    res.status(204);
    res.send();
});

app.listen(port, ()=> {
    console.log(`⚡️ [Server]: Server is running at https://localhost:${port}`);
});