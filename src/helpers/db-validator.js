import User from '../users/user.model.js';

import Role from '../roles/role.model.js'

export const existenteEmail = async (email = '') =>{
    
    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
        
        throw new Error(`El email ${email} ya fue registrado`);

    }

}

export const esRolValido = async (role='') => {

    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`Status | Role:${ role } | No existe en la base de datos`)
    }

}