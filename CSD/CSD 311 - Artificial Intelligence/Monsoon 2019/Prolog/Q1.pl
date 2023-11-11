len([],0).
len([X|T],Count):-len(T, L1),Count is L1+1.
