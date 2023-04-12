import pandas
import csv
import matplotlib.pyplot as plt
import numpy as np
from numpy import unique
from numpy import where
from sklearn.mixture import GaussianMixture
from sklearn.cluster import KMeans

class DataPoint:
  def __init__(self,x,y, duration, FixationIndex):  
    self.x = x
    self.y= y  
    self.duration = duration 
    self.index = FixationIndex

    def __str__(self):
        return f'{self.x}i{self.y:+}j'

data = []
datatwo=[]
# open .tsv file
with open("EyeTrack-raw.tsv") as file:    
    # Passing the TSV file to 
    # reader() function
    # with tab delimiter
    # This function will
    # read data from file

    tsv_file = csv.reader(file, delimiter="\t")
    next(tsv_file)
    for line in tsv_file:        
        x = float(line[4])
        y = float(line[5])
        datatwo.append([x, y])
        data.append(DataPoint(
                float(line[4]),
                float(line[5]),
                float(line[2]),
                float(line[1])                
            ))    
datatwo=np.array(datatwo)
print(datatwo)
#for line in data:
#    plt.scatter(line.x, line.y,s=line.duration/10,c=1, alpha=0.5)
#plt.show()

#X, _ = make_classification(n_samples=1000, n_features=2, n_informative=2, n_redundant=0, n_clusters_per_class=1, random_state=4)
# define the model
model = KMeans(n_clusters=6)
# fit the model
# model.fit(datatwo)
# assign a cluster to each example
# yhat = model.predict(datatwo)
yhat = model.fit_predict(datatwo)
# retrieve unique clusters
clusters = unique(yhat)
# create scatter plot for samples from each cluster


fig = plt.figure()
ax = fig.add_subplot(projection='3d')
for cluster in clusters:
    # get row indexes for samples with this cluster
    row_ix = where(yhat == cluster)
    print(row_ix)
    # create scatter of these samples
    ax.scatter(datatwo[row_ix,0], datatwo[row_ix,1])
    ax.scatter(datatwo[row_ix+1,0], datatwo[row_ix+1,1])
# show the plot
plt.show()

exit()
fig = plt.figure()
ax = fig.add_subplot(projection='3d')
for line in data:
    ax.scatter(line.x, line.y, line.index)
    
plt.show()