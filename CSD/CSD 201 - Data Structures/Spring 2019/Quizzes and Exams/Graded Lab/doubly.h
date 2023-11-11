typedef struct node
{
  int data;
  struct node *next;
  struct node *prev;
}node;

void insert(node **,int);
void display(node **);

