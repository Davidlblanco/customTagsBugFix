import React from "react";
import styles from "./styles.css";
export default function Table<T extends { any }>(props: {
    sizes: T[];
}) {
    const { sizes } = props;

    return (
        <div className="size-guide-div">
            <div className="size-guide__tables">
                {sizes.map((size: any) => {
                    return (
                        <section className="table-section" key={size.id}>
                            <h3 className={styles.tipoTalla}>
                                {size.title}
                            </h3>
                            <p className="description">
                                {size.description}
                            </p>
                            <div className="size-table__responsive">
                                <table className="size-guide__table">
                                    <thead>
                                        <tr>
                                            {Object.keys(size.table[0]).map((cell) => {
                                                return (
                                                    <th key={`th-${cell}`}>
                                                        {size.table[0][cell].name}
                                                    </th>
                                                );
                                            })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            size.table?.map(
                                                (sz: any) => {
                                                    return (
                                                        <tr>
                                                            {sz.map(
                                                                (szelement: any) => {
                                                                    return (
                                                                        <td key={`tb-${szelement.key}-${szelement.value}`}>
                                                                            {szelement.value}
                                                                        </td>
                                                                    );
                                                                }
                                                            )}
                                                        </tr>
                                                    );
                                                }
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
