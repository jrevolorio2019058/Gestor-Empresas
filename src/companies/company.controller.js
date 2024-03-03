import Company from '../companies/company.model.js';

export const companyPost = async (req, res) => {

    const {companyName, impactLevel, yearsOfExperience, businessCategory, nationality} = req.body;

    const company = new Company({companyName, impactLevel, yearsOfExperience, businessCategory, nationality});

    await company.save();

    res.status(200).json({
        msg: `${req.usuario.userName} haz registrado correctamente los datos de ${companyName}`,
        company
    })

}