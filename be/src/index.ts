import express from 'express';
import cors from 'cors';

import './database/connection';
import OrphanageRoutes from './routes/OrphanageRoutes';
import handlerExceptions from './exceptions/HandlerExceptions';

const app = express();

app.use(cors());
app.use(express.json());
app.use([ OrphanageRoutes ]);
app.use(handlerExceptions)
app.listen(3333);  