'use client';

import { ModeToggle } from "./mode-toggle";

interface NavbarProps {
    title: string;
}

export default function Navbar({ title }: NavbarProps) {
    return (
        <nav className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            {/* <div className="flex items-center space-x-4">
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div> */}
            <ModeToggle />
        </nav>
    );
}