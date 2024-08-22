"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store";
import useLocalStorage from "@/hooks/localStorage/useLocalStorage";
import SideNav from "@/components/common/SideNav";

interface AuthWrapperProps {
    children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
    useLocalStorage();
    const router = useRouter();
    const token = useAppSelector((state) => state.account.token);

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    return (
        <>
            <SideNav />
            {children}
        </>
    );
}
