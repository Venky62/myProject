export interface OwnerDirectorDetails {
  id?: string
  firstName: string
  lastName: string
  dateOfBirth: Date | null
  countryOfResidence: string | null
}

export interface RecipientDetails {
  id?: string,
  email: string
  firstName: string
  lastName: string
  ifscCode: string
  accountNumber: number | null
  accountType: string
}

export interface TransactionTimeDetailsRow {
  content: string
  statusInTimeline: 'pending' | 'completed' | 'inProgress' | ''
  timeString: string
}

export interface TransactionDetails {
  id:string,
  transactionStatus: 'inProgress' | 'completed' | 'canceled'
  transactionTimeStamps: Date[]
  sendingCurrency: string
  receivingCurrency: string
  senderName: string
  receiverName: string
  transactionFee: number
  sendingMoney: number
  receivingMoney: number
  guaranteedRate: number
  transactionRefId: number
}

export interface TransferDetails {
  senderAmountBeforeDeduction: number | null
  receiverAmountAfterDeduction: number | null
  fee: number
  senderAmountAfterDeduction: number
  sendingCurrency: string
  sendingCurrencyId?:string
  receivingCurrencyId?:string
  recipientCurrency: string
  rate: number
}

export interface StepData {
  label: string
  content: JSX.Element
}


export interface Money {
  value: string
  currencyCode: string
}

export interface AmountStepperData {
  senderMoney: Money
  receipientMoney: Money
  guaranteedRate: string
}

export interface StepDataBusiness {
  label: string
  content: JSX.Element
}

export interface CurrencyDetails {
  id?:string
  symbol: string
  worth_in_usd: number
  country: string
}

