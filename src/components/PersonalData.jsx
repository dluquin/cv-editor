import React from 'react';

function PersonalData({ data, onChange, errors = {} }) {
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
          <label className="required">Nombre Completo</label>
          <input
            type="text"
            name="nombre_completo"
            value={data.nombre_completo || ''}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez García"
            className={errors.nombre_completo ? 'invalid' : ''}
          />
        </div>
        <div className="form-group">
          <label className="required">Email</label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            placeholder="tu.email@ejemplo.com"
            className={errors.email ? 'invalid' : ''}
          />
        </div>
        <div className="form-group">
          <label className="required">Móvil</label>
          <input
            type="tel"
            name="movil"
            value={data.movil || ''}
            onChange={handleChange}
            placeholder="+34 600 000 000"
            className={errors.movil ? 'invalid' : ''}
          />
        </div>
        <div className="form-group">
          <label className="required">Ciudad</label>
          <input
            type="text"
            name="ciudad"
            value={data.ciudad || ''}
            onChange={handleChange}
            placeholder="Ej: Madrid"
            className={errors.ciudad ? 'invalid' : ''}
          />
        </div>
        <div className="form-group">
          <label className="required">País</label>
          <input
            type="text"
            name="pais"
            value={data.pais || ''}
            onChange={handleChange}
            placeholder="Ej: España"
            className={errors.pais ? 'invalid' : ''}
          />
        </div>
        <div className="form-group">
          <label className="required">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/tu-perfil"
            className={errors.linkedin ? 'invalid' : ''}
          />
        </div>
      </div>
    </section>
  );
}

export default PersonalData;
