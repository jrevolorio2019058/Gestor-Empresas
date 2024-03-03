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

export const companyPut = async (req, res) => {

    const { id } = req.params;

    const {_id, state, ...resto} = req.body;

    await Company.findByIdAndUpdate(id,resto);

    const company = await Company.findOne({_id: id});

    await company.save();

    res.status(200).json({
        msg: `${req.usuario.userName} haz modificado correctamente los datos de ${company.companyName}`
    });

}