import { User } from "../../models/user.model.js";

export const isAdmin = async(req, res, next) => {

    console.log(req.user);
    const id = req.user.id;

    const role = await User.findById(id).select('role');
    console.log(role, 'role in isAdmin middleware');
    
    // next();

    if (req.user && role.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
};
