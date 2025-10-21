if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  console.warn("⚠️ Missing Clerk publishable key — using fallback to prevent build crash");
}

export const clerkConfig = {
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_fallback",
  secretKey: process.env.CLERK_SECRET_KEY || "sk_fallback",
};
