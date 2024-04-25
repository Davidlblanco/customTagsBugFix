import React, { useEffect } from "react";

export function ToggleTheme({ dark }: { dark: boolean } ) {
  useEffect(() => {
    if (window) {
      document.body.classList.toggle('vtex-dark', dark)
    }
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
    }
  }
};
