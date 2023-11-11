# Import necessary libraries
import random 

# Function to generate strings with hamming distance d
def gen_ham_strings(alphabets, string, prefix, i, d):
    
    # Base Case
    if d == 0:
        return [prefix + string[i:]]
    
    words = []
    
    for j in range(len(alphabets)):
        if alphabets[j] != string[i]:
            words += gen_ham_strings(alphabets, string, prefix + alphabets[j], i+1, d-1)
    
    if len(string) - i > d:
        words += gen_ham_strings(alphabets, string, prefix + string[i], i+1, d)
    
    return words

# Function to generate hamming strings with the given parameters
def hamming_strings(N, M, L, D, alphabets):

	''' STEP 0: Create n strings from the alphabets with length m randomly '''
	strings = []

	# Select three random strings 
	for i in range(N):
		alph = ''
		for j in range(M):
			r = random.randint(0, 3)
			alph += alphabets[r]
		
		strings.append(alph)

	print(f"\nCreated {len(strings)} strings out of the alphabets {alphabets} each of length {len(strings[0])} randomly.")


	''' 
	STEP 1: For each string i in strings, find all substrings of length L and store in an array of substrings 
			where each array is subsrings[i] 
			Length of substrings[i] = N*(M - L + 1)

	'''

	# Create an empty array to store arrays of substrings
	substrings = []

	# Iterate through all the generated strings
	for s in strings:
		words = []
		for i in range(0, len(s)-L+1):
			word = s[i : i+L]
			words.append(word)
		
		# Add to substring list
		substrings.append(words)

	output_message = f""" 
						\nCreated an array of substrings where each substring is of length {len(substrings[0][0])}
	and the number of substrings are {len(substrings[0]) * len(substrings)}.
	Finally, the total number of substring arrays are {len(substrings)}

					  """
	print(output_message)

	''' STEP 2: For each substring array, generate neighbourhood '''

	# Create an empty array to hold the neighbours
	T = []

	# Iterate through the substrings
	# and make one Ti for each Si 
	for substring in substrings:
		neighbours = []
		for pattern in substring:
			neighbours += gen_ham_strings(alphabets, pattern, '', 0, D)
		
		# Add neighbours T 
		T.append(neighbours)

	# Display details 
	output_message = f""" 
						\nCreated an array of neighbours where number of neighbours for each substring array are {len(neighbours[0])}. 

						\n Finding common substrings...
					  """
	print(output_message)

	''' Step 3: Find all substrings x that occur in each of the Ti ''' 

	# Convert all arrays of neighbouts to sets so they only have unique characters 
	for i in range(len(T)):
	    T[i] = set(T[i])

	# Find common substrings
	common_substrings = T[0]

	for i in range(1, len(T)):
		common_substrings = common_substrings.intersection(T[i])

	print("The number of common substrings are: ", len(common_substrings), "and the substrings have been written in a text file.")
	print("The common strings are:-\n", common_substrings)

	# Save substrings to a file
	with open('common_substrings.txt', 'w') as f:
		for s in common_substrings:
			f.write(s)
			f.write("\n")


# Main Driver Function 
def main():

	# Define the constants 
	N = 20
	M = 600
	L = 9
	D = 2

	# Define a alphabets  
	alphabets = ['a', 'c', 'g', 't']

	# Display details 
	print("The parameters are:")
	print("\nN =", N)
	print("M =", M)
	print("L =", L)
	print("D =", D)

	print("The alphabets are: ", alphabets)

	# Call the hamming strings function 
	hamming_strings(N, M, L, D, alphabets)


# Call the main function 
if __name__ == "__main__":
    main()
