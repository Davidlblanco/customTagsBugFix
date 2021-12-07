/* eslint-disable prettier/prettier */
import axios from 'axios';
import { FormFields } from './B2bForm'

export default async function saveData({
  corporateName,
  stateRegistration,
  tradeName,
  corporateDocument,
  homePhone,
  firstName,
  lastName,
  postalCode,
  email,
  city,
  street,
  number,
  neighborhood,
  state,
  taxSituation
}: FormFields) {
  const modifiedStateRegistration = taxSituation[0] == 'Isento' ? taxSituation[0] : stateRegistration;

  
  const clientData = {
    isCorporate: true,
    isNewsletterOptIn: true,
    homePhone,
    firstName,
    lastName,
    email,
    tradeName,
    corporateName,
    stateRegistration: modifiedStateRegistration,
    corporateDocument,
  }

  try {
    const res = await axios.post("/v1/register/createUser", {
        clientData,
    });

    const addressData = {
      addressName: 'Endereço de entrega principal',
      addressType: 'commercial',
      country: 'BRA',
      receiverName: `${firstName} ${lastName}`,
      postalCode,
      street,
      number,
      ReferenceError,
      neighborhood,
      city,
      state,
      userId: res.data.userId,
    }
  
    const data = await axios.post("/v1/register/createAddress", {
      addressData,
    });

    return ({status: data.status, message: data.statusText});
  } catch (err) {
    if (axios.isAxiosError(err))  {
        // Access to config, request, and response;

        return ({status: err.response?.status , message: err.response?.data.message});

    } else {

      return ({status: err.status, message: err.statusText});
    }
  }

  
}
