const getOrderData = () => {
    return {
        code: 200,
        message: "Success",
        body: {
            orden: "9000351088",
            fecha_orden: "2022-07-29 10:20:51",
            origen: "en linea",
            canal_digital: true,
            detalle: [
                {
                    despacho: "112345",
                    articulos: [
                        {
                            sku: "0000231",
                            descripcion: "Speaker JBL",
                            price: 222789,
                            listPrice: 222569,
                            quantity: 2
                        },
                        {
                            sku: "0000001",
                            descripcion: "Samsung Smart TV",
                            price: 122789,
                            listPrice: 122569,
                            quantity: 2
                        },
                        {
                            sku: "0000001",
                            descripcion: "Samsung Smart TV",
                            price: 122789,
                            listPrice: 122569,
                            quantity: 2
                        },
                        {
                            sku: "0000001",
                            descripcion: "Samsung Smart TV",
                            price: 122789,
                            listPrice: 122569,
                            quantity: 2
                        },
                        {
                            sku: "0000001",
                            descripcion: "Samsung Smart TV",
                            price: 122789,
                            listPrice: 122569,
                            quantity: 2
                        }
                    ],
                    estados: [
                        {
                            estado: "Confirmado",
                            posicion: 1,
                            comentario: null,
                            fecha: "2022-07-29 10:55:02"
                        },
                        {
                            estado: "Facturado",
                            posicion: 2,
                            comentario: null,
                            fecha: "2022-07-29 10:58:12"
                        },
                        {
                            estado: "En preparacion ",
                            posicion: 3,
                            comentario: null,
                            fecha: "2022-07-29 11:37:11"
                        },
                        {
                            estado: "Entregado a transportista ",
                            posicion: 4,
                            comentario: null,
                            fecha: "2022-07-29 12:21:27"
                        },
                        {
                            estado: "En ruta para entrega ",
                            posicion: 5,
                            comentario: null,
                            fecha: "2022-07-29 13:21:35"
                        },
                        {
                            estado: "Entregado",
                            posicion: 6,
                            comentario: null,
                            fecha: "2022-07-29 15:25:17"
                        }
                    ]
                }
                // {
                //     despacho: "654321",
                //     articulos: [
                //         {
                //             sku: "00045464",
                //             descripcion: "Camisa Nautica"
                //         }
                //     ],
                //     estados: [
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         }
                //     ]
                // },
                // {
                //     despacho: "654321",
                //     articulos: [
                //         {
                //             sku: "00045464",
                //             descripcion: "Camisa Nautica"
                //         }
                //     ],
                //     estados: [
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         }
                //     ]
                // },
                // {
                //     despacho: "654321",
                //     articulos: [
                //         {
                //             sku: "00045464",
                //             descripcion: "Camisa Nautica"
                //         }
                //     ],
                //     estados: [
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         }
                //     ]
                // },
                // {
                //     despacho: "654321",
                //     articulos: [
                //         {
                //             sku: "00045464",
                //             descripcion: "Camisa Nautica"
                //         }
                //     ],
                //     estados: [
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         }
                //     ]
                // },
                // {
                //     despacho: "654321",
                //     articulos: [
                //         {
                //             sku: "00045464",
                //             descripcion: "Camisa Nautica"
                //         }
                //     ],
                //     estados: [
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         },
                //         {
                //             estado: "Confirmado",
                //             posicion: 1,
                //             comentario: null,
                //             fecha: "2022-07-13 10:55:02"
                //         }
                //     ]
                // }
            ]
        }
    };
};

export default getOrderData;
