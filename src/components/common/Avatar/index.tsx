import React, { useEffect, useState, useCallback } from 'react';
import { useAccounts } from "@/api/accounts/useAccounts";
import { Account } from "@/types/account";
import styles from './styles.module.scss';
import clsx from "clsx";
import {useAppSelector} from "@/app/store";

interface AvatarProps {
    accountId: string;
    imageUrl?: string;
    size?: number;
    alt?: string;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = React.memo(({
                                                      accountId,
                                                      imageUrl,
                                                      size = 70,
                                                      alt = '',
                                                      className = '',
                                                  }) => {
    const [account, setAccount] = useState<Account | null>(null);
    const accounts = useAppSelector(state => state.session.availableAccounts);
    const { getAccountById } = useAccounts();

    const fetchAvatarAccountInformation = useCallback(async () => {
        try {
            const account = accounts.find(
                (account: Account) => account.id === accountId
            );

            if (account) {
                setAccount(account)
            } else {
                const fetchedAccount: Account = await getAccountById(accountId);
                if (fetchedAccount && fetchedAccount !== account) {
                    setAccount(fetchedAccount);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [accountId, account]);

    useEffect(() => {
        fetchAvatarAccountInformation();
    }, [accountId]);

    if (account?.profilePicture && account.name) {
        return (
            <img
                src={imageUrl || account?.profilePicture}
                alt={alt || `Profile picture for ${account?.name}`}
                className={clsx(className, styles.container)}
                width={size}
                height={size}
            />
        );
    }

    return (
        <div
            className={clsx(className, styles.container)}
            style={{
                width: size,
                height: size,
            }}
        >
            <p className={styles.fallBackName}>{account?.name?.charAt(0)}</p>
        </div>
    );
});

// Set displayName for better debugging
Avatar.displayName = 'Avatar';

export default Avatar;
