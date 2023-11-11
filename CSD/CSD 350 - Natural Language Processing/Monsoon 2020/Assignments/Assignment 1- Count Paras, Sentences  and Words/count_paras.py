# Import necessary libraries
import re
import warnings
warnings.filterwarnings("ignore")

# Read input from a text file
with open('text_data.txt') as f:
    text = f.read()
    
    print("The following is your text:-\n")
    print(text)

    # Print Statistics
    print("\nThese are your text stats:-\n")

    # Count paras
    num_paras = len(re.split('\n*', text))

    # Count words
    num_words = len(text.split())

    num_sentences = len(re.split('[?.!]', text))

    # Show stats
    print("Number of paras: ", num_paras)
    print("Number of sentences: ", num_sentences)
    print("Number of words: ", num_words)
            
        
