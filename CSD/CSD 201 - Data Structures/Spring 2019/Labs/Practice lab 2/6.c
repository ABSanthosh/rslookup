#include<stdio.h>
#include<stdlib.h>
struct student{
    int r_n;
    char name[20];
    char dept[20];
    char course[20];
    int yoj;
}stud[450];
void display_name(struct student [], int);
void display_data(struct student [], int);
void main()
{
int i, n;
printf("Enter the total number of students\n");
scanf("%d", &n);
struct student stud[n];
for(i=0; i<n; i++)
{
printf("Enter the roll number of %d student\n", i+1);
scanf("%d", &stud[i].r_n);
printf("Enter the name of %d student\n", i+1);
scanf("%s", stud[i].name);
printf("Enter the department of %d student\n", i+1);
scanf("%s", stud[i].dept);
printf("Enter the course of %d student\n", i+1);
scanf("%s", stud[i].course);
printf("Enter the year of joining of %d student\n", i+1);
scanf("%d", &stud[i].yoj);
}
display_name(stud, n);
display_data(stud, n);
}

void display_name(struct student b[], int n)
{
int year, i;
printf("Enter the year in which you want to see the names of all the students of that particular year\n");
scanf("%d", &year);
for(i=0; i<n; i++)
{
if(b[i].yoj==year)
printf("\n%s\n", b[i].name);
}
}

void display_data(struct student b[], int n)
{
int rn, i;
printf("Enter the roll number of the student whose details you want to see\n");
scanf("%d", &rn);
for(i=0; i<n; i++)
{
if(b[i].r_n == rn)
{
printf("\n%s\n", b[i].name);
printf("%s\n", b[i].dept);
printf("%s\n", b[i].course);
printf("%d\n", b[i].yoj);
}
}
}
