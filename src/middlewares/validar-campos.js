import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json(error)
    }

    next();

}

export const validacionFiltros = (req, res, next) =>{

    const {ascendancy, descendant} = req.body;

    if(ascendancy == true && descendant == true){

        return res.status(400).json({

            msg: `Solo se puede tener de forma ascendente o descente pero no los dos a la misma vez`

        })

    }

    next();

}