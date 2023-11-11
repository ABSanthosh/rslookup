#include<stdio.h>
#include"singly_list.h"

void insert_beg(node **head, int element)
{
node *new=(node *)malloc(sizeof(node));
new->data=element;
new->next=*head;
*head=new;
}

void insert_end(node **head, int element)
{
if(*head==NULL)
{
insert_beg(head,element);
return;
}
node *new=(node *)malloc(sizeof(node));
new->data=element;
new->next=NULL;
node *tmp=*head;
while(tmp->next !=NULL)
tmp=tmp->next;
tmp->next=new;
}

void insert_after_node(node **head, int element, int search_key)
{
   if(*head==NULL)
{
insert_beg(head,element);
return;
}
node *new=(node *)malloc(sizeof(node));
new->data=element;
node *crt=*head;
while(crt->data!=search_key)
    crt=crt->next;
new->next=crt->next;
crt->next=new;
}

void del_beg(node **head)
{
    if(*head==NULL)
    {
        printf("List is empty\n");
        return;
    }
    node *tmp=*head;
    *head=(*head)->next;
    free(tmp);
}

void del_end(node **head)
{
    if(*head==NULL)
    {
        printf("List is empty\n");
        return;
    }
    if((*head)->next == NULL)
	{
		free(*head);
		*head = NULL;
		return;
	}
    node *tmp=*head;
    while(tmp->next->next!=NULL)
        tmp=tmp->next;
    free(tmp->next);
    tmp->next=NULL;
}

void del_search_key(node **head, int element)
{
    if((*head)->data==element)
    {
        del_beg(head);
        return;
    }
    node *crt=*head;
    while(crt->next!=NULL && crt->next->data != element)
		crt = crt->next;
		if(crt->next==NULL)
        {
            printf("Element not present in the list\n");
            return;
        }
	node *tmp = crt->next;
	crt->next=tmp->next;
	free(tmp);
}

void display(node *tmp)
{
    if(tmp==NULL)
    {
        printf("List is empty\n");
        return;
    }
while(tmp!=NULL)
{
printf("%d",tmp->data);
if(tmp->next!=NULL)
printf("->");
tmp=tmp->next;
}
}
