import React from "react";

export default function Table<T extends { [key: string]: any }>(props: {
    sizes: T[];
}) {
    const { sizes } = props;

    return (
        <div className="size-guide-div">
            <p className="unidades-de-medida">Medidas en CM</p>
            <div className="size-guide__tables">
                {sizes.map((size: any) => {
                    return (
                        <section className="table-section" key={size.id}>
                            <h3 className="tipo-talla">
                                {size.attributes.name}
                            </h3>
                            <div className="size-table__responsive">
                                <table className="size-guide__table">
                                    <thead>
                                        <tr>
                                            {
                                                //Getting headers
                                                Object.keys(
                                                    size.attributes.table[0]
                                                ).map((key: string) => {
                                                    return (
                                                        <th
                                                            key={`th-${size.id}-${key}`}
                                                        >
                                                            {key}
                                                        </th>
                                                    );
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            //Getting rows
                                            size.attributes.table.map(
                                                (size: any) => {
                                                    return (
                                                        <tr key={size.id}>
                                                            {Object.keys(
                                                                size
                                                            ).map(
                                                                (
                                                                    key: string
                                                                ) => {
                                                                    return (
                                                                        <td
                                                                            key={`tb-${size.id}-${size[key]}`}
                                                                        >
                                                                            {
                                                                                size[
                                                                                    key
                                                                                ]
                                                                            }
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
