clc
clear all

% define the matrix A
A = [1 1; 0 2];

% uniformly distribute angles [0, 2*pi]
t = linspace(0,2*pi,100);

% generate points on the unit circle
x = cos(t);
y = sin(t);

% test by plotting
plot(x,y,'b')
hold on

% get transformed points
xy = [x;y];

nxy = A*xy;

plot(nxy(1,:),nxy(2,:),'r')
axis([-2 2 -2 2])
