import {GlassMorphicWrapper} from "@/components/common/GlassMorphicWrapper";
import styles from './styles.module.scss';
import Avatar from "@/components/common/Avatar";
import {useAppSelector} from "@/app/store";
import clsx from "clsx";

export type WelcomeHeroProps = {
    className?: string;
}

export const WelcomeHero = ({ className }:WelcomeHeroProps) => {
    const account = useAppSelector(state => state.account);

    return (
        <GlassMorphicWrapper className={clsx(styles.container, className)}>
            <div className={styles.content}>
                {account.id && <Avatar accountId={(account.id).toString()} size={100} className={styles.avatar}/>}
                <div>
                    <h1>Welcome! {account.name}</h1>
                </div>
            </div>
        </GlassMorphicWrapper>
    )
}