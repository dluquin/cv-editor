import React, { useState, useEffect } from 'react';
import PersonalData from './components/PersonalData';
import Experience from './components/Experience';
import BoardExperience from './components/BoardExperience';
import International from './components/International';
import Specialization from './components/Specialization';
import AdditionalInfo from './components/AdditionalInfo';

// Load all JSON files from src directory
const cvFiles = import.meta.glob('./*.json', { eager: true });

function App() {
    const [profiles, setProfiles] = useState({});
    const [selectedProfile, setSelectedProfile] = useState('');
    const [data, setData] = useState(null);

    const [activeTab, setActiveTab] = useState('personal');

    useEffect(() => {
        const loadedProfiles = {};
        Object.keys(cvFiles).forEach((path) => {
            const fileName = path.split('/').pop().replace('.json', '');
            loadedProfiles[fileName] = cvFiles[path].default || cvFiles[path];
        });
        setProfiles(loadedProfiles);

        // Select first profile by default
        const firstProfile = Object.keys(loadedProfiles)[0];
        if (firstProfile) {
            setSelectedProfile(firstProfile);
            setData(loadedProfiles[firstProfile]);
        }
    }, []);

    const handleProfileChange = (e) => {
        const profileName = e.target.value;
        setSelectedProfile(profileName);
        setData(profiles[profileName]);
    };

    const handleExport = () => {
        if (!data) return;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${selectedProfile}_edited.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    if (!data) return <div className="loading">Cargando...</div>;

    const tabs = [
        { id: 'personal', label: 'Datos Personales' },
        { id: 'experience', label: 'Experiencia' },
        { id: 'board', label: 'Consejos' },
        { id: 'international', label: 'Internacional' },
        { id: 'specialization', label: 'Especialización' },
        { id: 'additional', label: 'Info Adicional' },
    ];

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <div className="brand">
                        <h1>CV Editor</h1>
                        <span className="badge">Premium</span>
                    </div>

                    <div className="controls">
                        <div className="profile-selector">
                            <label htmlFor="profile-select">Perfil Activo</label>
                            <select
                                id="profile-select"
                                value={selectedProfile}
                                onChange={handleProfileChange}
                            >
                                {Object.keys(profiles).map((name) => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                        <button className="btn-primary btn-export" onClick={handleExport}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                            </svg>
                            Exportar JSON
                        </button>
                    </div>
                </div>

                <nav className="tabs-nav">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </header>

            <main className="main-content">
                <div className="tab-content">
                    {activeTab === 'personal' && (
                        <PersonalData
                            data={data.datos_personales}
                            onChange={(newData) => setData({ ...data, datos_personales: newData })}
                        />
                    )}

                    {activeTab === 'experience' && (
                        <Experience
                            data={data.experiencia_profesional || []}
                            onChange={(newData) => setData({ ...data, experiencia_profesional: newData })}
                        />
                    )}

                    {activeTab === 'board' && (
                        <BoardExperience
                            data={data.experiencia_consejos || []}
                            onChange={(newData) => setData({ ...data, experiencia_consejos: newData })}
                        />
                    )}

                    {activeTab === 'international' && (
                        <International
                            data={data.experiencia_internacional || []}
                            onChange={(newData) => setData({ ...data, experiencia_internacional: newData })}
                        />
                    )}

                    {activeTab === 'specialization' && (
                        <Specialization
                            data={data.materias_especializacion || []}
                            onChange={(newData) => setData({ ...data, materias_especializacion: newData })}
                        />
                    )}

                    {activeTab === 'additional' && (
                        <AdditionalInfo
                            data={data.informacion_adicional || {}}
                            onChange={(newData) => setData({ ...data, informacion_adicional: newData })}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
