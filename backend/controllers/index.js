import { createDomain, deleteDomain, getDomainById, getDomains, updateDomain } from "./domain.controller.js";
import { createUser,loginUser, getUserById, getUsers, updateUser, deleteUser } from "./user.controller.js";
import { createSection, deleteSection, getSectionById, getSections, updateSection } from "./section.controller.js"
import { createPage, deletePage, getPageById, getPages, updatePage,getPagesByDomain } from "./page.controller.js";
import { createContent, deleteContent, getContentById, getContents, updateContent } from "./content.controller.js";

const UserController = {
    createUser,
    loginUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
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
    getPagesByDomain
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
    updateContent
}



export { UserController , DomainController , SectionController ,PageController , ContentController};
