import string
import re

nFiles = 10

# Remove puntiation
"""
for i in range(1,nFiles+1):
    
    if i < 10:
        filename = "C:/Users/Amanda/Documents/GitHub/TNM098/lab3/Lab3.2/files/0" + str(i) + ".txt"        
    else:
        filename = "C:/Users/Amanda/Documents/GitHub/TNM098/lab3/Lab3.2/files/" + str(i) + ".txt"  
    
    # Open input file for reading
    with open(filename, 'r') as file:
        text = file.read()
   

    # Remove punctuation from the text
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)  # Replace multiple spaces with a single space
    text = re.sub(r'\n+', ' ', text)  # Replace multiple newlines with a single space
    filenameOut= "C:/Users/Amanda/Documents/GitHub/TNM098/lab3/Lab3.2/out_/" + str(i) + ".txt"
    
    # Open output file for writing
    with open(filenameOut, 'w') as file:
        file.write(text)

"""


# Import necessary modules
import os
import string

# Initialize the multi-dimensional array to store sentences
sentences = [[] for _ in range(10)]

# Loop through the file names from 01.txt to 10.txt
for i in range(1, 11):
    if i < 10:
        file_name = "C:/Users/Amanda/Documents/GitHub/TNM098/lab3/Lab3.2/files/0" + str(i) + ".txt"        
    else:
        file_name = "C:/Users/Amanda/Documents/GitHub/TNM098/lab3/Lab3.2/files/" + str(i) + ".txt"  
    
    # Check if the file exists
    if os.path.exists(file_name):
        # Read the content of the file
        with open(file_name, "r") as file:
            content = file.read()

            # Convert the content to lowercase
            content = content.lower()
            
            # Split the content into sentences
            sentences_list = content.split('.')    

            # Append each sentence to the corresponding array in the multi-dimensional array
            for sentence in sentences_list:
                # Split the sentence into words
                sentence = sentence.translate(str.maketrans('','', string.punctuation))
                sentence = sentence.replace('\n', ' ').replace('. ', '.\n')       
                
                sentences[i-1].append(sentence)
    else:
        print(f"File {file_name} does not exist.")


# Accessing the array elements
# Example: first word in the first file (01.txt)
print(sentences[0][0])
# Example: first word in the second file (02.txt)
print(sentences[1][0])

from collections import defaultdict
# Create a hashed dictionary (word list)
word_list = defaultdict(list)

# Loop through the sentences in the multi-dimensional array
for i in range(len(sentences)):
    for j in range(len(sentences[i])):    
            # for k in range(len(sentences[i][j])):
            word = sentences[i][j]

            # Append the file name (index) to the word in the word list
            word_list[word].append(f"0{i+1}.txt")


count=0
# Print the word list
for word, files in word_list.items():
    if(len(files) > 1 and len(word) > 20):
        count+=1
        # print(len(word))
        print("\n")
        print(f"Sentence:\n{word} \nExists in files: {files}")

# print("Count: " , str(count))