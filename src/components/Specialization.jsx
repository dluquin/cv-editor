import React from 'react';

function Specialization({ data, onChange }) {
    const handleChange = (index, value) => {
        const newData = [...data];
        newData[index] = value;
        onChange(newData);
    };

    const addItem = () => {
        onChange([...data, '']);
    };

    const removeItem = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    if (!data) return <div className="empty-state">No hay datos de especialización.</div>;

    return (
        <section className="card">
            <div className="section-header">
                <h2>Materias de Especialización</h2>
                <button className="btn-primary" onClick={addItem}>
                    + Añadir Especialización
                </button>
            </div>
            <div className="tags-container">
                {data.map((item, index) => (
                    <div key={index} className="tag-edit">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                        <button onClick={() => removeItem(index)}>×</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Specialization;
