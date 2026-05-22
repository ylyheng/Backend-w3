
export default function logger(req, res, next) {
    const { method, path, query } = req;
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${method} ${path} - query=${JSON.stringify(query)}`);
    next();
}
