// Test endpoint to verify NextAuth API is accessible
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "NextAuth API is accessible",
    timestamp: new Date().toISOString(),
  });
}


