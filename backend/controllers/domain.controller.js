import { StatusCodes } from 'http-status-codes';
import Domain from '../models/domian.model.js';

// Create a new domain
export const createDomain = (req, res) => {
    console.log(req.body,req.user);
    
    const {id} = req.user;
    const domain = new Domain({...req.body,user_id:id});
    domain.save()
        .then(newDomain => res.json(newDomain))
        .catch(err => res.status(400).json(err));
};

// Get all domains
export const getDomains = (req, res) => {
    Domain.find()
        .then(domains => res.json(domains))
        .catch(err => res.status(400).json(err));
};

// Get a domain by ID
export  const getDomainById = async (req, res) => {

    const domains = await Domain.findById(req.params.id);
    if(!domains){
        return res.status(StatusCodes.NOT_FOUND).json({
            success:false,
            message:'Domain not found'
        })
    }

    return res.status(StatusCodes.OK).json({
        success:true,
        message:'Successfully gets domains',
        data:domains
    })
};

// Update a domain by ID
export const updateDomain = (req, res) => {
    Domain.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedDomain => res.json(updatedDomain))
        .catch(err => res.status(400).json(err));
};

// Delete a domain by ID
export const deleteDomain = (req, res) => {
    Domain.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Domain deleted successfully' }))
        .catch(err => res.status(400).json(err));
};
