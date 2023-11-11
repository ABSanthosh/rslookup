
typedef struct node{
int data;
struct node *next;
}node;


void insert_beg(node **, int);
void insert_end(node **, int);
void insert_after_node(node **, int, int);
void del_beg(node **);
void del_end(node **);
void del_search_key(node **, int);
void display(node *);
