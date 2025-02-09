const validateCreatePage = (req, res, next) => {
    const { title, content } = req.body;

    // Check if title is provided and is a valid string
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ error: "Page title is required" });
    }

    // Check if content is provided and is a valid string
    // if (!content || typeof content !== 'string' || content.trim().length === 0) {
    //     return res.status(400).json({ error: "Page content is required" });
    // }

    next();
};

const validateGetPageById = (req, res, next) => {
    const { id } = req.params;

    // Regex pattern to validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid page ID format" });
    }

    next();
};


const validateUpdatePage = (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // Validate page ID format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid page ID format" });
    }

    // Validate fields if present
    if (title && (typeof title !== 'string' || title.trim().length === 0)) {
        return res.status(400).json({ error: "Title cannot be empty" });
    }

    if (content && (typeof content !== 'string' || content.trim().length === 0)) {
        return res.status(400).json({ error: "Content cannot be empty" });
    }

    next();
};


const validateDeletePage = (req, res, next) => {
    const { id } = req.params;

    // Regex pattern to validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid page ID format" });
    }

    next();
};

const validateGetPages = (req, res, next) => {
    const { page, limit } = req.query;

    // Validate pagination parameters
    if (page && (isNaN(page) || page <= 0)) {
        return res.status(400).json({ error: "Page must be a positive integer" });
    }

    if (limit && (isNaN(limit) || limit <= 0)) {
        return res.status(400).json({ error: "Limit must be a positive integer" });
    }

    next();
};

export {
    validateCreatePage,
    validateGetPages,
    validateGetPageById,
    validateDeletePage,
    validateUpdatePage
}