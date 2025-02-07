import React, { useState, useEffect, useRef } from "react";
import { fetchData } from "./dataService";
import { useRenderSession } from "vtex.session-client";
import { useProduct } from "vtex.product-context";
import "./css/global.css";

import downloadIcon from "./assets/images/download-icon.svg";
import manualIcon from "./assets/images/manual-icon.svg";

const DownloadManual = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [manuals, setManuals] = useState([]);
    const [loading, setLoading] = useState(false);
    const menuRef = useRef(null);

    const { session } = useRenderSession();
    const accountName = session?.namespaces?.account?.accountName?.value ?? null;
    const productContextValue = useProduct();
    const productId = productContextValue?.product?.productId ?? null;
    const referenceValue = productId;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const loadManuals = async () => {
            setLoading(true);
            try {
                const data = await fetchData(accountName, referenceValue);
                setManuals(data.files);
            } catch (error) {
                console.error("Error al cargar los manuales:", error);
            } finally {
                setLoading(false);
            }
        };

        if (accountName && referenceValue) {
            loadManuals();
        }
    }, [accountName, referenceValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading || manuals.length === 0) {
        return null;
    }

    return (
        <div className="download-container" ref={menuRef}>
            {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}
            <button className="download-button" onClick={toggleMenu}>
                Descargar manual <img src={downloadIcon} alt="Icono de descarga" className="download-button-icon" />
            </button>

            <div className={`manual-list ${isOpen ? "open" : ""}`}>
                {manuals.map((manual) => (
                    <a
                        key={manual.documentId}
                        href={manual.downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                    >
                        {manual.displayName}{" "}
                        <span className="download-icon">
                            <img src={manualIcon} alt="Icono de descarga" className="download-icon-image" />
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default DownloadManual;
