import PayLogo1 from '../../../assets/Payment_partner_logo-01.png'
import PayLogo2 from '../../../assets/Payment_partner_logo-02.png'
import PayLogo3 from '../../../assets/Payment_partner_logo-03.png'
import PayLogo4 from '../../../assets/Payment_partner_logo-04.png'
import PayLogo5 from '../../../assets/Payment_partner_logo-05.png'
import PayLogo6 from '../../../assets/Payment_partner_logo-06.png'
import PayLogo7 from '../../../assets/Payment_partner_logo-07.png'
import PayLogo8 from '../../../assets/Payment_partner_logo-08.png'

const paymentLogos = [
  { name: 'Visa', src: PayLogo1 },
  { name: 'Mastercard', src: PayLogo2 },
  { name: 'UnionPay', src: PayLogo3 },
  { name: 'PayPak', src: PayLogo4 },
  { name: 'Raast', src: PayLogo5 },
  { name: 'easypaisa', src: PayLogo6 },
  { name: 'JazzCash', src: PayLogo7 },
  { name: 'upaisa', src: PayLogo8 },
]

function PaymentMethods() {
  return (
    <ul className="flex items-center flex-wrap gap-x-5 gap-y-3">
      {paymentLogos.map((logo) => (
        <li key={logo.name}>
          <img
            src={logo.src}
            alt={logo.name}
            title={logo.name}
            className="h-7 md:h-8 w-auto object-contain"
          />
        </li>
      ))}
    </ul>
  )
}

export default PaymentMethods