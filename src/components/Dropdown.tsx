"use client";

import Image from "next/image";
import {useState} from 'react'

interface Iprops {
    isOpen?: boolean;
    label: string;
    children_count: number;
    children: React.ReactNode
}

export default function Dropdown (
    {isOpen, label, children_count, children} : Iprops
) {
    const [open, setOpen] = useState<boolean>(isOpen || false);

    const toggle = () => setOpen(!open)

    return (
        <div 
        className={`h-auto w-full flex flex-col items-start justify-start space-y-1`}>
            <div className="h-auto w-full flex items-center justify-start space-x-2 cursor-pointer">
                {/* icon */}
                <div 
                onClick={toggle}
                className="h-7 w-7 bg-transparent flex items-center justify-center position relative overflow-hidden flex items-center justify-center cursor-pointer rounded-md hover:bg-gray-100 transition-all duration-500">
                    <Image
                    fill
                    className={`h-full w-full object-cover transform transition-all duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
                    alt="cancel icon"
                    src={"/assets/icons/chevron-right.svg"}
                    />
                </div>
                {/* label */}
                <h3 className="text-sm font-semibold text-[#1F2020]">{label}</h3>
                {/* total child items */}
                <p className="text-sm font-medium text-[#737474]">{`[${children_count} items]`}</p>
            </div>

            {/* children */}
            <div className={`pl-9 ${open ? 'h-auto overflow-hidden visible py-2 before:h-full' : 'h-0 overflow-hidden invisible before:h-auto'} w-full flex flex-col items-start justify-start space-y-3 transition-all duration-100 before:absolute before:w-[2px] before:bg-[#ECEDED] before:top-2 before:left-3 position relative`}>
                {children}
            </div>
        </div>
    );
}