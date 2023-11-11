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
    	ptr=(struct student *)malloc(sizeof(struct student));
    	printf("Enter the details of the student\n");
    	printf("Enter the name\n");
    	scanf("%s", ptr->name);
    	printf("Enter Roll Number\n");
    	scanf("%d", &ptr->r_n);
    	printf("Enter Department\n");
    	scanf("%s", ptr->dept);
    	printf("Enter Age\n");
    	scanf("%d", &ptr->age);
    	printf("The details entered are:\n");
   	 printf("%s\n%d\n%s\n%d\n", ptr->name, ptr->r_n, ptr->dept, ptr->age);
}
