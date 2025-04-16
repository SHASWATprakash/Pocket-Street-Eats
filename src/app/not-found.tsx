// src/app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link href="/" className="text-primary hover:underline text-lg">
        Go back home →
      </Link>
    </div>
  );
}
