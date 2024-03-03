import { Router } from "express";


import {
    
    clientePost

} from "./user.controller.js";

import {tieneRole} from "../middlewares/validar-role.js";

import {validarJWT} from "../middlewares/validar-jwt.js";

import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.post(
    "/",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        validarCampos
    ],clientePost
);

export default router;