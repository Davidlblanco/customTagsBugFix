import React, { useState } from "react";
import styles from "./styles.css";

export default function Table<T extends { any }>(props: { sizes: T[] }) {
    const { sizes } = props;
    const [hoveredColumnIndex, setHoveredColumnIndex] = useState<number | null>(null);

    return (
        <div className="size-guide-div">
            <div className="size-guide__tables">
                {sizes.map((size: any) => {
                    const headers = Object.keys(size.table[0]);
                    const headerNames = headers.map((header) => size.table[0][header].name);
                    const values = size.table.map((row: any) =>
                        headerNames.map((header) => {
                            return row.find((item: any) => item.name === header)?.value ?? "-";
                        })
                    );

                    return (
                        <section className="table-section" key={size.id}>
                            <h3 className={styles.tipoTalla}>{size.title}</h3>
                            <p className="description">{size.description}</p>
                            <div className={styles.sizeTableContainer}>
                                <div className={styles.sizeTableWrapper}>
                                    <table className={styles.sizeGuideTable}>
                                        <tbody>
                                            {headers.map((header, index) => (
                                                <tr key={`row-${header}`} style={{ borderBottom: "1px solid #BEBEBE" }}>
                                                    <th
                                                        style={{ position: "sticky", left: 0 }}
                                                        className="fixed-column"
                                                    >
                                                        {size.table[0][header].name}
                                                    </th>
                                                    {values.map((row, rowIndex) => (
                                                        <td
                                                            key={`cell-${rowIndex}-${index}`}
                                                            style={{
                                                                backgroundColor:
                                                                    hoveredColumnIndex === rowIndex
                                                                        ? "#ccc"
                                                                        : "transparent",
                                                            }}
                                                            onMouseEnter={() => setHoveredColumnIndex(rowIndex)}
                                                            onMouseLeave={() => setHoveredColumnIndex(null)}
                                                        >
                                                            {row[index]}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
