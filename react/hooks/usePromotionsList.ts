import { useEffect, useState } from 'react';
import axios from 'axios';
import { ConfigGroupPromotions } from '../typings/config';

type PromotionListProps = {
  data: PromotionProps[];
  isLoading: boolean;
};

export type PromotionProps = {
  id: string;
  promotionName: string;
  isActive: boolean;
  amount: 'Maximun price per item' | 'Percentage';
  maxUsage: number;
  config: ConfigGroupPromotions;
};

const usePromotionsList = () => {
  const [state, setState] = useState<PromotionListProps>({
    data: [],
    isLoading: true
  });

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get<{ data: PromotionProps[] }>(
        '/_v1/private/admin-automate-price-tags/promotions'
      );

      setState({
        data: req.data.data,
        isLoading: false,
      })
    }

    fetchData();
  }, []);

  return state;
}

export default usePromotionsList;