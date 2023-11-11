# Customized quick sort program 

# Import necessary libraries
import numpy as np 
import time
from pprint import pprint

'''
Important functions for the program
'''

# Function to make partition with last element as the pivot
def first_element_partition(array, start, end):
    
    """
    This function takes a pivot and places the pivot element at the correct position 
    where it would have been in a sorted array, and places all smaller (smaller than pivot) 
    to left of pivot and all greater elements to right of pivot 
    
    ARGS:
        arr: array to be sorted
        low: 
        high: 
        
    """
    
    pivot = array[start]
    low = start + 1
    high = end

    while True:
        while low <= high and array[high] >= pivot:
            high = high - 1

        # Opposite process of the one above
        while low <= high and array[low] <= pivot:
            low = low + 1

        # We either found a value for both high and low that is out of order
        # or low is higher than high, in which case we exit the loop
        if low <= high:
            array[low], array[high] = array[high], array[low]
            # The loop continues
        else:
            # We exit out of the loop
            break

    array[start], array[high] = array[high], array[start]

    return high

# Function to make partition with a random element as the pivot
def random_element_partition(array, start, end):
    
    """
    This function takes a pivot and places the pivot element at the correct position 
    where it would have been in a sorted array, and places all smaller (smaller than pivot) 
    to left of pivot and all greater elements to right of pivot 
    Random element used as pivot
    ARGS:
        arr: array to be sorted
        low: 
        high: 
        
    """
    
    pivot_location = np.random.randint(start, end)
    
    # Swap with the first element with the pivvot
    array[start], array[pivot_location] = array[pivot_location], array[start]
    pivot = array[start]
    low = start + 1
    high = end

    while True:
        while low <= high and array[high] >= pivot:
            high = high - 1

        # Opposite process of the one above
        while low <= high and array[low] <= pivot:
            low = low + 1

        # We either found a value for both high and low that is out of order
        # or low is higher than high, in which case we exit the loop
        if low <= high:
            array[low], array[high] = array[high], array[low]
            # The loop continues
        else:
            # We exit out of the loop
            break

    array[start], array[high] = array[high], array[start]

    return high


# Function to make partition with last element as the pivot
def last_element_partition(array, low, high): 
    
    """
    This function takes a pivot and places the pivot element at the correct position 
    where it would have been in a sorted array, and places all smaller (smaller than pivot) 
    to left of pivot and all greater elements to right of pivot 
    pivot is the last element
    
    ARGS:
        array: array to be sorted
        low: 
        high: 
        
    """
    
    i = (low-1)         
    pivot = array[high]     
  
    for j in range(low, high): 
  
        # If current element is smaller than or equal to the pivot 
        if array[j] <= pivot: 
  
            # increment index of smaller element 
            i = i+1
            array[i], array[j] = array[j], array[i] 
  
    array[i+1], array[high] = array[high], array[i+1] 
    
    return (i+1) 


# Quick sort helper function 
def quick_sort_helper(array, low, high, pivot_option=2):
    
    '''
    ARGS:
        pivot_option: which element is to be selected as the pivot point 
                      with options as follows:-
                      1 - random element
                      2 - first element
                      3 - last element
                      4 - median as pivot point
    '''
    
    if len(array) == 1: 
        return array 
    
    if low < high: 
          
        # obtain the index of partition 
        
        # first element partition 
        if pivot_option == 2:
            partition_index = first_element_partition(array, low, high) 
        
        # last element pivot
        elif pivot_option == 3:
            partition_index = last_element_partition(array, low, high)
            
        # random element pivot 
        elif pivot_option == 1:
            partition_index = random_element_partition(array, low, high)
  
        # Separately sort elements before 
        # partition and after partition 
        quick_sort_helper(array, low, partition_index-1, pivot_option=pivot_option) 
        quick_sort_helper(array, partition_index+1, high, pivot_option=pivot_option) 


def quick_sort(n, R, pivot_option=2):
    
    '''
    ARGS:
        n: Array size to be generated
        R: Numbers of the array in the range of 0-R
        pivot_option: which element is to be selected as the pivot point 
                      with options as follows:-
                      1 - random element
                      2 - first element
                      3 - last element
                      4 - median as pivot point
    '''
    
    # Print pivot option 
    if pivot_option == 2:
        print("Pivot Chosen as the first element")
    elif pivot_option == 3:
        print("Pivot Chosen as the last element")
    elif pivot_option == 4:
        print("Pivot Chosen as the median element")
    else:
        print("Pivot chosen as a random element")
    
    print("Problem parameters:")
    print("n=", n)
    print("R=", R)
    
    # Generate an array of random numbers 
    array = np.random.randint(low=0, 
                            high=R, 
                            size=n, 
                            dtype=int)
    
    # Show array and sorted array
    print("\nOriginal Array: ", end="")
    pprint(array)
    
    # Check if the pivot type is median
    if pivot_option == 4:
        # Set start time
        start = time.time()
        quick_sort_median(array, 0, len(array)-1)
        
        # calculate endtime
        end = time.time()
        print("Final Array: ", end="")
        pprint(array)
        
        # Show runtime
        print(f"\nRuntime of the algorithm is {end - start} seconds")
        
        return True
    
    # Set start time
    start = time.time()
    
    # Run the sorting function
    quick_sort_helper(array, 0, len(array)-1, pivot_option=pivot_option)
    
    # calculate endtime
    end = time.time()

    
    print("Final Array: ", end="")
    pprint(array)
    
    # Show runtime
    print(f"\nRuntime of the algorithm is {end - start} seconds")
 

'''
Median Quicksort Functions 

'''

# Main median quicksort function
def quick_sort_median(arr, low, high):
    if low < high:
        
        # Current sub array size 
        n = high - low + 1
        
        # Locate the median
        median = find_median(arr, low, high, n//2)
        # Partion using the median
        p_value = partition_median(arr, low, high, median)
        
        # Repeat for the left and the right sub array
        quick_sort_median(arr, low, p_value-1)
        quick_sort_median(arr, p_value+1, high)

def get_median(arr, n):
    arr.sort()
#     print(arr)
    try:
        return arr[n//2]
    except:
        return 0
    
# Sliced arrays
def sliced_array(ar, n, l):
    new_ar = [0]*n
    for i in range(len(new_ar)):
        new_ar[i] = ar[l+i]
        
    return new_ar

# Find median function which returns the kth smallest element of the array
def find_median(arr, s, e, k):
    
    # If k is less than the number of elements in the sub array 
    if k > 0 and k <= e - s + 1:
        n = e - s + 1
     
        median = [0]*((n+4//5))
        i = 0
        for i in range(n//5):
            median[i] = get_median(sliced_array(arr, 5, s), 5)

        if i*5 < n:
            median[i] = get_median(sliced_array(arr, n%5, s), n%5)
            i += 1
        
        # Find median of medians
        med_of_med = median[i-1] if i == 1 else find_median(median, 0, i-1, i//2)
        
        # Partition the arry around a random element and get the pivot position
        pos = partition_median(arr, s, e, med_of_med)
        
        # if same position as k
        if pos - s == k-1:
            return arr[pos]
        if pos - s > k-1:
            return find_median(arr, s, pos-1, k)
        
        return find_median(arr, pos+1, e, k-pos+s-1)
    
    else: 
        return 2**32 - 1

# Working partition function 
def partition_median(arr, l, r, x):
    
    i = l
    for i in range(l, r):
        if arr[i] == x:
            break
    arr[i], arr[r] = arr[r], arr[i]
    
    # Partition algo
    i = l
    for j in range(l, r):
        if arr[j] <= x:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[r] = arr[r], arr[i]
    return i    


def main():

	print("""

			This is a customized quicksort program. 

			\nYou have the following options:\n

				1.Choose a random pivot element
				2.Choose first element as pivot point
				3.Choose last element as pivot point
				4.Choose median as pivot point
		""")

	n = int(input("Enter the array size (n):"))
	R = int(input("Enter the maximum possible value in the array (R): "))
	pivot = int(input("Select the pivot choice from the 4 options above:"))

	# Call the sorting function
	quick_sort(n=n, R=R, pivot_option=pivot)


# Call the main function
if __name__ == "__main__":
    main()