export const validateProfile = (data) => {
    const errors = {
        personal: {},
        experience: {},
        board: {},
        international: {},
        specialization: {},
        additional: {}
    };

    if (!data) return errors;

    // 1. Personal Data
    const personal = data.datos_personales || {};
    if (!personal.nombre_completo) errors.personal.nombre_completo = true;
    if (!personal.email) errors.personal.email = true;
    if (!personal.movil) errors.personal.movil = true;
    if (!personal.ciudad) errors.personal.ciudad = true;
    if (!personal.pais) errors.personal.pais = true;
    if (!personal.linkedin) errors.personal.linkedin = true;

    // 2. Experience
    const experience = data.experiencia_profesional || [];
    experience.forEach((job, index) => {
        const jobErrors = {};
        if (!job.cargo) jobErrors.cargo = true;
        if (!job.empresa) jobErrors.empresa = true;
        if (!job.pais) jobErrors.pais = true;

        const periodo = job.periodo || {};
        if (!periodo.inicio) jobErrors['periodo.inicio'] = true;
        if (!periodo.fin && periodo.fin !== 'Actualidad') jobErrors['periodo.fin'] = true;

        if (Object.keys(jobErrors).length > 0) {
            errors.experience[index] = jobErrors;
        }
    });

    // 3. Board Experience
    const board = data.experiencia_consejos || [];
    board.forEach((role, index) => {
        const roleErrors = {};
        if (!role.cargo_en_consejo) roleErrors.cargo_en_consejo = true;
        if (!role.empresa) roleErrors.empresa = true;

        const periodo = role.periodo || {};
        if (!periodo.inicio) roleErrors['periodo.inicio'] = true;
        // End date might be optional for current roles, but let's enforce consistency if needed. 
        // For now, let's say end date is required unless it's current (logic similar to experience could apply, but let's keep it simple).

        if (Object.keys(roleErrors).length > 0) {
            errors.board[index] = roleErrors;
        }
    });

    // 4. International
    const international = data.experiencia_internacional || [];
    international.forEach((item, index) => {
        const itemErrors = {};
        if (!item.region) itemErrors.region = true;

        if (Object.keys(itemErrors).length > 0) {
            errors.international[index] = itemErrors;
        }
    });

    // 5. Specialization - Optional
    // Let's not enforce strict validation on these optional sections unless requested.

    // 6. Additional Info - Education
    const education = data.informacion_adicional?.formacion || [];
    education.forEach((edu, index) => {
        const eduErrors = {};
        if (!edu.programa) eduErrors.programa = true;
        if (!edu.institucion) eduErrors.institucion = true;
        if (!edu.ciudad) eduErrors.ciudad = true;
        if (!edu.pais) eduErrors.pais = true;

        if (Object.keys(eduErrors).length > 0) {
            if (!errors.additional.formacion) errors.additional.formacion = {};
            errors.additional.formacion[index] = eduErrors;
        }
    });

    return errors;
};

export const countErrors = (sectionErrors) => {
    if (!sectionErrors) return 0;
    const keys = Object.keys(sectionErrors);
    if (keys.length === 0) return 0;

    // Check if the first value is a boolean (flat error object)
    // In our validation logic, flat errors are { field: true }
    const firstValue = sectionErrors[keys[0]];
    if (typeof firstValue === 'boolean') {
        return keys.length;
    }

    // Otherwise assume it's a nested object (index -> errors)
    // sectionErrors is { 0: { field: true }, 1: { ... } }
    let count = 0;
    Object.values(sectionErrors).forEach(itemErrors => {
        if (itemErrors && typeof itemErrors === 'object') {
            count += Object.keys(itemErrors).length;
        }
    });
    return count;
};
