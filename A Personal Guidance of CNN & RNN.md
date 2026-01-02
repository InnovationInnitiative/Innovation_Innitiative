**A Personal Guidance of CNN \& RNN**



**Abstract**

When I starts my studies for Deep Learning, all the shortforms I felt very puzzled. The two most that puzzled my studies is Convolutional Neural Network (CNN) and Recurrent Neural Network (RNN). When I heard first these 2 names I thought those are black boxes which are interchangeable. However after all studies I realized that those 2 things represents two different ways of thinking fundamentally. One is Temporal and another one is spatial. I will share my way of thinking about these 2 architectures in this article. I will use these 2 nicknames “The Eye” and “The Memory” to make these 2 concepts better understandable.



**Introduction**

In my studies first understanding about neural network is simple Feed Forward Network. When I understood it perfectly It became very easy. I will describe you in a easy way. Just the input enters, magic happens internally, output came out. As simple as that.

But as you know that our Real word is not so simple. Images contain structures, sentences contain sequences. When I try to apply a network which is standard to these type of problems then it fails sadly. At that time I discover that we will need some specialized models to handle these types of specific datasets.

The two main things in Neural Networks are CNN \& RNN. For long time, I struggle so much to find the the correct scenario that when to apply CNN and when RNN. It was not until and unless I stop for looking to math and starts to look to the philosophy of architecture which it clicked.



**CNN**

After studying about convolution Neural Network I clearly understand that this function exactly do the job like our eyes. When I carefully look to a cat in photo, I do not scan each and every pixel in straight line. Instead that I look to the features like sharp ear, curve tail and relevant textures.

Actually CNN is basically Convolution Operation. For me, it is just the imagination term for sliding window. AT first we have to take a small filter which is called Kernel and we have to slide it through the full image to watch that a specific feature will exist or not.

So if we represented it mathematically then the equation will be



W :- Pattern Matcher

X :- The pixels

So in my prospective, if the pattern matches with pixels then output is high. If not then output is low. That is why CNNs  are Spatially Invariant. That’s why the can easily find an animal no matter it is to the top left corner or bottom right corner.

We can use CNN for cases like Object Detection, Image Classification \& Analysing Grid Data.



**RNN**

As per previous discussion I thing you understand that though CNN perform great at watching purposes but I have learned they are very poor at reading. Suppose I show any sentence to CNN “The taste of the food was very bad but the service was good” Then it is treating each and every word as the island which is isolated. It surely not understand that a word “but” can flip the sentiment of the sentence.

Thus Recurrent Neural Network(RNN) changed my way of thinking. After so much learning I understand that RNN is basically a Memory of the AI. In other networks they start taking fresh inputs after taking every inputs, but RNN keep the “Hidden State” which is basically a notepad where it writes all the things which it had seen previously.

So if we represented it mathematically then the equation will be



Here,

xt :- Current Input

ht-1 :- Memory for previous step

For me, the equation is telling that currently my thinking is the mixture of what I am just watching and I just though a few seconds ago. This helps model to perfectly understand the sequence and the context. We use RNN in cases of Time Series Prediction(Exa:- Stock Markets), Text Generation, Natural Language Processing (NLP) and Video Processing.



**Code**

import torch.nn as nn



class MyCNN(nn.Module):

&nbsp;   def \_\_init\_\_(self):

&nbsp;       super(MyCNN, self).\_\_init\_\_()

&nbsp;       # Looking at 3x3 pixel squares

&nbsp;       self.conv1 = nn.Conv2d(in\_channels=3, out\_channels=16, kernel\_size=3)

&nbsp;   def forward(self, x):

&nbsp;       return self.conv1(x)



class MyRNN(nn.Module):

&nbsp;   def \_\_init\_\_(self, input\_size, hidden\_size):

&nbsp;       super(MyRNN, self).\_\_init\_\_()

&nbsp;       # Processing sequences

&nbsp;       self.rnn = nn.RNN(input\_size, hidden\_size, batch\_first=True)

&nbsp;   def forward(self, x):

&nbsp;       # We get an output AND the final memory state

&nbsp;       out, hidden = self.rnn(x)

&nbsp;       return out, hidden



**Conclusion**

After spending all the time by studying CNN and RNN, at last I have stopped to ask myself Which Network performs Better and started to ask myself What is actually the Data of the networks? 

From my way of thinking,

If the data looks like Grid(Exa :- Board Games or Pixels) then I will definitely search for CNN.

If the data looks like Sequence(Exa:- Audio, Words, Time) then I will definitely search for RNN.

Though we definitely know that our world is moving very fast from old technologies to new innovative advantaged Technologies. Engineers are putting RNN to many tasks. So finally I want to tell you that In my education difference between CNN (Spatial Processing) and RNN (Sequential Processing) was the most vital step.



