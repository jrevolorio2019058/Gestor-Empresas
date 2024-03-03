import bcryptjs from 'bcryptjs';

import User from '../users/user.model.js';

import { generarJWT } from '../helpers/generate-jwt.js';

import Role from '../roles/role.model.js';

export const login = async (req, res) => {

    const { email, password} = req.body;

    const usuario = await User.findOne({ email });

    if (!usuario) {
        return res.status(400).json({
        msg: "Credenciales incorrectas, No se encontro Correo en la base de datos"

        });
    }

    if (usuario.role != 'ADMIN_ROLE') {
        return res.status(401).json({
        msg: "ROLE INVALIDO, no se puede logear si no es ADMIN"

        });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
        return res.status(400).json({
        msg: "La contraseña es incorrecta"
        });
    }

    const token = await generarJWT(usuario.id);

    const existeRole = await Role.findOne({ role: "ADMIN_ROLE" });

    if (!existeRole) {

        const roleAdmin = new Role({

            role: "ADMIN_ROLE",

        });

        const roleCliente = new Role({

            role: "CLIENT_ROLE",

        });

        await roleAdmin.save();
        await roleCliente.save();
    }

    res.status(200).json({

        msg: 'Logeado Correctamente',
        usuario,
        token

    })
}