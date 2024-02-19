
// not found routes will be display error messages
const not_Found = (req,res,next) => {
    const error = new Error (` Could not find ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err , req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = `Resource Not found `;
    };
    res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV !== 'production' ? err.stack : null
    });
};

export { errorHandler , not_Found};