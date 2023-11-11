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
		arr = np.random.randint(low=0, 
								high=1000, 
								size=np.random.randint(low=5, high=15))
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

	# declare an entry coun
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