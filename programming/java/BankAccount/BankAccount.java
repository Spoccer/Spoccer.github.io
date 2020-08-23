/*
 *  Bank Account class - DEMO by Spock 8-23-20 
 */

public class BankAccount
{
    //instance variable(s) 
    private double balance;

    //CONSTRUCTOR(S)
    public BankAccount()
    {
        balance = 0;
    }
    public BankAccount(double amount)
    {
        balance = amount;
    }


    /**
     * Withdraws money from the account
     * @param amount   amount of money to withdraw
     */
    public void withdrawMoney(double amount)
    {
        balance = balance - amount;
    }
    
    /**
     * Method depositMoney
     *
     * @param amount A parameter
     */
    public void depositMoney(double amount)
    {
        balance = balance + amount;
    }
    
    /**
     * Method checkBalance
     *
     * @return The return value
     */
    public double getBalance()
    {
        return balance;
    }
    




}