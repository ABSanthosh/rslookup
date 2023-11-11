/* Positive and negative numbers in a list of integers.*/

sort_list([H|T]) :- list_sorter([H|T],0,0).
list_sorter([],P,N) :-
    write('The number of positive elements is '),
    write(P),nl,
    write('The number of negative elements is '),
    write(N).
list_sorter([H|T],P,N) :- H>=0, P1 is P+1, list_sorter(T,P1,N).
list_sorter([H|T],P,N) :- H<0, N1 is N+1, list_sorter(T,P,N1).


