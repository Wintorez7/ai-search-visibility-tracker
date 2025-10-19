import { clerkMiddleware } from "@clerk/nextjs/server";
;

export default clerkMiddleware();

export const config = {
  matcher: [
    // Run for all routes except Next.js internals & static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
