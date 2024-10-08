// middleware/authorize.js
import User from '../models/user.model.js';

export const isAdmin = async (req, res, next) => {
  const { user } = req; // Asumiendo que has configurado el usuario autenticado en req.user

  try {
    // Busca el usuario en la base de datos usando el ID del usuario
    const foundUser = await User.findById(user.id);
    console.log(`this is an admin ${foundUser}`)
    // Verifica si el usuario existe y si su rol es 'admin' 
    if (foundUser && foundUser.role === 'admin') {
      return next(); // Procede al siguiente middleware/manejador de ruta
    }

    return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
