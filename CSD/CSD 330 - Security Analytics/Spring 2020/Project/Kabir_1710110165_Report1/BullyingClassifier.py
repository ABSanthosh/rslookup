#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
df = pd.read_csv('C:/Kabir/College Work/Semester 6/CSD 330/Project/Data Sets/detecting-insults-in-social-commentary/train.csv', encoding='ISO-8859-1');


# In[2]:


#Import for regular expressions
import re
#Import for tokenisation, lemmatisation, etc.
import nltk


# In[3]:


nltk.download('punkt')
from nltk.tokenize import word_tokenize as wt 


# In[4]:


nltk.download('stopwords')
from nltk.corpus import stopwords


# In[5]:


from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()


# In[6]:


#View dataset schema
df.head()


# In[7]:


#Remove irrelevant features
df = df.drop('Date',axis=1)


# In[8]:


#Check for null values
import seaborn as sb
import matplotlib
sb.heatmap(df.isnull())


# In[9]:


comments = []
for i in range(df.shape[0]):
    comment = df.iloc[i, 1]
    #Regular expression for words with slashes
    slash_all = r'\s*(?:[\w_]*[/\\](?:[\w_]*[/\\])*[\w_]*)'
    #Remove words with slashes
    comment = re.sub(slash_all,' ',comment)
    #Remove special characters except '
    comment = re.sub('[^\'A-Za-z]',' ',comment)
    #Remove extra whitespace
    comment = comment.strip()
    #Change to lower case
    comment = comment.lower()
    #Tokenise
    tokenised_comment = wt(comment)
    #Remove stop words
    comments_processed = []
    for word in tokenised_comment:
        if word not in set(stopwords.words('english')):
            comments_processed.append(stemmer.stem(word))
    comment_text = " ".join(comments_processed)
    comments.append(comment_text)


# In[10]:


df2 = pd.read_csv('C:/Kabir/College Work/Semester 6/CSD 330/Project/Data Sets/detecting-insults-in-social-commentary/test_with_solutions.csv', encoding='ISO-8859-1');


# In[11]:


df2.head()


# In[12]:


cols_to_drop = ['Date','Usage']
df2 = df2.drop(cols_to_drop,axis=1)


# In[13]:


df2.head()


# In[14]:


#Check for null values
sb.heatmap(df2.isnull())


# In[15]:


comments_test = []
for i in range(df2.shape[0]):
    comment = df2.iloc[i, 1]
    #Regular expression for words with slashes
    slash_all = r'\s*(?:[\w_]*[/\\](?:[\w_]*[/\\])*[\w_]*)'
    #Remove words with slashes
    comment = re.sub(slash_all,' ',comment)
    #Remove special characters except '
    comment = re.sub('[^\'A-Za-z]',' ',comment)
    #Remove extra whitespace
    comment = comment.strip()
    #Change to lower case
    comment = comment.lower()
    #Tokenise
    tokenised_comment = wt(comment)
    #Remove stop words
    comments_processed = []
    for word in tokenised_comment:
        if word not in set(stopwords.words('english')):
            comments_processed.append(stemmer.stem(word))
    comment_text = " ".join(comments_processed)
    comments_test.append(comment_text)


# In[16]:


# Create feature matrix 
from sklearn.feature_extraction.text import CountVectorizer
matrix = CountVectorizer()


# In[17]:


X_train = matrix.fit_transform(comments).toarray()
y_train = df.iloc[:, 0]
X_test = matrix.transform(comments_test).toarray()
y_test = df2.iloc[:, 0]


# In[19]:


#Naive Bayes 
from sklearn.naive_bayes import GaussianNB
classifier = GaussianNB()
classifier.fit(X_train, y_train)

# predict class
y_pred = classifier.predict(X_test)

# Confusion matrix
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
cm = confusion_matrix(y_test, y_pred)
cr = classification_report(y_test, y_pred)

accuracy = accuracy_score(y_test, y_pred)


# In[20]:


print(accuracy)


# In[22]:


print(cm)


# In[23]:


print(cr)


# In[25]:


# Using simple Decision Tree classifier
from sklearn.tree import DecisionTreeClassifier


# In[42]:


classifier = DecisionTreeClassifier(max_depth=5)
classifier.fit(X_train, y_train)

# predict class
y_pred = classifier.predict(X_test)

# Confusion matrix
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
cm = confusion_matrix(y_test, y_pred)
cr = classification_report(y_test, y_pred)

accuracy = accuracy_score(y_test, y_pred)


# In[43]:


print(accuracy)


# In[44]:


print(cm)


# In[45]:


print(cr)


# In[49]:


#SVM
from sklearn.svm import SVC


# In[50]:


classifier = SVC()
classifier.fit(X_train, y_train)

# predict class
y_pred = classifier.predict(X_test)

# Confusion matrix
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
cm = confusion_matrix(y_test, y_pred)
cr = classification_report(y_test, y_pred)

accuracy = accuracy_score(y_test, y_pred)


# In[51]:


print(accuracy)


# In[52]:


print(cm)


# In[53]:


print(cr)

