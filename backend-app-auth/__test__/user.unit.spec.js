const User = require('../../models/user'); // Asegúrate de ajustar la ruta al modelo User

// Este es un ejemplo de prueba unitaria para el modelo `User` en tu proyecto.
// Usaremos Jest para realizar las pruebas y mockearemos las funciones del modelo.


jest.mock('../../models/user'); // Mockeamos el modelo User

describe('User Model Unit Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    it('should create a new user successfully', async () => {
        // Mock de la función create del modelo User
        const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
        User.create.mockResolvedValue(mockUser);

        const result = await User.create({ username: 'testuser', email: 'test@example.com' });

        expect(User.create).toHaveBeenCalledTimes(1); // Verifica que se llamó una vez
        expect(User.create).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com' }); // Verifica los argumentos
        expect(result).toEqual(mockUser); // Verifica el resultado
    });

    it('should fail to create a user if validation fails', async () => {
        // Mock de un error de validación
        const mockError = new Error('Validation error');
        User.create.mockRejectedValue(mockError);

        await expect(User.create({ username: '', email: 'invalid-email' })).rejects.toThrow('Validation error');

        expect(User.create).toHaveBeenCalledTimes(1); // Verifica que se llamó una vez
        expect(User.create).toHaveBeenCalledWith({ username: '', email: 'invalid-email' }); // Verifica los argumentos
    });

    it('should find a user by ID', async () => {
        // Mock de la función findByPk del modelo User
        const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
        User.findByPk.mockResolvedValue(mockUser);

        const result = await User.findByPk(1);

        expect(User.findByPk).toHaveBeenCalledTimes(1); // Verifica que se llamó una vez
        expect(User.findByPk).toHaveBeenCalledWith(1); // Verifica los argumentos
        expect(result).toEqual(mockUser); // Verifica el resultado
    });

    it('should return null if user is not found by ID', async () => {
        // Mock de un resultado nulo
        User.findByPk.mockResolvedValue(null);

        const result = await User.findByPk(999);

        expect(User.findByPk).toHaveBeenCalledTimes(1); // Verifica que se llamó una vez
        expect(User.findByPk).toHaveBeenCalledWith(999); // Verifica los argumentos
        expect(result).toBeNull(); // Verifica el resultado
    });
});
