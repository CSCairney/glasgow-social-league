import styles from './styles.module.scss';
import Image from "next/image";
import '../../../../public/sports/badminton/badminton-header.png'

export type PageHeaderProps = {
    height?: "Small" | "Medium" | "Large";
    image: string;
    alt: string;
    onClick?: () => void;
}

export const PageHeader = ({ height = "Small", image, alt, onClick }: PageHeaderProps) => {

    const heightHandler = (height: string) => {
        switch (height) {
            case "Small":
                return "100px";
            case "Medium":
                return "250px";
            case "Large":
                return "500px";
        }
    }


    return (
        <div className={styles.pageHeader}>
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
                }}
            />
        </div>
    )
}
