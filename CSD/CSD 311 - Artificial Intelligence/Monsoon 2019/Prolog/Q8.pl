/* Reverse the elements of a list.*/

rev1([], []).
rev1([H|T],R1):-rev1(T,T1), append(T1, [H], R1).
