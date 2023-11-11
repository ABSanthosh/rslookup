#include<stdio.h>
#include"singly_list.h"

void main()
{
int element,choice,search_key;
node *head=NULL;
while(1)
{
printf("\n1. Insert in Beginning\n");
printf("2. Insert at end\n");
printf("3. Insert after node\n");
printf("4. Delete from Beginning\n");
printf("5. Delete from end\n");
printf("6. Delete a particular node\n");
printf("7. Display List\n");
printf("8. Exit\n");
printf("Enter your choice\n");
scanf("%d",&choice);
switch(choice)
{
case 1:     printf("Enter element to insert\n");
            scanf("%d",&element);
            insert_beg(&head,element);
            break;
case 2:     printf("Enter element to insert\n");
            scanf("%d",&element);
            insert_end(&head,element);
            break;
case 3:     printf("Enter element to be inserted and other element after which the new element is to be inserted\n");
            scanf("%d%d",&element,&search_key);
            insert_after_node(&head, element, search_key);
            break;
case 4:     del_beg(&head);
            break;
case 5:     del_end(&head);
            break;
case 6:      printf("Enter element to be deleted\n");
            scanf("%d",&element);
            del_search_key(&head,element);
            break;
case 7:     display(head);
            break;
case 8:     exit(0);
}
}
}
