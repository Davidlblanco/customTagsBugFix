import React from "react";
import styles from "./styles.css";
interface Props {
    additionalInfo: any[];
}
export default function Introduction({ additionalInfo }: Props) {
    return (
        <section className="size-guide__introduction">
            {additionalInfo.map((item: any) => {
                return (
                    <div key={item.id} className={styles.introduction}>
                        {item.image && <img src={item.image} alt={item.name} className={styles.introductionImage} />}
                        {item.additionalInfo && <p>{item.additionalInfo}</p>}
                    </div>
                );
            })}
        </section>
    );
}
