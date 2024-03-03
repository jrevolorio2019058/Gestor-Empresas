import { Router } from "express";


import {
    
} from "./user.controller.js";

import { } from "../helpers/db-validator.js";

import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.post(
    "/",
    [
        validarCampos
    ],
);

export default router;