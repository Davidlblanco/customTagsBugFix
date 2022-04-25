/* eslint-disable prettier/prettier */
import * as Yup from 'yup'
import isCnpjValid from '../../utils/isCnpjValid'
const REQUIRED_MENSAGEM = 'Campo Obrigatório'
const INVALID_PHONE_MESSAGE = 'Numero de Telefone invalido'
const INVALID_EMAIL = 'E-mail Invalido'
const INVALID_CNPJ = 'CNPJ invalido'
const INVALID_STATE = 'Selecione um estado.'

const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

export const registerSchema = Yup.object().shape({
  corporateName: Yup.string().required(REQUIRED_MENSAGEM),
  stateRegistration: Yup.string().when("taxSituation", {
    is: (val: string[]) => (val && val.length && val[0] === 'Isento' ? false : true),
    then: Yup.string().required(REQUIRED_MENSAGEM),
  }),
  tradeName: Yup.string().required(REQUIRED_MENSAGEM),
  corporateDocument: Yup.string()
    .matches(CNPJ_REGEX, INVALID_CNPJ)
    .required(REQUIRED_MENSAGEM)
    .test('isCnpjValid', INVALID_CNPJ, (value: string | undefined) =>
      isCnpjValid(value?.replace(/ |\.|\\-/g, ''))
    ),
  homePhone: Yup.string()
    .min(8, INVALID_PHONE_MESSAGE)
    .required(REQUIRED_MENSAGEM),
  firstName: Yup.string().required(REQUIRED_MENSAGEM),
  lastName: Yup.string().required(REQUIRED_MENSAGEM),
  postalCode: Yup.string().required(REQUIRED_MENSAGEM),
  email: Yup.string()
    .email(INVALID_EMAIL)
    .required(REQUIRED_MENSAGEM),
  city: Yup.string().required(REQUIRED_MENSAGEM),
  street: Yup.string().required(REQUIRED_MENSAGEM),
  number: Yup.string().required(REQUIRED_MENSAGEM),
  neighborhood: Yup.string().required(REQUIRED_MENSAGEM),
  state: Yup.string().required(REQUIRED_MENSAGEM).test('isStateValid', INVALID_STATE, (value: string | undefined) =>
    value != "Estado"
  ),
})
