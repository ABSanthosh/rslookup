#include<stdio.h>
#include<stdlib.h>
struct date{
    int day, month, year;
};
int check_date(struct date *);
void main()
{
    int n,i, chkdt;
    struct date curr;
    struct employee
    {
        int code;
        char emp_name[20];
        struct date doj;
    };
    printf("Enter the total number of employees\n");
    scanf("%d", &n);
    struct employee emp[n];
    printf("Enter the information for %d employees\n",n);
    for(i=0; i<n; i++)
    {
        printf("Employee Name\n");
        scanf("%s",emp[i].emp_name);
        printf("Employee Code\n");
        scanf("%d",&emp[i].code);
        printf("Date of Joining\n");
        chkdt=check_date(&emp[i].doj);
        if(chkdt == 0)
        {
            printf("Improper Date\n");
            exit(0);
        }

    }
    printf("Enter current date\n");
    chkdt=check_date(&curr);
    if(chkdt == 0)
    {
        printf("Improper date entered\n");
        exit(0);
    }

    //Printing the names of employees whose tenure is more than 3 years
    for(i=0;i<n;i++)
    {
        if(curr.year>emp[i].doj.year+3)
        {
            printf("Name of the employee who has completed 3 years is:\n%s", emp[i].emp_name);
            break;
        }
        else
        {
            if(curr.year == emp[i].doj.year+3)
            {
                if(curr.month>emp[i].doj.month)
                {
                    printf("Name of the employee who has completed 3 years is:\n%s",emp[i].emp_name);
                }
                else
                {
                    if((curr.month == emp[i].doj.month) && (curr.day >= emp[i].doj.day))
                        printf("Name of the employee who has completed 3 years is:\n%s",emp[i].emp_name);
                }

            }
        }
    }
}
int check_date(struct date *dt)
{

    printf("Enter day\n");
    scanf("%d",&dt->day);
    printf("Enter month\n");
    scanf("%d",&dt->month);
    printf("Enter year\n");
    scanf("%d",&dt->year);
    if((dt->day>31 || dt->day<0) || (dt->month>12 || dt->month <0) || (dt->year>9999 || dt->year <1000))
        return 0;
    else
        return 1;
}
