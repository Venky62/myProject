import React from 'react'
import 'jest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  addAccount,
  getPersons,
  getPersonOrRecipientDetails,
  getPersonsInBusiness,
  getAccountInformation,
  getBusinessInformation,
  getTransactionsForAccount,
  getPurposes,
  getDirectorsAndOwner,
  updateTransactionDetails,
  getBankDetailsForAccount,
  getCardsForAccount,
  addTransaction,
  getCurrencyDetails,
} from './library'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const accounts = {
  data: [
    {
      id: '0c84bc30-c310-47af-bcad-0c50342b39cf',
      mailId: 'ross.chandler@gmail.com',
      accountType: 'Business',
      countryOfRegistration: 'United Kingdom',
      mobileNo: '+44 020 7947 6330',
    },
  ],
}

const account = {
  data: {
    id: '0c84bc30-c310-47af-bcad-0c50342b39cf',
    mailId: 'ross.chandler@gmail.com',
    accountType: 'Business',
    countryOfRegistration: 'United Kingdom',
    mobileNo: '+44 020 7947 6330',
  },
}

const persons = {
  data: [
    {
      user: {
        id: '0c84bc30-c310-47af-bcad-0c50342b39cf',
        firstName: 'Ross',
        lastName: 'Gener',
        dateOfBirth: '09/19/1998',
        countryOfResidence: 'United Kingdom',
        pocketPayAccountId: '0c84bc30-c310-47af-bcad-0c50342b39cf',
      },
      address: {
        homeAddress: '43 Bishopthorpe Road',
        city: 'Pencoed',
        postalCode: 'CF357R',
      },
    },
  ],
}
const person = {
  data: {
    user: {
      id: '0c84bc30-c310-47af-bcad-0c50342b39cf',
      firstName: 'Ross',
      lastName: 'Gener',
      dateOfBirth: '09/19/1998',
      countryOfResidence: 'United Kingdom',
      pocketPayAccountId: '0c84bc30-c310-47af-bcad-0c50342b39cf',
    },
    address: {
      homeAddress: '43 Bishopthorpe Road',
      city: 'Pencoed',
      postalCode: 'CF357R',
    },
  },
}

const business = {
  data: {
    id: '0c84bc30-c310-47af-bcad-0c50342b39cf',
    name: 'Zentech Solutions Pvt Ltd',
    registrationNo: '2020ZEN5367GJ',
    pocketPayAccountId: '0c84bc30-c310-47af-bcad-0c50342b39cf',
    category: {
      type: 'Real estate or construction',
    },
    subCategory: {
      type: 'Real estate sale, purchase and management',
    },
    businessSize: {
      startingRange: 50,
      endingRange: 100,
    },
    businessAddresses: {
      type: 'REGISTERED',
      address:
        '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
    },
    businessPersons: [
      {
        userId: '0c84bc30-c310-47af-bcad-0c50342b39cf',
        userRole: 'Manager',
      },
    ],
  },
}

const businesses = {
  data: [
    {
      id: '0c84bc30-c310-47af-bcad-0c50342b39cf',
      name: 'Zentech Solutions Pvt Ltd',
      registrationNo: '2020ZEN5367GJ',
      pocketPayAccountId: '0c84bc30-c310-47af-bcad-0c50342b39cf',
      category: {
        type: 'Real estate or construction',
      },
      subCategory: {
        type: 'Real estate sale, purchase and management',
      },
      businessSize: {
        startingRange: 50,
        endingRange: 100,
      },
      businessAddresses: {
        type: 'REGISTERED',
        address:
          '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
      },
      businessPersons: [
        {
          userId: '0c84bc30-c310-47af-bcad-0c50342b39cf',
          userRole: 'Manager',
        },
      ],
    },
  ],
}

const purposes = {
  data: [
    {
      id: '7cb9104b-170f-447c-95f2-1a83ad5264c0',
      purposeType: 'Paying rent, utilities or property charges',
    },
  ],
}
const recipient = {
  data: {
    id: '18f1cfb1-27c3-40df-bc10-55e34435bc0e',
    firstName: 'Matin',
    lastName: 'Gabriel',
    mailId: 'martin.gabriel@gmail.com',
    bankAccount: {
      id: 'd8ddbf20-4191-4191-af9a-998291d23448',
      accountNo: '75489632154',
      ifsc: 'SBI67OO7896',
      accountType: 'Savings',
    },
  },
}

const transaction = {
  data: {
    id: '18f1cfb1-27c3-40df-bc10-55e34435bc0e',
    pocketPayAccountId: '4332a812-3840-4b1c-98d8-bd5cb9be08f0',
    transactionStatus: 'inProgress',
    sendingCurrency: {
      id: '10b6ec48-36a0-41d5-90ee-0a2f44fb6b12',
    },
    receivingCurrency: {
      id: '10b6ec48-36a0-41d5-90ee-0a2f44fb6b12',
    },
    senderId: 'b4ff5ab8-c9ca-4d57-9004-91ccc5698755',
    recipient: recipient.data,
    sendingAmount: 1235,
    receivingAmount: 1189.43,
    guaranteedRate: 1,
    transferFee: 45.57,
    recipientType: 'Business or Charity',
    purpose: purposes.data,
    referenceNo: '832948',
  },
}

const transactions = {
  data: [
    {
      id: '18f1cfb1-27c3-40df-bc10-55e34435bc0e',
      pocketPayAccountId: '4332a812-3840-4b1c-98d8-bd5cb9be08f0',
      transactionStatus: 'inProgress',
      sendingCurrency: {
        id: '10b6ec48-36a0-41d5-90ee-0a2f44fb6b12',
      },
      receivingCurrency: {
        id: '10b6ec48-36a0-41d5-90ee-0a2f44fb6b12',
      },
      senderId: 'b4ff5ab8-c9ca-4d57-9004-91ccc5698755',
      recipient: recipient.data,
      sendingAmount: 1235,
      receivingAmount: 1189.43,
      guaranteedRate: 1,
      transferFee: 45.57,
      recipientType: 'Business or Charity',
      purpose: purposes.data[0],
      referenceNo: '832948',
    },
  ],
}
const eventLogs = {
  data: [
    {
      id: '27debda2-7819-44e4-bcbc-ad34912f016a',
      eventType: 'Sending',
      timestamp: '2022-07-25T18:12:02.000+00:00',
      transaction: {
        id: '18f1cfb1-27c3-40df-bc10-55e34435bc0e',
        sendingAmount: 0.0,
        receivingAmount: 0.0,
        guaranteedRate: 0.0,
        transferFee: 0.0,
      },
    },
  ],
}

const business_persons = {
  data: [
    {
      id: '0c84bc30-c310-47af-bcad-0c50342b39cf',
      userId: '0c84bc30-c310-47af-bcad-0c50342b39cf',
      userRole: 'Director',
    },
  ],
}

const currencies = {
  data: [
    {
      id: '0c84bc30-c310-47af-bcad-0c50342b39cf',
      symbol: 'GBP',
      valueInUsd: 1.217,
      country: 'United Kingdom',
    },
  ],
}

const cards = {
  data: [
    {
      id: '0c84bc30-c310-47af-bcad-0c50342b39cf',
      expiryDate: '2022-12-12',
      cardNo: '45678131',
    },
  ],
}

const bank_accounts = {
  data: [
    {
      id: '8797418e-908e-4b3c-9f36-f041fdec5386',
      bankName: 'Test Bank',
      accountHolderName: 'Test User',
      accountNo: '1234567890',
      ifscCode: 'TESTIFSC',
      pocketPayAccount: {
        id: '4332a812-3840-4b1c-98d8-bd5cb9be08f0',
        mailId: 'mario.gabriel@gmail.com',
        countryOfRegistration: 'United Kingdom',
        mobileNo: '+44789456132',
        accountType: 'Business',
      },
    },
  ],
}

describe('adding account', () => {
  beforeEach(() => jest.clearAllMocks())
  it('adding Account', async () => {
    mockedAxios.post.mockResolvedValueOnce(account)
    mockedAxios.post.mockResolvedValueOnce(person)
    mockedAxios.post.mockResolvedValueOnce(business)

    addAccount(
      {
        email: 'mario.gabriel@gmail.com',
        accountType: 'Business',
        countryRegistration: 'United Kingdom',
        mobileNumber: '+44987546123',
        password: 'Password@123',
      },
      {
        businessName: 'Zentech Technologies',
        registrationNum: 'R456T543',
        registrationAddr: 'Pencode, United Kingdom',
        addressesList: ['Pencode, United Kingdom'],
        address: 'Pencode, United Kingdom',
      },
      {
        category: 'Real Estate',
        subcategory: 'Real Estate',
        businessSize: '100-200',
      },
      {
        firstName: 'Mario',
        lastName: 'Gabriel',
        countrySelected: 'United Kingdom',
        homeAddress: 'H.No: 52856',
        city: 'Pencode, United Kingdom',
        pincode: '785236',
        enteredDate: new Date(),
      }
    )
    expect(mockedAxios.post).toBeCalledTimes(1)
  })
  it('error while posting account', async () => {
    mockedAxios.post.mockRejectedValueOnce('data is not getting')
    let value
    await addAccount(
      {
        email: 'mario.gabriel@gmail.com',
        accountType: 'Business',
        countryRegistration: 'United Kingdom',
        mobileNumber: '+44987546123',
        password: 'Password@123',
      },
      {
        businessName: 'Zentech Technologies',
        registrationNum: 'R456T543',
        registrationAddr: 'Pencode, United Kingdom',
        addressesList: ['Pencode, United Kingdom'],
        address: 'Pencode, United Kingdom',
      },
      {
        category: 'Real Estate',
        subcategory: 'Real Estate',
        businessSize: '100-200',
      },
      {
        firstName: 'Mario',
        lastName: 'Gabriel',
        countrySelected: 'United Kingdom',
        homeAddress: 'H.No: 52856',
        city: 'Pencode, United Kingdom',
        pincode: '785236',
        enteredDate: new Date(),
      }
    ).catch((error) => (value = error))
    expect(value).toEqual('data is not getting')
  })
  it('error while posting person', async () => {
    mockedAxios.post.mockResolvedValueOnce(account)
    mockedAxios.post.mockRejectedValueOnce('data is not getting')
    let value
    await addAccount(
      {
        email: 'mario.gabriel@gmail.com',
        accountType: 'Business',
        countryRegistration: 'United Kingdom',
        mobileNumber: '+44987546123',
        password: 'Password@123',
      },
      {
        businessName: 'Zentech Technologies',
        registrationNum: 'R456T543',
        registrationAddr: 'Pencode, United Kingdom',
        addressesList: ['Pencode, United Kingdom'],
        address: 'Pencode, United Kingdom',
      },
      {
        category: 'Real Estate',
        subcategory: 'Real Estate',
        businessSize: '100-200',
      },
      {
        firstName: 'Mario',
        lastName: 'Gabriel',
        countrySelected: 'United Kingdom',
        homeAddress: 'H.No: 52856',
        city: 'Pencode, United Kingdom',
        pincode: '785236',
        enteredDate: new Date(),
      }
    ).catch((error) => (value = error))
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.post).toBeCalledTimes(2)
  })

  it('error while getting business', async () => {
    mockedAxios.post.mockResolvedValueOnce(account)
    mockedAxios.post.mockResolvedValueOnce(person)
    mockedAxios.post.mockRejectedValueOnce('data is not getting')
    let value
    await addAccount(
      {
        email: 'mario.gabriel@gmail.com',
        accountType: 'Business',
        countryRegistration: 'United Kingdom',
        mobileNumber: '+44987546123',
        password: 'Password@123',
      },
      {
        businessName: 'Zentech Technologies',
        registrationNum: 'R456T543',
        registrationAddr: 'Pencode, United Kingdom',
        addressesList: ['Pencode, United Kingdom'],
        address: 'Pencode, United Kingdom',
      },
      {
        category: 'Real Estate',
        subcategory: 'Real Estate',
        businessSize: '100-200',
      },
      {
        firstName: 'Mario',
        lastName: 'Gabriel',
        countrySelected: 'United Kingdom',
        homeAddress: 'H.No: 52856',
        city: 'Pencode, United Kingdom',
        pincode: '785236',
        enteredDate: new Date(),
      }
    ).catch((error) => (value = error))
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.post).toBeCalledTimes(3)
  })
})

describe('test getAccountInformation getBusinessInformation getTransactionsForAccount', () => {
  beforeEach(() => jest.clearAllMocks())
  it('getAccountInformation', async () => {
    mockedAxios.get.mockResolvedValueOnce(accounts)
    let value
    await getAccountInformation('1')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getAccountInformation error', async () => {
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getAccountInformation('1').catch((error) => (value = error))
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getBusinessInformation', async () => {
    mockedAxios.get.mockResolvedValueOnce(businesses)
    let value
    await getBusinessInformation('1')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getBusinessInformation error', async () => {
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getBusinessInformation('1').catch((error) => (value = error))
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getTransactionsForAccount', async () => {
    mockedAxios.get.mockResolvedValueOnce(account)
    mockedAxios.get.mockResolvedValueOnce(transactions)
    mockedAxios.get.mockResolvedValueOnce(eventLogs)
    mockedAxios.get.mockResolvedValueOnce(person)
    let value
    await getTransactionsForAccount('1')
    expect(mockedAxios.get).toBeCalledTimes(4)
  })
  it('getTransactionsForAccount error', async () => {
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getTransactionsForAccount('1').catch((error) => (value = error))
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
})

describe('test getPersonsInBusiness getPersons  getPersonOrRecipientDetails getPersonOrRecipientName', () => {
  beforeEach(() => jest.clearAllMocks())
  it('getPersonsInBusiness', async () => {
    mockedAxios.get.mockResolvedValueOnce(persons)
    let value
    await getPersonsInBusiness('1')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getPersonsInBusiness error', async () => {
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getPersonsInBusiness('1').catch((error) => (value = error))
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getPersons', async () => {
    mockedAxios.get.mockResolvedValueOnce(persons)
    let value
    await getPersons()
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getPersons error', async () => {
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getPersons().catch((error) => (value = error))
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getPersonOrRecipientDetails', async () => {
    mockedAxios.get.mockResolvedValueOnce(recipient)
    let value
    await getPersonOrRecipientDetails('1')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getPersonOrRecipientDetails error', async () => {
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getPersonOrRecipientDetails('1').catch((error) => (value = error))
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
})

describe('test getCurrencyDetails getCardsForAccount getBankDetailsForAccount updateTransactionDetails', () => {
  beforeEach(() => jest.clearAllMocks())
  it('getCurrencyDetails', async () => {
    mockedAxios.get.mockResolvedValueOnce(accounts)
    let value
    await getCurrencyDetails()
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getCurrencyDetails error', async () => {
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getCurrencyDetails()
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getCardsForAccount', async () => {
    mockedAxios.get.mockResolvedValueOnce(accounts)
    mockedAxios.get.mockResolvedValueOnce(cards)
    let value
    await getCardsForAccount('mario.gabriel@gmail.com')
    expect(mockedAxios.get).toBeCalledTimes(2)
  })
  it('getCardsForAccount error', async () => {
    mockedAxios.get.mockResolvedValueOnce(accounts)
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getCardsForAccount('mario.gabriel@gmail.com').catch(
      (error) => (value = error)
    )
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.get).toBeCalledTimes(2)
  })
  it('getBankDetailsForAccount', async () => {
    mockedAxios.get.mockResolvedValueOnce(accounts)
    mockedAxios.get.mockResolvedValueOnce(bank_accounts)
    let value
    await getBankDetailsForAccount('mario.gabriel@gmail.com')
    expect(mockedAxios.get).toBeCalledTimes(2)
  })
  it('getBankDetailsForAccount error', async () => {
    mockedAxios.get.mockResolvedValueOnce(accounts)
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getBankDetailsForAccount('mario.gabriel@gmail.com').catch(
      (error) => (value = error)
    )
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.get).toBeCalledTimes(2)
  })
})

describe('test getPurposes', () => {
  beforeEach(() => jest.clearAllMocks())
  it('getPurposes', async () => {
    mockedAxios.get.mockResolvedValueOnce(purposes)
    await getPurposes()
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
  it('getPurposes error', async () => {
    mockedAxios.get.mockRejectedValueOnce('data is not getting')
    let value
    await getPurposes().catch(
      (error) => (value = error)
    )
    expect(value).toEqual('data is not getting')
    expect(mockedAxios.get).toBeCalledTimes(1)
  })
})


describe('test getDirectorsAndOwner', () => {
  beforeEach(() => jest.clearAllMocks())
  it('getDirectorsAndOwner', async () => {
    mockedAxios.get.mockResolvedValueOnce(account)
    mockedAxios.get.mockResolvedValueOnce(business)
    mockedAxios.get.mockResolvedValueOnce(business_persons)
    mockedAxios.get.mockResolvedValueOnce(persons)
    await getDirectorsAndOwner('mario.gabriel@gmail.com')
    expect(mockedAxios.get).toBeCalled()
  })
})