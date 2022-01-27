import React from 'react'
import { M3Field } from '../Fields/M3Field'
import { M3CnpjField } from '../Fields/M3CnpjField'

import styles from './SectionFormStyles.css'
import { M3CepField } from '../Fields/M3CepField'

export const LeftColumn: StorefrontFunctionComponent = () => {
  return (
    <section className={styles.sectionWrapper}>
      <M3Field name="firstName" label="Nome" />
      <M3Field name="email" label="Email" />
      <M3CnpjField name="corporateDocument" label="CNPJ" />
      <M3Field name="corporateName" label="Razão social" />
      <M3Field name="city" label="Cidade" />
      <M3Field name="street" label="Rua" />
      <M3CepField name="postalCode" label="CEP" />
    </section>
  )
}
