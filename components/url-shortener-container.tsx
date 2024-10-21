"use client"
import React, { useState } from "react";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";

export default function Url() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleUrlShortened = () => {
        setRefreshKey((prev) => prev + 1);
    }
    return <div>
        <ShortenForm handleUrlShortened={handleUrlShortened}/>
        <UrlList  key={refreshKey}/>
    </div>
}