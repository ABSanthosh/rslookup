#include<stdio.h>
#include<stdlib.h>

typedef struct node
{
int data;
struct node *next;
}node;

node *head=NULL;

void main()
{
    int choice, element;
    while(1)
    {
        printf("\n1. Insert\n");
        printf("2. Delete Duplicates\n");
        printf("3. Display\n");
        printf("4. Exit\n");
        printf("Enter your choice\n");
        scanf("%d",&choice);
        switch(choice)
        {
            case 1: printf("Enter element to insert\n");
                    scanf("%d",&element);
                    insert(element);
                    break;
            case 2: del_duplicates();
                    break;
            case 3: display();
                    break;
            case 4: exit(0);
        }
    }
}

void insert(int element)
{
    node *new = (node *)malloc(sizeof(node));
    new->data = element;
    new->next = NULL;
    if(head == NULL)
    head=new;
    else
    {
        node *temp=head;
        while(temp->next != NULL)
        temp = temp->next;
        temp->next = new;
    }
}

void del_duplicates()
{
    node *ptr1, *ptr2, *dup;
    ptr1 = head;
    while (ptr1 != NULL && ptr1->next != NULL)
    {
        ptr2 = ptr1;
        while (ptr2->next != NULL)
        {
            if (ptr1->data == ptr2->next->data)
            {
                dup = ptr2->next;
                ptr2->next = ptr2->next->next;
                free(dup);
            }
            else
                ptr2 = ptr2->next;
        }
        ptr1 = ptr1->next;
    }
}

void display()
{
    node *temp=head;
    while(temp!=NULL)
    {
        printf("%d",temp->data);
        if(temp->next!=NULL)
            printf("->");
        temp=temp->next;
    }
}
