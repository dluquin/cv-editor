// Mock Authentication Service

export const authService = {
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password === 'password123') {
                    resolve({
                        email,
                        name: 'Usuario Demo',
                        token: 'mock-jwt-token'
                    });
                } else {
                    reject(new Error('Credenciales inválidas'));
                }
            }, 1000);
        });
    },

    sendOtp: async (email) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`[MOCK AUTH] OTP sent to ${email}: 123456`);
                resolve({ success: true, message: 'Código enviado' });
            }, 1000);
        });
    },

    verifyOtp: async (email, code) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (code === '123456') {
                    resolve({
                        email,
                        name: 'Usuario Demo',
                        token: 'mock-jwt-token'
                    });
                } else {
                    reject(new Error('Código inválido'));
                }
            }, 1000);
        });
    }
};
