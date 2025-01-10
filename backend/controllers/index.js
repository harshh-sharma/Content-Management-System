import { createDomain, deleteDomain, getDomainById, getDomains, updateDomain } from "./domain.controller";
import { createUser, getUserById, getUsers, updateUser, deleteUser } from "./user.controller";
import { createSection, deleteSection, getSectionById, getSections, updateSection } from "./section.controller"
import { createPage, deletePage, getPageById, getPages, updatePage } from "./page.controller";
import { createContent, deleteContent, getContentById, getContents, updateContent } from "./content.controller";

const UserController = {
    createUser,
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
    deletePage
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
