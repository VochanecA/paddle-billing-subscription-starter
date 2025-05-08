'use client';

import { Suspense } from 'react';
import { UpdatePasswordForm } from '@/components/authentication/update-password-form';

function Loading() {
  return <div>Loading...</div>;
}

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <UpdatePasswordForm />
    </Suspense>
  );
}
