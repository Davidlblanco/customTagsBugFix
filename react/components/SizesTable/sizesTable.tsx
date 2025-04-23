import React, { useState, useEffect } from "react";
import { Modal } from "vtex.styleguide";
import { TableIcon } from "./Assets/Ruler";
import { useProduct } from "vtex.product-context";
import Introduction from "./sizeIntroduction";
import Table from "./table";
import styles from "./styles.css";
import axios from "axios";

const requestToAPI = async (categoryId: any, brandId: any) => {
    const response = await axios.post(`/_v/sizes-table/table/params`, [
        {
            param: "category",
            value: categoryId as string,
        },
        {
            param: "brand",
            value: brandId + "",
        },
    ]);
    if (!response) {
        throw new Error("Error fetching data from API");
    }
    if (response.status !== 200) {
        throw new Error("Error fetching data from API");
    }
    const data = await response.data;
    return data || [];
};

const SizesTable = () => {
    const productContextValue = useProduct();
    const productBrandId = productContextValue?.product?.brandId;
    const productCategoryId = productContextValue?.product?.categoryId;

    const [sizes, setSizes] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        const fetchSizes = async () => {
            const sizes = await requestToAPI(productCategoryId, productBrandId);
            setSizes(sizes);
            setLoading(false);
        };
        fetchSizes();
    }, [productCategoryId, productBrandId]);

    if (loading) {
        return null;
    } else if (sizes.length === 0) {
        return null;
    } else {
        return (
            <div className={styles.tablaDeTallas} id="sizes-table">
                <button className={styles.sizesBtn} onClick={handleShowModal}>
                    <TableIcon />
                    Guía de tallas
                </button>

                <Modal
                    centered
                    isOpen={showModal}
                    onClose={handleShowModal}
                    responsiveFullScreen={true}
                    className={styles.modalTabla}
                >
                    <div className={styles.guiaTablas}>
                        <h1 className="size-guide-title__mb">Guía de tallas</h1>
                        <section className={styles.sizeGuide}>
                            <Table sizes={sizes} />
                            <Introduction additionalInfo={sizes} />
                        </section>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default SizesTable;
