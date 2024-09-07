"use client";
import styles from './page.module.scss';
import { useAccounts } from "@/api/accounts/useAccounts";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {setName, setToken, setEmail, setId} from "@/redux/stores/account";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store";
import {toast} from "react-toastify";
import {Account} from "@/types/account";
import {setAvailableAccounts} from "@/redux/stores/session";

export default function Login() {
    const token = useAppSelector((state: RootState) => state.account.token);
    const { login, getAllAccounts } = useAccounts();
    const router = useRouter();
    const [email, setFormEmail] = useState<string>('');
    const [password, setFormPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const testToken = async (): Promise<void> => {
        try {
            const accounts = await getAllAccounts();
            if (accounts && accounts.length > 0) {
                dispatch(setAvailableAccounts(accounts));
                console.log("User already logged in.");
            }
        } catch (e) {
            console.error('Failed to fetch accounts', e);
            router.push('/login');
        }
    }

    useEffect(() => {
        if (token) {
            testToken();
        }
    }, [token, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await login(email, password);
            dispatch(setToken(response.token));
            dispatch(setName(response.name));
            dispatch(setEmail(response.email));
            dispatch(setId(response.id));
            toast.info("Successfully logged in!");
            router.push("/");
        } catch (err) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setFormEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setFormPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
