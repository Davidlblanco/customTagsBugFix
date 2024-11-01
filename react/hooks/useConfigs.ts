import { useEffect, useState } from "react";
import { ConfigGroup } from "../typings/config";
import axios from "axios";

export function UseConfigs() {
  const [state, setState] = useState<StateData>({ data: [], isLoading: true });
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get<ConfigGroup[]>(
        "/_v/admin-custom-tags/config"
      );
      setState({
        data: req.data,
        isLoading: false,
      });
    }
    fetchData();
  }, []);
  return state;
}

interface StateData {
  data: ConfigGroup[];
  isLoading: boolean;
}
