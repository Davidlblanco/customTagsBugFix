import { useQuery } from 'react-apollo';
import Product from '../graphql/product.gql';



function useProductSearch({ IDs }: Props) {
  const { data } = useQuery<{ productsByIdentifier: QueryData[] }, QueryOpt>(Product, {
    variables: {
      values: IDs
    },
  })

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

