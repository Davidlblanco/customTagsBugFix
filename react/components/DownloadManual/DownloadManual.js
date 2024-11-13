import React, { useState, useEffect, useRef } from "react";
import { fetchData } from "./dataService";
import { useRenderSession } from "vtex.session-client";
import { useProduct } from "vtex.product-context";
import "./css/global.css";

const DownloadManual = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [manuals, setManuals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
                setLoading(false);
            } catch (error) {
                setError("Error al cargar los manuales");
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

    return (
        <div className="download-container" ref={menuRef}>
            {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}
            {manuals.length > 0 && (
                <>
                    <button className="download-button" onClick={toggleMenu}>
                        Descargar manual{" "}
                        <img
                            src="https://simanqa.myvtex.com/assets/vtex.file-manager-graphql/images/1d5a073a-cc10-44ae-99ee-66833aa040d9___031ba268e468309d3c48cf0ca5694c2d.svg"
                            alt="Icono de descarga"
                            className="download-button-icon"
                        />
                    </button>

                    <div className={`manual-list ${isOpen && !loading ? "open" : ""}`}>
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
                                    <img
                                        src="https://simanqa.myvtex.com/assets/vtex.file-manager-graphql/images/62cbe7e4-aa21-40c3-add5-d3b1a4a5acff___607329912bf2e117e811809b3aed02b3.svg"
                                        alt="Icono de descarga"
                                        className="download-icon-image"
                                    />
                                </span>
                            </a>
                        ))}
                    </div>
                </>
            )}
            {loading && <p>Cargando manuales...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default DownloadManual;
