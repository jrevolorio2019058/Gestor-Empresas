import { Router } from "express";

import {check} from "express-validator";

import {
    
    clientePost

} from "./user.controller.js";

import {esRolValido} from '../helpers/db-validator.js';

import {tieneRole} from "../middlewares/validar-role.js";

import {validarJWT} from "../middlewares/validar-jwt.js";

import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.post(
    "/",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        check("role").custom(esRolValido),
        validarCampos
    ],clientePost
);

export default router;