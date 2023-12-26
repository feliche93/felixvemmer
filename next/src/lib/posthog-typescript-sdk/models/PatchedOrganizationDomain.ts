/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PatchedOrganizationDomain = {
    readonly id?: string;
    domain?: string;
    readonly is_verified?: boolean;
    readonly verified_at?: string | null;
    readonly verification_challenge?: string;
    jit_provisioning_enabled?: boolean;
    sso_enforcement?: string;
    readonly has_saml?: boolean;
    saml_entity_id?: string | null;
    saml_acs_url?: string | null;
    saml_x509_cert?: string | null;
};

