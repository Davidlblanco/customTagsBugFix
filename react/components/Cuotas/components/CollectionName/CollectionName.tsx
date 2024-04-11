import React from "react";
import { useQuery } from "react-apollo";
import collectionNameQuery from "../../../../graphql/collectionName.gql";

export default function CollectionName({ id }: Props) {
   const { data } = useQuery(collectionNameQuery, {
      variables: { id },
      fetchPolicy: "cache-first",
   });

   const name = data?.collection?.name;
   return <>{name}</>;
}

interface Props {
   id: string;
}
