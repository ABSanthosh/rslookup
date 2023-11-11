clc   % clears screen
clear all  % clears variables
%  coordinates of corners of a polygon
p = [ -1  -0.5;
         1   -0.5;
         1    0.5;
        -1     0.5;
        -2  0.25];
        
for t = 0 :   pi/100  :   2*pi
   x = p(:,1);  % x coordinates of polygon corners
   y = p(:,2);  % y coordinates of polygon corners 
   
   fill(x, y, 'r')
   hold on
   % rotation matrix
   A = [cos(t)   -sin(t);
          sin(t)    cos(t)];
  
 % rotated values of q
   q = A * transpose(p);  % 2 x 5 matrix
   q = transpose(q);        % 5 x 2 matrix
   
   fill(q(:,1), q(:,2), 'b')

  axis([-3 3 -3 3]) 
  pause(0.01)
  
   hold off
end

