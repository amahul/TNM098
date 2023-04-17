import pandas
import csv
import matplotlib.pyplot as plt
import numpy as np
from numpy import unique
from numpy import where
from sklearn.mixture import GaussianMixture
from sklearn.cluster import KMeans


cluster_color = ["red", "green", "blue", "yellow", "purple", "pink", "black"]
class DataPoint:
    def __init__(self, x, y, duration, time_stamp, fixation_index):  
        self.x = x
        self.y= y  
        self.duration = duration 
        self.index = fixation_index
        self.time_stamp = time_stamp
        self.cluster=None

    def __str__(self):
        return f'{self.x}i{self.y:+}j'
    
    def addCluster(self, cluster):
        self.cluster=cluster

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
                float(line[4]), # x
                float(line[5]), # y
                float(line[2]), # duration
                float(line[0]), # timestamp
                float(line[1])  # fixation index
            ))    
datatwo=np.array(datatwo)


# for line in data:   
#    plt.scatter(line.x, line.y,s=line.duration/10, c=line.time_stamp, cmap='plasma', alpha=0.5, vmin=120, vmax=280820)
# plt.colorbar()

# plt.show()

# exit()

#X, _ = make_classification(n_samples=1000, n_features=2, n_informative=2, n_redundant=0, n_clusters_per_class=1, random_state=4)
# define the model
model = KMeans(n_clusters=7)

# assign a cluster to each example
yhat = model.fit_predict(datatwo)
# retrieve unique clusters
clusters = unique(yhat)
# create scatter plot for samples from each cluster

for cluster in clusters:
    # get row indexes for samples with this cluster
    row_ix = where(yhat == cluster)[0]

    for i in row_ix:        
        # print(type)
        data[i].addCluster(cluster)
        # data[i].x = x
        # data[i].y= y
        

for line in data:   
    plt.scatter(line.index, line.cluster,c=cluster_color[line.cluster], cmap='plasma', alpha=0.5, vmin=0, vmax=800)
    
plt.show()

for line in data: 
    plt.scatter(line.x, line.y,c=cluster_color[line.cluster])


plt.show()

# show the plot
# plt.show()



exit()
fig = plt.figure()
ax = fig.add_subplot(projection='3d')
for line in data:
    ax.scatter(line.x, line.y, line.time_stamp, c=cluster_color[line.cluster] )

# Draw lines between the datapoints
for i in range(len(data)-1):
    ax.plot([data[i].x, data[i+1].x], [data[i].y, data[i+1].y], [data[i].time_stamp, data[i+1].time_stamp], color="black")

# Set the labels for the axes
ax.set_xlabel('X Label')
ax.set_ylabel('Y Label')
ax.set_zlabel('Z Label')


plt.show()