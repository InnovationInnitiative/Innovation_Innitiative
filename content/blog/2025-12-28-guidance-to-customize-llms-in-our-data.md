---
title: Guidance to Customize LLMs in Our Data
date: '2025-12-28T18:30:00.000Z'
author: Arpan Pal
category: Backend Engineering
excerpt: >-
  Large Language Models(LLMs) are very powerful models but they often gave a
  wrong result when they are tasked with something like Retrieval of Real Time
  Data or Queries which are Domain Specific.
---
### Abstract

Large Language Models(LLMs) are very powerful models but they often gave a wrong result when they are tasked with something like Retrieval of Real Time Data or Queries which are Domain Specific. In this article we will explore two approaches for overcoming limitations which are Fine Tuning and Retrieval Augmented Generation(RAG). Here we will analyse the difference between these two architectures, how we will implement these two strategies and Performance Analysis. In this Paper we will help people to select the optimal strategy to build AI applications which are specifically for context aware based by practical comparisons and pseudocodes.

### Introduction

Generative Artificial Intelligence(GenAI) follows a law which is that an LLM is very essential to take snapshot of Internet  at that moment when it finished its training. When we ask the base model that what happened yesterday at that event or what is the current scenario on the company’s private files then at that time it will either hallucinate a fact which is totally incorrect or refuse to give any answer.

Our challenge is not just the calling of an API but we have to figure out that how to connect the gap between a Dynamic Model and Frozen Model for private data. Currently based on the two solution our industry is spited.

**RAG(Retrieval Augmented Generation) :-** This process looks like we provide an open book exam to our model by retrieving the data which is relevant and then feed it to the prompt.

**Fine Tuning :-** This process is basically we teach our model new information by updating the neural internal weights.

This article will perfectly describe that which method is very powerful.

### Architectures

**RAG :-** It is not that it will modify any machine learning model but it will combine a generative model with a system which is retriever. When an user ask any question then the system will at first find a vectorial database for specific documents and then it will paste those databases into the context window of the model. The analogy behind it was that it  sounds like we gave a textbook to a student during his exam. So they will not memorize the facts but they should know hoe to rad and find it from the book.

The Equation is



$$ Similarity(\mathbf{Q}, \mathbf{D}) = \cos(\theta) = \frac{\mathbf{Q} \cdot \mathbf{D}}{\|\mathbf{Q}\| \|\mathbf{D}\|} = \frac{\sum_{i=1}^{n} Q_i D_i}{\sqrt{\sum_{i=1}^{n} Q_i^2} \sqrt{\sum_{i=1}^{n} D_i^2}} $$



Here,

**Q :-** User Query represented as vector.

**D:-** Document in the Vectorial Database.

Here 

**Score 1** indicates that those vectors each other are identical which means the context match is perfect.

**Score 0** indicates that those vectors each other are orthogenic which means that there will be no relevance.

**Fine Tuning :-** It works like at first we took a pre trained  model and train it later on small and relevant dataset. So that it will modify the internal weights of the neural network. The analogy behind it is that is sounds like a doctor went to a medical school to teach the subject named Neurology. They will internalize jargon and will remember new information. Now a days the modern approach is that we retrain all the parameters rarely. Now we use Parameter Efficient Fine Turing(PEFT) techniques to freeze our main model and trains only layers which are adaptive. For Example :- LoRA(Low Rank Adaptation).

### The Equation is



$$ h = W_0 x + \Delta W x = W_0 x + B A x $$



**The Explanation:**

"Where $W_0 \in \mathbb{R}^{d \times k}$ is frozen, $B \in \mathbb{R}^{d \times r}$, and $A \in \mathbb{R}^{r \times k}$ are trainable parameters with rank $r \ll \min(d, k)$.

Here

**W0 :-** Pre Trained weights

**W :-** Weight Matrix of the model which is pre trained

**A, B :-** Matrices which are rank decomposed.

**x :-** Hidden Laye Input

By using this formula we can reduce the total number of parameters which are trainable up to 10000 times so that it is possible to Fine-Tune all LLMs on customer GPUs

### Practical Comparison

**RAG :-** The process is that We embed that pdf book into the vector database. For example ChromaDB. The result is when any user ask any question, the system will find that paragraph exactly about the remoted work and will send it to the LLM. The Benefit will be if any change in policy occur we will simply update that pdf from the database. There will be no requirement of training. 

**Fine Turing :-** The result will be the answers of the model which gives fluently if the phrasing will match with that data which is trained. But the Problem is that that policy will change on next week so we have to must retain again our model. 

### RAG Implementation Concept using LangChain/Python

```python

# 1. Embed the User Query

query = "What is the remote work policy?"

query_vector = embeddings_model.embed_query(query)



# 2. Retrieve Relevant Context from Vector DB

# This searches for the most similar text chunks in your database

relevant_docs = vector_db.similarity_search(query_vector, k=3)



# 3. Construct the Augmented Prompt

context_text = "\n".join([doc.page_content for doc in relevant_docs])

prompt = f"""

You are an HR assistant. Answer the question based ONLY on the context below.

Context:

{context_text}

Question:

{query}

"""



# 4. Generate Answer

response = llm.predict(prompt)

print(response)
```


Critical Analysisthin the RAG pipeline to build it a robust system mostly as possible.

### Conclusion

RAG is the best choice for business related applications which required accuracy and current industrial information. But The sophistical choice will be Fine Tuning. It is best for The Teaching Purpose of the model To learn a new language which is specifically in a coding style or in a relevant medical language. As an AI engineer our job should be to combine those tools to avoid usage of a Fine Tuned Model to understand it better for those queries within the RAG pipeline to build it a robust system mostly as possible.

