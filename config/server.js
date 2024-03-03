'use strict'

import express from 'express';

import cors from 'cors';

import helmet from 'helmet';

import morgan from 'morgan';

import { dbConnection } from './mogo.js';

import userRoutes from "../src/users/user.routes.js";

import authRoutes from "../src/auth/auth.routes.js";

import companyRoutes from "../src/companies/company.routes.js";

class Server{

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/gestorEmpresaApi/v1/user'
        this.authPath = '/gestorEmpresaApi/v1/auth'
        this.companyPath = '/gestorEmpresaApi/v1/company'

        this.middlewares();
        this.conectarDB();
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));

    }

    routes() {
        
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.companyPath, companyRoutes);

    }

    listen() {
        
        this.app.listen(this.port, () => {
            console.log('SERVER ONLINE | ON PORT: ', this.port);
        });

    }

}

export default Server;