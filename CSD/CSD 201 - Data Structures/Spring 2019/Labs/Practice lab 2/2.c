#include<stdio.h>
#include<stdlib.h>
void main()
{
char *ptr;
ptr=(char *)malloc(sizeof(char));
printf("Enter String\n");
scanf("%s", ptr);
printf("The entered string is :\n%s", ptr);
free(ptr);
}

