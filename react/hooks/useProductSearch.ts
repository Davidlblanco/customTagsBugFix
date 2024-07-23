import { useQuery } from "react-apollo";
import Product from "../graphql/product.gql";
import { canUseDOM } from "vtex.render-runtime";

function useProductSearch({ IDs }: Props) {
    if (!IDs || !canUseDOM) return [];

    const { data, error } = useQuery<TData, QueryOpt>(Product, {
        variables: {
            values: IDs,
        },
    });

    if (error) return [];

    return data ? data.productsByIdentifier : [];
}

interface TData {
    productsByIdentifier: QueryData[];
}

interface QueryOpt {
    values: string[];
}

interface Props {
    IDs?: string[];
}

interface QueryData {
    productClusters: {
        id: string;
    }[];
    brandId: string;
    productId: string;
    categoryTree: {
        id: string;
    }[];
}

export default useProductSearch;
