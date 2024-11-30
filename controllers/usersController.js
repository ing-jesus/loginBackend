import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const UsersController = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        User.create(username, hashedPassword, (err, results) => {
            if (err) return res.status(500).json({ error: 'Error al registrar usuario' });
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        });
    },
    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, async (err, results) => {
            if (err) return res.status(500).json({ error: 'Error al iniciar sesión' });
            if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        });
    },
    getAll: (req, res) => {
        User.findAll((err, results) => {
            if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
            res.status(200).json(results);
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const { username } = req.body;

        User.update(id, username, (err, results) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        });
    },
    delete: (req, res) => {
        const { id } = req.params;

        User.delete(id, (err, results) => {
            if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        });
    }
};

export default UsersController;
