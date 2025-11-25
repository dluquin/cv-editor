import React from 'react';

function PersonalData({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  if (!data) return <div className="empty-state">No hay datos personales.</div>;

  return (
    <section className="card">
      <h2>Datos Personales</h2>
      <div className="grid-2">
        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            name="nombre_completo"
            value={data.nombre_completo || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Móvil</label>
          <input
            type="tel"
            name="movil"
            value={data.movil || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ciudad</label>
          <input
            type="text"
            name="ciudad"
            value={data.ciudad || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>País</label>
          <input
            type="text"
            name="pais"
            value={data.pais || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
}

export default PersonalData;
