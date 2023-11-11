# Import necessary libraries 
import pandas as pd
import time
import random


''' Implementing Simple Job Scheduling algorihtm first '''
def simple_job_schedule(arr, max_deadline):
    
    '''
    ARGS: 
        arr: The array containing the job details of the format 
            a[i] are the jobs 
            a[i][0] - job name
            a[i][1] - deadline
            a[i][2] - profit from the job

        max_deadline: The maximum of a[i][1] which will be the number of scheduled jobs 
        
        Complexity: O(n^2)

    '''

    # Start the timer
    start_time = time.perf_counter()

    # Length of the array 
    n = arr.shape[0]

    # Sort the jobs according to the decreasing order of profit
    sort_arr = arr.sort_values(by='Profit', ascending=False).reset_index(drop=True)

    # Create two arrays to keep a track of Free slots and alloted jobs 
    result = [False] * max_deadline
    # jobs = ['-1'] * max_deadline

    # Iterate through all the given jobs and find a free slot for each job
    total_profit = 0
    print("The selected jobs are: ", end=" ")
    for i in range(n):
        
        # To find the free slot we prefer the last possible slot
        for j in range(min(max_deadline - 1, sort_arr['Deadline'][i] - 1), -1, -1):
            
            # Check if the slot is free
            if result[j] is False:
                result[j] = True
                # jobs[j] = sort_arr['Job'][i]
                print(sort_arr['Job'][i], end = " ")
                total_profit += sort_arr['Profit'][i]
                break

    # End the timer
    end_time = time.perf_counter()

    # Display Results
    # print("The selected jobs in order are: ", jobs)
    print("The total profit is: ", total_profit)

    # Display Time
    print("Time elapsed in the function", round((end_time-start_time)*1000, 3), "milliseconds")


''' Implementing the FJS Algorithm using disjoint set Union Find Method '''

# Implement a disjoint set class
class DisjointSet:
    
    #  Constructor Function 
    def __init__(self, n):
        
        # Create parent attribute as an array 
        self.parent = [i for i in range(n+1)]
    
    # Find operation: Identify the latest available slot which can be found at the root
    def find(self, s):
     
        # Base Case 
        if s == self.parent[s]:
            return s
        
        # Recursive call to ma
        self.parent[s] = self.find(self.parent[s])
        return self.parent[s]

    # Union Operation to merge two sets and make u the parent of v 
    def merge(self, u, v):
         
        # allocate the greatest available free slot to u
        self.parent[v] = u

# Implement the FJS Algorithm
def fjs_algorithm(arr, max_deadline):
    
    # Start algorithm counter
    start_time = time.perf_counter()

    # Size of the array 
    n = arr.shape[0]
    
    # Sort the array in decreasing order of profits
    arr = arr.sort_values(by='Profit', ascending=False).reset_index(drop=True) 
    
    # create a disjoint set data structure
    disjoint_set = DisjointSet(max_deadline)
    
    total_profit = 0
    
    # Iterate through the jobs
    print("The selected jobs are: ", end=" ")
    for i in range(n):
        
        # find maximum available free slot for this job 
        slot = disjoint_set.find(arr['Deadline'][i])
        
        if slot > 0:
            
            # Allot this slot to job i 
            # further, update the greatest free slot
            disjoint_set.merge(disjoint_set.find(slot - 1), slot)
            
            print(arr['Job'][i], end = " ")
            total_profit += arr['Profit'][i]

    # End Time
    end_time = time.perf_counter()
    print("The total profit is:", total_profit)
    

    # Display Time
    print("Time elapsed in the function", round((end_time-start_time)*1000, 3), "milliseconds")



# Main Driver Function for JS Algo
def main():
    
    # Create a job array that would be used for the testing (Book example)
    arr = [['1', 2, 40],  
           ['2', 2, 20], 
           ['3', 1, 25], 
           ['4', 3, 21], 
           ['5', 3, 12]] 

    # Option to provide random inputs 
    rand = input("Do you want a random array? (Y/N)")
    
    if rand.lower() == 'y':
        print("Generating a random array...")
        arr = []
        # Generate a random array 
        for i in range(10000):
            arr.append([str(i), random.randint(1, 100), random.randint(10, 5000)])
    else:
        print("Going with a pre-defined array")
        
    # Convert the job array into a dataframe
    arr = pd.DataFrame(arr, columns=['Job', 'Deadline', 'Profit'])

    # Print the dataframe 
    print(arr)

    # Calculate the number of executed jobs 
    jobs = min(arr.shape[0], arr['Deadline'].max())
    print("\nTotal executed jobs will be:", jobs)

    # Show the output
    print("\nThe output using a simple job scheduling algorithm is:")

    # Run the job scheduling function. 3 is given as the maximum deadline 
    simple_job_schedule(arr, jobs)


    print("\nRunning the Fast Job Scheduling Algorithm...")
    fjs_algorithm(arr, jobs)

    # Run the FJS Algorithm 

# Call the main function 
if __name__ == "__main__":
    main()
