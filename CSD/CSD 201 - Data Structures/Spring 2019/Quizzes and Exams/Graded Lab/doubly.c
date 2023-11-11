#include<stdio.h>
#include<stdlib.h>
#include"doubly.h"
void insert(node **head,int element)
 {

  node *new=(node *)malloc(sizeof(node));
  new->data=element;
  if((*head)==NULL)
  {
      *head=new;
      new->next=NULL;
  new->prev=NULL;
  }
  else if(element>(*head)->data)
  {
      new->next=*head;
      new->prev=NULL;
      *head=new;
  }
  else
      {

          node *temp=*head;
          while(temp->next!=NULL && temp->next->data>element)
             temp=temp->next;

          new->next=temp->next;
          if(temp->next!=NULL)
          temp->next->prev=new;
          temp->next=new;
          new->prev=temp;
       }
}




void display(node **head)
 {
     node *tmp=*head;
  while(tmp!=NULL)
   {
    printf("%d",tmp->data);
    if(tmp->next!=NULL)
        printf("->");
    tmp=tmp->next;
   }
 }


