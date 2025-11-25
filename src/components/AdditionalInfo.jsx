import React from 'react';

function AdditionalInfo({ data, onChange }) {
    const handleArrayChange = (field, index, value) => {
        const newData = { ...data };
        const newArray = [...newData[field]];
        newArray[index] = value;
        onChange({ ...newData, [field]: newArray });
    };

    const addArrayItem = (field) => {
        const newData = { ...data };
        const newArray = [...(newData[field] || []), ''];
        onChange({ ...newData, [field]: newArray });
    };

    const removeArrayItem = (field, index) => {
        const newData = { ...data };
        const newArray = newData[field].filter((_, i) => i !== index);
        onChange({ ...newData, [field]: newArray });
    };

    // Formacion is an array of objects
    const handleFormacionChange = (index, field, value) => {
        const newData = { ...data };
        const newFormacion = [...newData.formacion];
        newFormacion[index] = { ...newFormacion[index], [field]: value };
        onChange({ ...newData, formacion: newFormacion });
    };

    const addFormacion = () => {
        const newData = { ...data };
        const newFormacion = [
            ...(newData.formacion || []),
            {
                programa: '',
                institucion: '',
                ciudad: '',
                pais: '',
                tipo: '',
            },
        ];
        onChange({ ...newData, formacion: newFormacion });
    };

    const removeFormacion = (index) => {
        const newData = { ...data };
        const newFormacion = newData.formacion.filter((_, i) => i !== index);
        onChange({ ...newData, formacion: newFormacion });
    };

    if (!data) return <div className="empty-state">No hay información adicional.</div>;

    return (
        <section className="card">
            <h2>Información Adicional</h2>

            <div className="subsection">
                <h3>Formación</h3>
                <button className="btn-secondary" onClick={addFormacion}>+ Añadir Formación</button>
                {data.formacion?.map((item, index) => (
                    <div key={index} className="experience-item">
                        <div className="item-header">
                            <h4>{item.programa || 'Programa'}</h4>
                            <button className="btn-danger" onClick={() => removeFormacion(index)}>Eliminar</button>
                        </div>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Programa</label>
                                <input
                                    type="text"
                                    value={item.programa || ''}
                                    onChange={(e) => handleFormacionChange(index, 'programa', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Institución</label>
                                <input
                                    type="text"
                                    value={item.institucion || ''}
                                    onChange={(e) => handleFormacionChange(index, 'institucion', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Ciudad</label>
                                <input
                                    type="text"
                                    value={item.ciudad || ''}
                                    onChange={(e) => handleFormacionChange(index, 'ciudad', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>País</label>
                                <input
                                    type="text"
                                    value={item.pais || ''}
                                    onChange={(e) => handleFormacionChange(index, 'pais', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tipo</label>
                                <input
                                    type="text"
                                    value={item.tipo || ''}
                                    onChange={(e) => handleFormacionChange(index, 'tipo', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {['publicaciones', 'conferencias', 'premios', 'voluntariado'].map((field) => (
                <div key={field} className="subsection">
                    <h3>{field.charAt(0).toUpperCase() + field.slice(1)}</h3>
                    {data[field]?.map((item, index) => (
                        <div key={index} className="array-item">
                            <textarea
                                value={item}
                                onChange={(e) => handleArrayChange(field, index, e.target.value)}
                            />
                            <button className="btn-icon" onClick={() => removeArrayItem(field, index)}>×</button>
                        </div>
                    ))}
                    <button className="btn-secondary" onClick={() => addArrayItem(field)}>
                        + Añadir {field}
                    </button>
                </div>
            ))}
        </section>
    );
}

export default AdditionalInfo;
