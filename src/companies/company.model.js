import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({

    companyName:{

        type: String,
        required: [true, "Es necesario el nombre de la empresa"]

    },

    impactLevel:{

        type: String,
        required: [true, "Es ncesario un nivel de impacto"]

    },

    yearsOfExperience:{

        type: Number,
        required: [true, "Es necesario los años de experiencia"]

    },

    businessCategory:{

        type: String,
        required: [true, "Es necesario una categoria empresarial"]

    },

    nationality:{

        type: String,
        required: [true, "Es nesario una nacionalidad de la empresa"]

    },

    state: {

        type: Boolean,
        default: true

    }

});

export default mongoose.model('Company', CompanySchema);