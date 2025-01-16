const validateCreateContent = (req, res, next) => {
    // const { title, body } = req.body;

    // if (!title || typeof title !== 'string' || title.trim().length === 0) {
    //     return res.status(400).json({ error: "Content title is required" });
    // }

    // if (!body || typeof body !== 'string' || body.trim().length === 0) {
    //     return res.status(400).json({ error: "Content body is required" });
    // }

    next();
};


const validateGetContentById = (req, res, next) => {
    const { id } = req.params;

    // Regex pattern to validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid content ID format" });
    }

    next();
};


const validateUpdateContent = (req, res, next) => {
    const { id } = req.params;
    const { title, body } = req.body;

    // Validate content ID format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid content ID format" });
    }

    // Validate fields if present
    if (title && (typeof title !== 'string' || title.trim().length === 0)) {
        return res.status(400).json({ error: "Title cannot be empty" });
    }

    if (body && (typeof body !== 'string' || body.trim().length === 0)) {
        return res.status(400).json({ error: "Body cannot be empty" });
    }

    next();
};


const validateDeleteContent = (req, res, next) => {
    const { id } = req.params;

    // Regex pattern to validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid content ID format" });
    }

    next();
};

const validateGetContents = (req, res, next) => {
    const { page, limit } = req.query;

    if (page && (isNaN(page) || page <= 0)) {
        return res.status(400).json({ error: "Page must be a positive integer" });
    }

    if (limit && (isNaN(limit) || limit <= 0)) {
        return res.status(400).json({ error: "Limit must be a positive integer" });
    }

    next();
};


export {
    validateCreateContent,
    validateGetContents,
    validateGetContentById,
    validateDeleteContent,
    validateUpdateContent
}