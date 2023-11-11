/*
1.	Find the length of a list.
2.	Find the maximum of a list elements
3.	Find the last element of a list.
4.	Find the sum of the elements of a list.
5.	Find the kth element of the list.
6.	Find the number of positive and negative elements in the list of integer values
7.	Find the sum of positive and negative separately of the elements of given list
8.	Reverse the elements of a list
9.	Find the nth term of Fibonacci series using iteration.
10.	Check if a given number is palindrome.
11.	Count the number of nodes in a binary tree having node structure bnode(L, V, R).
12.	Insert a node in binary search tree.
*/


/* sum of the elements of a  list */
list_sum([],0).
list_sum([H|T],S):-list_sum(T,S1),S is S1+H.

/*Last element of the list */
last_ele([H|[]],H).
last_ele([_|T],R):-last_ele(T,R).

/*count positive and negative elements of the list*/
countposneg([],0,0).
countposneg([H|T],P,N):-H>0, countposneg(T,P1,N), P is P1+1.
countposneg([H|T],P,N):-H=<0, countposneg(T,P,N1), N is N1+1.

/* Add positive and negative elements of a given list */
posneg([],0,0).
posneg([H|T],P,N):-H>0, posneg(T,P1,N), P is P1+H.
posneg([H|T],P,N):-H=<0, posneg(T,P,N1), N is N1+H.
/*
/* Reverse a list using iteration */
rev(L, R):- rev(L, [], R).
rev([],R, R).
rev([H|T],L, R):-rev(T,[H|L], R).

/* Reverse a list using recursion  */
rev1([], []).
rev1([H|T],R):-rev1(T,T1), append(T1, [H], R).

/* Find nth element from a fibonacci series using iteration */
fibo(N, M) :- fibo(N,M,0,1).
fibo(2, M, T1, T2) :- M is T1 + T2.
fibo(N, M, T1, T2) :- T3 is T1 + T2, N1 is N - 1, fibo(N1, M, T2, T3).

/* Sum of n elements of fibo series fibo(N,I,F1, F2, S) */

sum_fibo(N, S) :- fibo(N, I, F1, F2, S).
fibo(N, I, F1, F2, S):-fibo1(N, 0, 0, 1, 0).
fibo1(N, I, F1, F2, S) :- I < N, J is I + 1, F3 is F1+F2, S1 is S + F3, fibo1(N, J, F2, F3, S1).
fibo1(N, N, _, _, S).

/* Find the length of the list */
length_list([], 0).
length_list([_|T], N) :- length_list(T, N1), N is N1+1.

/* Find the maximum element in the list */
list_max([H|T],R):- findmax(T,H,R).
findmax([],R,R).
findmax([H|T],X,R):- X>H, list_max(T,X,R).
findmax([H|T],X,R):-X=<H, list_max(T,H,R).


/* Find nth element of the list */
nth([],_):-write('not found').
nth([H|_],1):-write(H).
nth([_|T],N):-N>0,N1 is N-1, nth(T,N1).

/* Check if a list is palidrome */
palin(X,X).
palin(X):-reverse(X,L),palin(X,L).

/* Count number of nodes in binary tree */
count(void,0).
count(btree(void,_,void),1).
count(btree(L,V,R),N):-count(L, N1),count(R, N2), N is 1+N1+N2.

/* add the values of a binary tree */
addbtree(void, 0).
addbtree(btree(void,V,void), V).
addbtree(btree(L,V,R), S):- addbtree(L, S1), addbtree(R, S2), S is V+S1+S2.

/* Swap the binary tree */
swapbtree(void, void).
swapbtree(btree(void,V,void), btree(void,V,void)).
swapbtree(btree(L,V,R), btree(R1,V,L1)):-swapbtree(L, L1), swapbtree(R,R1).

