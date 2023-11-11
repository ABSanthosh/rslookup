
% AI ,Written By Motaz M. Ayyad.

    male(tom).
    male(bob).
    male(jim).

    female(liz).
    female(pat).
    female(ann).
    female(pam).

    parent(pam,bob).
    parent(tom,bob).
    parent(tom,liz).
    parent(bob,ann).
    parent(bob,pat).
    parent(pat,jim).

    father(X,Y):- parent(X,Y),male(X).
    mother(X,Y):- parent(X,Y),female(X).
    grandparent(X,Z):- parent(X,Y),parent(Y,Z).
    offspring(X,Y):- parent(Y,X).
    sister(X,Y):- parent(Z,X),parent(Z,Y),female(X),X\=Y.
    pred(X,Y):-parent(X,Y).
    pred(X,Y):-parent(X,Z),pred(Z,Y).
    same(X,Y):- X=Y.
    diff(X,Y):- not(same(X,Y)).

% AI ,Written By Motaz M. Ayyad.
