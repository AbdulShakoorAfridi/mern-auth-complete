import jsonwebtoken from 'jsonwebtoken';


export const generateToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1hr"
    });
}
export const decodeToken = (payload) => {
    return jsonwebtoken.verify(payload, process.env.JWT_SECRET);
}

