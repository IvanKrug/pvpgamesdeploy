
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'


export const register = async (req, res) => {

    const { email, password, username, name } = req.body
    let role = req.body.role
    try {

        if (!role) {
            role = "user"
        }

        const passwordHash = await bcryptjs.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role,
            name
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token)
        res.json({
            message: "Tu cuenta se creo con exito!",
        })

    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            res.status(400).json({
                errorMessage: 'Ya existe una cuenta con ese correo'
            });
        } else {
            res.status(500).json({
                errorMessage: 'Ocurrió un error al crear la cuenta'
            });
        }
    }

};
export const login = async (req, res) => {

    const { email, password } = req.body

    try {


        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" })

        const isMach = await bcryptjs.compare(password, userFound.password)
        if (!isMach) return res.status(404).json({ message: "Contraseña incorrecta" })




        const token = await createAccessToken({ id: userFound._id });

        res.cookie('token', token)
        res.json({
            message: "Inicio de sesion correcto ",
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            name: userFound.name,
            role: userFound.role,
            token
        })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};
export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = (req, res) => {
    const userFound = User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "user not found" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
    });
}


