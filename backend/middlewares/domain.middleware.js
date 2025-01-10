const validateCreateDomain = (req, res, next) => {
    const { name, url } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: "Domain name is required" });
    }

    if (!url || typeof url !== 'string' || !/^https?:\/\/[^\s]+$/.test(url)) {
        return res.status(400).json({ error: "Valid domain URL is required" });
    }

    next();
};

const validateGetDomainById = (req, res, next) => {
    const { id } = req.params;

    // Regex pattern to validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid domain ID format" });
    }

    next();
};

const validateUpdateDomain = (req, res, next) => {
    const { id } = req.params;
    const { name, url } = req.body;

    // Validate user ID
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid domain ID format" });
    }

    // Validate fields if present
    if (name && (typeof name !== 'string' || name.trim().length === 0)) {
        return res.status(400).json({ error: "Domain name cannot be empty" });
    }

    if (url && (typeof url !== 'string' || !/^https?:\/\/[^\s]+$/.test(url))) {
        return res.status(400).json({ error: "Valid domain URL is required" });
    }

    next();
};

const validateDeleteDomain = (req, res, next) => {
    const { id } = req.params;

    // Regex pattern to validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ error: "Invalid domain ID format" });
    }

    next();
};

const validateGetDomains = (req, res, next) => {
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
    validateCreateDomain,
    validateGetDomains,
    validateUpdateDomain,
    validateGetDomainById,
    validateDeleteDomain
}

