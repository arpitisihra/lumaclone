// src/app/verifyAccount/page.tsx
// This page now acts as a server component that renders a client component within a Suspense boundary.

import { Suspense } from 'react';
import VerifyAccountClient from './VerifyAccountClient'; // Import the new client component

const VerifyAccountPageWrapper: React.FC = () => {
  return (
    // Wrap the client component with Suspense.
    // The fallback will be shown while the client component is loading (e.g., during SSR hydration).
    <Suspense fallback={<div>Loading verification...</div>}>
      <VerifyAccountClient />
    </Suspense>
  );
};

export default VerifyAccountPageWrapper;
