import { useQuery } from 'react-apollo';
import Product from '../graphql/product.gql';



function useProductSearch({ IDs }: Props) {
  const { data, error } = useQuery<{ productsByIdentifier: QueryData[] }, QueryOpt>(Product, {
    variables: {
      values: IDs
    },
  })

  if(error) return []

  return data ? data.productsByIdentifier : [];
}

interface QueryOpt {
  values: string[];
}

interface Props {
  IDs: string[];
}

interface QueryData {
  productClusters: {
    id: string;
  }[],
  brandId: string,
  productId: string,
  categoryTree: {
    id: string
  }[]
}

export default useProductSearch;

