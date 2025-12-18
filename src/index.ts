// Re-export all legal content
export {
  privacyPolicy,
  type LegalDocument as PrivacyPolicyDocument,
} from './privacy-policy';
export {
  termsAndConditions,
  type LegalDocument as TermsDocument,
} from './terms';

// Re-export the common interface
export type { LegalDocument } from './privacy-policy';
