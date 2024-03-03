import { Router } from "express";

import { check } from "express-validator";

import {

    companyPost,
    companyPut,
    companyDelete

} from "./company.controller.js";

import {tieneRole} from "../middlewares/validar-role.js";

import {validarJWT} from "../middlewares/validar-jwt.js";

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(

    "/",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        check("companyName", "Es obligatorio el nombre de empresa").not().isEmpty(),
        check("impactLevel", "Es obligatorio el impacto de la empresa").not().isEmpty(),
        check("yearsOfExperience", "Es obligatorio los años de experiencia").not().isEmpty(),
        check("businessCategory", "Es obligatorio la categoria de la empresa").not().isEmpty(),
        check("nationality", "Es obligatorio la nacionalidad").not().isEmpty(),
        validarCampos
    ], companyPost

);

router.put(

    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        validarCampos
    ], companyPut

);

router.delete(

    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        validarCampos
    ], companyDelete

);

export default router;