// src/lib/logger.ts

interface ErrorInfo {
  componentStack?: string;
}

export const logError = (error: any, errorInfo?: ErrorInfo) => {
  console.error("An error occurred:", error);
  if (errorInfo) {
    console.error("Error info:", errorInfo);
  }
};
