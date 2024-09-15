import {ReactNode} from "react";
import styles from './styles.module.scss';
import clsx from "clsx";

export type GlassMorphicWrapperProps = {
    children: ReactNode;
    className?: string;
}

export const GlassMorphicWrapper = ({ children, className }:GlassMorphicWrapperProps) => {
    return (
        <div className={clsx(styles.container, className)}>
            {children}
        </div>
    )
}