import axios from 'axios'
import moment from 'moment'
import { BusinessActivityData } from '../components/organisms/BusinessActivityStepper'
import { newPerson } from '../components/organisms/ConfirmOwnerConfirmDirector/hook'
import { YourDetailsData } from '../components/organisms/YourDetailsStepper'
import { countryOptions } from '../utils/constants'
import {
  OwnerDirectorDetails,
  RecipientDetails,
  TransactionDetails,
  TransferDetails,
} from '../utils/types'

const baseURL = process.env.REACT_APP_BASE_URL

export const addAccount = async (
  accountDetails: {
    email: string
    accountType: string
    countryRegistration: string
    mobileNumber: string
    password: string
  },
  yourBusinessData: {
    businessName: string
    registrationNum: string
    registrationAddr: string
    addressesList: string[]
    address: string
  },
  yourBusinessActivityData: BusinessActivityData,
  yourDetailsData: YourDetailsData
) => {
  try {
    const accountData = await axios.post(
      baseURL + 'accounts/pocketPayAccount/',
      {
        mailId: accountDetails.email,
        accountType: accountDetails.accountType.slice(0, 8),
        countryOfRegistration: countryOptions.find(
          (option) => accountDetails.countryRegistration === option.code
        )?.label,
        mobileNo: accountDetails.mobileNumber,
      }
    )
    const account = accountData.data
    const userData = await axios.post(baseURL + 'users/', {
      user: {
        firstName: yourDetailsData.firstName,
        lastName: yourDetailsData.lastName,
        dateOfBirth: yourDetailsData.enteredDate,
        countryOfResidence: yourDetailsData.countrySelected,
        pocketPayAccountId: account.id,
      },
      address: {
        homeAddress: yourDetailsData.homeAddress,
        city: yourDetailsData.city,
        postalCode: yourDetailsData.pincode,
      },
    })
    const user = userData.data
    const sizeRange = yourBusinessActivityData.businessSize.split('-')
    const addressesList: { type: string; address: string }[] = new Array()
    addressesList.push({
      type: 'REGISTERED',
      address: yourBusinessData.registrationAddr,
    })
    for (let address of yourBusinessData.addressesList) {
      addressesList.push({
        type: 'TRADING',
        address: address,
      })
    }
    await axios.post(baseURL + 'businesses/', {
      name: yourBusinessData.businessName,
      registrationNo: yourBusinessData.registrationNum,
      pocketPayAccountId: account.id,
      category: {
        type: yourBusinessActivityData.category,
      },
      subCategory: {
        type: yourBusinessActivityData.subcategory,
      },
      businessSize: {
        startingRange: sizeRange[0],
        endingRange: sizeRange[1],
      },
      businessAddresses: addressesList,
      businessPersons: [
        {
          userId: user.user.id,
          userRole: 'Manager',
        },
      ],
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getAccountInformation = async (userMail: string) => {
  try {
    const res = await axios.get(
      baseURL + `accounts/pocketPayAccount/email/${userMail}`
    )
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getBusinessInformation = async (accountId: string) => {
  try {
    const response = await axios.get(baseURL + `businesses/`).catch((error) => {
      throw error
    })
    return response.data.find(
      (data: any) => data.pocketPayAccountId === accountId
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getPersonsInBusiness = async (businessId: string) => {
  try {
    const response = await axios.get(
      baseURL + `businesses/person/${businessId}`
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getPersons = async () => {
  const response = await axios.get(baseURL + `users/`).catch((error) => {
    console.error(error)
    throw error
  })
  return response.data
}

export const getPurposes = async () => {
  try {
    const response = await axios.get(baseURL + `transactions/purposes/`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getTransactionsForAccount = async (userMail: string) => {
  let transactionsList: TransactionDetails[] = new Array()
  try {
    const account = await getAccountInformation(userMail)
    const transactions = await axios.get(
      baseURL + `transactions/transactions/account/${account.id}`
    )
    const eventLogs = await axios.get(baseURL + `transactions/eventLogs/`)
    for (let data of transactions.data) {
      const senderInfo: any = await axios.get(
        baseURL + `users/${data.senderId}`
      )
      let eventLog: any = eventLogs.data.find(
        (log: any) => log.transaction.id === data.id
      )
      const initialTimeStamp = moment(new Date(eventLog.timestamp)).toDate()
      let timeStamps: Date[] = [
        initialTimeStamp,
        moment(initialTimeStamp).add(1, 'm').toDate(),
        moment(initialTimeStamp).add(7, 'm').toDate(),
        moment(initialTimeStamp).add(317, 'm').toDate(),
        moment(initialTimeStamp).add(677, 'm').toDate(),
      ]
      const transactionStatus =
        data.transactionStatus === 'canceled'
          ? 'canceled'
          : timeStamps[4] > moment().toDate()
          ? 'inProgress'
          : 'completed'
      let transaction: TransactionDetails = {
        guaranteedRate: data.guaranteedRate,
        id: data.id,
        receiverName: data.recipient.firstName + ' ' + data.recipient.lastName,
        receivingCurrency: data.receivingCurrency.countryCode,
        receivingMoney: data.receivingAmount,
        sendingCurrency: data.sendingCurrency.countryCode,
        sendingMoney: data.sendingAmount,
        transactionFee: data.transferFee,
        transactionRefId: data.referenceNo,
        transactionStatus: transactionStatus,
        transactionTimeStamps: timeStamps,
        senderName:
          senderInfo.data.user.firstName + ' ' + senderInfo.data.user.lastName,
      }
      transactionsList.push(transaction)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
  return transactionsList
}

export const getDirectorsAndOwner = async (userMail: string) => {
  let directorsList: OwnerDirectorDetails[] = new Array()
  let ownersList: OwnerDirectorDetails[] = new Array()
  try {
    const account = await getAccountInformation(userMail)
    const business = await getBusinessInformation(account.id)
    const businessPersons = await getPersonsInBusiness(business.id)
    const persons = await getPersons()
    businessPersons.map(async (data: any) => {
      const fetchedPerson = persons.find(
        (person: any) => person.user.id === data.userId
      )
      if (fetchedPerson) {
        if (data.userRole === 'Director') {
          directorsList.push({
            id: fetchedPerson.user.id,
            firstName: fetchedPerson.user.firstName,
            lastName: fetchedPerson.user.lastName,
            dateOfBirth: fetchedPerson.user.dateOfBirth,
            countryOfResidence: fetchedPerson.user.countryOfResidence,
          })
        } else if (data.userRole === 'Owner') {
          ownersList.push({
            id: fetchedPerson.user.id,
            firstName: fetchedPerson.user.firstName,
            lastName: fetchedPerson.user.lastName,
            dateOfBirth: fetchedPerson.user.dateOfBirth,
            countryOfResidence: fetchedPerson.user.countryOfResidence,
          })
        }
      }
    })
  } catch (e) {
    console.error(e)
  }
  directorsList = directorsList.length !== 0 ? directorsList : [newPerson]
  ownersList = ownersList.length !== 0 ? ownersList : [newPerson]
  return { directorsList, ownersList }
}

export const updateTransactionDetails = async (transactionId: string) => {
  try {
    return await axios.patch(
      baseURL + `transactions/transactions/${transactionId}`,
      true,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch(error) {
    console.error(error)
    throw error
  }
}

export const getBankDetailsForAccount = async (userMail: string) => {
  let accountList = new Array()
  try {
    const account = await getAccountInformation(userMail)
    const bankAccountsRes = await axios.get(baseURL + `accounts/bankAccount/`)
    const bankAccounts = bankAccountsRes.data
    const bankAccountsForPocketPayAccount = bankAccounts.filter(
      (bankAccount: any) => bankAccount.pocketPayAccount.id === account.id
    )
    bankAccountsForPocketPayAccount.map((data: any, index: number) => {
      accountList.push({
        code: index + 1,
        label: data.accountHolderName ? data.accountHolderName : 'NA',
        cardLabel: data.accountNo
          .toString()
          .substr(data.accountNo.toString().length - 4),
      })
    })
  } catch (error) {
    console.error(error)
    throw error
  }
  return accountList
}

export const getPersonOrRecipientDetails = async (email: string) => {
  try {
    const personData = await axios.get(
      baseURL + `transactions/recipients/mailId/${email}`
    )
    const data = personData.data
    return {
      id: data.id,
      email: data.mailId,
      firstName: data.firstName,
      lastName: data.lastName,
      ifscCode: data.bankAccount.ifsc,
      accountNumber: data.bankAccount.accountNo,
      accountType: data.bankAccount.accountType,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCardsForAccount = async (userMail: string) => {
  let cardsList = new Array()
  try {
    const account = await getAccountInformation(userMail)
    const cardsData = await axios.get(
      baseURL + `accounts/card/cardsByPocketPayId?pocketPayIds=${account.id}`
    )
    cardsData.data.map((data: any, index: number) => {
      cardsList.push({
        exp_date: data.expiryDate,
        card_number: data.cardNo,
      })
    })
    return cardsList
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const addTransaction = async (
  recipientData: RecipientDetails,
  transferDetails: TransferDetails,
  purpose: string,
  email: string,
  ownersDirectorsLists: {
    directorsList: OwnerDirectorDetails[]
    ownersList: OwnerDirectorDetails[]
  },
  recipientType: string
) => {
  try {
    const accountData = await getAccountInformation(email).catch((error) => {
      throw error
    })
    const accountId = accountData.id
    const business = await getBusinessInformation(accountId)
    const personsData = await getPersonsInBusiness(business.id)
    const person = personsData.find(
      (person: any) => person.userRole === 'Manager'
    )

    if (recipientData.id === '' || recipientData.id === undefined) {
      const updateRecipientData = await axios.post(
        baseURL + 'transactions/recipients/',
        {
          firstName: recipientData.firstName,
          lastName: recipientData.lastName,
          mailId: recipientData.email,
          bankAccount: {
            accountNo: recipientData.accountNumber,
            ifsc: recipientData.ifscCode,
            accountType: recipientData.accountType,
          },
        }
      )
      recipientData.id=updateRecipientData.data.id
    }
    const transactionData = await axios.post(
      baseURL + 'transactions/transactions/',
      {
        pocketPayAccountId: accountId,
        transactionStatus: 'inProgress',
        sendingCurrency: {
          id: transferDetails.sendingCurrencyId,
        },
        receivingCurrency: {
          id: transferDetails.receivingCurrencyId,
        },
        senderId: person.userId,
        recipient: {
          id: recipientData.id,
        },
        sendingAmount: transferDetails.senderAmountBeforeDeduction,
        receivingAmount: transferDetails.receiverAmountAfterDeduction,
        guaranteedRate: transferDetails.rate,
        transferFee: transferDetails.fee,
        recipientType: recipientType,
        purpose: {
          id: purpose,
        },
        referenceNo: Math.floor(100000 + Math.random() * 900000).toString(),
      }
    )
    const transaction = transactionData.data
    await axios.post(baseURL + 'transactions/eventLogs/', {
      eventType: 'Sending',
      timestamp: new Date().toISOString(),
      transaction: {
        id: transaction.id,
      },
    })
    ownersDirectorsLists.directorsList.forEach(async (director) => {
      await addOwnerOrDirector(director, accountId, business, 'Director')
    })
    ownersDirectorsLists.ownersList.forEach(async (owner) => {
      await addOwnerOrDirector(owner, accountId, business, 'Owner')
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCurrencyDetails = async () => {
  try {
    const currencyResponse = await axios.get(
      baseURL + 'transactions/currencies/'
    )
    const currency = currencyResponse.data.map((currencyElement: any) => {
      return {
        id: currencyElement.id,
        symbol: currencyElement.countryCode,
        valueInUsd: currencyElement.valueInUsd,
        country: currencyElement.countryName,
      }
    })
    return currency
  } catch (error) {
    console.error(error)
  }
}
async function addOwnerOrDirector(
  person: OwnerDirectorDetails,
  accountId: any,
  business: any,
  type: string
) {
  try {
    if (person.id === '' || person.id === undefined) {
      const userResponse = await axios.post(baseURL + 'users/details', {
        firstName: person.firstName,
        lastName: person.lastName,
        dateOfBirth: person.dateOfBirth,
        countryOfResidence: person.countryOfResidence,
        pocketPayAccountId: accountId,
      })
      const user = userResponse.data
      await axios.post(baseURL + `businesses/person/${business.id}`, {
        userId: user.id,
        userRole: type,
      })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
