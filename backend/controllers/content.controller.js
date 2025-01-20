import { StatusCodes } from 'http-status-codes';
import Content from '../models/content.model.js';
import cloudinary from "cloudinary";

// Create content
export const createContent = async (req, res) => {
    console.log("calling manisdns");
    
    console.log("--req body--", req.body); // Text fields
    console.log("--req file--", req.file); // Uploaded file details

    const contentData = {
        section_id: req.body.section_id,
        content_type: req.body.content_type,
        content_data: {
            text: req.body.text,
            image_url: null,
            public_id: null
        }
    };

    if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {});
        console.log("result",result);
        
        if (result) {
            contentData.content_data.image_url = result.secure_url;
            contentData.content_data.public_id = result.public_id;
        }
      }
    
    const content = new Content(contentData);
    content.save()
        .then(newContent => res.json(newContent))
        .catch(err => res.status(400).json(err));
};

// Get all content
export const getContents = (req, res) => {
    Content.find()
        .then(contents => res.json(contents))
        .catch(err => res.status(400).json(err));
};

// Get content by ID
export const getContentById = (req, res) => {
    Content.findById(req.params.id)
        .then(content => res.json(content))
        .catch(err => res.status(400).json(err));
};

// Update content by ID
export const updateContent = (req, res) => {
    Content.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedContent => res.json(updatedContent))
        .catch(err => res.status(400).json(err));
};

// Delete content by ID
export const deleteContent = (req, res) => {
    Content.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Content deleted successfully' }))
        .catch(err => res.status(400).json(err));
};

export const getContentsRelatedToSection = async (req,res) => {
    try {
        const {id} = req.params;
    
        const contents = await Content.find({section_id:id});
        if(!contents){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success:false,
                message:"No contents are found",
                data:[]
            })
        }
    
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"successfully get contents",
            data:contents
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:error.message,
            data:[]
        })
    }
}
