import { useState } from "react";
import useProduct from "vtex.product-context/useProduct";
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

export default function useGiftWrapper(attachmentName = 'Regalo') {
    const { selectedItem } = useProduct();
    const dispatch = useProductDispatch()
    const [isActive, setIsActive] = useState(false);

    const hasAttachment = selectedItem?.attachments?.some(attachment => attachment.name == attachmentName);

    const setAttachment = (active: boolean) => {
        dispatch({
            type: 'SET_ASSEMBLY_OPTIONS',
            args: {
                groupId: attachmentName,
                groupInputValues: {
                    [attachmentName]: JSON.stringify({
                        sku: selectedItem?.itemId,
                        [attachmentName]: active
                    })
                },
                isValid: true,
            },
        });
        setIsActive(active);
    }

    const toggleAttachment = () => setAttachment(!isActive);

    return {
        hasAttachment,
        isActive,
        toggleAttachment,
        setAttachment
    }
}