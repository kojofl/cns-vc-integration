import {
    Affiliation,
    AffiliationJSON,
    AffiliationOrganization,
    AffiliationOrganizationJSON,
    AffiliationRole,
    AffiliationRoleJSON,
    AffiliationUnit,
    AffiliationUnitJSON,
    BirthCity,
    BirthCityJSON,
    BirthCountry,
    BirthCountryJSON,
    BirthDate,
    BirthDateJSON,
    BirthDay,
    BirthDayJSON,
    BirthMonth,
    BirthMonthJSON,
    BirthName,
    BirthNameJSON,
    BirthPlace,
    BirthPlaceJSON,
    BirthState,
    BirthStateJSON,
    BirthYear,
    BirthYearJSON,
    Citizenship,
    CitizenshipJSON,
    City,
    CityJSON,
    CommunicationLanguage,
    CommunicationLanguageJSON,
    Consent,
    ConsentJSON,
    Country,
    CountryJSON,
    DeliveryBoxAddress,
    DeliveryBoxAddressJSON,
    DisplayName,
    DisplayNameJSON,
    EMailAddress,
    EMailAddressJSON,
    FaxNumber,
    FaxNumberJSON,
    FileReference,
    FileReferenceJSON,
    GivenName,
    GivenNameJSON,
    HonorificPrefix,
    HonorificPrefixJSON,
    HonorificSuffix,
    HonorificSuffixJSON,
    HouseNumber,
    HouseNumberJSON,
    IAffiliation,
    IAffiliationOrganization,
    IAffiliationRole,
    IAffiliationUnit,
    IBirthCity,
    IBirthCountry,
    IBirthDate,
    IBirthDay,
    IBirthMonth,
    IBirthName,
    IBirthPlace,
    IBirthState,
    IBirthYear,
    ICitizenship,
    ICity,
    ICommunicationLanguage,
    IConsent,
    ICountry,
    IDeliveryBoxAddress,
    IDisplayName,
    IEMailAddress,
    IFaxNumber,
    IFileReference,
    IGivenName,
    IHonorificPrefix,
    IHonorificSuffix,
    IHouseNumber,
    IJobTitle,
    IMiddleName,
    INationality,
    IPersonName,
    IVerifiableCredential,
    IPhoneNumber,
    IPostOfficeBoxAddress,
    IProprietaryBoolean,
    IProprietaryCountry,
    IProprietaryEMailAddress,
    IProprietaryFileReference,
    IProprietaryFloat,
    IProprietaryHEXColor,
    IProprietaryInteger,
    IProprietaryJSON,
    IProprietaryLanguage,
    IProprietaryPhoneNumber,
    IProprietaryString,
    IProprietaryURL,
    IPseudonym,
    ISex,
    IState,
    IStreet,
    IStreetAddress,
    ISurname,
    IWebsite,
    IZipCode,
    JobTitle,
    JobTitleJSON,
    MiddleName,
    MiddleNameJSON,
    Nationality,
    NationalityJSON,
    PersonName,
    PersonNameJSON,
    PhoneNumber,
    PhoneNumberJSON,
    PostOfficeBoxAddress,
    PostOfficeBoxAddressJSON,
    ProprietaryBoolean,
    ProprietaryBooleanJSON,
    ProprietaryCountry,
    ProprietaryCountryJSON,
    ProprietaryEMailAddress,
    ProprietaryEMailAddressJSON,
    ProprietaryFileReference,
    ProprietaryFileReferenceJSON,
    ProprietaryFloat,
    ProprietaryFloatJSON,
    ProprietaryHEXColor,
    ProprietaryHEXColorJSON,
    ProprietaryInteger,
    ProprietaryIntegerJSON,
    ProprietaryJSON,
    ProprietaryJSONJSON,
    ProprietaryLanguage,
    ProprietaryLanguageJSON,
    ProprietaryPhoneNumber,
    ProprietaryPhoneNumberJSON,
    ProprietaryString,
    ProprietaryStringJSON,
    ProprietaryURL,
    ProprietaryURLJSON,
    Pseudonym,
    PseudonymJSON,
    Sex,
    SexJSON,
    State,
    StateJSON,
    Street,
    StreetAddress,
    StreetAddressJSON,
    StreetJSON,
    Surname,
    SurnameJSON,
    VerifiableCredential,
    VerifiableCredentialJSON,
    Website,
    WebsiteJSON,
    ZipCode,
    ZipCodeJSON
} from "./types"

// ################################################ Editable Identity Attribute Value Types ###################################################################

export module AttributeValues {
    export module Identity {
        export module Editable {
            export type Json =
                | AffiliationJSON
                | BirthDateJSON
                | BirthNameJSON
                | BirthPlaceJSON
                | CitizenshipJSON
                | CommunicationLanguageJSON
                | DeliveryBoxAddressJSON
                | DisplayNameJSON
                | EMailAddressJSON
                | FaxNumberJSON
                | FileReferenceJSON
                | JobTitleJSON
                | NationalityJSON
                | PersonNameJSON
                | PhoneNumberJSON
                | PostOfficeBoxAddressJSON
                | PseudonymJSON
                | SexJSON
                | StreetAddressJSON
                | WebsiteJSON
                | VerifiableCredentialJSON

            export type Interface =
                | IAffiliation
                | IBirthDate
                | IBirthName
                | IBirthPlace
                | ICitizenship
                | ICommunicationLanguage
                | IDeliveryBoxAddress
                | IDisplayName
                | IEMailAddress
                | IFaxNumber
                | IFileReference
                | IJobTitle
                | INationality
                | IPersonName
                | IPhoneNumber
                | IPostOfficeBoxAddress
                | IPseudonym
                | ISex
                | IStreetAddress
                | IWebsite
                | IVerifiableCredential

            export type Class =
                | Affiliation
                | BirthDate
                | BirthName
                | BirthPlace
                | Citizenship
                | CommunicationLanguage
                | DeliveryBoxAddress
                | DisplayName
                | EMailAddress
                | FaxNumber
                | FileReference
                | JobTitle
                | Nationality
                | PersonName
                | PhoneNumber
                | PostOfficeBoxAddress
                | Pseudonym
                | Sex
                | StreetAddress
                | Website
                | VerifiableCredential

            export const CLASSES = [
                Affiliation,
                BirthDate,
                BirthName,
                BirthPlace,
                Citizenship,
                CommunicationLanguage,
                DeliveryBoxAddress,
                DisplayName,
                EMailAddress,
                FaxNumber,
                FileReference,
                JobTitle,
                Nationality,
                PersonName,
                PhoneNumber,
                PostOfficeBoxAddress,
                Pseudonym,
                Sex,
                StreetAddress,
                Website,
                VerifiableCredential
            ]

            export const TYPE_NAMES = [
                "Affiliation",
                "BirthDate",
                "BirthName",
                "BirthPlace",
                "Citizenship",
                "CommunicationLanguage",
                "DeliveryBoxAddress",
                "DisplayName",
                "EMailAddress",
                "FaxNumber",
                "FileReference",
                "JobTitle",
                "Nationality",
                "PersonName",
                "PhoneNumber",
                "PostOfficeBoxAddress",
                "Pseudonym",
                "Sex",
                "StreetAddress",
                "Website",
                "VerifiableCredential"
            ] as const

            export const TYPE_NAMES_STRINGIFIED = JSON.stringify(TYPE_NAMES)
            export type TypeName = (typeof TYPE_NAMES)[number]
        }

        export module Uneditable {
            export type Json =
                | AffiliationOrganizationJSON
                | AffiliationRoleJSON
                | AffiliationUnitJSON
                | BirthCityJSON
                | BirthCountryJSON
                | BirthDayJSON
                | BirthMonthJSON
                | BirthStateJSON
                | BirthYearJSON
                | CityJSON
                | CountryJSON
                | GivenNameJSON
                | HonorificPrefixJSON
                | HonorificSuffixJSON
                | HouseNumberJSON
                | MiddleNameJSON
                | StateJSON
                | StreetJSON
                | SurnameJSON
                | ZipCodeJSON

            export type Interface =
                | IAffiliationOrganization
                | IAffiliationRole
                | IAffiliationUnit
                | IBirthCity
                | IBirthCountry
                | IBirthDay
                | IBirthMonth
                | IBirthState
                | IBirthYear
                | ICity
                | ICountry
                | IGivenName
                | IHonorificPrefix
                | IHonorificSuffix
                | IHouseNumber
                | IMiddleName
                | IState
                | IStreet
                | ISurname
                | IZipCode

            export type Class =
                | AffiliationOrganization
                | AffiliationRole
                | AffiliationUnit
                | BirthCity
                | BirthCountry
                | BirthDay
                | BirthMonth
                | BirthState
                | BirthYear
                | City
                | Country
                | GivenName
                | HonorificPrefix
                | HonorificSuffix
                | HouseNumber
                | MiddleName
                | State
                | Street
                | Surname
                | ZipCode

            export const CLASSES = [
                AffiliationOrganization,
                AffiliationRole,
                AffiliationUnit,
                BirthCity,
                BirthCountry,
                BirthDay,
                BirthMonth,
                BirthState,
                BirthYear,
                City,
                Country,
                GivenName,
                HonorificPrefix,
                HonorificSuffix,
                HouseNumber,
                MiddleName,
                State,
                Street,
                Surname,
                ZipCode
            ]

            export const TYPE_NAMES = [
                "AffiliationOrganization",
                "AffiliationRole",
                "AffiliationUnit",
                "BirthCity",
                "BirthCountry",
                "BirthDay",
                "BirthMonth",
                "BirthState",
                "BirthYear",
                "City",
                "Country",
                "GivenName",
                "HonorificPrefix",
                "HonorificSuffix",
                "HouseNumber",
                "MiddleName",
                "State",
                "Street",
                "Surname",
                "ZipCode"
            ] as const

            export const TYPE_NAMES_STRINGIFIED = JSON.stringify(TYPE_NAMES)
            export type TypeName = (typeof TYPE_NAMES)[number]
        }

        export type Json = Editable.Json | Uneditable.Json
        export type Interface = Editable.Interface | Uneditable.Interface
        export type Class = Editable.Class | Uneditable.Class
        export const CLASSES = [...Editable.CLASSES, ...Uneditable.CLASSES]
        export type TypeName = Editable.TypeName | Uneditable.TypeName
        export const TYPE_NAMES = [...Editable.TYPE_NAMES, ...Uneditable.TYPE_NAMES]
        export const TYPE_NAMES_STRINGIFIED = JSON.stringify(TYPE_NAMES)
    }

    export module Relationship {
        export type Json =
            | ProprietaryBooleanJSON
            | ProprietaryCountryJSON
            | ProprietaryEMailAddressJSON
            | ProprietaryFileReferenceJSON
            | ProprietaryFloatJSON
            | ProprietaryHEXColorJSON
            | ProprietaryIntegerJSON
            | ProprietaryLanguageJSON
            | ProprietaryPhoneNumberJSON
            | ProprietaryStringJSON
            | ProprietaryURLJSON
            | ProprietaryJSONJSON
            | ConsentJSON

        export type Interface =
            | IProprietaryBoolean
            | IProprietaryCountry
            | IProprietaryEMailAddress
            | IProprietaryFileReference
            | IProprietaryFloat
            | IProprietaryHEXColor
            | IProprietaryInteger
            | IProprietaryLanguage
            | IProprietaryPhoneNumber
            | IProprietaryString
            | IProprietaryURL
            | IProprietaryJSON
            | IConsent

        export type Class =
            | ProprietaryBoolean
            | ProprietaryCountry
            | ProprietaryEMailAddress
            | ProprietaryFileReference
            | ProprietaryFloat
            | ProprietaryHEXColor
            | ProprietaryInteger
            | ProprietaryLanguage
            | ProprietaryPhoneNumber
            | ProprietaryString
            | ProprietaryURL
            | ProprietaryJSON
            | Consent

        export const CLASSES = [
            ProprietaryBoolean,
            ProprietaryCountry,
            ProprietaryEMailAddress,
            ProprietaryFileReference,
            ProprietaryFloat,
            ProprietaryHEXColor,
            ProprietaryInteger,
            ProprietaryLanguage,
            ProprietaryPhoneNumber,
            ProprietaryString,
            ProprietaryURL,
            ProprietaryJSON,
            Consent
        ]

        export const TYPE_NAMES = [
            "ProprietaryBoolean",
            "ProprietaryCountry",
            "ProprietaryEMailAddress",
            "ProprietaryFileReference",
            "ProprietaryFloat",
            "ProprietaryHEXColor",
            "ProprietaryInteger",
            "ProprietaryLanguage",
            "ProprietaryPhoneNumber",
            "ProprietaryString",
            "ProprietaryURL",
            "ProprietaryJSON",
            "Consent"
        ] as const

        export const TYPE_NAMES_STRINGIFIED = JSON.stringify(TYPE_NAMES)
        export type TypeName = (typeof TYPE_NAMES)[number]
    }

    export type Json = Identity.Json | Relationship.Json
    export type Interface = Identity.Interface | Relationship.Interface
    export type Class = Identity.Class | Relationship.Class
    export const CLASSES = [...Identity.CLASSES, ...Relationship.CLASSES]
    export type TypeName = Identity.TypeName | Relationship.TypeName
    export const TYPE_NAMES = [...Identity.TYPE_NAMES, ...Relationship.TYPE_NAMES]
    export const TYPE_NAMES_STRINGIFIED = JSON.stringify(TYPE_NAMES)
}
