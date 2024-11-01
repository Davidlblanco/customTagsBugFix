import React, { useState, useEffect } from "react";
import { referenceMap } from "./referenceMap";
import { fetchData } from "./dataService";
import { useRenderSession } from "vtex.session-client";
import { useProduct } from "vtex.product-context";
import "./css/global.css";

const Availability = () => {
    const { session } = useRenderSession();
    const accountName = session?.namespaces?.account?.accountName?.value ?? null;
    const productContextValue = useProduct();

    const referenceValue = productContextValue?.selectedItem?.referenceId?.[0]?.Value ?? null;

    const nameSeller = productContextValue?.selectedItem?.sellers?.[0]?.sellerName ?? null;

    console.log("nameSeller:", nameSeller);
    console.log("productContextValue:", productContextValue);
    console.log("accountName en Availability:", accountName);

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if (!accountName || !referenceValue) {
                console.log("accountName o referenceValue es nulo o vacío en getData");
                setData([]);
                setLoading(false);
                return;
            }

            try {
                console.log("Llamando a fetchData con accountName y referenceValue:", accountName, referenceValue);
                const result = await fetchData(accountName, referenceValue);

                // Filtrar las tiendas del referenceMap según el accountName
                let filterPrefix = "";
                switch (accountName) {
                    case "simanqa":
                        filterPrefix = "1";
                        break;
                    case "simanqagt":
                        filterPrefix = "2";
                        break;
                    case "simanqacr":
                        filterPrefix = "5";
                        break;
                    case "simanqanicor":
                        filterPrefix = "4";
                        break;
                    case "siman":
                        filterPrefix = "1";
                        break;
                    case "simanguatemala":
                        filterPrefix = "2";
                        break;
                    case "simancrc":
                        filterPrefix = "5";
                        break;
                    case "simannicor":
                        filterPrefix = "4";
                        break;
                    default:
                        filterPrefix = "";
                        break;
                }

                const availabilityMap = Object.keys(referenceMap)
                    .filter((loc) => loc.startsWith(filterPrefix)) // Filtrar por el prefijo correspondiente
                    .map((loc) => {
                        const stockItem = result.stock ? result.stock.find((item) => item.loc === loc) : null;
                        return {
                            ...referenceMap[loc],
                            availableStock: stockItem ? stockItem.availableStock : 0,
                        };
                    });

                setData(availabilityMap);
            } catch (error) {
                setError(error.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [accountName, referenceValue]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const closeModalOnBackdropClick = () => {
        setIsOpen(false);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="availability-container">
            {nameSeller && nameSeller.toLowerCase().startsWith("siman") && (
                <button className="store-availability-button" onClick={toggleModal}>
                    <img
                        src="https://simanqa.vtexassets.com/assets/vtex.file-manager-graphql/images/a0131c15-274f-40cf-992a-ce612a244bea___fab468dc6d48a22b68bc4c7ceb873ba1.svg"
                        alt="Store Icon"
                        className="store-icon"
                    />
                    Ver disponibilidad en tienda
                </button>
            )}

            <div className={`modal-backdrop ${isOpen ? "open" : ""}`} onClick={closeModalOnBackdropClick}></div>

            <div className={`modal-container ${isOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <button className="close-button" onClick={toggleModal}>
                        ×
                    </button>
                    <h2>Disponibilidad en Tiendas</h2>
                    {data.map((item, index) => (
                        <div className="store-item" key={index}>
                            <img
                                src="https://simanqa.vtexassets.com/assets/vtex.file-manager-graphql/images/8adef14e-b83b-48af-b807-0c68dfca5cb0___39f1b0b5347eaab8e976a4f54fc1cca7.svg"
                                alt="Location Icon"
                                className="location-icon"
                            />
                            <div className="store-details">
                                <p className="store-name">{item.name}</p>
                                <p
                                    className={`availability-status ${item.availableStock >= 1 ? "available" : "unavailable"
                                        }`}
                                >
                                    {item.availableStock >= 1 ? "Disponible" : "No disponible"}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="note">
                        <img
                            src="https://simanqa.vtexassets.com/assets/vtex.file-manager-graphql/images/edac95d2-a265-47b5-8800-c5394184a860___57e3e85eaa1101bf9992e8c084bcc35f.svg"
                            alt="Info Icon"
                            className="note-icon"
                        />
                        <span>La disponibilidad en tienda es una referencia y puede variar durante el día.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Availability;
