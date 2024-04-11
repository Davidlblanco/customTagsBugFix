import React from "react";
import { useQuery } from "react-apollo";
import categoryNameQuery from "../../../../graphql/categoryName.gql";

export default function CategoryName({ id }: Props) {
   const { data } = useQuery(categoryNameQuery, {
      variables: { id },
      fetchPolicy: "cache-first",
   });

   const name = data?.category?.name;
   return <>{name}</>;
}

interface Props {
   id: string;
}
