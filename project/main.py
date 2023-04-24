
import csv

filename = "cc_data.csv" # Replace with your file name

last4ccnums = set()

with open(filename, "r") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        last4ccnum = row["last4ccnum"]
        last4ccnums.add(last4ccnum)

num_unique_last4ccnums = len(last4ccnums)
print("Number of unique last4ccnums:", num_unique_last4ccnums)
