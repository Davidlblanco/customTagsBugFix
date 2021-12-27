import { useCallback, useEffect, useState } from "react";
import useProduct from "vtex.product-context/useProduct";
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

export default function useGiftWrapper(attachmentName = 'Regalo') {
    const { assemblyOptions, selectedItem } = useProduct();
    const dispatch = useProductDispatch()
    const [isActive, setIsActive] = useState(false);
    const hasAttachment = !!assemblyOptions.inputValues[attachmentName];

    const toggleActive = useCallback(() => {
        setIsActive(!isActive)
    }, [isActive, setIsActive]);

    useEffect(() => {
        if (hasAttachment) {
            dispatch({
                type: 'SET_ASSEMBLY_OPTIONS',
                args: {
                    groupId: attachmentName,
                    groupInputValues: {
                        [attachmentName]: JSON.stringify({
                            sku: selectedItem?.itemId,
                            [attachmentName]: isActive
                        })
                    },
                    isValid: true,
                },
            });
        }
    }, [isActive, hasAttachment]);

    return {
        hasAttachment,
        isActive,
        toggleActive,
        setIsActive
    }
}