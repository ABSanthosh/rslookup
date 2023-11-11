''' 
TRAVELLING THIEF PROBLEM 

Given you are the following:

1. A graph G(V,E), where |V| = n, representing n cities and their interconnection.

2. Itemset S, where item i has a weight of wi and profit of pi.

3. I = {I1, I2,...In}, where  Ij is a subset of S and 1<=j<=n.

4. Knapsack capacity is C, the rental on knapsack is r

5. The speed of walking of thief decreases proportionately as the weight of the knapsack increases.

Objective:

Design an algorithm to optimize the profit for this thief.

'''

# Set the constants for the problem 
''' The graph G(V, E) is represented as an adjacency list with weights. 
The representation is achieved using a dictionary where the key represents the node of the graph and 
the value is a list where each item is of the format (destination node, weight between the source and destination)
We can get the nodes of the graph by graph.keys() so the size of the graph is n = |V|. 

'''

graph = {
            1:[(2, 15), (3, 25), (4, 45), (5, 15)], 
            2:[(1, 25), (4, 20), (5, 10)], 
            3:[(1, 25), (2, 30), (4, 65)],
            4:[(1, 35), (2, 20), (3, 45), (5, 35)],
            5:[(1, 15), (2, 10), (4, 15)],
		}

# Define the Itemset for the problem
'''
The itemset is defined as a dictionary where the keys are the items and the value contains a list 
where the first entry is the weight and the second is the profit of the item. 
The third entry is another list which shows which cities that item is present in.  
'''
itemset = {
    1 : [300, 50, [1, 2, 3, 4, 5]],
    2 : [400, 60, [2, 4, 5]],
    3 : [200, 30, [2, 3, 4]],
    4 : [500, 15, [1, 3]]
}

# Knapsack capacity and rental 
C = 900
r = 0.1

# Set the average speed of the trip. THis is required to calculate the time of the journey 
V = 10

# List of Items and vertices
I = list(itemset.keys())
vertices = list(graph.keys())

# List of visited nodes 
visited = [0 for i in range(len(vertices))]
path_length = []
shortest_path = []

# Solve for the optimal subproblem 
def path(i):
    
    """This functions solves an individual subproblem and will be run in a loop. 
    It uses a greedy method to solve the shortest path subproblem  

    Args:
        i (integer): The node on which the subproblem solution is being run on
    """

    # Declare global variables for manipulation throughout the code 
    global graph, visited, path_length, shortest_path

    # Add the current node to the starting of the shortest path for this iteration 
    shortest_path += [i, ]

    # Check if all the nodes have not been visited 
    if visited != [1]*len(graph):

        # Set visited as one 
        visited[i-1] = 1

        minimum_inf = 2**31 - 1

        # Traverse all the graph edges 
        curr = ()
        for graph_edge in graph[i]:
            if visited[graph_edge[0]-1] == 0 and graph_edge[1] < minimum_inf:
                curr = graph_edge
        
        # If curr tuple is not empty 
        if curr != ():
            # Recurse through the path function 
            path(curr[0])
            path_length += [curr[1]+ (path_length[len(path_length)-1] if len(path_length) > 0 else 0), ]
        else: 
            # If the first node of the shortest path is in any of the graph paths
            if shortest_path[0] in [x[0] for x in graph[i]]:
                shortest_path += [shortest_path[0],]
                # Iterate trhough the graph path
                for x in graph[i]:
                    if x[0] == shortest_path[0]:
                        path_length += [x[1] + (path_length[len(path_length)-1] if len(path_length) >     0 else 0), ]
            return
    else: 

        return 

# Keep running the path function till the time one loop has been created 
for i in range(1, len(graph) + 1):
    # Call the path function 
    path(i)

    # Check if there is a loop being formed so start will be the same as then end
    if shortest_path[0] == shortest_path[-1]:
        break


# Create a final itemset which stores the items which will be collected 
# also create a distance array to keep the distance of the ith city from the previous loop 
final_items = []
distances = [path_length[len(path_length)-1] + path_length[0] - x for x in path_length]

# Set the time as a measure of velocity
time = path_length[len(path_length)-1] * V

# Assign a score to each item in every city to see which one is more favourable to pick 
for item, row in itemset.items():
    # Iterate through the list of items of each city
    for i in row[2]: 
        score = int(row[0] - (row[0]*(distances[shortest_path.index(i)]/path_length[len(path_length)-1])) - ((r*time*row[1])/C))

        # Add tto the final items
        final_items += [[item, i, row[1], score, row[0]], ]

# Sort the items by descending order of score which has index 3
final_items.sort(key = lambda v: int(v[3]), reverse=True)

current_weight = 0
picked_items = []
total_profit = 0

# Iterate through the items in the descening order of capacity 
i = 0
while i < len(final_items):
    # Check if adding the item does not exceed capacity 
    if current_weight + final_items[i][2] <= C:
        picked_items += [[final_items[i][0], final_items[i][1]], ]
        current_weight += final_items[i][2]
        total_profit += final_items[i][4]
    
    i += 1

''' Section to display results '''

# Sort the picked items by the order of item 
picked_items.sort(key=lambda v: int(v[0]))
values = sorted(set(map(lambda v:v[0], picked_items)))

final = []
for i in values: 
    temp = []
    # iterate through the picked items and put if the item is present in values and picked items 
    for x in picked_items:
        if x[0] == i:
            temp += [x[1], ]
        
        # Sort the list 
        temp.sort()
        final += [[i, temp], ]

print("The shortest path will be:", shortest_path)
print("The total distance travelled : " , str(path_length[len(path_length)-1]))
print("The total profit : " + str(total_profit))