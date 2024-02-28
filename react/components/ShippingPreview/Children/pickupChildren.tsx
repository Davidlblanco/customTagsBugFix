import React, { FC, useState, ChangeEvent, useEffect, ReactNode } from "react";
import { useTabContext } from "../Context/shippingPreviewContext";
import { Spinner } from "vtex.styleguide";
import { PickupPointFiltered, Sla, PickUpCache } from "../Types/types";
import { SlasTranslator } from "../../../utils/slasTranslator";
import styles from "../shippingPreview.css";

interface PickUpChildrenProps {
    pickUpPoints: PickupPointFiltered[];
    productId: string | undefined;
    index: number;
    simulateCart: (data: SimulateCartData) => Promise<any>;
}

interface SimulateCartData {
    productId: string | undefined;
    postalCode: string;
    country: string;
    geoCoordinates: [number, number];
}

const PickUpChildren: FC<PickUpChildrenProps> = ({
    pickUpPoints,
    productId,
    index,
    simulateCart
}) => {
    const { tabCache, updateTabCache } = useTabContext<PickUpCache>();
    const [optionSelected, setOptionSelected] = useState<boolean | undefined>();
    const [currentPickupPoint, setCurrentPickupPoint] = useState<
        string | undefined
    >();
    const [shippingEstimate, setShippingEstimate] = useState<
        string | undefined
    >();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if there's cache for this tab index and update state if available
        console.log(tabCache[index]);
        if (tabCache[index]) {
            const {
                pickUpPoint,
                shippingEstimate,
                isOptionSelected
            } = tabCache[index];
            setCurrentPickupPoint(pickUpPoint);
            setShippingEstimate(shippingEstimate);
            setOptionSelected(isOptionSelected);
        }
    }, []);

    const FilterPickUpSlas = (slas: Sla[], currentPickupPointName: string) => {
        const pickUpSlas = slas.filter(
            sla => sla.deliveryChannel === "pickup-in-point"
        );
        return pickUpSlas.find(
            sla => sla.pickupStoreInfo.friendlyName === currentPickupPointName
        )?.shippingEstimate;
    };

    const FecthSimulateCart = async (pickUpPoint: PickupPointFiltered) => {
        setLoading(true);
        let localShippingEstimate: string | undefined;
        try {
            const result = await simulateCart({
                productId,
                postalCode: pickUpPoint.postalCode,
                country: pickUpPoint.country,
                geoCoordinates: pickUpPoint.geoCoordinates
            });
            const resultEstimative = FilterPickUpSlas(
                result.slas,
                pickUpPoint.friendlyName
            );
            setShippingEstimate(resultEstimative);
            localShippingEstimate = resultEstimative;
        } catch (error) {
            console.error("Error fetching simulateCart:", error);
        } finally {
            const cacheInformation = {
                pickUpPoint: pickUpPoint.friendlyName.toLowerCase(),
                shippingEstimate: localShippingEstimate,
                isOptionSelected: true
            };
            updateTabCache(index, cacheInformation);
            setLoading(false);
        }
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedPickupPoint = pickUpPoints.find(
            point => point.friendlyName.toLowerCase() === selectedValue
        );

        if (selectedPickupPoint) {
            setOptionSelected(true);
            setCurrentPickupPoint(selectedPickupPoint.friendlyName.toLowerCase());
            FecthSimulateCart(selectedPickupPoint);
        }
    };

    const RenderDeliveryMessage = () => {
      let message: ReactNode | null = null;
    
      if (optionSelected) {
        message = (
          <span className={styles.pickupMessage}>
            {shippingEstimate !== undefined ? (
              <>
                Envío listo en hasta {SlasTranslator(shippingEstimate)},
                costo de envío <strong>gratis</strong>
              </>
            ) : (
              'no hay entrega disponible'
            )}
          </span>
        );
      }
    
      return message;
    };
    

    return (
        <div className={styles.pickupChildrenContainer}>
            <label className={styles.pickupLabel} htmlFor="pickupSelect">
                Seleccione un punto de recogida:
            </label>
            <select
                className={`${styles.pickupSelect} ${
                    optionSelected
                        ? styles["option-enabled"]
                        : styles["option-disabled"]
                }`}
                name="pickupSelect"
                id="pickupSelect"
                onChange={handleSelectChange}
                value={currentPickupPoint ?? ""}
            >
                <option disabled value="">
                    Seleccione un punto de recogida
                </option>
                {pickUpPoints.map((point, index) => (
                    <option
                        key={index}
                        value={point.friendlyName.toLowerCase()}
                    >
                        {point.friendlyName.toLowerCase()}
                    </option>
                ))}
            </select>
            {loading ? (
                <div className={styles.spinnerContainer}>
                    <Spinner />
                </div>
            ) : (
                RenderDeliveryMessage()
            )}
        </div>
    );
};

export { PickUpChildren };
