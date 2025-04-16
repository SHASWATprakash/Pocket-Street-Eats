import React, { useState, PropsWithChildren, useEffect } from "react";
import { logError } from "@/lib/logger";

interface ErrorBoundaryProps extends PropsWithChildren {}

interface ErrorBoundaryError {
  hasError: boolean;
  error?: Error;
  componentStack?: string;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [error, setError] = useState<ErrorBoundaryError>({
    hasError: false,
    error: undefined,
    componentStack: undefined,
  });

  useEffect(() => {
    if (error.error) {
      logError(error.error, { componentStack: error.componentStack });
    }
  }, [error]);

  if (error.hasError) {
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>We're sorry, but there was an unexpected error.</p>
        {error.error && <p>Error: {error.error.message}</p>}
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
