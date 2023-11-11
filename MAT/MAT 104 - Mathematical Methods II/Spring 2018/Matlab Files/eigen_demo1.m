clc
clear all

%hold off
% define the matrix A
A = [2 5; 5 2];

% uniformly distribute angles [0, 2*pi]
t = linspace(0,  2*pi,  100);

% generate points on the unit circle
x = cos(t);
y = sin(t);

% test by plotting

% get transformed points
xy = [x;y];

nxy = A*xy;

a = nxy(1,:);
b = nxy(2,:);


for t = 0 : pi/100: 6*pi
   
   plot(x,y,'b','lineWidth',2)
   hold on
   plot(a,b,'r','lineWidth',2)
   
    c = max([min(min(x),min(nxy(1,:))) max(max(x),max(nxy(1,:)))   min(min(y),min(nxy(2,:))) max(max(y),max(nxy(2,:)))  ]);
   axis([-c c -c c])
   
   
   xi = cos(t);
   yi = sin(t);
   quiver(0,0,xi,yi,1,'lineWidth',2);
   
   
  Ax = A*[xi; yi];
  ai = Ax(1);
  bi = Ax(2);
   
  quiver(0,0,ai,bi,1,'lineWidth',2);
      
   pause(0.01);
      
   hold off
end
   
   