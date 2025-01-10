import Domain from '../models/Domain';

// Create a new domain
exports.createDomain = (req, res) => {
    const domain = new Domain(req.body);
    domain.save()
        .then(newDomain => res.json(newDomain))
        .catch(err => res.status(400).json(err));
};

// Get all domains
exports.getDomains = (req, res) => {
    Domain.find()
        .then(domains => res.json(domains))
        .catch(err => res.status(400).json(err));
};

// Get a domain by ID
exports.getDomainById = (req, res) => {
    Domain.findById(req.params.id)
        .then(domain => res.json(domain))
        .catch(err => res.status(400).json(err));
};

// Update a domain by ID
exports.updateDomain = (req, res) => {
    Domain.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedDomain => res.json(updatedDomain))
        .catch(err => res.status(400).json(err));
};

// Delete a domain by ID
exports.deleteDomain = (req, res) => {
    Domain.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Domain deleted successfully' }))
        .catch(err => res.status(400).json(err));
};
