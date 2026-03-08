Documentation: Automated OD Request Data Extraction Workflow
1. Introduction

This workflow automates the process of extracting student details from an OD (On Duty) request document and converting the data into structured information using n8n automation and Google Gemini AI.

Traditionally, student details such as name and ID must be manually read from documents. This workflow removes manual work by automatically analyzing the document and extracting the required data.

The system uses AI-powered document analysis and automation tools to process the file and produce structured outputs.

2. Objectives

The main objectives of this workflow are:

Automatically extract student information from uploaded documents.

Convert unstructured document text into structured JSON data.

Prepare the extracted data for further automation such as:

Filling forms

Creating tables

Storing in databases

Sending notifications

3. Technologies Used
Technology	Purpose
n8n	Workflow automation platform
Google Gemini API	AI model used for document analysis
DOCX Document	Input file containing student data
JSON Format	Structured data format for extracted results
Browser Automation Node	Executes tasks based on extracted data
4. Workflow Architecture

The workflow consists of the following steps:

Document Upload
       ↓
Analyze Document (Gemini AI)
       ↓
Extract JSON Data
       ↓
Process Data in n8n
       ↓
Browser Task Execution

Each step performs a specific function to ensure the document data is correctly processed.

5. Workflow Components
5.1 Document Input

The system receives a DOCX document containing OD request information.

Example content inside the document:

Devank
ID: 2320015
Computer Science
Fri, Jan 3, 2025

Devansh Gupta
ID: 2320010
Computer Science
Sun, May 3, 2026

This information is unstructured and requires processing.

5.2 Document Analysis using Gemini

The Gemini AI model analyzes the document and extracts relevant fields.

The AI is instructed to extract:

Student Name

Student ID

Department

Date

Example AI prompt:

Analyze the OD request document.

Extract the following information:
1. Student names
2. Student IDs

Return the output as JSON.
5.3 Structured JSON Output

Gemini returns structured data in JSON format.

Example output:

{
 "students":[
  {"name":"Devank","id":"2320015"},
  {"name":"Devansh Gupta","id":"2320010"}
 ]
}

This structured format allows easy processing within the automation workflow.

5.4 Data Processing in n8n

The extracted JSON is processed using n8n expressions.

Example processing expression:

{{ JSON.parse($json.content.parts[0].text.replace(/```json|```/g,"")).students.map(s => "Name: " + s.name + ", ID: " + s.id).join("\n") }}

This expression performs the following actions:

Removes Markdown formatting.

Converts text into JSON.

Extracts student names and IDs.

Formats them into readable text.

5.5 Browser Task Execution

The processed data is then used in the Browser Automation Node.

The browser task may include:

Filling online forms

Entering student details into a website

Automating administrative tasks

Example final output used in automation:

Name: Devank, ID: 2320015
Name: Devansh Gupta, ID: 2320010
6. Benefits of the Workflow
Automation

Removes manual effort in reading and processing documents.

Accuracy

AI reduces human error in extracting information.

Scalability

The system can process large numbers of OD documents.

Integration

The workflow can integrate with:

Databases

Web applications

Notification systems

7. Future Improvements

Possible improvements for this workflow include:

Extracting additional fields such as:

Department

Event name

Approval status

Automatically filling institutional portals.

Storing student data in databases.

Adding verification steps before submission.

8. Conclusion

This workflow demonstrates how AI-powered document analysis combined with workflow automation can significantly improve administrative processes.

By integrating n8n and Gemini AI, the system efficiently extracts structured data from documents and prepares it for automated tasks, reducing manual work and increasing productivity.