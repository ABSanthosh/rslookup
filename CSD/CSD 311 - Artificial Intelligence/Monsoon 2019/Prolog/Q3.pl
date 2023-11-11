/* Last element of a list */

last_elem([H|T],R):- findlast(T,H,R).
findlast([],R,R).
findlast([H|T],_,R) :- findlast(T,H,R).
