#include<stdio.h>
#include<stdlib.h>
#include"doubly.h"
void main()
{
  int choice,n,element,i;
  node *head=NULL;
  while(1)
   {
   printf("\n1. Insert Elements in Doubly Linked List\n");
   printf("2. Display \n");
   printf("3. Exit\n");
   printf("Enter your choice\n");
   scanf("%d",&choice);
   switch(choice)
   {
    case 1: printf("Enter Element to insert\n");
           scanf("%d",&element);
           insert(&head,element);
           break;
    case 2:display(&head);
    break;
    case 3: exit(0);
   }
   }
}
