/*Find the kth element of a list.*/

nth([],_):-write('not found').
nth([H|_],1):-write(H).
nth([_|T],N):-N>0,N1 is N-1, nth(T,N1).
