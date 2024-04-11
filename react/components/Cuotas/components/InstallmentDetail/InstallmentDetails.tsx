// import React from "react";
// import styles from "./styles.css";
// // import Cero from "../../assets/svgs/CeroInteres.svg";
// import { InstallmentResult } from "../../Logic/PaymentCustomValidators";
// import InstallmentRuleMessage from "../InstallmentRuleMessage/InstallmentRuleMessage";
// import InstallmentMinimunPrice from "../InstallmentMinimunPrice/InstallmentMinimunPrice";
// import { FormattedCurrency } from "vtex.format-currency";

// export default function InstallmentDetails({ installment }: Props) {
//     return (
//         <div className={styles.ContainerPayment}>
//             {/* <img src={Cero as unknown as string} alt="Cero" /> */}
//             <p className={styles.OtherPaymentsSubtitle}>
//                 <InstallmentRuleMessage installment={installment} />
//                 <FormattedCurrency value={installment.installmentPrice / 100} />
//                 <br />
//                 <InstallmentMinimunPrice installment={installment} />
//             </p>
//         </div>
//     );
// }
