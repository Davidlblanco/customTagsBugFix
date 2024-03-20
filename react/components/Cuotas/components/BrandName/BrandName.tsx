import React from "react";
import { useQuery } from "react-apollo";
import brandNameQuery from "../../../../graphql/brandName.gql";

export default function BrandName({ id }: Props) {
   const { data } = useQuery(brandNameQuery, {
      variables: { id },
      fetchPolicy: "cache-first",
   });
   const brandName = data?.brand?.name;
   return <>{brandName}</>;
}

interface Props {
   id: string;
}
