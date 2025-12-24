---
title: Machine Learning
date: 2025-08-20
description: Machine Learning
summary: Machine Learning in Amazon AWS...
draft: false
tags:
  - CLF-C02
categories: AWS
series: AWS Cloud Practitioner
---
## Amazon Rekognition

##### <font color=#EBAC25>Finding objects, people, text, scenes in images and videos</font> using Machine Learning.

Facial analysis and facial search to perform user verification, people count, etc.

- <font color=#EBAC25>Use cases:</font>
	- Labeling
	- Content Moderation
	- Text Detection
	- Face Detection and Analysis (gender, age, range, emotions, ...)
	- Face Search and Verification
	- Celebrity Recognition
	- Pathing (e.g. sports game analysis)

| ![](./assets/AWS_Rekognition1.png) | ![](./assets/AWS_Rekognition2.jpeg) |
| ---------------------------------- | ----------------------------------- |
| ![](./assets/AWS_Rekognition3.png) | ![](./assets/AWS_Rekognition4.jpeg) |
_More about Rekognition:_ https://aws.amazon.com/rekognition
## Transcribe

##### Automatically <font color=#EB4925>converts speech to text</font>. Uses deep learning process called <font color=#EB4925>ASR (Automatic Speech Recognition)</font> to convert speech to text.

It has a capability of <font color=#EB4925>removing Personally Identifiable information (PII)</font> using Redaction.

It also supports <font color=#C7EB25>Automatic Language Identification</font> for multi-lingual audio.

- <font color=#EBAC25>Use cases:</font>
	- transcribe customer service calls
	- automate closed captioning and subtitling
	- generate metadata for media assets to create a fully searchable archive
## Polly

##### Opposite of Transcribe. <font color=#EB4925>Turns text into speech</font> using deep learning.
## Translate

**Amazon Translate** allows localizing the content - websites and applications - for international users. It has a capability of translating large volumes of text efficiently.
## Lex & Connect

- <font color=#EBAC25>Amazon Lex:</font> same technology that powers <font color=#EBAC25>Alexa</font>
	- Automatic Speech Recognition (ASR) to convert speech to text
	- Natural Language Understanding to recognize the intent of the text
	- Helps building chatbots or call center bots
- <font color=#EBAC25>Amazon Connect</font>
	- Receive calls, create contact flows, cloud-based <font color=#C7EB25>virtual contact center</font>
	- Can integrate with other CRM systems or AWS
	- No upfront payment, <font color=#EB4925>80% cheaper than traditional contact center solutions</font>
## Comprehend

##### Uses Machine Learning to <font color=#EB4925>find insights and relationships in the text</font> for <font color=#EB4925>Natural Language Processing - NLP.</font>

- Language of the text
- Extracting key phrases, places, people, brands or events
- Understand how positive or negative text is
- Analyzes text using tokenization and parts of speech
- Automatically organizes a collection of text files by topic

<font color=#EBAC25>Use cases:</font>

- Analyze customer interactions (emails) to find what leads to a positive or negative experience
- Create and group articles by topics
## SageMaker

Fully managed service for developers / data scientists to <font color=#EB4925>build Machine Learning (ML) models</font>. Model requires training.
## Kendra

Fully managed <font color=#C7EB25>document search service</font> powered by Machine Learning.

- Can extract answers from within a document (text, pdf, HTML, Power Point, MS Word, FAQs, etc.).
- Can learn from user interactions or feedback to promote preferred results (Incremental Learning)
- Has an ability to manually fine-tune search results (importance of data, freshness, custom, etc.)
## Personalize

Fully managed Machine Learning service to build apps with <font color=#C7EB25>real-time personalized recommendations</font>.

Same tech used by amazon.com

<font color=#EBAC25>Use Cases:</font> retail stores, media, entertainment...
## Textract

Automatically <font color=#C7EB25>extracts text, handwriting and data from scanned documents</font> using AI and ML.

Can read and process any type of document (PDF, images, etc.)
## Summary

- <font color=#EBAC25>Rekognition:</font> face detection, labeling, celebrity recognition
- <font color=#EBAC25>Transcribe:</font> audio to text (e.g. subtitles)
- <font color=#EBAC25>Polly:</font> text to audio
- <font color=#EBAC25>Translate:</font> translations
- <font color=#EBAC25>Lex:</font> build conversational bots / chatbots
- <font color=#EBAC25>Connect:</font> cloud contact center
- <font color=#EBAC25>Comprehend:</font> natural language processing
- <font color=#EBAC25>SageMaker:</font> machine learning for every developer and data scientist
- <font color=#EBAC25>Kendra:</font> ML-powered document search engine
- <font color=#EBAC25>Personalize:</font> real-time personalized recommendation
- <font color=#EBAC25>Textract:</font> detect text and data in documents (handwriting / scanned data)

---
## >> Sources <<

- Amazon Rekognition: https://aws.amazon.com/rekognition
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
