import User from '../users/user.model.js';

export const existenteEmail = async (email = '') =>{
    
    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
        
        throw new Error(`El email ${email} ya fue registrado`);

    }

}

export const roleAdmin = async (role = '') =>{
    
    const existeAdmin = await User.findOne({ role : "ADMIN_ROLE"});

    if (!existeAdmin) {
        
        throw new Error(`No tienes ADMIN_ROLE`);

    }

}