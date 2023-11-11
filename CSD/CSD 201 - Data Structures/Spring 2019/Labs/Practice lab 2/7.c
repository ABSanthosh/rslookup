#include<stdio.h>
#include<stdlib.h>
struct bank{
    char name[20];
    int acc_n;
    int bal;
}cust[200];
int n;
void display_name(struct bank [],int);
void withdraw(struct bank [],int);
void deposit(struct bank [],int);
void main()
{
    int i,ch;
    printf("Enter the total number of customers in a bank\n");
    scanf("%d", &n);
    struct bank cust[n];
    for(i=0;i<n;i++)
    {
        printf("Enter the name of %d customer\n",i+1);
        scanf("%s", cust[i].name);
        printf("Enter the account number of %d customer\n",i+1);
        scanf("%d", &cust[i].acc_n);
        printf("Enter the balance of %d customer\n",i+1);
        scanf("%d", &cust[i].bal);
    }
    while(1)
    {
        printf("Enter your choice\n");
        printf("0. To Withdraw money from a particular account\n");
        printf("1. To Deposit money in a particular account\n");
        printf("2. To get the names of all those customers with balance less than Rs. 100\n");
        printf("3. Exit\n");
        scanf("%d", &ch);
        switch(ch)
        {
            case 0: withdraw(cust,n);
                    break;
            case 1: deposit(cust,n);
                    break;
            case 2: display_name(cust,n);
                    break;
            case 3: exit(0);
            default: printf("Please Enter a valid option\n");
        }
    }
}

void display_name(struct bank cust[], int n)
{
    int i, count=0;
    for(i=0;i<n;i++)
    {
        if(cust[i].bal<=100)
        {
            printf("%s\n", cust[i].name);
            printf("%d\n",cust[i].acc_n);
            count++;
        }
    }
    if(count==0)
        printf("No Customer has balance less than 100\n");
}

void withdraw(struct bank cust[], int n)
{
    int an, i, amount;
    printf("Enter the Account number\n");
    scanf("%d", &an);
    for(i=0;i<n;i++)
    {
        if((cust[i].acc_n)==an)
        {
            if((cust[i].bal)<=100)
            {
                    printf("The balance is insufficient for the specified withdrawal\n");
                    break;
            }
            else
            {
                printf("Enter the Amount to withdraw\n");
                scanf("%d", &amount);
                cust[i].bal=cust[i].bal-amount;
                printf("Collect your money from the cash counter");
            }
        }
    }
}

void deposit(struct bank cust[], int n)
{
    int amount,account,i;
    printf("Enter the account number and amount\n");
    scanf("%d%d",&account, &amount);
    for(i=0;i<n;i++)
    {

        if(cust[i].acc_n==account)
            cust[i].bal=cust[i].bal+amount;
    }
    printf("Amount Deposited\n");
}
