import { validateCreateUser, validateGetUsers, validateGetUserById, validateUpdateUser, validateDeleteUser, isUserAuthenticated } from "./user.middleware.js";
import { validateCreateContent,validateGetContents,validateGetContentById,validateUpdateContent,validateDeleteContent } from "./content.middleware.js";
import { validateCreateDomain, validateDeleteDomain, validateGetDomainById, validateGetDomains, validateUpdateDomain } from "./domain.middleware.js";
import { validateCreatePage, validateDeletePage, validateGetPageById, validateGetPages, validateUpdatePage } from "./page.middleware.js";
import { validateCreateSection, validateDeleteSection, validateGetSectionById, validateGetSections, validateUpdateSection } from "./section.middleware.js";




const UserMiddleware = {
    validateCreateUser,
    validateDeleteUser,
    validateGetUsers,
    validateGetUserById,
    validateUpdateUser,
    validateDeleteUser,
    isUserAuthenticated
};

const DomainMiddleware = {
    validateCreateDomain,
    validateGetDomainById,
    validateDeleteDomain,
    validateUpdateDomain,
    validateGetDomains
}

const PageMiddleware = {
    validateCreatePage,
    validateDeletePage,
    validateGetPageById,
    validateGetPages,
    validateUpdatePage
}

const SectionMiddleware = {
    validateCreateSection,
    validateDeleteSection,
    validateGetSectionById,
    validateGetSections,
    validateUpdateSection
}

const ContentMiddleware = {
    validateCreateContent,
    validateGetContents,
    validateGetContentById,
    validateUpdateContent,
    validateDeleteContent
}



export { UserMiddleware , DomainMiddleware , SectionMiddleware ,PageMiddleware , ContentMiddleware};
