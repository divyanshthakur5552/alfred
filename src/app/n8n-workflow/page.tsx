"use client"

import { ArrowRight, FileText, Brain, Database, Zap, CheckCircle, Users, Clock, Target, Settings, Code, Globe, Workflow } from "lucide-react"
import { MorphingText } from "@/components/ui/morphing-text"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { ShinyButton } from "@/components/ui/shiny-button"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { GlowCard } from "@/components/ui/spotlight-card"
import { FooterSection } from "@/components/footer-section"
import NavbarDemo from "@/components/resizable-navbar-demo"

export default function N8nWorkflowPage() {
  const technologies = [
    { 
      title: "n8n Automation", 
      description: "Workflow automation platform that connects different services and automates repetitive tasks with visual workflows.",
      link: "#"
    },
    { 
      title: "Google Gemini AI", 
      description: "Advanced AI model for document analysis and intelligent data extraction from unstructured content.",
      link: "#"
    },
    { 
      title: "Document Processing", 
      description: "Handles DOCX files containing student data and converts them into structured formats.",
      link: "#"
    },
    { 
      title: "JSON Output", 
      description: "Structured data format that enables easy integration with databases and other systems.",
      link: "#"
    },
    { 
      title: "Browser Automation", 
      description: "Executes automated tasks in web browsers based on the processed data.",
      link: "#"
    },
    { 
      title: "Data Integration", 
      description: "Seamlessly connects with databases, web applications, and notification systems.",
      link: "#"
    }
  ]

  const workflowSteps = [
    { step: "01", title: "Document Upload", desc: "Upload DOCX files containing student OD requests", icon: FileText },
    { step: "02", title: "AI Analysis", desc: "Gemini AI analyzes and extracts structured data", icon: Brain },
    { step: "03", title: "JSON Processing", desc: "Convert extracted data into structured JSON format", icon: Code },
    { step: "04", title: "Data Processing", desc: "Process and format data using n8n expressions", icon: Settings },
    { step: "05", title: "Browser Automation", desc: "Execute automated tasks with processed data", icon: Globe }
  ]

  const benefits = [
    { icon: Zap, title: "Automation", desc: "Removes manual effort in reading and processing documents" },
    { icon: Target, title: "Accuracy", desc: "AI reduces human error in extracting information" },
    { icon: Users, title: "Scalability", desc: "Process large numbers of OD documents efficiently" },
    { icon: Database, title: "Integration", desc: "Seamlessly integrate with databases and web applications" }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarDemo />
      <BackgroundRippleEffect />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div>
            <MorphingText 
              texts={["n8n", "Workflow"]} 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            />
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
              Automated OD Request Data Extraction
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Automate the process of extracting student details from OD request documents 
              using n8n automation and Google Gemini AI. Transform unstructured documents 
              into structured data effortlessly.
            </p>
            <ShinyButton className="px-8 py-4">
              <FileText className="w-5 h-5 mr-2" />
              View Workflow Details
            </ShinyButton>
          </div>
        </div>
      </section>

      {/* Workflow Architecture */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Workflow Architecture</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A streamlined 5-step process that transforms document processing from manual to automated
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {workflowSteps.map((item, idx) => (
              <div key={idx} className="relative">
                <GlowCard glowColor="blue" customSize className="h-full">
                  <div className="text-center h-full flex flex-col justify-center">
                    <item.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-blue-400 mb-3">{item.step}</div>
                    <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </GlowCard>
                {idx < workflowSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-6 h-6 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Technologies Used</h2>
            <p className="text-gray-400 text-lg">
              Powered by cutting-edge automation and AI technologies
            </p>
          </div>

          <HoverEffect items={technologies} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
        </div>
      </section>

      {/* Example Data Flow */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Data Transformation</h2>
            <p className="text-gray-400 text-lg">
              See how unstructured document data becomes structured JSON
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Input Document</h3>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 font-mono text-sm">
                <div className="text-gray-300">
                  <div className="text-blue-400">Devank</div>
                  <div className="text-gray-400">ID: 2320015</div>
                  <div className="text-gray-400">Computer Science</div>
                  <div className="text-gray-400">Fri, Jan 3, 2025</div>
                  <br />
                  <div className="text-blue-400">Devansh Gupta</div>
                  <div className="text-gray-400">ID: 2320010</div>
                  <div className="text-gray-400">Computer Science</div>
                  <div className="text-gray-400">Sun, May 3, 2026</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Structured Output</h3>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 font-mono text-sm">
                <pre className="text-green-400">
{`{
  "students": [
    {
      "name": "Devank",
      "id": "2320015"
    },
    {
      "name": "Devansh Gupta", 
      "id": "2320010"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

  

      {/* Future Improvements */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Future Enhancements</h2>
            <p className="text-gray-400 text-lg mb-10">
              Planned improvements to make the workflow even more powerful
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Enhanced Data Extraction</h3>
              <ul className="space-y-3">
                {["Department details", "Event name extraction", "Approval status tracking", "Date validation"].map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Advanced Automation</h3>
              <ul className="space-y-3">
                {["Auto-fill institutional portals", "Database integration", "Verification workflows", "Notification systems"].map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FooterSection/>
    </div>
  )
}