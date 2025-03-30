import express from 'express';
import serverless from 'serverless-http';
import {MigrationObserver} from './observers/migration.observer';
import routes from './routes';
const app = express();

async function  loadServer(){
    app.use(express.json());
    app.use('/', routes);
    await MigrationObserver.getInstance().start()
    app.use((_req: express.Request, res: express.Response, _next: express.NextFunction) => {
      res.status(404).send();
    });
    
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error("I AM IN ERROR",  err.stack);
      res.status(err.status || 500).json({err: err.message?? "Internal Server Error"});
    });
}
// Load the server and handle errors
loadServer().catch((error) => {
    console.error('Error loading server:', error);
});

// app.listen(3000, () => {
//     console.log(`Server is running on port ${3000}`);
// });

// if(envConfig.IS_LOCAL_APP){
 
// }
export const handler = serverless(app);
