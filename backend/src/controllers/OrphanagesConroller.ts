import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanagesViews from '../views/orphanages_views';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanagesViews.renderMany(orphanages));
    },

    async show(request: Request, response: Response){
        const {id} = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations: ['images']
        });

        return response.json(orphanagesViews.render(orphanage));
    },

    async create(request: Request, response: Response){

        const{
            name,
            latitude,
            longitude,
            about,
            whatsapp,
            instructions,
            opening_hours,
            open_on_weekeds
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);

        const filesImages = request.files as Express.Multer.File[];
        const images = filesImages.map(image =>{
            return {path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            whatsapp,
            instructions,
            opening_hours,
            open_on_weekeds: open_on_weekeds === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            whatsapp: Yup.number().required(),
            opening_hours: Yup.string().required(),
            open_on_weekeds: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        })
    
        const orphanage = orphanagesRepository.create(data);
    
        orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    }
};