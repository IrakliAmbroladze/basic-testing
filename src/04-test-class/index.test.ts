// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    expect(account.getBalance()).toEqual(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const initBalance = 200;
    const account = getBankAccount(initBalance);
    expect(() => account.withdraw(300)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const initBalance = 200;
    const accountFrom = getBankAccount(initBalance);
    const accountTo = getBankAccount(100);
    expect(() => accountFrom.transfer(300, accountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = getBankAccount(200);
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(200);
    account.deposit(50);
    expect(account.getBalance()).toBe(250);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(200);
    account.withdraw(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should transfer money', () => {
    // Write your test here
    const accountFrom = getBankAccount(300);
    const accountTo = getBankAccount(100);

    accountFrom.transfer(100, accountTo);

    expect(accountFrom.getBalance()).toBe(200);
    expect(accountTo.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const account = getBankAccount(200);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(50).mockReturnValueOnce(1);
    const result = await account.fetchBalance();
    expect(typeof result).toBe('number');
    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const account = getBankAccount(200);
    const mockValue = 77;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(mockValue);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mockValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const account = getBankAccount(200);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
