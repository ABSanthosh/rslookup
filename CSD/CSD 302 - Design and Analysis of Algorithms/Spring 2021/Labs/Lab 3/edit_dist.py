'''


	Assumed Cost for each operation 
	1. Copy = 0 
	2. Replace = 1
	3. Delete = 1
	4. Insert = 1
	5. Twiddle = INFINITE
	6. Kill = INFINITE

'''

''' Function to implement edit distance algorithm '''
def edit_distance(x, y):

	# Get the lengths of x and y 
	m = len(x)
	n = len(y)

	# Create a table to store subproblem outputs 
	table = [[0 for x in range(n + 1)] for x in range(m + 1)]
	
	# Bottum up approach to filling the table
	for i in range(m + 1):
		for j in range(n + 1): 

			# Check if the first string is empty 
			if i == 0: 
				table[i][j] = j

			# check if the ending string is empty 
			elif j == 0:
				table[i][j] = i

			# If the letter is same
			elif x[i-1] == y[j-1]:
				table[i][j] = table[i-1][j-1]
			else: 
				table[i][j] = 1 + min(table[i-1][j-1], table[i-1][j], table[i][j-1])

	print("The minimum edit distance is: ", table[m][n])

	''' Section to implement the instructions '''
	while True:

		if m == 0 or n == 0:
			break

		# Copy operation
		if x[m-1] == y[n-1]:
			print(f"\nCopy {y[n-1]} from String 1 into String 2.")
			n -= 1
			m -= 1
		
		# Replace Operation 
		elif table[m][n] == table[m-1][n-1] + 1:
			print(f"\nReplace {x[m-1]} in String 1 to {y[n-1]} in String 2.")
			n -= 1
			m -= 1

		# Delete Operation 
		elif table[m][n] == table[m-1][n] + 1:
			print(f"\nDelete {x[m-1]} from String 1")
			m -= 1

		# Insert operation
		elif table[m][n] == table[m][n-1] + 1:
			print(f"\nInsert {y[n-1]} in String 1.")
			n -= 1

		else:
			print("Error")

def main():

	# Take the input of the starting and target string 
	x = str(input("\nEnter the starting string:"))
	y = str(input("\nEnter the target string:"))

	edit_distance(x, y)

if __name__ == '__main__':
    main()