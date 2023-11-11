# Lab Assignment 1B
### CSD 302 - Design and Analysis of Algorithm

**Name:** Prakhar Rathi <br>
**Roll Number:**  1810110169

## Algorithm 

The pre-cursor is to generate a set of k sorted linked lists which have been explained in the pseudo code section.

Steps to merge the k sorted arrays. 
1. Create a min-heap and insert the first element of each of the linked lists.
2. While the min-heap is not empty, do the following steps:
    * Remove the top element of the min-heap which is the current minimum and the essentially the smallest element in all the arrays so far and add it to the final result array.
    * If there exists an element, in the same linked list, next to the element popped out in previous step, insert it into the min-heap which will automatically be added to it's correct position.
    * Print the result array

### Pseudo Code

```
k = input from user
arrs = new arrs[k]

for(i = 0; i < k; i++)
{
    list_size = random.randomint(5, 15)
    arr = generate_linked_list(list_size)
    sort(arr)
    arrs[i] = arr    
}

heap = new Heap() 
for (i = 0; i < k; i++)
{
    heap.add((arrs[i].value), arrs[i])
}
result = []
while (heap)
{
    val, node = heap.pop()
    if node.next:
        heap.push(node.next)
    
    result.add(val)
}

print(result)
```

## Source Code 

```python

# Import necessary libraries 
from heapq import heapify, heappush, heappop
import numpy as np

# Define a linked list structure
class Node():
	
	# Constructor definition 
	def __init__(self, value, next_node=None):
		self.val = value
		self.next = next_node

# Function to insert node in a linked list
def insert(root, item):
	
	# Create a temporary Node
	temp = Node(item)

	# If empty list
	if root == None:
		root = temp 
	else: 
		curr = root
		while curr.next is not None:
			curr = curr.next
		curr.next = temp 

	return root

# Function to convert a list to LinkedList
def convert_to_linked_list(arr):

	# Create a root element
	root = None
	for i in range(len(arr)):
		root = insert(root, arr[i])

	return root

# Function to display a linked list
def display_list(root, index=None):

	if index is not None:
		print(f"Array {index}: [", end=" ")
	else: 
		print("[", end=" ")
	
	while root is not None: 
		print(root.val, end=" ")
		root = root.next 

	print("]")


# Driver code 
if __name__=='__main__':  

	# Take a k-value input 
	try:
		k = int(input("Enter the number of arrays: "))

	except ValueError:
		print("\nIncorrect k value enterred. Taking k = 4 as default.\n")
		k = 4

	# Generate random sorted arrays of size between 5 and 15 
	arrays = []
	for i in range(k):
		arr = np.random.randint(low=0, high=1000, size=np.random.randint(low=5, high=15))
		arr.sort()
		arrays.append(list(arr))

	# Convert arrays to linked list 
	print(f"The {k} variable length arrays are:\n")
	for i in range(len(arrays)):
		arrays[i] = convert_to_linked_list(arrays[i])
		display_list(arrays[i], i+1)

	# Instantiate a heap 
	heap = []
	heapify(heap)

	# declare an entry count
	ecount = 0

	# Insert the first element of all the lists in the heap 
	for arr in arrays:
		if arr:
			heappush(heap, (arr.val, ecount, arr))
			ecount += 1
	
	# Declare the result array 
	result = []

	# Start popping out items 
	while heap != []:
		val, ecount, node = heappop(heap)
		result.append(val)
		node = node.next

		if node:
			heappush(heap, (node.val, ecount, node))
			ecount += 1

	print("\nThe sorted array is:", result)
	print("\nThe size of the array is:", len(result))

```

## Outputs with random inputs

The code automatically generates `k` arrays between the size 5 and 15. 

**k = 3**

<img src="https://i.imgur.com/qj8dyDm.png"
     alt="Markdown Monster icon"
     style="height: 100px; width:400px; margin-right: 10px;" />
     
**k = 5**

<img src="https://i.imgur.com/2H9vSWA.png"
     alt="Markdown Monster icon"
     style="height: 100px; width:400px; margin-right: 10px;" />

**k = 10**
<img src="https://i.imgur.com/0gTc44s.png"
     alt="Markdown Monster icon"
     style="height: 100px; width:400px; margin-right: 10px;" />
     
     


## Complexity Analysis

### Time complexity 

k = Number of sorted arrays 
n = Total elements across all arrays


Number of levels in the binary heap that we build: `1 + floor(log(k))`

Complexity of insertion in a binary heap = `log(k)`
Insertion complexity for all n items into the binary heap: `n*log(k)`

Total complexity (insertion and deletion) = `2 * nlog(k)`
**Time Complexity** = `O(n*log(k))`

### Space Complexity

The space complexity is `O(k)` because that is the maximum number of elements our heap will store at given point of time. 

