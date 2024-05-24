import React, { useEffect } from "react";

interface ToggleThemeProps {
  dark: boolean;
  darkClass: string;
}

export function ToggleTheme({ dark, darkClass = 'vtex-dark' }: ToggleThemeProps ) {
  useEffect(() => {
    dark ? document.body.classList.add(darkClass) : document.body.classList.remove(darkClass)
  }, [])

  return <></>
}


ToggleTheme.schema = {
  title: 'Cambiar tema',
  type: 'object',
  properties: {
    dark: {
      title: 'dark',
      type: 'boolean',
    },
    darkClass: {
      title: 'nombre de la clase',
      type: 'string',
    }
  }
};
