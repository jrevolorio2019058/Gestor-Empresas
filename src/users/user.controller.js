import bcryptjs from 'bcryptjs';

import Usuario from '../users/user.model.js';

export const clientePost = async (req, res) => {

    const usuarioAutenticado = req.usuario;

    const {userName, email, password} = req.body;

    const role = "ADMIN_ROLE";

    const usuario = new Usuario({userName, email, password, role, state: true});

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(200).json({

        usuario,
        usuarioAutenticado

    });

}

