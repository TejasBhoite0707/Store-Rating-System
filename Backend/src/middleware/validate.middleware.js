const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.issues[0].message,
    });
  }
};

export default validate;