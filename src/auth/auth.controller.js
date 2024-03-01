import bcryptjs from 'bcryptjs';

import User from '../users/user.model.js';

import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {

    const { email } = req.body;

    const usuario = await User.findOne({ email });

    if (!usuario) {
        return res.status(400).json({
        msg: "Credenciales incorrectas, No se encontro Correo en la base de datos"

        });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
        return res.status(400).json({
        msg: "La contraseña es incorrecta"
        });
    }
}