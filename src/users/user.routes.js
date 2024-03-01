import { Router } from "express";


import {
    iniciarBaseDeDatos
} from "./user.controller.js";

import { } from "../helpers/db-validator.js";

import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.post(
    "/",
    [
        validarCampos
    ], iniciarBaseDeDatos
);

export default router;