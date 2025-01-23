import { StatusCodes } from "http-status-codes"
import Domain from "../models/domian.model.js";
import Page from "../models/page.model.js";
import Section from "../models/section.model.js";
import Content from "../models/content.model.js";

export const getWebsiteContent =  async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the domain by ID
        const domain = await Domain.findById(id);
        if (!domain) {
            return res.status(404).json({ message: 'Domain not found' });
        }

        // Fetch the pages related to the domain
        const pages = await Page.find({ domain_id: id });

        // Prepare the final result
        const result = {
            domain,
            pages: [],
        };

        // Loop through pages to get sections and their content
        for (const page of pages) {
            const sections = await Section.find({ page_id: page._id });

            const enrichedSections = await Promise.all(
                sections.map(async (section) => {
                    // Fetch the content for each section
                    const contents = await Content.find({ section_id: section._id });
                    return { ...section.toObject(), contents };
                })
            );

            result.pages.push({
                ...page.toObject(),
                sections: enrichedSections,
            });
        }

        // Respond with the aggregated data
        // res.json(result);
        return res.status(StatusCodes.OK).json({
            success:true,
            message:'Successfully get content related to this website',
            data:result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}