import React from 'react';

function Experience({ data, onChange }) {
    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handlePeriodChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = {
            ...newData[index],
            periodo: { ...newData[index].periodo, [field]: value },
        };
        onChange(newData);
    };

    const handleArrayChange = (index, field, arrayIndex, value) => {
        const newData = [...data];
        const newArray = [...newData[index][field]];
        newArray[arrayIndex] = value;
        newData[index] = { ...newData[index], [field]: newArray };
        onChange(newData);
    };

    const addArrayItem = (index, field) => {
        const newData = [...data];
        const newArray = [...(newData[index][field] || []), ''];
        newData[index] = { ...newData[index], [field]: newArray };
        onChange(newData);
    };

    const removeArrayItem = (index, field, arrayIndex) => {
        const newData = [...data];
        const newArray = newData[index][field].filter((_, i) => i !== arrayIndex);
        newData[index] = { ...newData[index], [field]: newArray };
        onChange(newData);
    };

    const addExperience = () => {
        onChange([
            ...data,
            {
                cargo: '',
                empresa: '',
                periodo: { inicio: '', fin: '' },
                sector: '',
                tipo_empresa: '',
                pais: '',
                responsabilidades_clave: [],
                logros_destacados: [],
            },
        ]);
    };

    const removeExperience = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const getInputValue = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr.match(/^\d{2}-\d{4}$/)) {
            const [month, year] = dateStr.split('-');
            return `${year}-${month}`;
        }
        return dateStr;
    };

    if (!data) return <div className="empty-state">No hay datos de experiencia.</div>;

    return (
        <section className="card">
            <div className="section-header">
                <h2>Experiencia Profesional</h2>
                <button className="btn-primary" onClick={addExperience}>
                    + Añadir Experiencia
                </button>
            </div>
            {data.length === 0 && <div className="empty-state">No hay experiencia registrada. Añade una nueva posición.</div>}
            {data.map((exp, index) => (
                <div key={index} className="experience-item">
                    <div className="item-header">
                        <h3>{exp.cargo || 'Nueva Posición'} en {exp.empresa || 'Empresa'}</h3>
                        <button className="btn-danger" onClick={() => removeExperience(index)}>
                            Eliminar
                        </button>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Cargo</label>
                            <input
                                type="text"
                                value={exp.cargo || ''}
                                onChange={(e) => handleChange(index, 'cargo', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Empresa</label>
                            <input
                                type="text"
                                value={exp.empresa || ''}
                                onChange={(e) => handleChange(index, 'empresa', e.target.value)}
                            />
                        </div>
                        <div className="date-row">
                            <div className="form-group">
                                <label>Inicio</label>
                                <input
                                    type="month"
                                    value={getInputValue(exp.periodo?.inicio)}
                                    onChange={(e) => handlePeriodChange(index, 'inicio', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Fin</label>
                                <div className="input-with-checkbox">
                                    <input
                                        type="month"
                                        value={getInputValue(exp.periodo?.fin)}
                                        onChange={(e) => handlePeriodChange(index, 'fin', e.target.value)}
                                        disabled={exp.periodo?.fin === 'Actualidad'}
                                    />
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={exp.periodo?.fin === 'Actualidad'}
                                            onChange={(e) => handlePeriodChange(index, 'fin', e.target.checked ? 'Actualidad' : '')}
                                        />
                                        Actualidad
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Sector</label>
                            <input
                                type="text"
                                value={exp.sector || ''}
                                onChange={(e) => handleChange(index, 'sector', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tipo Empresa</label>
                            <input
                                type="text"
                                value={exp.tipo_empresa || ''}
                                onChange={(e) => handleChange(index, 'tipo_empresa', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>País</label>
                            <input
                                type="text"
                                value={exp.pais || ''}
                                onChange={(e) => handleChange(index, 'pais', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="array-section">
                        <h4>Responsabilidades Clave</h4>
                        {exp.responsabilidades_clave?.map((resp, i) => (
                            <div key={i} className="array-item">
                                <textarea
                                    value={resp}
                                    onChange={(e) => handleArrayChange(index, 'responsabilidades_clave', i, e.target.value)}
                                />
                                <button className="btn-icon" onClick={() => removeArrayItem(index, 'responsabilidades_clave', i)}>×</button>
                            </div>
                        ))}
                        <button className="btn-secondary" onClick={() => addArrayItem(index, 'responsabilidades_clave')}>
                            + Añadir Responsabilidad
                        </button>
                    </div>

                    <div className="array-section">
                        <h4>Logros Destacados</h4>
                        {exp.logros_destacados?.map((logro, i) => (
                            <div key={i} className="array-item">
                                <textarea
                                    value={logro}
                                    onChange={(e) => handleArrayChange(index, 'logros_destacados', i, e.target.value)}
                                />
                                <button className="btn-icon" onClick={() => removeArrayItem(index, 'logros_destacados', i)}>×</button>
                            </div>
                        ))}
                        <button className="btn-secondary" onClick={() => addArrayItem(index, 'logros_destacados')}>
                            + Añadir Logro
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Experience;
