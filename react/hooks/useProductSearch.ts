import { useQuery } from 'react-apollo';
import Product from '../graphql/product.gql';



function useProductSearch({ IDs }: props) {
  const { data } = useQuery<{ productsByIdentifier: queryData[] }, queryOpt>(Product, {
    variables: {
      values: IDs
    },
  })


  console.log("Retornando data ", data);

  return data ? data.productsByIdentifier : [];
}

interface queryOpt {
  values: string[];
}

interface props {
  IDs: string[];
}

interface queryData {
  productClusters: {
    id: string;
  }[],
  brandId: string,
  productId: string
}

export default useProductSearch;

