#include<stdio.h>
#include<stdlib.h>
void main()
{
int *ptr, i, n, sum=0;
printf("Enter the number of elements you want to enter\n");
scanf("%d",&n);
ptr=(int *)malloc(n*sizeof(int));
printf("Enter Elements\n");
for(i=0;i<n;i++)
{
    scanf("%d",ptr+i);
    sum=sum+*(ptr+i);
}
for(i=0;i<n;i++)
printf("%d\n",*(ptr+i));
printf("The sum of the elements is :\n%d",sum);
free(ptr);
}
