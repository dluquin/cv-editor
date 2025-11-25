import React from 'react';

function BoardExperience({ data, onChange }) {
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

    const addItem = () => {
        onChange([
            ...data,
            {
                cargo_en_consejo: '',
                tipo_de_consejo: '',
                empresa: '',
                periodo: { inicio: '', fin: '' },
                pais: '',
                responsabilidades_clave: [],
            },
        ]);
    };

    const removeItem = (index) => {
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

    if (!data) return <div className="empty-state">No hay datos de consejos.</div>;

    return (
        <section className="card">
            <div className="section-header">
                <h2>Experiencia en Consejos</h2>
                <button className="btn-primary" onClick={addItem}>
                    + Añadir Consejo
                </button>
            </div>
            {data.length === 0 && <div className="empty-state">No hay experiencia en consejos registrada.</div>}
            {data.map((item, index) => (
                <div key={index} className="experience-item">
                    <div className="item-header">
                        <h3>{item.cargo_en_consejo || 'Cargo'} en {item.empresa || 'Empresa'}</h3>
                        <button className="btn-danger" onClick={() => removeItem(index)}>
                            Eliminar
                        </button>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Cargo en Consejo</label>
                            <input
                                type="text"
                                value={item.cargo_en_consejo || ''}
                                onChange={(e) => handleChange(index, 'cargo_en_consejo', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tipo de Consejo</label>
                            <input
                                type="text"
                                value={item.tipo_de_consejo || ''}
                                onChange={(e) => handleChange(index, 'tipo_de_consejo', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Empresa</label>
                            <input
                                type="text"
                                value={item.empresa || ''}
                                onChange={(e) => handleChange(index, 'empresa', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>País</label>
                            <input
                                type="text"
                                value={item.pais || ''}
                                onChange={(e) => handleChange(index, 'pais', e.target.value)}
                            />
                        </div>
                        <div className="date-row">
                            <div className="form-group">
                                <label>Inicio</label>
                                <input
                                    type="month"
                                    value={getInputValue(item.periodo?.inicio)}
                                    onChange={(e) => handlePeriodChange(index, 'inicio', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Fin</label>
                                <div className="input-with-checkbox">
                                    <input
                                        type="month"
                                        value={getInputValue(item.periodo?.fin)}
                                        onChange={(e) => handlePeriodChange(index, 'fin', e.target.value)}
                                        disabled={item.periodo?.fin === 'Actualidad'}
                                    />
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={item.periodo?.fin === 'Actualidad'}
                                            onChange={(e) => handlePeriodChange(index, 'fin', e.target.checked ? 'Actualidad' : '')}
                                        />
                                        Actualidad
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="array-section">
                        <h4>Responsabilidades Clave</h4>
                        {item.responsabilidades_clave?.map((resp, i) => (
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
                </div>
            ))}
        </section>
    );
}

export default BoardExperience;
