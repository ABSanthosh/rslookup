
%% euler91.m
% 
% A script to solve
% 
% y' = f(x,y)
% 
% using Euler method
%-----------------------------------------------------------------

f = @(x,y)((y - x).^2);  % creat f(x,y)
x = linspace(0,10,100);   % discretize domain interval
h = x(2) - x(1)                % step size

% create place holder for y
y = zeros(size(x));

% set initial value
y(1) = 0;

% euler steps
for n = 1: length(x)-1
    y(n+1) = y(n) + h*f(x(n),y(n));    
end

% plot euler solution
plot(x,y,'b')

hold on

% plot theory solution
yt = @(x)(x  - tanh(x));
plot(x,yt(x),'--r')


legend('Euler','Theory')





