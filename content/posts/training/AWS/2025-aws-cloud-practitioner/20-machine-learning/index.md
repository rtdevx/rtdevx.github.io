---
title: Machine Learning
date: 2025-08-20
description: Machine Learning
summary: Machine Learning in Amazon AWS...
draft: false
tags:
  - CLF-C02
categories: AWS
---
## Amazon Rekognition

##### <font color=#f1ef63>Finding objects, people, text, scenes in images and videos</font> using Machine Learning.

Facial analysis and facial search to perform user verification, people count, etc.

- <font color=#f1ef63>Use cases:</font>
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

##### Automatically <font color=#f43f5e>converts speech to text</font>. Uses deep learning process called <font color=#f43f5e>ASR (Automatic Speech Recognition)</font> to convert speech to text.

It has a capability of <font color=#f43f5e>removing Personally Identifiable information (PII)</font> using Redaction.

It also supports <font color=#10b981>Automatic Language Identification</font> for multi-lingual audio.

- <font color=#f1ef63>Use cases:</font>
	- transcribe customer service calls
	- automate closed captioning and subtitling
	- generate metadata for media assets to create a fully searchable archive
## Polly

##### Opposite of Transcribe. <font color=#f43f5e>Turns text into speech</font> using deep learning.
## Translate

**Amazon Translate** allows localizing the content - websites and applications - for international users. It has a capability of translating large volumes of text efficiently.
## Lex & Connect

- <font color=#f1ef63>Amazon Lex:</font> same technology that powers <font color=#f1ef63>Alexa</font>
	- Automatic Speech Recognition (ASR) to convert speech to text
	- Natural Language Understanding to recognize the intent of the text
	- Helps building chatbots or call center bots
- <font color=#f1ef63>Amazon Connect</font>
	- Receive calls, create contact flows, cloud-based <font color=#10b981>virtual contact center</font>
	- Can integrate with other CRM systems or AWS
	- No upfront payment, <font color=#f43f5e>80% cheaper than traditional contact center solutions</font>
## Comprehend

##### Uses Machine Learning to <font color=#f43f5e>find insights and relationships in the text</font> for <font color=#f43f5e>Natural Language Processing - NLP.</font>

- Language of the text
- Extracting key phrases, places, people, brands or events
- Understand how positive or negative text is
- Analyzes text using tokenization and parts of speech
- Automatically organizes a collection of text files by topic

<font color=#f1ef63>Use cases:</font>

- Analyze customer interactions (emails) to find what leads to a positive or negative experience
- Create and group articles by topics
## SageMaker

Fully managed service for developers / data scientists to <font color=#f43f5e>build Machine Learning (ML) models</font>. Model requires training.
## Kendra

Fully managed <font color=#10b981>document search service</font> powered by Machine Learning.

- Can extract answers from withing a document (text, pdf, HTML, Power Point, MS Word, FAQs, etc.).
- Can learn from user interactions or feedback to promote preferred results (Incremental Learning)
- Has an ability to manually fine-tune search results (importance of data, freshness, custom, etc.)
## Personalize

Fully managed Machine Learning service to build apps with <font color=#10b981>real-time personalized recommendations</font>.

Same tech used by amazon.com

<font color=#f1ef63>Use Cases:</font> retail stores, media, entertainment...
# Textract

Automatically <font color=#10b981>extracts text, handwriting and data from scanned documents</font> using AI and ML.

Can read and process any type of document (PDF, images, etc.)
## Summary

- <font color=#f1ef63>Rekognition:</font> face detection, labeling, celebrity recognition
- <font color=#f1ef63>Transcribe:</font> audio to text (e.g. subtitles)
- <font color=#f1ef63>Polly:</font> text to audio
- <font color=#f1ef63>Translate:</font> translations
- <font color=#f1ef63>Lex:</font> build conversational bots / chatbots
- <font color=#f1ef63>Connect:</font> cloud contact center
- <font color=#f1ef63>Comprehend:</font> natural language processing
- <font color=#f1ef63>SageMaker:</font> machine learning for every developer and data scientist
- <font color=#f1ef63>Kendra:</font> ML-powered document search engine
- <font color=#f1ef63>Personalize:</font> real-time personalized recommendation
- <font color=#f1ef63>Textract:</font> detect text and data in documents (handwriting / scanned data)

---
## >> Sources <<

- Amazon Rekognition: https://aws.amazon.com/rekognition

## >> Table of contents (CLF-C02) <<

|                                                                         |                                                                                     |                                                                                       |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [1. What is Cloud Computing]({{< ref "1-what-is-cloud-computing" >}})   | [2. IAM]({{< ref "2-iam" >}})                                                       | [3. Budget]({{< ref "3-budget" >}})                                                   |
| [4. EC2]({{< ref "4-ec2" >}})                                           | [5. Security Groups]({{< ref "5-security-groups" >}})                               | [6. Storage]({{< ref "6-storage" >}})                                                 |
| [7. AMI]({{< ref "7-ami" >}})                                           | [8. Scalability & High Availability]({{< ref "8-scalability-high-availability" >}}) | [9. Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})                   |
| [10. Auto Scaling Group]({{< ref "10-auto-scaling-groups" >}})          | [11. S3]({{< ref "11-s3" >}})                                                       | [12. Databases]({{< ref "12-databases" >}})                                           |
| [13. Other Compute Services]({{< ref "13-other-compute-services" >}})   | [14. Deployments]({{< ref "14-deployments" >}})                                     | [15. AWS Global Infrastructure]({{< ref "15-aws-global-infrastructure" >}})           |
| [16. Cloud Integrations]({{< ref "16-cloud-integrations" >}})           | [17. Cloud Monitoring]({{< ref "17-cloud-monitoring" >}})                           | [18. VPC]({{< ref "18-vpc" >}})                                                       |
| [19. Security and Compliance]({{< ref "19-security-and-compliance" >}}) | [20. Machine Learning]({{< ref "20-machine-learning" >}})                           | [21. Account Management and Billing]({{< ref "21-account-management-and-billing" >}}) |
| [22. Advanced Identity]({{< ref "22-advanced-identity" >}})             | [23. Other Services]({{< ref "23-other-services" >}})                               | [24. AWS Architecting & Ecosystem]({{< ref "24-aws-architecting-cosystem" >}})        |
## >> Disclaimer <<

{{< alert >}}
_Disclaimer: Content for educational purposes only, no rights reserved._

Most of the content in this series is coming from **Stephane Maarek's** [Ultimate AWS Certified Cloud Practitioner CLF-C02 2025](https://www.udemy.com/course/aws-certified-cloud-practitioner-new/) course on Udemy.

I highly encourage you to take the [Stephane's courses](https://www.udemy.com/user/stephane-maarek/) as they are awesome and really help understanding the subject.

_More about Stephane Maarek:_

- https://www.linkedin.com/in/stephanemaarek
- https://x.com/stephanemaarek

**This article is just a summary and has been published to help me learning and passing the practitioner exam.**
{{< /alert >}}
