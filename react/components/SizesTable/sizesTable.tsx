import React, { useState, useEffect } from "react";
import { Modal } from "vtex.styleguide";
import { TableIcon } from "./Assets/Ruler";

//Context
import { useProduct } from "vtex.product-context";

import Introduction from "./sizeIntroduction";
import Table from "./table";

import styles from "./styles.css";

const requestToAPI = async (categoryId: any, brandId: any) => {
    const response = await fetch(
        `https://strapi-master-prd-eqjekncm6q-ue.a.run.app/api/sizes?populate[category][populate][vtex_categories][fields][0]=vtexId&populate[gender_info][fields][0]=name&populate[brand][fields][0]=vtexId&filters[category][vtex_categories][vtexId][$eq]=${categoryId}&filters[brand][vtexId][$eq]=${brandId}`
    );
    const data = await response.json();
    //If its empty, return an empty array
    return data.data || [];
};

const SizesTable = () => {
    const productContextValue = useProduct();
    const productBrandId = productContextValue?.product?.brandId;
    const productCategoryId = productContextValue?.product?.categoryId;

    const [sizes, setSizes] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [gender, setGender] = useState<string>("");

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        const fetchSizes = async () => {
            const sizes = await requestToAPI(productCategoryId, productBrandId);
            setSizes(sizes);
            setGender(sizes[0].attributes.gender_info.data.attributes.name);
            setLoading(false);
        };
        fetchSizes();
    }, [productCategoryId]);

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

                            <Introduction gender={gender} />
                        </section>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default SizesTable;
