exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ error: err.msg });
    } else {
      next(err);
    }
  };
  
  exports.handleServerErrors = (err, req, res, next) => {
    
  
    if (err.code === "23503") {
      res.status(404).json({ error: "Article not found" });
    } else if (err.code === "23502") {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };