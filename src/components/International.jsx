import React from 'react';

function International({ data, onChange }) {
    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handlePaisesChange = (index, paisIndex, value) => {
        const newData = [...data];
        const newPaises = [...newData[index].paises];
        newPaises[paisIndex] = value;
        newData[index] = { ...newData[index], paises: newPaises };
        onChange(newData);
    };

    const addPais = (index) => {
        const newData = [...data];
        const newPaises = [...(newData[index].paises || []), ''];
        newData[index] = { ...newData[index], paises: newPaises };
        onChange(newData);
    };

    const removePais = (index, paisIndex) => {
        const newData = [...data];
        const newPaises = newData[index].paises.filter((_, i) => i !== paisIndex);
        newData[index] = { ...newData[index], paises: newPaises };
        onChange(newData);
    };

    const addItem = () => {
        onChange([
            ...data,
            {
                region: '',
                paises: [],
            },
        ]);
    };

    const removeItem = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    if (!data) return <div className="empty-state">No hay datos de experiencia internacional.</div>;

    return (
        <section className="card">
            <div className="section-header">
                <h2>Experiencia Internacional</h2>
                <button className="btn-primary" onClick={addItem}>
                    + Añadir Región
                </button>
            </div>
            {data.map((item, index) => (
                <div key={index} className="experience-item">
                    <div className="item-header">
                        <h3>{item.region || 'Nueva Región'}</h3>
                        <button className="btn-danger" onClick={() => removeItem(index)}>
                            Eliminar
                        </button>
                    </div>
                    <div className="form-group">
                        <label>Región</label>
                        <input
                            type="text"
                            value={item.region || ''}
                            onChange={(e) => handleChange(index, 'region', e.target.value)}
                        />
                    </div>

                    <div className="array-section">
                        <h4>Países</h4>
                        <div className="tags-container">
                            {item.paises?.map((pais, i) => (
                                <div key={i} className="tag-edit">
                                    <input
                                        type="text"
                                        value={pais}
                                        onChange={(e) => handlePaisesChange(index, i, e.target.value)}
                                    />
                                    <button onClick={() => removePais(index, i)}>×</button>
                                </div>
                            ))}
                            <button className="btn-tag" onClick={() => addPais(index)}>
                                + Añadir País
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default International;
