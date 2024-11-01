import React from "react";
import { ConfigGroup } from "../typings/config";
import { UseConfigs } from "../hooks/useConfigs";

const initialData = {
  data: [],
  isLoading: true,
};

const Context = React.createContext<ContextData>(initialData);

export function CustomTagConfigsContextProvider({ children }: Props) {
  const data = UseConfigs();
  return <Context.Provider value={data}>{children}</Context.Provider>;
}

export function useCustomTagConfigs() {
  return React.useContext(Context);
}

interface Props {
  readonly children: React.ReactNode;
}

interface ContextData {
  data: ConfigGroup[];
  isLoading: boolean;
}
