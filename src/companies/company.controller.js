import Company from '../companies/company.model.js';

import excel from 'excel4node';

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

export const companyDelete = async (req, res) => {

    res.status(401).json({
        msg: `Error! ${req.usuario.userName} no puedes eliminar una empresa.`
    })

}

export const companyGet = async (req, res = response) => {

    const {activeYears, ascendancy, descendant} = req.body;

    if(activeYears == null){

        if(ascendancy == true){

            const { limite, desde } = req.query;

            const query = { state: true };

            const [total, company] = await Promise.all([

                Company.countDocuments(query),
                Company.find(query)
                    .sort({ businessCategory: 1 })
                    .skip(Number(desde))
                    .limit(Number(limite))

            ]);

            res.status(200).json({
                total,
                company
            })

        }else if(descendant == true){

            const { limite, desde } = req.query;

            const query = { state: true };

            const [total, company] = await Promise.all([

                Company.countDocuments(query),
                Company.find(query)
                    .sort({ businessCategory: -1 })
                    .skip(Number(desde))
                    .limit(Number(limite))

            ]);

            res.status(200).json({
                total,
                company
            })

        }else{

            const { limite, desde } = req.query;

            const query = { state: true };

            const [total, company] = await Promise.all([

                Company.countDocuments(query),
                Company.find(query)
                    .skip(Number(desde))
                    .limit(Number(limite))

            ]);

            res.status(200).json({
                total,
                company
            })

        }

    }else{

        const { limite, desde } = req.query;

        const query = { state: true, yearsOfExperience: activeYears};

        const [total, company] = await Promise.all([

            Company.countDocuments(query),
            Company.find(query)
                .skip(Number(desde))
                .limit(Number(limite))

        ]);

        res.status(200).json({
            total,
            company
        })

    }

}

export const companyReport = async (req, res) => {
    try {
        const companies = await Company.find();

        const wb = new excel.Workbook();
        const ws = wb.addWorksheet('Company Report');

        const headerStyle = wb.createStyle({
            font: {
                color: '#FFFFFF',
                style: 'Arial Black',
                bold: true,
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#CD5C5C',
            },
            alignment: {
                horizontal: 'justify',
            },
        });

        const rowStyle = wb.createStyle({
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#84B583',
            },
            alignment: {
                horizontal: 'center',
            },
        });

        const centeredStyle = wb.createStyle({
            alignment: {
                horizontal: 'center',
            },
        });

        const headers = ['Nombre Compañia', 'Nivel de Impacto', 'Años de Experiencia', 'Categoría Empresa', 'Nacionalidad'];
        headers.forEach((header, index) => {
            ws.cell(1, index + 1).string(header).style(headerStyle);
        });

        for (let rowIndex = 0; rowIndex < companies.length; rowIndex++) {
            const company = companies[rowIndex];
            const rowStart = rowIndex + 2;

            ws.cell(rowStart, 1).string(company.companyName || '').style(rowStyle).style(centeredStyle);
            ws.cell(rowStart, 2).string(company.impactLevel || '').style(rowStyle).style(centeredStyle);
            ws.cell(rowStart, 3).number(company.yearsOfExperience || 0).style(rowStyle).style(centeredStyle);
            ws.cell(rowStart, 4).string(company.businessCategory || '').style(rowStyle).style(centeredStyle);
            ws.cell(rowStart, 5).string(company.nationality || '').style(rowStyle).style(centeredStyle);
        }

        for (let i = 1; i <= headers.length; i++) {
            ws.column(i).setWidth(23);
        }

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=ReporteIntefer_Empresas.xlsx');

        res.send(await wb.writeToBuffer());
    } catch (error) {
        console.error("Error generating Excel report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};