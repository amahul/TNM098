from keras.applications import ResNet50
from keras.preprocessing import image
from keras import preprocessing
from keras.utils import load_img, img_to_array
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import csv 
import matplotlib.pyplot as plt


nImages = 12

features = []
with open("feature_vectors.csv", 'r') as file:
  csvreader = csv.reader(file)
  for row in csvreader:
    features.append(np.array(row))

# # Load the pre-trained model
# model = ResNet50(weights='imagenet', include_top=False)
# features = []
# for i in range(1, nImages+1):
#     print(i)
#     # Load an image and preprocess it
#     if i < 10:
#         img_path = "./images/0" + str(i) + ".jpg"
#     else: 
#         img_path = "./images/" + str(i) + ".jpg"        

#     print(img_path)
#     img = load_img(img_path, target_size=(224, 224))
#     x = img_to_array(img)
#     x = np.expand_dims(x, axis=0)
#     # x = preprocess_input(x)
#     print(x.shape)
#     # x = preprocessing(x)  

#     # Extract features from the last convolutional layer
#     pred = model.predict(x)
#     features.append(pred.flatten())



# with open('feature_vectors.csv', 'w', newline='') as file:
#     writer = csv.writer(file)
    
#     for line in features: 

#         writer.writerow(line)
      
            

# print(features[0][0])


imageIndex = 6

imgPath = "./images/0" + str(imageIndex) + ".jpg"

img = plt.imread(imgPath)
plt.imshow(img)
plt.show()

similarityarray = []
features1 = features[imageIndex-1].reshape(1, -1)

for i in range(0, nImages):    
    
    # Assume that we have two feature vectors
    features2 = features[i].reshape(1, -1)    

    # Compute the cosine similarity between the feature vectors
    similarity = cosine_similarity(features1, features2)
    if i == imageIndex - 1:
       similarityarray.append(-1)
    else:
        similarityarray.append(similarity)
    
    print(similarity)

    


maxIndex = np.argmax(np.array(similarityarray, dtype=object)) + 1 

# similarityarray.delete(maxIndex)
# secondIndex = np.argmax()


print(maxIndex)
imgPath = ""
if maxIndex < 10:
   imgPath = "./images/0" + str(maxIndex) + ".jpg"
else:
   imgPath = "./images/" + str(maxIndex) + ".jpg"

print(imgPath)
img = plt.imread(imgPath)
plt.imshow(img)
plt.show()


