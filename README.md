# @trialbasecom/legal-content

A shared npm package containing legal content (Privacy Policy and Terms and Conditions) for TrialBase projects. This package allows you to maintain consistent legal documents across multiple applications.

## 📦 Installation

### Prerequisites

To install packages from GitHub Packages, you need to authenticate with GitHub. Create a `.npmrc` file in your project root (or in your home directory) with the following content:

```
@trialbasecom:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Replace `YOUR_GITHUB_TOKEN` with a GitHub Personal Access Token (PAT) that has the `read:packages` scope.

### Installing the Package

```bash
npm install @trialbasecom/legal-content
```

or with yarn:

```bash
yarn add @trialbasecom/legal-content
```

## 🚀 Usage

### TypeScript/JavaScript

```typescript
import {
  privacyPolicy,
  termsAndConditions,
  LegalDocument,
} from '@trialbasecom/legal-content';

// Access privacy policy
console.log(privacyPolicy.title); // "Privacy Policy"
console.log(privacyPolicy.lastUpdated); // "2025-12-17"
console.log(privacyPolicy.content); // Full markdown content

// Access terms and conditions
console.log(termsAndConditions.title); // "Terms and Conditions"
console.log(termsAndConditions.lastUpdated); // "2025-12-17"
console.log(termsAndConditions.content); // Full markdown content
```

### Next.js Example

#### Using in a Page Component (App Router)

```typescript
// app/privacy/page.tsx
import { privacyPolicy } from '@trialbasecom/legal-content';
import ReactMarkdown from 'react-markdown';

export default function PrivacyPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1>{privacyPolicy.title}</h1>
      <p className='text-gray-600'>Last Updated: {privacyPolicy.lastUpdated}</p>
      <ReactMarkdown>{privacyPolicy.content}</ReactMarkdown>
    </div>
  );
}

export const metadata = {
  title: privacyPolicy.title,
  description: 'Privacy Policy for TrialBase',
};
```

#### Using in a Page Component (Pages Router)

```typescript
// pages/terms.tsx
import { termsAndConditions } from '@trialbasecom/legal-content';
import ReactMarkdown from 'react-markdown';
import { GetStaticProps } from 'next';

interface TermsPageProps {
  terms: typeof termsAndConditions;
}

export default function TermsPage({ terms }: TermsPageProps) {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1>{terms.title}</h1>
      <p className='text-gray-600'>Last Updated: {terms.lastUpdated}</p>
      <ReactMarkdown>{terms.content}</ReactMarkdown>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      terms: termsAndConditions,
    },
  };
};
```

### Gatsby Example

#### Create a Template Component

```typescript
// src/templates/legal-page.tsx
import React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';

interface LegalPageProps {
  pageContext: {
    title: string;
    lastUpdated: string;
    content: string;
  };
}

const LegalPage: React.FC<LegalPageProps> = ({ pageContext }) => {
  const { title, lastUpdated, content } = pageContext;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1>{title}</h1>
      <p className='text-gray-600'>Last Updated: {lastUpdated}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default LegalPage;
```

#### Generate Pages in gatsby-node.js

```javascript
// gatsby-node.js
const {
  privacyPolicy,
  termsAndConditions,
} = require('@trialbasecom/legal-content');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  // Create Privacy Policy page
  createPage({
    path: '/privacy',
    component: require.resolve('./src/templates/legal-page.tsx'),
    context: {
      title: privacyPolicy.title,
      lastUpdated: privacyPolicy.lastUpdated,
      content: privacyPolicy.content,
    },
  });

  // Create Terms and Conditions page
  createPage({
    path: '/terms',
    component: require.resolve('./src/templates/legal-page.tsx'),
    context: {
      title: termsAndConditions.title,
      lastUpdated: termsAndConditions.lastUpdated,
      content: termsAndConditions.content,
    },
  });
};
```

## 📝 Content Structure

Each legal document exports an object with the following structure:

```typescript
interface LegalDocument {
  title: string; // Document title
  lastUpdated: string; // Date in YYYY-MM-DD format
  content: string; // Full document content in Markdown format
}
```

### Available Documents

- **`privacyPolicy`**: Complete privacy policy with sections covering:

  - Introduction
  - Data Collection
  - Data Usage
  - Cookies and Tracking Technologies
  - Third-Party Services
  - User Rights
  - Data Security
  - Data Retention
  - Children's Privacy
  - International Data Transfers
  - Changes to Privacy Policy
  - Contact Information

- **`termsAndConditions`**: Complete terms and conditions with sections covering:
  - Agreement to Terms
  - Use License
  - User Accounts
  - Intellectual Property Rights
  - Disclaimer of Warranties
  - Limitation of Liability
  - Indemnification
  - Termination
  - Governing Law and Dispute Resolution
  - Miscellaneous
  - Contact Information

## 🔄 Updating and Publishing

### Making Changes

1. Edit the content files in `src/`:

   - `src/privacy-policy.ts` - Privacy Policy content
   - `src/terms.ts` - Terms and Conditions content

2. Update the `lastUpdated` field with the current date

3. Update the version in `package.json` following [Semantic Versioning](https://semver.org/):
   - **Patch** (1.0.x): Typo fixes, minor text updates
   - **Minor** (1.x.0): Adding new sections, significant content updates
   - **Major** (x.0.0): Major restructuring, breaking changes to the API

### Building the Package

```bash
npm run build
```

This compiles TypeScript files to JavaScript in the `dist/` folder.

### Publishing to GitHub Packages

1. Ensure you're authenticated with GitHub Packages
2. Build the package: `npm run build`
3. Publish: `npm publish`

```bash
# Example workflow
npm version patch  # or minor/major
npm run build
npm publish
```

### Updating Dependent Projects

After publishing a new version, update the package in your projects:

```bash
npm update @trialbasecom/legal-content
```

or install a specific version:

```bash
npm install @trialbasecom/legal-content@1.2.0
```

## 🛠️ Development

### Project Structure

```
legal-content/
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
├── .npmrc                # npm registry configuration
├── .gitignore           # Git ignore rules
├── README.md            # This file
├── src/
│   ├── index.ts         # Main entry point (re-exports)
│   ├── privacy-policy.ts # Privacy Policy content
│   └── terms.ts         # Terms and Conditions content
└── dist/                # Compiled output (generated)
    ├── index.js
    ├── index.d.ts
    ├── privacy-policy.js
    ├── privacy-policy.d.ts
    ├── terms.js
    └── terms.d.ts
```

### Local Development

To test changes locally before publishing:

1. In the `legal-content` package directory:

   ```bash
   npm run build
   npm link
   ```

2. In your consuming project:

   ```bash
   npm link @trialbasecom/legal-content
   ```

3. Make changes and rebuild as needed

4. When done, unlink:
   ```bash
   npm unlink @trialbasecom/legal-content
   ```

## 📄 License

MIT

## 🤝 Contributing

1. Make your changes in a feature branch
2. Update the version number appropriately
3. Update this README if needed
4. Submit a pull request

## 📞 Support

For questions or issues, please contact:

- Email: legal@trialbase.com
- GitHub Issues: [Create an issue](https://github.com/TrialBaseCom/legal-content/issues)

## 🔒 Security

If you discover a security vulnerability, please email security@trialbase.com instead of using the issue tracker.
