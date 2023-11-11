/* Sum of positive and negative elements.*/

sum_list([H|T]) :- list_sorter([H|T],0,0).
list_sorter([],P,N) :-
    write('The sum of positive elements is '),
    write(P),nl,
    write('The sum of negative elements is '),
    write(N).
list_sorter([H|T],P,N) :- H>=0, P1 is P+H, list_sorter(T,P1,N).
list_sorter([H|T],P,N) :- H<0, N1 is N+H, list_sorter(T,P,N1).

