import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { headers } from "next/headers";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
// Disable static page generation
export const fetchCache = 'force-no-store';

interface RedirectPageProps {
    params: { shortcode: string }
}

export default async function RedirectPage({ params }: RedirectPageProps) {
    const { shortcode } = params;
    
    const url = await prisma.url.findUnique({
        where: {
            shortCode: shortcode
        },
    });

    if (!url) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">404 - URL not found</h1>
            </div>
        );
    }

    // Get request headers to check if this is a bot/crawler
    const headersList = headers();
    const userAgent = headersList.get('user-agent')?.toLowerCase() || '';
    const isBot = userAgent.includes('bot') || 
                 userAgent.includes('crawler') || 
                 userAgent.includes('spider');

    // Only increment count for non-bot visits
    if (!isBot) {
        await prisma.url.update({
            where: {
                id: url.id
            },
            data: { 
                visits: { increment: 1 }
            }
        });
    }

    redirect(url.originalUrl);
}