import React, { useEffect } from "react";

export function ToggleTheme({ dark }: { dark: boolean } ) {
  console.log(dark)

  useEffect(() => {
    dark ? document.body.classList.add('vtex-dark') : document.body.classList.remove('vtex-dark')
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
