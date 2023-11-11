#include<stdio.h>
#include<stdlib.h>
struct student
{
    	char name[20];
    	int r_n;
    	char dept[20];
    	int age;
};
void main()
{
    	struct student *ptr;
    	int n, i;
    	printf("Enter the number of students\n");
        scanf("%d",&n);
    	ptr=(struct student *)malloc(n*sizeof(struct student));
    	for(i=0; i<n; i++)
    	{
        		printf("Enter the details of %d student\n",i+1);
        		printf("Enter the name\n");
        		scanf("%s",(ptr+i)->name);
        		printf("Enter Roll Number\n");
        		scanf("%d",&(ptr+i)->r_n);
        		printf("Enter Department\n");
        		scanf("%s",(ptr+i)->dept);
        		printf("Enter Age\n");
        		scanf("%d",&(ptr+i)->age);
        }
    	printf("The details entered are:\n");
    	for(i=0; i<n; i++)
    	printf("%s\n%d\n%s\n%d\n",(ptr+i)->name, (ptr+i)->r_n, (ptr+i)->dept, (ptr+i)->age);
}
