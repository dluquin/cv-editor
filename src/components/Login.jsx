import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login() {
    const { loginWithPassword, sendOtp, verifyOtp } = useAuth();
    const [mode, setMode] = useState('password'); // 'password' or 'passwordless'
    const [step, setStep] = useState('email'); // 'email' or 'code' (for passwordless)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            if (mode === 'password') {
                const result = await loginWithPassword(email, password);
                if (!result.success) setError(result.error);
            } else {
                // Passwordless
                if (step === 'email') {
                    const result = await sendOtp(email);
                    if (result.success) {
                        setStep('code');
                        setMessage('Código enviado a tu email (Revisa la consola)');
                    } else {
                        setError(result.error);
                    }
                } else {
                    const result = await verifyOtp(email, code);
                    if (!result.success) setError(result.error);
                }
            }
        } catch (err) {
            setError('Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>CV Editor Login</h1>

                <div className="login-tabs">
                    <button
                        className={mode === 'password' ? 'active' : ''}
                        onClick={() => { setMode('password'); setStep('email'); setError(''); setMessage(''); }}
                    >
                        Contraseña
                    </button>
                    <button
                        className={mode === 'passwordless' ? 'active' : ''}
                        onClick={() => { setMode('passwordless'); setStep('email'); setError(''); setMessage(''); }}
                    >
                        Sin Contraseña
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={step === 'code'}
                        />
                    </div>

                    {mode === 'password' && (
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {mode === 'passwordless' && step === 'code' && (
                        <div className="form-group">
                            <label>Código de 6 dígitos</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                maxLength="6"
                                placeholder="123456"
                            />
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="success-message">{message}</div>}

                    <button type="submit" className="btn-primary full-width" disabled={loading}>
                        {loading ? 'Cargando...' : (
                            mode === 'password' ? 'Iniciar Sesión' : (
                                step === 'email' ? 'Enviar Código' : 'Verificar Código'
                            )
                        )}
                    </button>
                </form>

                <div className="mock-info">
                    <small>
                        <strong>Modo Demo:</strong><br />
                        Pass: password123<br />
                        Code: 123456
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Login;
