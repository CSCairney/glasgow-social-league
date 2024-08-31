import React, { useEffect, useState } from 'react';
import {useAccounts} from "@/api/accounts/useAccounts";
import {Account} from "@/types/account";
import styles from './styles.module.scss';
import Image from "next/image";

interface AvatarProps {
    accountId: string;
    imageUrl?: string;
    size?: number;
    alt?: string;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
                                           accountId,
                                           imageUrl,
                                           size = 50,
                                           alt = '',
                                           className = '',
                                       }) => {
    const [account, setAccount] = useState<Account>();
    const { getAccountById } = useAccounts();

    const fetchAvatarAccountInformation = async () => {
        try {
            const account: Account = await getAccountById(accountId);
            if (account) {
                setAccount(account);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchAvatarAccountInformation();
    }, [accountId, getAccountById]);

    if (account?.profilePicture && account.name) return (
        <Image
            src={imageUrl || account?.profilePicture}
            alt={alt || `Profile picture for ${account?.name}`}
            className={className}
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                objectFit: 'cover',
            }}
        />
    );

    return (
        <div
            className={className}
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                objectFit: 'cover',
            }}
        >
            <p className={styles.fallBackName}>`${account?.name.charAt(0)}`</p>
        </div>
    )
};

export default Avatar;
