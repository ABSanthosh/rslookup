#include<stdio.h>
#include<stdlib.h>
struct date{
    int day, month, year;
};
int check_date(struct date *);
void main()
{

    int chkdt;
    struct date d1, d2;
    printf("Enter the dates to be compared\n");
    chkdt=check_date(&d1);
    if(chkdt == 0)
        exit(0);
    chkdt=check_date(&d2);
    if(chkdt == 0)
        exit(0);

        //Comparing two dates
        if((d1.day == d2.day) && (d1.month == d2.month) && (d1.year == d2.year))
            printf("Dates are equal\n");
        else
            printf("Dates are not equal\n");
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
