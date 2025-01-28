import { useEffect, useState } from 'react';
import axios from 'axios';
import { ConfigGroupPromotions } from '../typings/config';

export type PromotionProps = {
    id: string;
    promotionName: string;
    isActive: boolean;
    amount: 'Maximum price per item' | 'Percentage';
    maxUsage: number;
    config: ConfigGroupPromotions;
};

type PromotionListState = {
    data: PromotionProps[] | null;
    isLoading: boolean;
    error: string | null;
};

const useSimulationAutomatePriceTag = (session: any, account: any, workspace: any, productValues: { skuId?: string, sellerId?: string }) => {
    const [state, setState] = useState<PromotionListState>({
        data: null,
        isLoading: false,
        error: null,
    });

    const generateBaseUrlToSV = (account: string, workspace: string) => {
        let host = `${workspace ?? ''}--${account}`;
        const isSVAccount = account === 'siman' || account === 'simanqa';

        if (!isSVAccount) {
            host = account.includes('qa') ? 'hu123--simanqa' : 'hu123--siman';
        } // TODO: remover "hu123--"

        return `https://${host}.myvtex.com`;
    };


    const salesChannelId = session?.namespaces?.store?.channel?.value;

    const baseUrl = generateBaseUrlToSV(account, workspace);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${baseUrl}/_v/admin-automate-price-tags/${productValues?.skuId}/${salesChannelId}/${productValues?.sellerId}`;
            try {
                const response = await axios.get<PromotionProps[]>(url);
                setState({ data: response?.data, isLoading: false, error: null });
                console.log('aqui', response?.data)
            } catch (error) {
                console.error(error);
                setState({
                    data: null,
                    isLoading: false,
                    error: 'Failed to fetch promotions.',
                });
            }
        };
        if (productValues && salesChannelId) {
            fetchData();
        }
    }, [productValues.skuId, salesChannelId, baseUrl]);

    return state;
};

export default useSimulationAutomatePriceTag;