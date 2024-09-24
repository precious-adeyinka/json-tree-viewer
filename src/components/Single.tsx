"use client"

import { useState } from "react";

interface IProps {
    label: string;
    value: string;
    jsonPath: string | undefined;
}

export default function Single ({
    label, 
    value,
    jsonPath
}: IProps) {
    const [copyText, setCopyText] = useState<string>("Create column");

    // Copy to clipboard functionality
    const copyToClipboard = (path: string) => {
        navigator.clipboard.writeText(path);
        setCopyText("Copied!")
        setTimeout(() => {
            setCopyText("Create column")
        }, 2000)
    };

    return (
        <div className="h-auto w-full flex items-start justify-start space-x-2 cursor-pointer position relative group">
            <div className="max-h-5 min-h-5 min-w-5 max-w-8 bg-blue-100 flex items-center justify-center position relative overflow-hidden flex items-center justify-center cursor-pointer ring-2 ring-blue-300 rounded-md">
                <svg 
                xmlns="http://www.w3.org/2000/svg"  
                width="17"  
                height="17"  
                viewBox="0 0 24 24"  
                fill="none"  
                stroke="currentColor"  
                stroke-width="2"  
                stroke-linecap="round"  
                stroke-linejoin="round"  
                className="icon icon-tabler icons-tabler-outline icon-tabler-letter-t text-blue-500"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 4l12 0" /><path d="M12 4l0 16" />
                </svg>
            </div>

            <h3 className="text-sm font-semibold text-[#1F2020]">{label}</h3>
            
            <p className="max-w-full text-sm font-medium text-[#737474] whitespace-wrap leading-snug">{value}</p>


            {/* create column */}
            <div 
            onClick={() => copyToClipboard(jsonPath || "")}
            className="h-auto w-auto py-3 px-4 bg-transparent rounded-md position absolute -top-4 right-0 hidden group-hover:flex transition-all duration-300 items-center justify-end space-x-2 z-40">
                <div className="p-1 bg-white flex items-center justify-center position relative overflow-hidden flex items-center justify-center cursor-pointer border-2 border-gray-300 rounded-md shadow-sm p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-gray-700">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                    </svg>
                </div>
                <div className="p-1 bg-white flex items-center justify-center flex items-center justify-center rounded-md text-sm text-gray-700 shadow-sm border border-gray-100">
                   {copyText}
                </div>
            </div>
        </div>
    );
}