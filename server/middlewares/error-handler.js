module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    
    console.error(`Error message: ${err.message}`);
    
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ data: { errors: err+' :-(' }});
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ data: { errors: err.message+' :-((' }});
    }

    if (err.name === 'OutlookAuthError') {
        // Outlook validation error
        return res.status(400).json({ data: { errors: err.message+' :-((' }});
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ data: { errors: 'Invalid Token' }});
    }
    if (err.name === 'not found'){
        // 404 not found
        return res.status(404).json({ data: { errors: 'Not Found'}});
    }

    // default to 500 server error
    return res.status(500).json({ data: { errors: err.message }});
}