import styles from './styles.module.scss';
import Image from "next/image";
import clsx from "clsx";

export type PageHeaderProps = {
    height?: "Small" | "Medium" | "Large";
    image: string;
    alt: string;
    onClick?: () => void;
    overlayText?: string;
    blurImage?: boolean;
    className?: string;
}

export const PageHeader = ({ height = "Small", image, alt, onClick, overlayText, blurImage = false, className }: PageHeaderProps) => {

    const heightHandler = (height: string) => {
        switch (height) {
            case "Small":
                return "100px";
            case "Medium":
                return "250px";
            case "Large":
                return "500px";
            default:
                return "250px";
        }
    }

    return (
        <div className={clsx(styles.pageHeader, className)}>
            <Image
                src={image}
                alt={alt}
                onClick={onClick}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                    width: '100%',
                    height: `${heightHandler(height)}`,
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: blurImage ? 'blur(6px)' : 'none',
                }}
            />
            {overlayText && (
                <div className={styles.overlayText}>
                    {overlayText}
                </div>
            )}
        </div>
    )
}
