// middleware/validator.middleware.js
export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // This should work if the schema is correctly defined
    next();
  } catch (e) {
    return res.status(400).json({ error: e.errors.map((errors)=> errors.message) });
  }
};


