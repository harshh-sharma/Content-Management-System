import { createDomain, deleteDomain, getDomainById, getDomains, updateDomain } from "./domain.controller.js";
import { createUser,loginUser, getUserById, getUsers, updateUser, deleteUser, updateUserRole } from "./user.controller.js";
import { createSection, deleteSection, getSectionById, getSections, updateSection } from "./section.controller.js"
import { createPage, deletePage, getPageById, getPages, updatePage,getPagesByDomain , getSectionsByPages } from "./page.controller.js";
import { createContent, deleteContent, getContentById, getContents, updateContent,getContentsRelatedToSection } from "./content.controller.js";
import { getWebsiteContent } from "./website.controller.js";

const UserController = {
    createUser,
    loginUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    updateUserRole
};

const DomainController = {
    createDomain,
    updateDomain,
    getDomainById,
    getDomains,
    deleteDomain,
}

const PageController = {
    createPage,
    getPageById,
    updatePage,
    getPages,
    deletePage,
    getPagesByDomain,
    getSectionsByPages
}

const SectionController = {
    createSection,
    updateSection,
    getSectionById,
    getSections,
    deleteSection
}

const ContentController = {
    createContent,
    getContents,
    getContentById,
    deleteContent,
    updateContent,
    getContentsRelatedToSection
    
}

const WebsiteController = {
    getWebsiteContent
}



export { UserController , DomainController , SectionController ,PageController , ContentController,WebsiteController};
