clc

% define symbolic variable
syms x

A = [-2 2 -3; 2 1 -6; -1 -2 0];
I = eye(3);

%declare equation
eqn = det(A - x*I) == 0;

% solve
solx = solve(eqn,x)