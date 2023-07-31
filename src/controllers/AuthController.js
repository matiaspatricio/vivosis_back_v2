const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { nombre, apellido, email, username, password } = req.body;

    // Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    // Encriptar la contraseña
    //const hashedPassword = await bcrypt.hash(password, 10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario con la contraseña encriptada
    const newUser = await User.create({
      nombre: nombre,
      apellido: apellido,
      email: email,
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
  } catch (error) {
    console.log('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Verificar si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      

      return res.status(401).json({ message: 'Credenciales inválidas'+ user.password+hashedPassword  });
    }

    // Generar el token JWT
    const token = generateToken(user.id);

    res.status(200).json({ token, user });
  } catch (error) {
    console.log('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const generateToken = (userId) => {
  const secretKey = 'nhbfbtyzqlfxtredtjdyrltplavzwiobkjkrlzoiistoamalclunegjpweugmizfmurdlyefopyhkbsxnltmonhgjnjhmouravmqffpaiaoybxcsdjqbzbpjqrsytbwe'; // Reemplaza con tu clave secreta
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

module.exports = { register, login };
