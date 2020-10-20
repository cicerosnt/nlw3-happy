import {Router} from 'express';
import OrphanagesConroller from './controllers/OrphanagesConroller';
import multer from 'multer';
import uploadConfig from './config/uploads';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'), OrphanagesConroller.create);
routes.get('/orphanages', OrphanagesConroller.index);
routes.get('/orphanages/:id', OrphanagesConroller.show);

export default routes;