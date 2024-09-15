import styles from './styles.module.scss';
import { IconType } from "react-icons";
import clsx from "clsx";

export type IconProps = {
    onClick?: () => void;
    className?: string;
    type?: IconType;
    fallbackSize?: boolean;
    disabled?: boolean;
}

export const Icon = ({ onClick, className, type, fallbackSize = false, disabled = false }: IconProps) => {
    if (type) {
        const IconComponent = type;
        return (
            <button
                className={clsx(styles.button, className, { [styles.fallbackSize]: fallbackSize, [styles.disabled]: disabled })}
                onClick={!disabled ? onClick : undefined}
                disabled={disabled}
            >
                <IconComponent />
            </button>
        );
    }

    return null;
};
