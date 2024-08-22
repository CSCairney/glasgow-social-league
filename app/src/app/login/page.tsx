"use client";
import styles from './page.module.scss';
import { useAccounts } from "@/api/accounts/useAccounts";
import { useState} from "react";
import useToast from "@/hooks/notifications/useToast";
import { useRouter } from "next/navigation";
import {setToken} from "@/redux/stores/account";
import {useAppDispatch } from "@/app/store";

export default function Login() {
    const { login } = useAccounts();
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const useDispatch = useAppDispatch();

    const { showInfo, showError } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await login(email, password);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useDispatch(setToken(response.token));
            showInfo("Successfully logged in!");
            router.push("/");
        } catch (err) {
            showError('Login failed. Please check your credentials and try again.');
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
