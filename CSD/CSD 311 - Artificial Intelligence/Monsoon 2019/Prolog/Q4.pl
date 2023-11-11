/*Find the sum of the elements of a list.*/

list_sum([],0).
list_sum([H|T],S):-list_sum(T,S1),S is S1+H.

