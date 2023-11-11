/* Check if a number is a palindrome.*/

palin(X,X).
palin(X):-reverse(X,L),palin(X,L).

