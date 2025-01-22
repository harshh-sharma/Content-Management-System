import { StatusCodes } from 'http-status-codes';
import Domain from '../models/domian.model.js';

// Create a new domain
export const createDomain = async (req, res) => {
   try {
     console.log(req.body,req.user);
     
     const {id} = req.user;
     const domain = await new Domain({...req.body,user_id:id});
     await domain.save();
     
     if(!domain){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:'something went wrong'
        })
     }

     return res.status(StatusCodes.OK).json({
        success:true,
        message:'domain successfully created',
        data:domain
     })

   } catch (error) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        success:false,
        message:error?.message
     })
   }
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
export const updateDomain = async (req, res) => {
   try {
    const updatedDomain = await Domain.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(!updateDomain){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:'something went wrong'
        })
    }

    const domains = await Domain.find({});

    return res.status(StatusCodes.OK).json({
        success:true,
        message:'successfully get domains',
        data:domains
    })
   } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:error.message
    })
   }
};

// Delete a domain by ID
export const deleteDomain = (req, res) => {
    Domain.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Domain deleted successfully' }))
        .catch(err => res.status(400).json(err));
};
