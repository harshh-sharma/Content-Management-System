import { validateCreateUser, validateDeleteUser, validateGetUsers, validateGetUserById, validateUpdateUser, validateDeleteUser } from "./user.middleware";
import { validateCreateContent,validateGetContents,validateGetContentById,validateUpdateContent,validateDeleteContent } from "./content.middleware";
import { validateCreateDomain, validateDeleteDomain, validateGetDomainById, validateGetDomains, validateUpdateDomain } from "./domain.middleware";
import { validateCreatePage, validateDeletePage, validateGetPageById, validateGetPages, validateUpdatePage } from "./page.middleware";
import { validateCreateSection, validateDeleteSection, validateGetSectionById, validateGetSections, validateUpdateSection } from "./section.middleware";




const UserMiddleware = {
    validateCreateUser,
    validateDeleteUser,
    validateGetUsers,
    validateGetUserById,
    validateUpdateUser,
    validateDeleteUser
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
