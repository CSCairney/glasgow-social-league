"use client";
import {ReactNode, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store";
import useLocalStorage from "@/hooks/localStorage/useLocalStorage";
import SideNav from "@/components/common/SideNav";
import {NavbarLinks} from "@/components/common/SideNav/constants/links";

interface AuthWrapperProps {
    children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
    const { loading } = useLocalStorage();
    const router = useRouter();
    const token = useAppSelector((state) => state.account.token);

    useEffect(() => {
        if (!token && !loading) {
            router.push("/login");
        }
    }, [token, router]);

    return (
        <>
            <SideNav links={NavbarLinks.links} />
            {children}
        </>
    );
}
