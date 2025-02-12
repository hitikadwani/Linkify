import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { notFound } from "next/navigation";

interface RedirectPageProps {
    params: { shortcode: string }
}

export default async function RedirectPage({ params }: RedirectPageProps) {
    const { shortcode } = params;
    
    try {
        const url = await prisma.url.findUnique({
            where: {
                shortCode: shortcode
            },
        });

        if (!url) {
            notFound();
        }

        
        await prisma.url.update({
            where: {
                id: url.id
            },
            data: { visits: { increment: 1 } }
        });

        // Make sure the URL has a protocol
        const redirectUrl = url.originalUrl.startsWith('http') 
            ? url.originalUrl 
            : `https://${url.originalUrl}`;

        
        //@ts-expect-error to ignore push mentioned down
        redirect(redirectUrl, 'push');
        
    } catch (error) {
        console.error('Error processing redirect:', error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Error</h1>
                    <p>There was an error processing your request.</p>
                </div>
            </div>
        );
    }
}


export const dynamic = 'force-dynamic';