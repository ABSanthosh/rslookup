#include<stdio.h>
#include<stdlib.h>
void main()
{
    int r, c, i, j;
    printf("Enter number of rows\n");
    scanf("%d",&r);
    printf("Enter number of columns\n");
    scanf("%d",&c);
    int **arr = (int **)malloc(r * sizeof(int *));
    for (i=0; i<r; i++)
         arr[i] = (int *)malloc(c * sizeof(int));
    printf("Enter elements\n");
    for (i = 0; i <  r; i++)
        for (j = 0; j < c; j++)
            scanf("%d",*(arr+i)+j);
    for (i = 0; i <  r; i++)
        for (j = 0; j < c; j++)
            printf("%d\n", *(*(arr+i)+j));

}
