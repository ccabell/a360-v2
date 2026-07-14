# Tab 1

**Laser Parameter Optimization Assistant (LPOA) \- Proof of Concept**

## Purpose:

The Laser Parameter Optimization Assistant (LPOA) is a prototype AI system designed to assist clinicians in optimizing laser treatment parameters. The focus of this Proof of Concept (POC) is to develop a Retrieval-Augmented Generation (RAG) model and a fine-tuned AI agent for specific laser systems.

This tool is strictly a clinical reference guide aimed at enhancing treatment precision and not a diagnostic system requiring 510(k) clearance. The primary goal is to provide treatment parameter recommendations, identify potential concern areas, and ensure safer, more effective usage of aesthetic laser devices.

## Key Features:

1. Integration with Device-Specific RAGs – Retrieval-based AI for optimal parameter selection based on pre-existing clinical data and laser specifications.  
2. Dynamic Parameter Optimization – Recommendations based on patient-specific inputs and real-time treatment adjustments.  
3. Clinical Reference for Safety & Best Practices – Highlights parameter limits and potential risk factors based on known safety guidelines.  
4. Explainable AI – Provides rationale behind parameter recommendations to assist clinical decision-making.

## Target Applications:

* Skin Resurfacing – Fractional CO2 lasers  
* Tattoo Removal & Pigmentation – Picosecond lasers  
* Hair Removal & Vascular Treatments – Nd:YAG lasers  
* Scalability – Potential for future expansion to additional laser-based treatments

---

## Project Plan: Development & Testing of LPOA POC

### Phase 1: Data Collection & RAG Setup

Narrative: The foundation of the LPOA POC will be built by gathering relevant clinical guidelines, laser device specifications, and treatment outcome data.

Approach:

1. Collect publicly available laser specifications and manufacturer guidelines.  
2. Use clinical training guides to create a structured dataset.  
3. Establish a Retrieval-Augmented Generation (RAG) framework to organize and access treatment protocols.

Deliverables:

* Dataset of laser parameters and treatment guidelines.  
* Structured knowledge base for RAG retrieval.

---

### Phase 2: AI Model Development

Narrative: Development of a fine-tuned model to generate treatment recommendations and identify potential concern areas based on input patient data.

Approach:

1. Fine-tune a transformer-based model using structured laser treatment data.  
2. Implement parameter optimization algorithms.  
3. Ensure AI-generated recommendations align with safety thresholds.

Deliverables:

* Initial AI model trained for parameter recommendations.  
* Basic risk flagging system based on known treatment safety protocols.  
* Model performance evaluation against test cases.

---

### Phase 3: User Interface & Basic Integration

Narrative: Develop a simple user interface for testing the AI model’s effectiveness in clinical workflow simulation.

Approach:

1. Build a minimal dashboard for clinicians to input patient-specific treatment variables.  
2. Display AI-recommended parameters along with an explainability feature.  
3. Ensure results are formatted for easy clinician review (not automated system control).

Deliverables:

* Functional UI prototype for treatment parameter recommendations.  
* Basic visualization of AI decision rationale.  
* User testing feedback for refinement.

[https://pma.nextnlp.com/](https://pma.nextnlp.com/)  
[2:14](https://aesthetic360.slack.com/archives/D071DTN23S5/p1759342467737099)  
User: chris  
Pass: a360\_chris 

---

### Phase 4: Validation & Testing

Narrative: Conduct initial tests to assess the accuracy, reliability, and usability of the AI-generated recommendations.

Approach:

1. Validate AI outputs against known safe and effective treatment settings.  
2. Conduct pilot testing with expert review of AI recommendations.  
3. Gather clinician feedback to refine the model’s accuracy and usability.

Deliverables:

* Test report on AI model reliability and alignment with treatment standards.  
* Feedback-driven improvements to the AI model and user interface.  
* Risk assessment and documentation of system limitations.

---

### Phase 5: Refinement & Expansion Strategy

Narrative: Refining the AI model and planning for potential expansion into a more robust clinical reference tool.

Approach:

1. Adjust the AI model based on clinician feedback and validation results.  
2. Enhance data coverage to improve RAG responses.  
3. Identify additional laser treatment categories for future integration.

Deliverables:

* Updated model with improved accuracy and transparency.  
* Plan for expanding the dataset and supported laser treatments.  
* Documentation of best practices for integrating AI into clinical workflows.

---

## Summary:

The LPOA POC will serve as a clinical reference guide, offering optimized treatment parameter recommendations without automating diagnosis or direct device control. This initial development will demonstrate the feasibility of AI-assisted treatment planning for laser-based procedures while maintaining compliance with regulatory considerations.

**What problem are we solving?**

Aesthetic laser manufacturers often struggle to provide adequate training for users of their equipment, leading to facial burns and poor outcomes for patients. This issue is prevalent in the aesthetic laser industry and has several contributing factors:

1. Inadequate training from suppliers: Many laser operators report receiving poor training from their equipment suppliers. One experienced trainer notes that about 80% of his trainees have previously been trained by suppliers but still struggle to achieve good results[1](https://mikemurphyblog.com/2024/03/01/why-is-suppliers-trying-so-dismal/). This suggests that supplier-provided training is often insufficient.  
2. Emphasis on safety over efficacy: Manufacturers often design their settings to minimize potential skin damage, which is commendable. However, these "safe" settings frequently lead to poor or non-existent results, even after multiple treatment sessions[1](https://mikemurphyblog.com/2024/03/01/why-is-suppliers-trying-so-dismal/). This approach prioritizes avoiding liability over achieving optimal outcomes for patients.  
3. Resistance to updating training methods: Some companies in the aesthetic laser/IPL industry continue to use outdated training techniques and refuse to update their methods. This results in the perpetuation of ineffective practices and outdated information[1](https://mikemurphyblog.com/2024/03/01/why-is-suppliers-trying-so-dismal/).  
4. Incorrect laser settings: In one reported case, a laser therapist used incorrect settings during a hair removal treatment, resulting in burns to the patient's face, chin, and neck area[2](https://www.hdc.org.nz/decisions/search-decisions/2022/21hdc00153/). This highlights the importance of proper training on equipment settings and their impact on different skin types.  
5. Lack of standardized training programs: Historically, there were few rules governing laser treatments, leading to a high risk of consumer injury. Standardized laser training programs were nonexistent, contributing to the problem of inadequate operator skills[3](https://nationallaserinstitute.com/blog/cosmetic-laser-training/laser-laws-lowdown-hair-removal/).  
6. Insufficient training hours: Research suggests that practitioners should receive a minimum of 30 hours of cosmetic laser training, regardless of their professional background. However, many manufacturers' training programs may not meet this recommended duration[3](https://nationallaserinstitute.com/blog/cosmetic-laser-training/laser-laws-lowdown-hair-removal/).  
7. Limited support for secondhand devices: Users who purchase secondhand laser devices often struggle with a lack of proper training and support. They may not be eligible to speak with authorized clinical educators about using the device to its full capacity, leading to improper use and potential safety risks[4](https://candelamedical.com/resources/aesthetic-blogs/top-reasons-why-you-shouldnt-buy-a-secondhand-laser-device/).

**Supporting Articles:**    
[https://mikemurphyblog.com/2024/03/01/why-is-suppliers-trying-so-dismal/](https://mikemurphyblog.com/2024/03/01/why-is-suppliers-trying-so-dismal/)  
[https://www.hdc.org.nz/decisions/search-decisions/2022/21hdc00153/](https://www.hdc.org.nz/decisions/search-decisions/2022/21hdc00153/)  
[https://nationallaserinstitute.com/blog/cosmetic-laser-training/laser-laws-lowdown-hair-removal/](https://nationallaserinstitute.com/blog/cosmetic-laser-training/laser-laws-lowdown-hair-removal/)

Chris Note:  This is a blog article draft I am working on which references this product and its potential:

Here's the refined blog article with a **thought-leadership tone**, blending **informative insights with a compelling narrative** while remaining skimmable for busy aesthetic professionals.

---

# **The Future of AI in Aesthetic Laser Medicine: A Revolution in Precision and Patient Safety**

In the evolving landscape of aesthetic medicine, **laser technology stands as both a marvel and a challenge**. From resurfacing skin to reducing pigmentation, tightening tissues, and removing hair, these treatments require more than just advanced devices—they demand a **deep understanding of physics, biology, and individual patient factors**.

For seasoned professionals, laser treatments can feel like an art form, sculpted through years of hands-on experience. But even the most skilled practitioners know the delicate balance they must strike—between efficacy and safety, between power and precision. The reality is that **treatment outcomes remain highly dependent on human expertise**, and this leaves room for variability, inefficiencies, and, in some cases, preventable complications.

What if artificial intelligence (AI) could **augment human skill, enhance precision, and refine decision-making in real-time**? What if it could **help practitioners optimize parameters effortlessly**, making every treatment as precise as a master surgeon’s scalpel?

The next evolution in aesthetic laser medicine may not be in **newer wavelengths or more powerful devices**, but rather in **how we apply intelligence to existing technology**—ushering in an era of AI-driven precision, consistency, and safety.

---

### **The Complexity of Laser Treatments: Why Expertise Isn’t Enough**

Aesthetic laser treatments are unlike any other procedure. They don’t follow a one-size-fits-all approach, and their success hinges on **a complex interplay of factors**:

* **Patient variables**: Skin type, underlying conditions, previous treatments, and healing tendencies all affect laser response.  
* **Device settings**: Wavelength, fluence, pulse duration, spot size, and cooling mechanisms must be tailored with extreme accuracy.  
* **Real-time reactions**: The skin’s response to each pulse can indicate whether the settings need adjusting—requiring sharp clinical intuition.

This intricate web of decision-making places a **huge cognitive load on practitioners**. The difference between a **perfectly executed treatment** and a **compromised result** can be **a fraction of a second, a slight misjudgment in fluence, or an oversight in patient history**.

While **training and experience** help refine these skills, no human can process **millions of clinical cases, patient variables, and evolving best practices** instantaneously. **But AI can.**

---

### **AI as the Next Step in Aesthetic Laser Evolution**

The promise of AI isn’t just automation—it’s **augmentation**. Imagine an AI-powered assistant that **learns from thousands of successful treatments**, recognizes **subtle risk factors before complications arise**, and **guides practitioners toward the safest, most effective settings**.

This isn’t science fiction. It’s the natural progression of **medicine meeting machine intelligence**.

#### **An AI-Driven Approach Could Bring Transformational Benefits:**

🟢 **Enhanced Precision & Real-Time Optimization**  
 What if, instead of relying on **trial-and-error adjustments**, AI could instantly **suggest the most effective laser settings** based on skin type, age, and past treatments? A system trained on **millions of treatment outcomes** could continuously **refine its recommendations**, ensuring every pulse is optimized for **maximum efficacy and minimum risk**.

🟢 **Safer Treatments, Fewer Complications**  
 Burns, post-inflammatory hyperpigmentation, and suboptimal results are often the result of **misjudged parameters or unforeseen skin reactions**. AI could **analyze the skin in real-time**, detecting potential risks **before** they become complications. It could alert practitioners when **adjustments are needed mid-procedure**, acting as an intelligent co-pilot rather than a passive tool.

🟢 **Bridging the Training Gap & Standardizing Excellence**  
 Even experienced practitioners **continually refine their skills**, and newer clinicians face **steep learning curves**. AI could act as a **training companion**, offering case-based guidance and **automated learning tools** to bridge gaps in experience. More importantly, AI could **reduce inconsistencies across clinics**, ensuring patients receive **the same high-quality treatment**, regardless of location or provider skill level.

🟢 **Predictive Analytics for Personalized Outcomes**  
 Every patient’s skin is different, and **treatment responses can be unpredictable**. AI could analyze **past treatment data** to **predict how a patient’s skin will react**, allowing practitioners to **fine-tune protocols with confidence**. This level of **predictive precision** could drastically improve patient satisfaction and long-term results.

---

### **A Future Where AI & Human Expertise Work Together**

The most important takeaway? AI is **not here to replace practitioners**—it’s here to **empower them**.

Aesthetic medicine will always be **a human profession**, rooted in **clinical expertise, intuition, and patient relationships**. What AI offers is **the ability to make decisions more efficiently, reduce uncertainty, and optimize results**—leading to **better patient experiences and safer, more predictable outcomes**.

Imagine a future where:

* **Practitioners enter a patient’s details, and AI generates the most effective treatment plan based on past successes.**  
* **Laser settings auto-adjust in real-time to optimize results while preventing adverse effects.**  
* **New clinicians gain confidence and skill faster, with AI acting as a mentor alongside traditional training.**

This isn’t a distant dream. It’s a **logical next step**—one that could revolutionize the **standards of care in aesthetic medicine**.

---

### **Embracing AI: The Time is Now**

The aesthetic industry has long thrived on **innovation**, from the earliest CO₂ lasers to today’s advanced picosecond technology. Yet, **the true revolution may not be in the lasers themselves, but in how we use them**.

As AI-driven decision-making becomes a reality in **fields like radiology and surgery**, aesthetic medicine **must not be left behind**.

For those who **embrace AI**, the benefits are clear:  
 ✅ More **consistent** results.  
 ✅ Fewer **treatment errors** and **safety concerns**.  
 ✅ More **efficient** training and **clinical decision support**.  
 ✅ An **elevated standard of care** that puts **patients first**.

The industry is standing at a crossroads: **continue relying on manual expertise alone, or step forward into a new age of AI-assisted precision.**

The question isn’t whether AI **should** be a part of aesthetic medicine. The question is: **how soon can we begin using it to make aesthetic treatments safer, more effective, and more personalized than ever before?**

It’s time to **start the conversation, explore the possibilities, and embrace the next era of AI-powered aesthetics.**

---

This version offers **thought leadership, a compelling narrative, and a clear vision of AI’s potential impact**, while remaining **skimmable** for busy professionals. Let me know if you'd like any further refinements\!

# Prompt System

# **Laser Parameter Optimization Assistant (LPOA) – Prompting System Requirements**

**Version 1.0 – For Engineering Implementation**

---

# **1\. Purpose of This Document**

This specification describes how the **prompting system** for the Laser Parameter Optimization Assistant (LPOA) must function across the UI, backend, and model execution layers.

The goal is to:

* Allow clean, simple **display prompts** in the UI

* Inject **patient-specific structured fields** into the actual prompt sent to the model

* Maintain **hidden “complex prompts”** that differ from the text shown to the user

* Support a library of suggested prompts

* Ensure consistency in how prompts are constructed, stored, and executed

This system must allow the model to always receive a fully structured, highly detailed instruction set while keeping the user experience simple and intuitive.

---

# **2\. System Design Overview**

## **2.1 Prompt Types**

There are two distinct prompt types in the system:

### **A. Display Prompt (User-facing, simple)**

* Short, friendly prompt label

* Appears in dropdown menus or “Suggested Prompts”

* Not the actual text sent to the LLM

* Example:  
   **Display Prompt:** *“Optimal settings for Laser Hair Removal”*

### **B. Execution Prompt (Hidden, complex)**

* The real prompt sent to the LPOA model

* Contains detailed instructions, structured output requirements, and injection points for patient/device data

* Example:  
   **Execution Prompt:**  
   “Using the provided patient skin type, treatment area, wavelength, and laser mode, give the manufacturer-recommended parameters for laser hair removal. Include fluence, pulse duration, spot size, cooling requirements, and safety notes. Cite the exact pages from the operator manual.”

**Important:**  
 These two prompts are *not* identical.  
 The Display Prompt is for UI clarity; the Execution Prompt is for model accuracy.

---

# **3\. Prompt Library Structure**

## **3.1 Database Fields**

Each prompt stored in Supabase (or similar) must include:

| Field | Description |
| ----- | ----- |
| **id** | UUID |
| **display\_text** | What the user sees (simple, short) |
| **execution\_prompt** | The full complex prompt sent to the model |
| **category** | Optimization / Safety / Troubleshooting / Education |
| **required\_fields** | JSON list of patient/device fields needed to assemble final prompt |
| **is\_suggested** | Boolean for whether it appears on the Suggested Prompt list |
| **version** | Prompt versioning for traceability |

Example:

`{`  
  `"display_text": "Optimal settings for Laser Hair Removal",`  
  `"execution_prompt": "Using the provided patient skin type, treatment area, wavelength, and laser mode, provide the manufacturer-recommended parameters for laser hair removal including fluence, pulse duration, spot size, cooling method, and safety precautions. Include citations from the operator manual.",`  
  `"category": "Optimization",`  
  `"required_fields": ["skin_type", "treatment_area", "wavelength", "mode"],`  
  `"is_suggested": true`  
`}`

---

# **4\. Patient Information & Field Injection**

## **4.1 Data Fields Entered by User**

The UI will collect structured patient/device fields such as:

* Skin Type

* Treatment Area

* Wavelength

* Mode / Handpiece

* Lesion Type

* Tissue Characteristics

* Optional notes

These fields will **not** be typed directly into the prompt by the user.

## **4.2 Backend Prompt Construction**

When the user executes a prompt:

1. Retrieve the **execution\_prompt** from the database

2. Retrieve all patient/device fields

3. Assemble a final prompt that looks like:

---

### **Final Prompt Example — Generated Automatically**

`Patient Information:`  
`- Skin Type: Fitzpatrick IV`  
`- Treatment Area: Lower legs`  
`- Wavelength: 1064 nm`  
`- Mode: Nd:YAG`

`Instruction:`  
`Using the provided patient details, give the manufacturer-recommended parameters for Nd:YAG laser treatment for vascular lesions. Include fluence, pulse duration, spot size, cooling, and any safety notes. Cite all relevant sections of the operator manual and return parameters in structured format.`

---

# **5\. How “Suggested Prompts” Work**

## **5.1 User Experience**

Users will see a list of simple suggested prompts such as:

* “Optimal settings for vascular lesions”

* “Parameters for hair removal”

* “Best cooling method for this treatment”

* “Troubleshooting erythema”

These are *labels only*.

## **5.2 Hidden Execution Prompts**

Behind each label is a **much more detailed prompt**.

### **Example:**

#### **What the user sees:**

*“Troubleshooting erythema”*

#### **What the model receives:**

`Given the selected wavelength, handpiece, and treatment parameters, summarize the manufacturer’s recommended adjustments for excessive erythema or purpura. Describe fluence reductions, pulse width adjustments, cooling modifications, post-care guidance, and relevant contraindications. Cite all applicable pages from the operator manual.`

This ensures:

* UI remains simple

* LPOA receives full context and precision

---

# **6\. Prompt Assembly Rules**

1. **Execution prompts must never contain inline curly brace variables**

   * All variable injection happens through structured fields only

   * Prompts remain clean, stable, and reliable for the LLM

2. **All execution prompts must be written so they stand alone**

   * The prompt should still make sense even if new variables are added later

3. **All LPOA responses must follow the system prompt’s structured format**

   * Answer

   * Parameters

   * Safety Notes

   * Citations

   * Follow-up Questions

4. **If a required field is missing, the system should block execution**

   * With a message such as:  
      “Skin Type is required for this prompt.”

---

# **7\. Example: Three Full Prompt Pairs**

### **A. Laser Hair Removal**

**Display Prompt:**  
 “Optimal settings for laser hair removal”

**Execution Prompt:**  
 “Using the provided patient skin type, treatment area, wavelength, and laser mode, provide the manufacturer-recommended parameters for laser hair removal including fluence, pulse duration, spot size, cooling method, passes, and safety warnings. Cite exact pages.”

---

### **B. Vascular Lesions**

**Display Prompt:**  
 “Vascular lesion parameters”

**Execution Prompt:**  
 “Using the supplied patient skin type, target area, vessel diameter, and Nd:YAG wavelength, summarize recommended parameters including fluence range, pulse width, spot size, cooling, and contraindications. Include exact page citations from the operator manual.”

---

### **C. Troubleshooting**

**Display Prompt:**  
 “Troubleshooting erythema”

**Execution Prompt:**  
 “Based on the wavelength, mode, and treatment response, provide the manufacturer’s recommended adjustments for reducing erythema or purpura, including fluence changes, pulse duration adjustments, cooling strategies, and post-treatment steps. Cite all relevant sections of the manual.”

---

# **8\. Summary of Requirements for Engineering**

### **Frontend**

* Display short, user-friendly prompt names

* Collect structured patient/device fields

* Send prompt ID \+ structured fields to backend

### **Backend**

* Retrieve execution\_prompt

* Merge fields into a final structured prompt

* Send final prompt to the LPOA completion endpoint

* Return structured output to frontend

### **Database**

* Must store display text and execution prompts separately

* Must store required fields and categories

* Must support versioning

### **Model**

* Must always receive:

  1. System Prompt

  2. Execution Prompt

  3. Structured Field Summary

  4. Raw user text input (optional)

# Prompts

Excellent — here’s what you’re asking for:

1. A **system prompt** that defines how the **Laser Parameter Optimization Assistant (LPOA)** should behave, think, and respond.

2. A set of **deep, domain-level prompts** that will populate your *Prompt Library*, designed to pull detailed clinical and technical intelligence from the Joule Operator Manual (and other future devices).

These are written for **integration into your agent framework** — you can drop the system prompt into the OpenAI Agent Builder configuration, and the prompt library into Supabase or your internal prompt catalog.

---

# **🧠 SYSTEM PROMPT – *Laser Parameter Optimization Assistant (LPOA)***

You are the Laser Parameter Optimization Assistant (LPOA), an expert AI trained to analyze and interpret manufacturer laser operator manuals, starting with the Sciton Joule Operator Manual.

Your purpose is to provide clinicians with precise, evidence-grounded laser parameter guidance, technical insights, and operational intelligence. Every response you generate must be derived directly from the content of the referenced manual, not from outside information or assumptions.

\#\# Behavior  
\- Always provide detailed, technically correct answers that reference the manufacturer’s specifications, tables, and safety guidance.  
\- Never improvise values or recommendations; if the information is not explicitly in the manual, clearly state “Not specified in the operator manual.”  
\- Include \*\*citations\*\* in every answer, referencing exact page numbers and section titles.  
\- When appropriate, explain \*why\* a parameter is used (e.g., fluence, pulse width, spot size) in terms of its effect on tissue interaction or patient outcome.  
\- Maintain a professional, clinical tone suitable for a physician or laser operator.  
\- When responding to parameter optimization questions, always return structured outputs that include:  
  \- Recommended parameter ranges  
  \- Wavelength or mode used  
  \- Safety and contraindication notes  
  \- Suggested cooling method  
  \- Maintenance or calibration notes (if relevant)  
  \- Exact page citations

\#\# Output Format  
All answers should follow this structure:

\*\*Answer:\*\*  
\[Detailed response here\]

\*\*Parameters (if applicable):\*\*  
\- Wavelength:  
\- Fluence:  
\- Pulse Duration:  
\- Spot Size:  
\- Cooling Method:  
\- Overlap/Passes:

\*\*Safety Notes:\*\*  
\[Summarize manufacturer warnings or contraindications.\]

\*\*Citations:\*\*  
(Page X, “Section Name”), (Page Y, “Parameter Table – Nd:YAG Settings”)

\*\*Suggested Follow-Up Questions:\*\*  
\[List 2–3 contextually relevant next questions the user might ask.\]

\#\# Context  
\- You are working with a vectorized, citation-ready version of the Joule Operator Manual.  
\- You can retrieve exact content chunks with page metadata.  
\- When a doctor provides structured inputs (e.g., Skin Type, Area, Wavelength, Device Mode), incorporate these into your reasoning chain.  
\- All recommendations must be compliant with the content of the manual.

---

# **⚙️ PROMPT LIBRARY (ADVANCED CLINICAL \+ TECHNICAL PROMPTS)**

Below are **12 deep prompts** for your LPOA library.  
 Each one is **realistic, high-value, and reference-intensive** — designed to extract granular, expert-level information from the manual.

| \# | Prompt Title | Prompt Text | Variables (optional) | Purpose |
| ----- | ----- | ----- | ----- | ----- |
| 1 | **Parameter Optimization by Patient Type** | “For a patient with skin type {{skin\_type}} undergoing {{treatment\_type}} on the {{area}} using the {{wavelength}} mode, provide optimal treatment parameters (fluence, pulse duration, spot size, cooling). Include manufacturer cautions, power limits, and reference the relevant charts.” | skin\_type, treatment\_type, area, wavelength | Personalized clinical setting generation |
| 2 | **Comparative Settings Across Skin Types** | “Compare recommended Joule settings between Fitzpatrick types II, IV, and VI for {{treatment\_type}}. Explain how pulse duration and fluence should vary, and reference the manufacturer’s rationale or tables.” | treatment\_type | Educational comparison |
| 3 | **Laser-Tissue Interaction Deep Dive** | “Explain how fluence and pulse duration interact to affect tissue response in {{mode}} mode according to manufacturer design principles. Reference where in the manual this is discussed.” | mode | Training/education |
| 4 | **Overlapping and Passes** | “How many passes or overlaps are recommended in the Joule manual for {{treatment\_type}} with {{wavelength}}? Include scanning speed, overlap percentages, and safety notes.” | treatment\_type, wavelength | Technique optimization |
| 5 | **Spot Size and Depth Dynamics** | “Summarize how changing spot size from small (7 mm) to large (12 mm) affects energy delivery, depth, and clinical outcomes according to the manual. Include fluence adjustments required to maintain constant energy density.” | none | Device physics interpretation |
| 6 | **Epidermal Cooling Protocols** | “List the recommended epidermal cooling methods and device settings for different skin types and laser wavelengths. Explain the rationale for cryogen spray vs contact cooling where described.” | none | Safety & comfort guidance |
| 7 | **Vascular Lesion Treatment Parameters** | “Provide detailed recommended settings and rationale for treating vascular lesions using the Nd:YAG 1064 nm handpiece. Include vessel diameter ranges, spot sizes, pulse durations, and cooling techniques.” | none | Clinical parameter lookup |
| 8 | **Contraindications & Warnings** | “List all contraindications, pre-treatment cautions, and patient factors where the Joule laser should not be used, according to manufacturer safety sections.” | none | Safety/compliance summary |
| 9 | **Maintenance & Calibration** | “Explain the required maintenance, calibration intervals, and laser energy verification process for the Joule system. Include references to any power meter or test pulse instructions.” | none | Engineering / maintenance |
| 10 | **Clinical Case Adjustment Logic** | “If a user observes excessive erythema or purpura after a Nd:YAG treatment, what parameter adjustments or cooling modifications does the manual recommend to reduce complications?” | none | Problem-based troubleshooting |
| 11 | **Mode Comparison – 1064 vs 2940 nm** | “Compare manufacturer-recommended parameters and tissue targets between the Joule 1064 nm (Nd:YAG) and 2940 nm (Er:YAG) modes. Explain how absorption characteristics influence parameter choice.” | none | Comparative learning |
| 12 | **Laser Safety Protocol** | “Detail the full safety procedure before and during laser operation, including eyewear specifications, room setup, warning signage, and smoke evacuation recommendations.” | none | Training & compliance |

---

# **🧠 Example Dynamic Prompt (Populated with Variables)**

“For a **Fitzpatrick type IV** patient undergoing **vascular lesion removal** on the **legs** using the **1064 nm Nd:YAG** mode, provide optimal treatment parameters including fluence, pulse duration, spot size, and cooling. Reference the manufacturer’s specifications and include safety notes and citations from the Joule manual.”

---

# **🧩 Implementation Notes**

* Each prompt can be stored in Supabase under a `prompt_library` table:

| Column | Type | Description |
| ----- | ----- | ----- |
| id | UUID | Primary key |
| title | TEXT | Prompt title |
| body | TEXT | Full prompt text with variables |
| category | TEXT | e.g., “Optimization”, “Safety”, “Maintenance” |
| variables | JSON | Expected variable inputs (if any) |

Example entry:

{  
  "title": "Parameter Optimization by Patient Type",  
  "body": "For a patient with skin type {{skin\_type}} undergoing {{treatment\_type}} on the {{area}} using the {{wavelength}} mode, provide optimal treatment parameters...",  
  "variables": \["skin\_type", "treatment\_type", "area", "wavelength"\]  
}

Your UI can inject these variables dynamically when the user selects a prompt and fills in structured fields.

---

JSON:

# Prompts 2

Excellent — below is a **fully structured JSON-ready version** of the LPOA **System Prompt** and **Prompt Library**, complete with **five example variable options** for each variable your UI will support.

You can hand this directly to your developers for ingestion into **Supabase**, **Agent Builder**, or any **Prompt Management Service** you use.  
 Everything is cleanly formatted and ready for programmatic use.

---

## **🧠 SYSTEM PROMPT (JSON Version)**

{  
  "system\_prompt": {  
    "name": "Laser Parameter Optimization Assistant (LPOA)",  
    "role": "system",  
    "content": "You are the Laser Parameter Optimization Assistant (LPOA), an expert AI trained to analyze and interpret manufacturer laser operator manuals, starting with the Sciton Joule Operator Manual.\\n\\nYour purpose is to provide clinicians with precise, evidence-grounded laser parameter guidance, technical insights, and operational intelligence. Every response must be derived directly from the content of the referenced manual, not from outside assumptions.\\n\\n\#\#\# Behavior\\n- Always base answers on manufacturer documentation only.\\n- If data is missing, say: 'Not specified in the operator manual.'\\n- Include citations for every answer with page number and section name.\\n- Provide structured, detailed responses with parameters, safety notes, and reasoning.\\n- Maintain a professional, clinical tone suitable for physicians.\\n\\n\#\#\# Output Structure\\n\*\*Answer:\*\* \[Detailed summary or explanation\]\\n\\n\*\*Parameters (if applicable):\*\*\\n- Wavelength:\\n- Fluence:\\n- Pulse Duration:\\n- Spot Size:\\n- Cooling Method:\\n- Overlap/Passes:\\n\\n\*\*Safety Notes:\*\* \[Summarize manufacturer cautions or contraindications.\]\\n\\n\*\*Citations:\*\* (Page X, 'Section Name')\\n\\n\*\*Suggested Follow-Up Questions:\*\* \[List 2–3 related clinical questions\]\\n\\n\#\#\# Context\\n- You have access to a vectorized, citation-ready version of the Joule Operator Manual.\\n- You can reference metadata including page numbers, sections, and figures.\\n- Incorporate structured variables (Skin Type, Area, Wavelength, Mode) when available.\\n- Ensure all recommendations align exactly with manufacturer specifications."  
  }  
}

---

## **⚙️ PROMPT LIBRARY (JSON Version)**

Each object below can be an entry in your Supabase `prompt_library` table.

{  
  "prompt\_library": \[  
    {  
      "id": "1",  
      "title": "Parameter Optimization by Patient Type",  
      "category": "Clinical Optimization",  
      "body": "For a patient with skin type {{skin\_type}} undergoing {{treatment\_type}} on the {{area}} using the {{wavelength}} mode, provide optimal treatment parameters (fluence, pulse duration, spot size, cooling). Include manufacturer cautions, power limits, and reference the relevant charts.",  
      "variables": {  
        "skin\_type": \["I", "III", "IV", "V", "VI"\],  
        "treatment\_type": \["vascular lesion removal", "hair reduction", "pigmented lesion treatment", "skin tightening", "facial rejuvenation"\],  
        "area": \["face", "neck", "chest", "legs", "back"\],  
        "wavelength": \["1064 nm Nd:YAG", "2940 nm Er:YAG", "BBL 560 nm", "Profractional 2940 nm", "Halo Hybrid 1470/2940 nm"\]  
      }  
    },  
    {  
      "id": "2",  
      "title": "Comparative Settings Across Skin Types",  
      "category": "Education",  
      "body": "Compare recommended Joule settings between Fitzpatrick types II, IV, and VI for {{treatment\_type}}. Explain how pulse duration and fluence vary, and reference the manufacturer's rationale or tables.",  
      "variables": {  
        "treatment\_type": \["vascular lesions", "hair reduction", "pigmented lesions", "fractional resurfacing", "skin rejuvenation"\]  
      }  
    },  
    {  
      "id": "3",  
      "title": "Laser-Tissue Interaction Deep Dive",  
      "category": "Education",  
      "body": "Explain how fluence and pulse duration interact to affect tissue response in {{mode}} mode according to manufacturer design principles. Reference where in the manual this is discussed.",  
      "variables": {  
        "mode": \["Nd:YAG 1064 nm", "Er:YAG 2940 nm", "BBL 560 nm", "ProFractional 2940 nm", "Halo Hybrid"\]  
      }  
    },  
    {  
      "id": "4",  
      "title": "Overlapping and Passes",  
      "category": "Technique",  
      "body": "How many passes or overlaps are recommended in the Joule manual for {{treatment\_type}} with {{wavelength}}? Include scanning speed, overlap percentages, and safety notes.",  
      "variables": {  
        "treatment\_type": \["resurfacing", "vascular lesion", "hair removal", "scar revision", "texture improvement"\],  
        "wavelength": \["1064 nm", "2940 nm", "560 nm", "1470 nm", "ProFractional 2940 nm"\]  
      }  
    },  
    {  
      "id": "5",  
      "title": "Spot Size and Depth Dynamics",  
      "category": "Technical",  
      "body": "Summarize how changing spot size from small (7 mm) to large (12 mm) affects energy delivery, penetration depth, and clinical outcome. Include fluence adjustments required to maintain constant energy density.",  
      "variables": {}  
    },  
    {  
      "id": "6",  
      "title": "Epidermal Cooling Protocols",  
      "category": "Safety",  
      "body": "List the recommended epidermal cooling methods and device settings for different skin types and wavelengths. Explain the rationale for using cryogen spray versus contact cooling where discussed.",  
      "variables": {}  
    },  
    {  
      "id": "7",  
      "title": "Vascular Lesion Treatment Parameters",  
      "category": "Clinical Optimization",  
      "body": "Provide detailed manufacturer-recommended parameters for treating vascular lesions with the Nd:YAG 1064 nm handpiece. Include vessel diameter ranges, fluence, pulse duration, and cooling technique.",  
      "variables": {}  
    },  
    {  
      "id": "8",  
      "title": "Contraindications & Warnings",  
      "category": "Safety",  
      "body": "List all contraindications, warnings, and precautions related to the Joule system. Include patient-specific factors, medications, or conditions that may increase treatment risk.",  
      "variables": {}  
    },  
    {  
      "id": "9",  
      "title": "Maintenance & Calibration",  
      "category": "Technical",  
      "body": "Explain the calibration process, maintenance intervals, and energy verification procedures required to maintain device accuracy. Reference any calibration steps listed by the manufacturer.",  
      "variables": {}  
    },  
    {  
      "id": "10",  
      "title": "Clinical Case Adjustment Logic",  
      "category": "Troubleshooting",  
      "body": "If a patient experiences adverse effects such as excessive erythema, purpura, or discomfort during or after Nd:YAG treatment, describe the recommended parameter or cooling adjustments specified by the manual.",  
      "variables": {}  
    },  
    {  
      "id": "11",  
      "title": "Mode Comparison – 1064 vs 2940 nm",  
      "category": "Education",  
      "body": "Compare manufacturer-recommended parameters, absorption targets, and tissue effects between the Joule 1064 nm (Nd:YAG) and 2940 nm (Er:YAG) modes. Include guidance on when to select each wavelength.",  
      "variables": {}  
    },  
    {  
      "id": "12",  
      "title": "Laser Safety Protocol",  
      "category": "Compliance",  
      "body": "Detail the full laser safety procedure described in the Joule Operator Manual, including eyewear requirements, signage, smoke evacuation, and protective measures for operators and patients.",  
      "variables": {}  
    }  
  \]  
}

---

## **🔢 Variable Option Reference (Summary Table)**

| Variable | Meaning | Example Options |
| ----- | ----- | ----- |
| **skin\_type** | Fitzpatrick classification | `["I", "III", "IV", "V", "VI"]` |
| **treatment\_type** | Procedure or application | `["vascular lesion removal", "hair reduction", "pigmented lesion treatment", "skin tightening", "facial rejuvenation"]` |
| **area** | Body area | `["face", "neck", "chest", "legs", "back"]` |
| **wavelength** | Laser emission or mode | `["1064 nm Nd:YAG", "2940 nm Er:YAG", "BBL 560 nm", "Profractional 2940 nm", "Halo Hybrid 1470/2940 nm"]` |
| **mode** | Specific laser operation | `["Nd:YAG 1064 nm", "Er:YAG 2940 nm", "BBL 560 nm", "ProFractional 2940 nm", "Halo Hybrid"]` |

---

## **💡 How to Use This**

**Database Schema Suggestion**

| Column | Type | Description |
| ----- | ----- | ----- |
| `id` | SERIAL or UUID | Unique prompt ID |
| `title` | TEXT | Prompt title |
| `body` | TEXT | Full prompt with `{{variables}}` placeholders |
| `category` | TEXT | Classification (e.g., “Safety”, “Optimization”) |
| `variables` | JSON | Object mapping variable names to option arrays |
| `created_at` | TIMESTAMP | Timestamp of creation |

**Usage Example (Frontend)**  
 When a clinician selects “Parameter Optimization by Patient Type,” your UI presents dropdowns for:

* Skin Type

* Treatment Type

* Area

* Wavelength

Then the filled variables populate into the `body` prompt before sending to the model.

---

Would you like me to add a **"Follow-up Question Generator Prompt"** (a reusable LLM prompt for producing contextually relevant next questions after each response)? It’s usually added as a small agent or post-processor in systems like this.

Excellent — here’s the **Follow-Up Question Generator Prompt**, designed as a reusable, standalone component that you can attach to your **Agent Builder chain** or call from your backend after every response.

It ensures the system always suggests **contextually intelligent, clinically relevant next questions** that guide the doctor deeper into the laser manual.

---

# **💬 Follow-Up Question Generator (System Prompt \+ JSON Config)**

{  
  "followup\_question\_generator": {  
    "name": "Follow-Up Question Generator",  
    "role": "system",  
    "description": "Generates 2–3 intelligent, contextually relevant follow-up questions for the clinician, based on their last question and the AI’s previous answer. Designed to guide further exploration of the laser manual.",  
    "content": "You are a sub-agent of the Laser Parameter Optimization Assistant (LPOA). Your task is to propose concise, meaningful follow-up questions that a clinician might naturally ask next.\\n\\n\#\#\# Behavior\\n- Use the user's last question and the previous answer to determine what the clinician is likely to want to know next.\\n- Focus on deepening clinical understanding, exploring parameter adjustments, or clarifying safety and technique details.\\n- Keep each question brief, precise, and clinically relevant.\\n- Prefer 'what' or 'how' questions over generic ones like 'why'.\\n- If the user question involves a specific patient scenario, the follow-ups should explore adjacent parameters or outcomes (e.g., cooling, overlap, pulse duration effects, safety margins).\\n- Always return the result as a simple list of 2–3 follow-up questions.\\n\\n\#\#\# Output Format\\nReturn only a JSON array of strings, e.g.:\\n\[\\n  \\"What adjustments are recommended for higher Fitzpatrick types?\\",\\n  \\"How does pulse duration affect thermal relaxation for this setting?\\",\\n  \\"What is the maximum safe overlap per pass according to the manual?\\"\\n\]\\n\\n\#\#\# Context Example\\nUser Question: 'For Fitzpatrick type IV leg veins treated with 1064 nm, what fluence should I use?'\\nAnswer Summary: 'Recommended 12–14 J/cm², pulse duration 20–30 ms, cooling required.'\\nGenerated Follow-ups:\\n\[\\n  'What cooling duration is recommended for this patient type?',\\n  'How does vessel diameter affect the fluence setting for 1064 nm?',\\n  'What complications are associated with exceeding 14 J/cm² on darker skin?'\\n\]"  
  }  
}

---

# **⚙️ How It Fits into the System**

### **Use Case**

After your LPOA agent (main reasoning model) returns an answer, your backend can pass:

* The **user’s question**, and

* The **assistant’s answer**

to this **Follow-Up Question Generator**.

It then returns a **JSON array** of 2–3 high-quality follow-up questions, which can be displayed as clickable buttons in the UI.

---

# **🧩 Example Workflow**

User → "What are optimal Nd:YAG settings for Fitzpatrick IV?"  
LPOA → Answer \+ Citations  
Follow-Up Generator → 3 suggested questions  
UI → Displays them under the response

**Example Output:**

\[  
  "What cooling settings are recommended for darker skin during Nd:YAG treatment?",  
  "How does pulse duration adjustment affect vessel selectivity?",  
  "Which warning indicators should I monitor for excessive thermal buildup?"  
\]

---

# **🔌 API Integration Example (FastAPI)**

@app.post("/followups")  
def generate\_followups(req: dict):  
    """  
    Input JSON:  
    {  
      "user\_question": "...",  
      "assistant\_answer": "..."  
    }  
    """  
    prompt \= f"""  
    User Question: {req\['user\_question'\]}  
    Assistant Answer: {req\['assistant\_answer'\]}  
    Generate 3 relevant follow-up questions in JSON array format.  
    """  
    response \= openai.ChatCompletion.create(  
        model="gpt-4o",  
        messages=\[  
            {"role": "system", "content": followup\_question\_generator\_prompt},  
            {"role": "user", "content": prompt}  
        \]  
    )  
    return json.loads(response.choices\[0\].message\["content"\])

---

# **🧠 Tips for Effective Use**

* **When to Run:** After every LPOA response (except when the query is purely technical or factual).

* **Display Format:** As clickable buttons (e.g., “Ask this next →”).

* **Optional Enhancements:**

  * Add a `category` tag to each question (`"Safety"`, `"Parameters"`, `"Technique"`).

  * Cache the follow-up suggestions per conversation for context continuity.

---

Would you like me to provide a **companion "Question Classification Agent"** next — one that tags each user question into categories (e.g., *Safety, Parameters, Technique, Troubleshooting*) so your UI or API can route or label responses accordingly?  
 This is typically used with LPOA for analytics and query intent routing.

# Pipeline

Got it 👍 — here’s a **simplified business requirements document** that captures exactly what you’re trying to do, without unnecessary project management or phases.

It explains the project clearly and concisely for your internal team or CTO.

---

# **💼 LPOA – Business Requirements Summary**

**Laser Parameter Optimization Assistant**

---

## **1\. Overview**

The goal of this project is to make it possible for users to **chat directly with a laser device manual (PDF)** and receive **accurate, cited answers** pulled from that document.

Users will continue viewing the PDF **locally (as they do now)**, but will also have an AI chat interface that:

* Understands the document,

* Answers questions using the actual content of the PDF,

* Shows **citations** that link to the **exact pages** inside the manual.

---

## **2\. What We’re Building**

| Function | Description |
| ----- | ----- |
| **Chat with the Document** | Users can ask natural language questions (e.g., *“What are safe 1064 nm settings for skin type IV?”*) and receive answers directly sourced from the manual. |
| **Vectorized Document Search** | The PDF will be processed and stored in a **PGVector database on Supabase**, so queries are answered using relevant chunks of the document. |
| **Citations with Page Links** | Every answer will include citations like *(Page 187, “Nd:YAG Settings”)*. Clicking a citation will open or scroll to that page in the locally viewed PDF. |
| **Structured Prompt Support** | The chat UI will include simple fields (e.g., *Skin Type, Area, Wavelength*) that are inserted automatically into the prompt to make queries more precise. |
| **Suggested & Follow-Up Questions** | The system can display starter questions and suggest related ones after each answer for easier exploration. |

---

## **3\. Technical Summary**

| Component | Purpose | Technology |
| ----- | ----- | ----- |
| **PDF Storage** | Store manuals remotely and access locally in the viewer. | Supabase Storage |
| **Vector Database** | Hold vectorized chunks of the PDF for semantic retrieval. | Supabase PGVector |
| **Document Processing** | Extract text, split into chunks, and create embeddings. | Python \+ OpenAI Embeddings |
| **Chat API** | Handle queries, retrieve relevant chunks, and format responses with citations. | FastAPI |
| **Reasoning Engine** | Generate structured answers, citations, and follow-up questions. | OpenAI Agent Builder |
| **User Interface** | Local PDF viewer \+ chat window \+ structured form fields. | React \+ MUI |
| **Citation Linking** | Clickable citations open `#page={page_number}` in the local or embedded PDF. | React-PDF / PDF.js |

---

## **4\. How It Works (Simplified Flow)**

1. **PDF Upload / Ingestion**

   * Manual is uploaded once and vectorized into Supabase (text chunks \+ embeddings \+ page metadata).

2. **User Interaction**

   * User opens the local PDF viewer and the chat interface side by side.

3. **Question Submission**

   * User types a question or fills structured fields (skin type, wavelength, etc.).

   * Backend retrieves relevant text from the PGVector database.

4. **Response Generation**

   * The OpenAI Agent Builder generates a concise answer based only on the retrieved document chunks.

   * Citations (page \+ section) are included in the response.

5. **Citation Click Behavior**

   * Clicking a citation jumps to the correct page in the local or embedded PDF viewer.

---

## **5\. Desired Outputs**

| Output | Description |
| ----- | ----- |
| **Answer Text** | Plain-language answer sourced from the manual. |
| **Citations** | Page and section references linked to PDF pages. |
| **Suggested Questions** | Optional list of related queries for exploration. |

---

## **6\. Success Criteria**

* Users can query any PDF locally and get **accurate, cited answers**.

* Clicking a citation reliably opens the referenced **page within the PDF**.

* All answers are grounded in document content (no hallucinated data).

* The chat feels responsive and easy to use alongside the existing PDF view.

# **🧱 LPOA TECHNICAL REQUIREMENTS**

*(Laser Parameter Optimization Assistant)*  
 **Version:** 1.0  
 **Owner:** Product Team  
 **Last Updated:** 2025-11-09

---

## **🎯 1\. PROJECT OVERVIEW**

The LPOA enables users to chat with laser device manuals (e.g., *Joule Operator Manual*), receive accurate answers with **citations**, and be guided with **structured patient input fields** and **suggested follow-up questions**.

The system combines:

* **Vectorized document retrieval (RAG)**

* **OpenAI Agent Builder multi-step reasoning**

* **Custom front-end UI (React \+ MUI)**

* **Supabase backend (PGVector \+ Storage)**

---

## **🧩 2\. CORE FEATURES**

| \# | Feature | Description |
| ----- | ----- | ----- |
| 1 | **PDF Upload & Remote Storage** | Upload large manuals (up to 300 pages) to Supabase Storage. |
| 2 | **Document Processing Pipeline** | Extract text from PDF → chunk → embed → store in PGVector. |
| 3 | **Vector Database (Supabase PGVector)** | Store text chunks with metadata (page number, section title, figure ref). |
| 4 | **RAG API** | Retrieve top document chunks for a query using cosine similarity. |
| 5 | **Structured Prompt Input** | UI form to collect patient/device details (skin type, wavelength, etc.) and inject them into prompt. |
| 6 | **Agent Builder Orchestration** | Multi-step reasoning (retrieve → answer → cite → suggest next question). |
| 7 | **Citations** | Responses display page numbers and section names, clickable to jump to PDF. |
| 8 | **Follow-up Questions** | AI-generated hyper-relevant next questions after each answer. |
| 9 | **Suggested Questions Database** | Predefined list of questions stored in Supabase for quick-start queries. |
| 10 | **Interactive PDF Viewer** | Embedded viewer (React-PDF or PDF.js) with clickable citations that jump to page. |

---

## **⚙️ 3\. SYSTEM ARCHITECTURE**

### **High-Level Flow**

User UI (React/MUI)  
   ↓  
Structured Query (user input \+ question)  
   ↓  
FastAPI Backend  
   ↓  
Vector Retrieval (Supabase PGVector)  
   ↓  
OpenAI Agent Builder (multi-step reasoning)  
   ↓  
Response JSON (answer \+ citations \+ suggested questions)  
   ↓  
Rendered in UI (chat \+ PDF viewer)

---

## **🧰 4\. TECH STACK**

| Layer | Technology |
| ----- | ----- |
| Frontend | React \+ MUI |
| Backend API | FastAPI (Python 3.11) |
| Vector DB | Supabase (Postgres \+ PGVector extension) |
| File Storage | Supabase Storage |
| Embeddings | OpenAI `text-embedding-3-large` |
| Agent Orchestration | OpenAI Agent Builder |
| LLM | GPT-4o (default) / local fallback (Ollama optional) |
| Document Parser | PyMuPDF or Unstructured.io |
| Authentication (optional) | Supabase Auth |

---

## **🧱 5\. DATA STRUCTURES**

### **5.1 Supabase Tables**

#### **Table: documents**

Stores metadata about uploaded manuals.

| Column | Type | Description |
| ----- | ----- | ----- |
| id | UUID | Primary key |
| title | TEXT | Manual title (e.g., “Joule Operator Manual”) |
| url | TEXT | Public Supabase storage URL |
| uploaded\_by | UUID | User ID |
| created\_at | TIMESTAMP | Upload timestamp |

---

#### **Table: document\_chunks**

Stores text chunks with vector embeddings.

| Column | Type | Description |
| ----- | ----- | ----- |
| id | UUID | Primary key |
| document\_id | UUID | FK → documents.id |
| page\_number | INT | Page number in PDF |
| section\_title | TEXT | Section heading |
| content | TEXT | Extracted text |
| embedding | VECTOR(1536) | OpenAI embedding |
| image\_ref | TEXT | Optional image reference (Supabase image URL) |
| created\_at | TIMESTAMP | Timestamp |

✅ Index:

CREATE INDEX ON document\_chunks USING ivfflat (embedding vector\_cosine\_ops);

---

#### **Table: suggested\_questions**

Stores preset questions and tags.

| Column | Type | Description |
| ----- | ----- | ----- |
| id | SERIAL | Primary key |
| text | TEXT | Suggested question |
| category | TEXT | e.g., “Nd:YAG”, “2940nm”, “Safety” |

---

#### **Table: chat\_sessions (optional)**

For saving chat history and agent steps.

| Column | Type | Description |
| ----- | ----- | ----- |
| id | UUID | Primary key |
| user\_id | UUID | Supabase Auth user |
| question | TEXT | User’s query |
| response | JSONB | Model output |
| created\_at | TIMESTAMP | Timestamp |

---

## **🔧 6\. PROCESSING PIPELINE**

### **Step 1: PDF Upload**

* Frontend → Supabase Storage bucket: `/manuals/`

* Record entry in `documents` table with `url`.

### **Step 2: Document Parsing**

* Backend job downloads PDF → extracts content via PyMuPDF.

* Split into chunks (≈500 words per chunk).

* Capture metadata:

  * `page_number`

  * `section_title`

  * `image_ref` (if any figures detected).

### **Step 3: Vectorization**

Generate embeddings using OpenAI Embedding API:

 openai.Embeddings.create(model="text-embedding-3-large", input=text\_chunk)

*   
* Store chunk \+ metadata \+ embedding in `document_chunks`.

### **Step 4: Optional Image Extraction**

* Save extracted figures as images to `/manual_images/` bucket.

* Store `image_ref` path in chunk metadata.

✅ **Deliverable:**  
 Document fully indexed and ready for retrieval.

---

## **🔌 7\. API ENDPOINTS**

### **7.1 `POST /upload`**

Uploads a PDF, triggers parsing and vectorization.

**Request:**

{  
  "title": "Joule Operator Manual",  
  "file\_url": "https://supabase.co/storage/manuals/joule.pdf"  
}

**Response:**

{ "status": "processing", "document\_id": "uuid" }

---

### **7.2 `POST /query`**

Main chat endpoint.

**Request:**

{  
  "document\_id": "uuid",  
  "question": "What settings are recommended for Fitzpatrick IV?",  
  "patient": {  
    "skin\_type": "IV",  
    "area": "legs",  
    "wavelength": "1064nm"  
  }  
}

**Steps inside API:**

1. Combine `patient` fields \+ `question` into single prompt.

2. Retrieve top 5 matching chunks from PGVector.

3. Send context \+ query to Agent Builder.

4. Return formatted JSON.

**Response:**

{  
  "answer": "For Fitzpatrick IV legs, use 12–14 J/cm², 20–30ms pulse...",  
  "citations": \[  
    { "page": 187, "section": "Nd:YAG Settings" },  
    { "page": 189, "section": "Safety Notes" }  
  \],  
  "followup\_questions": \[  
    "What is the safe overlap for this mode?",  
    "What cooling method is recommended?"  
  \]  
}

---

### **7.3 `GET /suggested-questions`**

Returns default question list from database.

**Response:**

\[  
  "What fluence is safe for skin type V?",  
  "What is the difference between 1064 and 2940 modes?"  
\]

---

### **7.4 `GET /page-preview/{page_number}`**

(Optional)  
 Returns an image preview of a PDF page (pre-rendered and stored in Supabase).

---

## **🧠 8\. OPENAI AGENT BUILDER CONFIGURATION**

### **Agent Name: `LPOA_RAG_Agent`**

**Purpose:**  
 Answer user queries using laser manual context, cite sources, and suggest related questions.

**Tools (3):**

1. **VectorSearchTool**

   * Connects to `/query_vector` endpoint.

   * Retrieves top matching document chunks.

2. **CitationFormatterTool**

   * Maps retrieved chunks → `(Page, Section)` citation list.

3. **FollowupGeneratorTool**

   * Generates 2–3 related questions based on query \+ response.

**Agent Steps (Chain):**

1. Receive question \+ patient data.

2. Call VectorSearchTool to get context.

3. Generate answer → include inline citations.

4. Pass output to CitationFormatterTool.

5. Pass context to FollowupGeneratorTool.

6. Return structured JSON (answer \+ citations \+ followups).

**Example Output:**

{  
  "answer": "...",  
  "citations": \[{ "page": 126, "section": "Nd:YAG Settings" }\],  
  "followup\_questions": \["Show cooling recommendations."\]  
}

---

## **💻 9\. FRONTEND REQUIREMENTS**

| Component | Description |
| ----- | ----- |
| **Chat Window** | Main area to display user query and agent responses. |
| **Patient Input Form** | Fields: Skin Type, Area, Wavelength, Pulse Duration, Notes. |
| **Suggested Question Panel** | Fetch `/suggested-questions` and display as quick buttons. |
| **Follow-Up Questions** | Display below each response. Clicking triggers new query. |
| **Citation Links** | Clickable “(Page X)” text that opens PDF viewer at that page. |
| **PDF Viewer** | Embedded viewer (React-PDF) bound to citation clicks. |
| **Loader / Status UI** | Show “Processing document…” during upload/vectorization. |

---

## **🧭 10\. CITATION LINKING REQUIREMENTS**

Each citation includes:

 { "page": 187, "section": "Nd:YAG Settings" }

*   
* Clicking `(Page 187)` should:

  * If embedded viewer open → jump to that page.

  * Else → open Supabase PDF URL with `#page=187` in new tab.

---

## **🔒 11\. SECURITY & ACCESS**

* Use Supabase Auth (JWT-based) for user sessions.

* Access to PDFs restricted to authenticated users.

Supabase Storage rules:

 auth.role() \= 'authenticated'

*   
* API rate limit per user to prevent abuse.

---

## **📈 12\. FUTURE ENHANCEMENTS (Optional)**

* Integrate **Ollama** for local inference mode.

* Multi-document search (compare multiple manuals).

* “Explain parameter differences” mode (contrast answers).

* Add analytics for question frequency and topic interest.

---

## **✅ 13\. DELIVERABLES CHECKLIST**

| Milestone | Deliverable | Status |
| ----- | ----- | ----- |
| 1 | Supabase setup (Storage \+ PGVector) | ☐ |
| 2 | PDF ingestion \+ vectorization pipeline | ☐ |
| 3 | FastAPI endpoints (`/upload`, `/query`, `/suggested-questions`) | ☐ |
| 4 | Agent Builder integration (3 tools) | ☐ |
| 5 | Frontend chat UI \+ form \+ PDF viewer | ☐ |
| 6 | Citations clickable → page jump | ☐ |
| 7 | Suggested and follow-up questions working | ☐ |

---

Would you like me to now create a **one-page system architecture diagram (visual)** showing how the PDF → vector DB → agent → response flow works, so you can include it in your internal documentation or send to your developers?

Perfect — here’s a **one-page system architecture diagram** you can drop straight into your documentation or send to your dev team.  
 It visually shows the **end-to-end flow** of your LPOA (Laser Parameter Optimization Assistant) — from PDF upload through the OpenAI Agent Builder and back to the user interface.

---

## **🧭 LPOA — System Architecture Overview**

                   ┌──────────────────────────────────────────────┐  
                    │                 FRONTEND (UI)                │  
                    │──────────────────────────────────────────────│  
                    │ • React \+ MUI Chat Interface                 │  
                    │ • Patient / Device Form Inputs               │  
                    │ • Suggested & Follow-Up Questions            │  
                    │ • Embedded PDF Viewer (React-PDF / PDF.js)   │  
                    │                                              │  
                    │   User asks: "Optimal 1064nm settings for    │  
                    │   skin type IV on legs"                      │  
                    └───────────────┬──────────────────────────────┘  
                                    │  (structured prompt JSON)  
                                    ▼  
┌──────────────────────────────────────────────────────────────────────────────┐  
│                          BACKEND  (FastAPI)                                  │  
│──────────────────────────────────────────────────────────────────────────────│  
│  1️⃣ Combine structured input \+ question into prompt                         │  
│  2️⃣ Retrieve top chunks from Supabase PGVector                              │  
│  3️⃣ Send query \+ context to OpenAI Agent Builder                             │  
│  4️⃣ Receive JSON (answer, citations, follow-ups)                             │  
│  5️⃣ Return to Frontend                                                      │  
└──────────────────────────────┬───────────────────────────────────────────────┘  
                               │  
                               ▼  
┌──────────────────────────────────────────────────────────────────────────────┐  
│             SUPABASE (Data & Storage Layer)                                  │  
│──────────────────────────────────────────────────────────────────────────────│  
│  • PGVector Table: document\_chunks                                           │  
│       – id, page\_number, section\_title, content, embedding                   │  
│  • Documents Table: manuals metadata                                         │  
│  • Suggested\_Questions Table                                                 │  
│  • Storage Buckets:                                                         │  
│       – /manuals/ (PDFs)                                                     │  
│       – /manual\_images/ (figures & previews)                                 │  
│                                                                              │  
│  Vector Query Example:                                                       │  
│    SELECT \* FROM document\_chunks                                             │  
│     ORDER BY embedding \<=\> query\_embedding LIMIT 5;                          │  
└──────────────────────────────┬───────────────────────────────────────────────┘  
                               │  
                               ▼  
┌──────────────────────────────────────────────────────────────────────────────┐  
│                OPENAI AGENT BUILDER                                          │  
│──────────────────────────────────────────────────────────────────────────────│  
│  Multi-Step Workflow:                                                        │  
│                                                                              │  
│   1️⃣ \*\*VectorSearchTool\*\* – Queries Supabase PGVector for top chunks.       │  
│   2️⃣ \*\*CitationFormatterTool\*\* – Extracts (page, section) metadata.          │  
│   3️⃣ \*\*AnswerGenerator\*\* – Synthesizes concise answer with citations.        │  
│   4️⃣ \*\*FollowupGenerator\*\* – Creates 2–3 hyper-relevant next questions.      │  
│                                                                              │  
│  Output JSON:                                                                │  
│   {                                                                          │  
│     "answer": "...",                                                         │  
│     "citations": \[{ "page": 187, "section": "Nd:YAG Settings"}\],            │  
│     "followup\_questions": \["What cooling is recommended?"\]                   │  
│   }                                                                          │  
└──────────────────────────────┬───────────────────────────────────────────────┘  
                               │  
                               ▼  
┌──────────────────────────────────────────────────────────────────────────────┐  
│                     FRONTEND (Render Response)                               │  
│──────────────────────────────────────────────────────────────────────────────│  
│ • Display answer with inline clickable citations → (Page 187\)                │  
│ • Jump PDF viewer to cited page (or open via \#page=187 link)                 │  
│ • Show follow-up questions under response                                    │  
│ • Allow user to continue conversation                                        │  
└──────────────────────────────────────────────────────────────────────────────┘

---

### **🧠 Key Notes for the Dev Team**

| Layer | Key Tech | Notes |
| ----- | ----- | ----- |
| **Frontend** | React, MUI, React-PDF | Form \+ Chat \+ PDF viewer; citations trigger page jumps. |
| **Backend** | FastAPI | Central API hub for queries, vector retrieval, and agent orchestration. |
| **Database** | Supabase (PGVector) | Stores all document chunks, metadata, and suggested questions. |
| **Storage** | Supabase Storage | Keeps the original PDFs and optional image figures. |
| **Agent Builder** | OpenAI | Multi-step workflow: retrieve → reason → cite → suggest. |
| **Embedding Model** | `text-embedding-3-large` | Used to vectorize document text. |

---

### **📂 Data Flow Summary**

1. **Upload** PDF → stored in Supabase Storage.

2. **Process** → text extracted → embeddings generated → stored in PGVector.

3. **User Query** → API retrieves top relevant chunks.

4. **Agent Builder** composes reasoning chain and formats output with citations.

5. **Frontend** displays answer \+ citations \+ next questions; citations link back to PDF page.

# Requirements

**Project Title**  
 Laser Parameter Optimization Assistant (LPOA) – Proof of Concept (POC) Using Amazon Bedrock

**Joule Manual:**  [https://www.dropbox.com/scl/fi/qagjdveyxhim0gabsnpg2/pdfcoffee.com-sciton-joule-operator-manual.pdf?rlkey=hixfkd7dae5ppnpx7zkfpv4gd\&dl=0](https://www.dropbox.com/scl/fi/qagjdveyxhim0gabsnpg2/pdfcoffee.com-sciton-joule-operator-manual.pdf?rlkey=hixfkd7dae5ppnpx7zkfpv4gd&dl=0)

**Model Training Data** (Note:  This is sample data we could use to train the model, however model training may not be necessary for this project.  I would like to experiment a bit to see if this data creates better accuracy):   [https://www.dropbox.com/scl/fo/w5cs1j6b16hze5fg7j3gi/AG4ERLNd2sWHl-bsxvIzSQg?rlkey=k6aa57kkpia231fn0kquck8vj\&dl=0](https://www.dropbox.com/scl/fo/w5cs1j6b16hze5fg7j3gi/AG4ERLNd2sWHl-bsxvIzSQg?rlkey=k6aa57kkpia231fn0kquck8vj&dl=0)

---

## **1\. Overview and Purpose**

The **Laser Parameter Optimization Assistant (LPOA)** is a proof-of-concept AI solution designed to **help doctors and clinicians optimize laser settings** for a variety of treatment scenarios. This POC focuses on two key objectives:

1. **General Laser Settings Advisor** – A broad Retrieval-Augmented Generation (RAG) model that uses general laser procedure and treatment information to suggest initial settings (wavelength, energy, pulse duration, etc.) based on patient skin type, treatment area, and indication.  
2. **Sciton Joule Laser Agent** – A specialized “agent” referencing the **Sciton Joule Laser** manual. This agent will allow clinicians to:  
   * Access device-specific procedures, warnings, and recommended parameters from the Joule Operator Manual.  
   * Provide exact parameter settings for each treatment scenario.  
   * Cite specific pages from the Joule manual if needed (e.g., “See page 45 of the Joule manual for detailed instructions on calibrating the 1064 nm Nd:YAG scanner”).

The goal is to **rapidly develop** this AI assistant as a POC **inside Amazon Bedrock**, leveraging an agent builder to orchestrate retrieval from two RAG corpora:

1. **Large, general laser knowledge base** (covering procedures, safety guidelines, best practices).  
2. **Sciton Joule–specific RAG** (with manual pages, device-specific instructions).

---

## **2\. Business Requirements**

1. **Enhance Clinical Safety and Efficacy**

   * Provide clinicians with **safe starting parameters** for different laser procedures (hair removal, vascular treatments, skin resurfacing, etc.).  
   * Minimize the risk of burns or complications by aligning with well-established guidelines and device instructions.  
2. **Streamline Workflow for Clinicians**

   * Offer a **user-friendly interface** (simple React web page) where clinicians answer a short questionnaire (skin type, target lesion, prior treatments, etc.).  
   * Immediately present **precise recommended settings** that can be adjusted if needed.  
3. **Reference Official Joule Manual**

   * Provide **page-specific references** to the operator manual so clinicians can quickly review relevant instructions.  
   * Strengthen compliance by ensuring the user sees official guidelines.  
4. **Prototype, Validate, and Iterate**

   * Run a small pilot to verify that the AI assistant is generating sensible, device-compliant settings.  
   * Use feedback from real or simulated clinical sessions to refine the assistant’s logic and prompts before a full production rollout.  
5. **Demonstrate Feasibility with Amazon Bedrock**

   * Show how Amazon Bedrock can quickly stand up an **LLM-based or rules-based system** with RAG.  
   * Evaluate the **agent builder** features for future expansions, including multi-turn dialogues or advanced workflow orchestration.

---

## **3\. Technical Requirements**

### **3.1 Architecture**

1. **Amazon Bedrock**

   * Host the LLM or rules-based model behind a Bedrock endpoint.  
   * Enable or disable advanced features such as conversation memory, parameter tuning, or agent building.  
2. **RAG (Retrieval-Augmented Generation) Setup**

   * **General Laser RAG**: Contains large corpus of laser safety guidelines, patient selection criteria, clinical studies, etc.  
   * **Sciton Joule RAG**: Contains the official Joule Operator Manual text (e.g., PDF contents indexed) plus any specialized guides for 2940 nm Er:YAG, 1064 nm Nd:YAG, BBL, etc.  
3. **Agent Builder**

   * An agent orchestrates two retrieval flows:  
     * **General knowledge** – E.g., “Lower fluence for darker skin Fitzpatrick types, use cooling for comfort, etc.”  
     * **Joule-specific** – E.g., “For 1064 nm Nd:YAG hair removal, see Joule manual p. 70 for recommended settings range.”  
   * The **agent** merges the results into a single user-facing answer, optionally citing pages from the Joule manual.  
4. **React Front-End**

   * Basic web page to:  
     * **Collect input**: Skin type, target lesion, hair color, body area, or other relevant questionnaire data.  
     * **Display recommended settings**: Show exact parameter values on an image or schematic of the Joule console screen (e.g., pulse width, fluence, repetition rate).  
     * Provide an “Expand Info” button to show the manual references (“See Joule manual p. 39 for instructions on Er:YAG calibration procedure”).  
5. **Storage and Retrieval**

   * Store textual data (the Joule manual, plus general knowledge) in a vector store (e.g., Amazon OpenSearch w/ vector indexing or another Bedrock-compatible store).  
   * Associate each chunk with metadata so the AI can provide page-level references in the final answer.  
6. **Integration for Exact Parameter Output**

   * Optionally store “device capability data” (e.g., Joule’s min and max fluence for each wavelength) in a structured database or a knowledge table.  
   * The agent ensures that recommended settings do not exceed device hardware limits.

### **3.2 Questionnaire & Parameter Calculation**

A short, clinically relevant survey can drive the recommendation engine:

1. **Patient Profile**

   * Fitzpatrick skin type.  
   * Area of treatment (face, leg, etc.).  
   * Hair color, thickness, or lesion type if relevant.  
2. **Clinical Details**

   * Past adverse events, prior treatments, pain tolerance, etc.  
3. **Treatment Goal**

   * Hair removal, vascular lesion, pigmented lesion, skin resurfacing, or fractionation, etc.  
4. **Output**

   * **Device settings**: E.g., “For 1064 nm Nd:YAG hair removal, recommended fluence \= 30 J/cm², pulse width \= 15 ms, repetition rate \= 2 Hz.”  
   * **Relevant instructions**: E.g., “Use contact cooling; see Joule manual p. 73 for vascular guidelines.”

### **3.3 Key Technical Deliverables**

* **RAG Index**: Build an index for all general laser knowledge plus an index for the Joule manual.  
* **Agent Prompt Templates**: Ensure the agent can pick the correct chunk from the manual and output specific page references.  
* **React UI**: Minimal user interface that has:  
  * A form-based questionnaire.  
  * A display of recommended Joule settings superimposed on a laser console image.  
* **Logging and Auditing**: Basic logging to track queries and recommended settings for quality improvement.  
* **Sciton Joule-Specific Linking**: Citations in the final answer referencing the correct page number from the Joule manual.

---

## **4\. Questionnaire Example**

Below is a sample questionnaire for the **Sciton Joule** agent to determine the most appropriate laser settings:

1. **Patient Skin Type (Fitzpatrick Scale)**  
   * I, II, III, IV, V, VI  
2. **Treatment Goal**  
   * Hair Removal, Vascular Lesion, Pigmented Lesion, Skin Tightening, Resurfacing  
3. **Anatomical Treatment Area**  
   * Face, Neck, Chest, Legs, etc.  
4. **Relevant Medical History**  
   * Previous burns or complications from lasers?  
   * Active tan or photosensitizing meds?  
   * Past wound healing issues?  
5. **Pain Tolerance**  
   * Low, Medium, High  
6. **Lesion or Condition Details**  
   * For hair removal: hair color, thickness  
   * For vascular/pigment: lesion color, size  
7. **Preferred Downtime**  
   * None, Mild, Acceptable if results are stronger  
8. **Any Additional Clinical Notes**

**Example Output**

*Fluence:* 28–32 J/cm²  
 *Pulse Width:* 10–15 ms  
 *Repetition Rate:* 2 Hz  
 *Cooling:* Contact Cooling recommended

*See Joule Operator Manual, Section 9.3.7 (pp. 63–71) for recommended 1064 nm hair reduction guidelines.*

---

## **5\. Implementation Roadmap**

### **5.1 Phase 1: Basic Integration and RAG Setup**

* **Load Documents**: Upload the general laser reference materials \+ Joule manual into an S3 bucket.  
* **Indexing**: Use a vector store (e.g., Amazon OpenSearch) to index each chunk with page metadata.  
* **Bedrock Agent**: Configure a simple agent that calls the vector store for relevant contexts.

### **5.2 Phase 2: Joule-Specific Agent**

* **Agent Specialization**: Build a second retrieval pipeline that specifically targets Joule content.  
* **Questionnaire**: Create the minimal React form to feed user inputs into the agent.  
* **Parameter Output**: Display recommended Joule settings on a UI, referencing manual pages.

### **5.3 Phase 3: Testing & Validation**

* **Clinician Feedback**: Use a small test group of doctors or SMEs to evaluate recommended settings.  
* **Accuracy Tuning**: Adjust how the agent merges general knowledge with Joule-specific constraints.  
* **UI Refinements**: Tweak the React layout, add images, and refine the user experience.

### **5.4 Phase 4: Enhancements**

* **Real-time Data**: If needed, integrate a domain model (XGBoost or LightGBM) trained on historical treatment outcomes.  
* **Advanced Agent Dialogue**: Expand multi-turn dialogues for more nuanced questions.  
* **HIPAA Considerations**: For production, ensure patient data is protected; keep POC usage purely for demonstration with non-PHI.

---

## **6\. Suggested AI/ML Models**

### **6.1 LLM Choices**

* **Open Source**  
  * **Google Flan-UL2** (20B param) or **MPT-7B** can be fine-tuned on a curated dataset of laser procedures.  
  * **LLaMA derivatives** for reasoning about medical text.  
* **Bedrock Models**  
  * **Anthropic Claude** or **AI21 Jurassic-2** for robust natural language responses.  
  * **Amazon Titan** if wanting a fully managed approach with high availability.

### **6.2 Tabular or Regression Models (Optional)**

* If historical outcomes are available, use a regression model (XGBoost, LightGBM) to predict recommended energy settings given patient attributes.  
* Then combine the structured model outputs with the LLM-based agent.

---

## **7\. Success Criteria**

1. **Clinical Utility** – The recommended laser settings are sensible, safe, and align with standard guidelines.  
2. **Speed of Deployment** – The entire POC is built quickly on Amazon Bedrock, demonstrating ease of agent creation.  
3. **Manual Citation Accuracy** – The system consistently references correct page numbers from the Joule manual.  
4. **User Satisfaction** – Clinicians find the workflow beneficial, with minimal friction or confusion.  
5. **Scalability** – The architecture can be extended to other laser devices or more advanced data-driven models.

---

## **8\. Conclusion**

The **Laser Parameter Optimization Assistant (LPOA)** POC demonstrates the feasibility of combining a **general RAG** for broad laser knowledge with a **device-specific RAG** (Sciton Joule Operator Manual) to deliver precise, context-aware recommendations. By leveraging **Amazon Bedrock** and an **agent builder**, clinicians can quickly receive optimal parameter suggestions, while references to official documentation ensure compliance and safety. This modular, rapid-development approach enables future enhancements—eventually integrating additional lasers, advanced analytics, or real-time feedback—making LPOA a versatile solution for modern aesthetic practices.

# Tab 3

Below is a model‑selection “menu” you can use to design and train the **LPOA agent**. Because you have not yet specified the agent’s exact scope, I assume it will need to (1) converse fluently with clinicians and patients, (2) retrieve and reason over your proprietary knowledge base, (3) classify / prioritise leads or tasks, and (4) operate in real‑time clinical settings. Where my assumptions are off, just let me know and I can tighten the recommendations.

---

## **1\. Selection principles (why these models)**

| Requirement | What matters most | Model characteristics to look for |
| ----- | ----- | ----- |
| Clinical accuracy & safety | Factual reliability, low hallucination rate, guardrails | Models with high MMLU/GSM8K scores **and** strong refusal tuning (GPT‑4o, Claude 3 Opus) |
| Cost‑efficient autonomy | Good reasoning at \<$5/1 M tokens | Sparse MoE or compact open‑source models you can fine‑tune (Mixtral 8×22B, Llama 3‑70B) |
| Proprietary knowledge use | Tight context fusion, high‑quality embeddings | RAG pipelines \+ high‑dimensional embedding models (text‑embedding‑ada‑003/004, Cohere Embed‑v3) |
| Real‑time voice workflows | Low‑latency, medical grade ASR | Deepgram Nova 3 General \+ Nova 3 Medical Streaming |
| Privacy / self‑hosting | PHI isolation, model weight control | Open‑source foundation models (Llama 3, Mixtral) fine‑tuned behind your firewall |

---

## **2\. Recommended model stack**

| Layer | Primary model(s) | Role in the LPOA agent | Why it is “best” now |
| ----- | ----- | ----- | ----- |
| **Foundation LLM (reasoning / generation)** | **OpenAI GPT‑4o** | Top‑tier general reasoning, multimodal (images, audio, video) support, native function‑calling for agentic workflows | 2025 release adds scheduled tasks & desktop “Record mode”, giving you built‑in voice note handling ([OpenAI Help Center](https://help.openai.com/en/articles/9624314-model-release-notes?utm_source=chatgpt.com)) |
|  | **Anthropic Claude 3 Opus** | Alternate premium model; fewer refusals, strong ethical alignment; excellent at long‑context, policy explanations | Benchmarks show state‑of‑the‑art performance across MMLU, GPQA, GSM8K ([Anthropic](https://www.anthropic.com/news/claude-3-family?utm_source=chatgpt.com)) |
|  | **Google Gemini 2.5 Pro / Ultra** | Useful when you need on‑device Android integration or stronger math/coding | Newly rolled out to subscribers; underpins Google’s “Deep Search” and AI‑calling features ([9to5Google](https://9to5google.com/2025/07/16/google-ai-mode-gemini-2-5-pro-deep-search/?utm_source=chatgpt.com)) |
| **Self‑hosted / fine‑tunable LLM** | **Meta Llama 3‑70B (or 3.1‑405B)** | Your “private brain”; apply LoRA/QLoRA to inject A360 domain knowledge while keeping weights in‑house | Open‑weights; improved reasoning parity with GPT‑4 on 2025 benchmarks ([Meta AI](https://ai.meta.com/blog/meta-llama-3/?utm_source=chatgpt.com)) |
|  | **Mistral Mixtral 8×22B MoE** | Cost‑efficient alternative (\~15–20× cheaper inference than 70B dense) for background tasks & classification | Sparse‑MoE; active parameters ≈ 39 B but performs at 70 B level ([Mistral AI](https://mistral.ai/news/mixtral-8x22b?utm_source=chatgpt.com)) |
| **Speech‑to‑text (ASR)** | **Deepgram Nova 3 General \+ Nova 3 Medical Streaming** | Real‑time transcription of consultations; specialised medical flavour cuts WER a further 11 % and boosts keyword recall 2.7× | GA in Feb 2025; latest medical streaming update May 2025 ([Deepgram](https://deepgram.com/learn/introducing-nova-3-speech-to-text-api?utm_source=chatgpt.com), [Deepgram Docs](https://developers.deepgram.com/changelog?utm_source=chatgpt.com)) |
| **Embeddings for RAG** | **OpenAI text‑embedding‑3 (Small & Large)** **or** Cohere Embed‑v3 | High‑dim. vectors (≥ 1536 dims), multilingual, stable | Easily orchestrated via Bedrock/VectorStore |
| **Vision & 3‑D context (optional)** | GPT‑4o‑Vision, Gemini 2 Vision, SAM \+ Grounding DINO (open‑source) | If LPOA must reason over before/after photos, 3‑D models, or screen captures | Multimodal context windows up to 128 k tokens (GPT‑4o) |

---

## **3\. Training & alignment strategy**

1. **Start with RAG before fine‑tuning**

   * Ingest SOPs, consent forms, and clinical guidance into a vector store.

   * Use retrieval‑augmented prompts so GPT‑4o / Claude answers **only** with cited passages.

   * Iterate on retrieval quality (chunk size, hybrid BM25 + embedding, re‑rankers).

2. **Light‑weight fine‑tuning for domain tone**

   * Fine‑tune Mixtral 8×22B and/or Llama 3‑70B with 3–5 k curated high‑quality Q‑A pairs (LoRA at rank = 8–16).

   * Include conversation transcripts where the agent *successfully* solved tasks.

3. **Reinforcement learning from human feedback (RLHF / DPO)**

   * Collect comparisons from your clinicians on draft vs gold responses.

   * Apply Direct Preference Optimisation (DPO) to your open‑source model (cheaper & simpler than PPO‑based RLHF).

4. **Safety / policy tuning**

   * Adopt Anthropic’s adjustable constitutional AI approach on your open‑source model.

   * Add hard filters for off‑label drug use, PHI leakage, and aesthetic “before/after” mis‑claims.

5. **Evaluation**

   * Automatic: Use MedMCQA, BioASQ, and your internal “Injection‑Intelligence” QA sets.

   * Human: Monthly expert panel grading for clinical safety, empathy, and regulatory compliance.

---

## **4\. Deployment architecture (high level)**

graph TD  
A\[User (voice / text)\] \--\>|Audio| B(Deepgram Nova‑3)  
B \--\>|Transcript| C(LPOA Orchestrator)  
subgraph Inference  
C \--\> D{Route}  
D \--\>|High‑stakes| E\[GPT‑4o / Claude 3\]  
D \--\>|Routine| F\[Mixtral / Llama 3 FT\]  
end  
C \--\>|Vector search| G(Vector DB)  
G \--\> H\[Domain docs\]  
E & F \--\>|Answer| C  
C \--\>|JSON| I(Function calls / A360 APIs)  
C \--\>|Response| A

*Run GPT‑4o/Claude via secure API for “expert mode”; keep Mixtral/Llama in‑house for cost‑sensitive tasks.*

---

## **5\. Next steps checklist**

1. **Define LPOA’s core task set** (classification? lead scoring? patient‑summary generation?)

2. **Stand up a minimal RAG pipeline** using GPT‑4o \+ Deepgram Nova‑3.

3. **Collect 100–200 golden conversations** to seed initial LoRA fine‑tuning.

4. **Pick an embedding schema** (patient‑ID, visit‑ID, doc‑type) for provenance tracking.

5. **Schedule an evaluation cadence** (automatic nightly \+ human monthly).

6. **Budget estimates**:

   * GPT‑4o: \~$5 / 1 M input tokens; Mixtral local ≈ $0.07 / 1 M.

   * Deepgram Nova‑3 Medical: \~$0.0012 / sec streaming at volume.

---

### **Key take‑away**

Use **GPT‑4o or Claude 3** for “frontier” quality, pair them with **Deepgram Nova‑3** for speech and an **open‑source backbone (Llama 3 or Mixtral)** you can fine‑tune and self‑host for cost control and PHI compliance. This hybrid stack gives the LPOA agent both premium reasoning and affordable, private day‑to‑day autonomy.

# PDF Functionality

Here’s a focused menu of AI agents you can embed in A360 to turn big laser-manual PDFs into interactive, clinician-grade tools. Each agent lists what it does, inputs/outputs, and quick UX ideas. Pick a few for MVP; the rest can layer in later.

# **Core “Manual Intelligence” Agents**

1. Manual Q\&A \+ Page Cite

* What it does: Free-text questions with exact page/figure citations and highlighted snippets.

* Input/Output: Query → short answer \+ “Open page 143, §7.2.1” \+ snippet \+ confidence.

* UX: Chat panel on right, left side shows live page preview with auto-scroll to highlights.

2. Step-by-Step Procedure Navigator

* What it does: Extracts setup, calibration, safety checks into interactive checklists tailored to the provider’s model/handpiece.

* I/O: Device \+ handpiece \+ procedure → step list with timers, checkboxes, hazard callouts.

* UX: “Play” mode (one step per screen) with “Why?” links to the manual paragraph.

3. Parameter Finder (Indications → Starting Ranges)

* What it does: From indication \+ Fitzpatrick type \+ body area \+ device/handpiece → recommended starting ranges from the manual, with links to the evidence pages.

* I/O: Form fields → table (fluence, pulse width, spot size, repetition, passes) \+ page cites.

* UX: Slider controls to adjust skin type, hair thickness, etc., and see recommended deltas.

4. Fluence/Spot/Pulse Calculator

* What it does: Computes derived parameters (fluence ↔ power ↔ spot size; coverage/time) with guardrails from manual limits.

* I/O: Numeric inputs → calculated safe ranges \+ “out-of-spec” warnings.

* UX: Inline calculator inside the parameter card; shows source formulas and pages.

5. Troubleshooting Wizard

* What it does: Symptom-to-cause-to-fix decision tree distilled from the manual’s troubleshooting tables.

* I/O: Symptom selection → likely causes → ordered fixes \+ page cites.

* UX: Dynamic flow with “Did that resolve it?” branching; quick video/gif stubs later.

6. Safety & Contraindication Checker

* What it does: Scans entered patient factors (meds, photosensitivity, recent sun, tattoos, implants) vs. manual warnings/contraindications.

* I/O: Patient factors → allow/avoid flags \+ mitigations \+ page cites.

* UX: Red/amber/green banner with “show evidence” link to exact manual pages.

7. Maintenance & Calibration Coach

* What it does: Extracts maintenance intervals, calibration routines, parts/consumables.

* I/O: Date of last service \+ usage → due-soon tasks \+ part numbers \+ procedural steps.

* UX: “Service due in 12 days” chip; tap to open the guided routine.

8. Terminology & Abbreviations Glossary

* What it does: On-hover definitions for device-specific terms, with original manual phrasing.

* I/O: Term → short definition \+ page cite.

* UX: Tooltip over highlighted terms; long-press on mobile.

9. Image/Table Extractor

* What it does: Lifts critical charts/tables (parameter matrices, test patches) into structured, searchable widgets.

* I/O: Device/indication query → table view with filters \+ provenance thumbnails.

* UX: “Open table 8.3” opens a native filterable grid with the original scan on the side.

10. Multi-Manual Cross-Compare

* What it does: Compares parameter guidance across different devices/handpieces for the same indication.

* I/O: Indication \+ device A/B → side-by-side table \+ deltas \+ cautions.

* UX: Comparison view with toggle for “manufacturer verbatim vs. normalized”.

11. Audit Logger & Teach-Back

* What it does: Captures what the user looked up/accepted, then generates a one-minute “teach-back” summary tied to manual citations.

* I/O: Session transcript → structured log \+ summary.

* UX: “Add to case notes” and “export to EMR”.

12. Offline Pack (Clinic Mode)

* What it does: Local mini-index (device-specific) when connectivity is poor; syncs usage later.

* I/O: Same as Q\&A/Procedures with a smaller model \+ cached embeddings.

* UX: “Offline” badge; graceful degradation of features needing cloud.

# **How to Make PDFs “Interactive” (Fast Path)**

* Pre-processing: OCR (incl. tables/figures), page segmentation, figure/table detection, caption binding, section anchors.

* Chunking: Section-aware splits (headings, lists, tables as atomic units) \+ page/para IDs.

* Enrichment: Extract structured objects (procedures, warnings, parameters, troubleshooting trees) into small JSONs per manual.

* Indexing: Vector index (semantic), keyword/regex index (exact lookup for specs), and a “table index” (cells hashed by headers).

* Provenance: Every answer returns page/para/figure IDs with thumbnails.

# **MVP Stack (short-term, simple)**

* Storage: S3 (your current setup) with {device}/{version}/{pdf \+ json \+ images}.

* Parse: Tesseract or AWS Textract for OCR; Camelot/Tabula for tables; simple Python to emit JSON blocks:

  * `procedures.json`, `parameters.json`, `warnings.json`, `troubleshooting.json`, `glossary.json`.

* Index: Lightweight RAG (e.g., Bedrock model \+ FAISS/Elastic/Opensearch). Keep a small “rules index” for hard constraints (max fluence, spot limits).

* API: `/ask`, `/procedure`, `/parameters`, `/troubleshoot`, `/safety`, each returning payload \+ citations.

* UI:

  * Split view (page preview left; agent panel right).

  * “Open in Manual” button jumps to page/anchor.

  * Chips for Device, Handpiece, Indication; everything filterable.

* Guardrails: Regex \+ rules engine to reject out-of-spec outputs; show exact manual text when diverging.

# **Data Contracts (quick schema sketches)**

`parameters.json`:

 `{`  
  `"device":"BrandX Pro 755",`  
  `"handpiece":"10mm",`  
  `"indication":"Hair removal",`  
  `"skin_type":"III",`  
  `"ranges":{"fluence_Jcm2":[10,16],"pulse_ms":[5,10],"repetition_Hz":[1,3]},`  
  `"notes":"Test spots recommended...",`  
  `"source":{"pdf":"brandx_v3.pdf","page":142,"section":"7.2.1"}`  
`}`

*   
* `procedure_steps.json`: ordered steps with `id`, `text`, `duration_s`, `hazard_level`, `source`.

* `troubleshooting.json`: nodes with `symptom`, `causes[]`, `fixes[]`, each with `source`.

* `warnings.json`: `type` (“contraindication”, “caution”), `pattern`, `verbatim`, `source`.

# **Safety & Compliance Rails**

* Always show source page thumbnails for any safety-critical advice.

* “Manufacturer Verbatim” toggle to reveal the exact text.

* Red-line constraints: refuse to output parameters outside manual limits; log the attempt.

* Versioning: Device manual version tag at top of every panel; warn on outdated versions.

# **Rollout Plan**

* Week 1–2: Parse 1–2 manuals end-to-end → enable Agents 1, 2, 3, 4, 6 (Q\&A, procedures, parameters, calculator, safety).

* Week 3: Add Troubleshooting Wizard \+ Table Extractor.

* Week 4: Cross-Compare \+ Audit Logger; pilot offline pack for one device.

If you want, I can sketch the exact JSON schemas and the UI wireframe flows for the first five agents so your team can start building immediately.

# Medical Manual QA

## **🔹 What Medical Manual QA Is**

* **QA (Question–Answering) over manuals** \= an AI system that lets a user type natural language questions about a **medical device manual** (e.g., a laser system, ultrasound, or injection guide) and get back **concise, cited answers** directly from the manual.

* The “medical” qualifier just means the system is tuned for **domain-specific content** like parameters, contraindications, dosage ranges, and safety warnings.

---

## **🔹 How It Works (Simplified Flow)**

1. **Manual ingestion**

   * PDF is parsed, OCR’d if needed, and split into chunks (sections, paragraphs, tables).

   * Metadata like *page numbers, section headings, warnings* is preserved.

2. **Indexing**

   * Chunks are embedded into a vector store (FAISS, Pinecone, Milvus, or Bedrock Kendra).

   * Sometimes also keyword-indexed for exact term lookup (fluences, dosages, “contraindicated”).

3. **QA Agent**

   * User types: *“What are the starting fluence ranges for Fitzpatrick IV hair removal?”*

   * Retriever pulls the relevant manual sections.

   * LLM summarizes the answer, but always **returns the page/section citation**.

4. **Safety Guardrails**

   * Hard rules can be layered: don’t generate fluences/pulse widths outside manufacturer limits.

   * Always surface **verbatim manual text** for safety-critical queries.

---

## **🔹 Why It Matters in A360**

For your use case (laser manuals), a **Medical Manual QA agent** would be the **foundation agent** that powers:

* **Manual Q\&A \+ Page Cite** (Agent \#1 from your list)

* **Safety & Contraindication Checker** (Agent \#6, if you filter queries against a “warnings” subset)

* **Troubleshooting Wizard** (Agent \#5, if you index the troubleshooting section as decision trees)

Essentially: it’s the **“chat with manual” agent**, but customized so it’s **clinically safe, reference-anchored, and parameter-aware**.

---

## **🔹 Existing Pre-Made Options**

* **LangChain \+ ConversationalRetrievalChain** → generic QA agent, can be tailored for manuals.

* **LlamaIndex Medical QA templates** → prebuilt RAG chains for scientific/medical PDFs.

* **deepset Haystack pipelines** → widely used in biomedicine for QA over guidelines (FDA, PubMed, device docs).

* **HuggingFace Models (BioMedRAG, ClinicalBERT)** → can power the retrieval and summarization layers.

---

👉 So, when I said *“Medical Manual QA,”* I meant:

An agent template that lets clinicians ask free-text questions of a **medical device manual** and get safe, cited answers (parameters, procedures, safety notes) without reading the whole PDF.

---

Would it help if I **sketched a lightweight MVP agent pipeline for A360** (e.g., using LlamaIndex \+ Unstructured.io) that could give you this Medical Manual QA in a week’s work?

## **1\. General PDF QA Agents (ready-made)**

These give you **chat-with-a-PDF** capability out of the box.

* **LlamaIndex “SimpleDirectoryReader \+ QueryEngine”**

  * Handles ingestion of PDFs into vector stores.

  * Provides agent-like query engines with retrieval \+ response synthesis.

  * Can be wrapped in a chat UI in a few hours.

  * ⚡ Quick win: great for Manual Q\&A \+ Page Cite agent.

* **LangChain \+ ConversationalRetrievalChain**

  * Loads PDFs → splits → embeddings → retrieval → chat.

  * Includes built-in support for citations, conversational memory, and guardrails.

  * ⚡ Good base for your Manual Q\&A and Troubleshooting Wizard.

* **Haystack (deepset)**

  * Pre-made pipelines for doc QA with retrievers \+ readers.

  * Can ingest PDF manuals, extract tables, and expose them via REST API.

  * ⚡ Useful if you want a quick backend service powering your PDF agent endpoints.

* **Unstructured.io \+ RAG pipeline**

  * Pre-processing SDK specialized in extracting **tables, figures, and headings** from PDFs.

  * ⚡ Great for Parameter Finder and Image/Table Extractor agents.

---

## **2\. Hosted / SaaS-like Agent Platforms (no heavy dev needed)**

These can be embedded into A360 as a **temporary MVP** while your team builds custom ones.

* **ChatPDF / Documind / Humata / PDF.ai**

  * Hosted “chat with your PDF” tools.

  * Provide APIs or embeddable widgets.

  * ⚡ Can be embedded into your right-panel assistant for instant Q\&A.

  * Limitation: harder to enforce **strict parameter guardrails**.

* **TypeDB \+ LLM wrappers**

  * For structured manuals where you want a **knowledge-graph-like agent**.

  * ⚡ Potentially useful if you want Procedure Navigator \+ Troubleshooting Wizard out fast.

* **Perplexity Enterprise / Kagi Universal RAG**

  * Can ingest PDFs and provide agentic Q\&A with source links.

  * ⚡ Lower effort if you want secure cloud-side agent hosting, but less customizable.

---

## **3\. Pre-built UI/Agent Templates**

* **Streamlit \+ LangChain Agents** → already has community templates like *Ask Your PDF*, *Medical Manual QA*, *Parameter Lookup*.

* **Gradio** demos → drag-and-drop PDF loaders with Q\&A, can be forked and embedded into A360’s frontend as an iframe or RN WebView.

* **Vercel AI SDK** → good for building a polished, chat-like PDF agent interface quickly.

---

## **4\. Domain-Specific Add-Ons (closer to what you need)**

* **BioMedRAG (HuggingFace / LangChain Hub)**

  * Tailored for medical literature, handles entity recognition & references.

  * ⚡ Could bootstrap your Safety & Contraindication Checker agent.

* **SciSpaCy \+ NER pipelines**

  * Pulls out drugs, contraindications, measurements from manual text.

  * ⚡ Speeds up your Terminology Glossary agent.

---

✅ **Fastest Path for A360**

* Use **LlamaIndex or LangChain ConversationalRetrievalChain** for **Manual Q\&A \+ Page Cite** (MVP agent).

* Add **Unstructured.io preprocessing** to cleanly extract **parameter tables \+ warnings** for Parameter Finder and Safety Checker.

* Wrap these in your existing **A360 agent framework**, exposing each capability as an “agent slot” (Q\&A, Navigator, Calculator, etc.).

* For **very quick demos**, you could even embed **ChatPDF’s widget** in your right panel while your backend team spins up the RAG pipelines.

---

Do you want me to **map these pre-made agents directly to your 12 proposed A360 PDF agents** (like “use ChatPDF widget for Q\&A, use Unstructured.io \+ LlamaIndex for Parameters,” etc.), so your dev team knows exactly what to plug in short term?

##### **You said:**

What is medcal manual QA

###### **ChatGPT said:**

Great question — when I mentioned **“Medical Manual QA”**, I was referring to a class of **pre-built question–answering (QA) agents** designed to interact with **medical device manuals, clinical guidelines, or scientific PDFs**.

Here’s what it means in practice:

---

## **🔹 What Medical Manual QA Is**

* **QA (Question–Answering) over manuals** \= an AI system that lets a user type natural language questions about a **medical device manual** (e.g., a laser system, ultrasound, or injection guide) and get back **concise, cited answers** directly from the manual.

* The “medical” qualifier just means the system is tuned for **domain-specific content** like parameters, contraindications, dosage ranges, and safety warnings.

---

## **🔹 How It Works (Simplified Flow)**

1. **Manual ingestion**

   * PDF is parsed, OCR’d if needed, and split into chunks (sections, paragraphs, tables).

   * Metadata like *page numbers, section headings, warnings* is preserved.

2. **Indexing**

   * Chunks are embedded into a vector store (FAISS, Pinecone, Milvus, or Bedrock Kendra).

   * Sometimes also keyword-indexed for exact term lookup (fluences, dosages, “contraindicated”).

3. **QA Agent**

   * User types: *“What are the starting fluence ranges for Fitzpatrick IV hair removal?”*

   * Retriever pulls the relevant manual sections.

   * LLM summarizes the answer, but always **returns the page/section citation**.

4. **Safety Guardrails**

   * Hard rules can be layered: don’t generate fluences/pulse widths outside manufacturer limits.

   * Always surface **verbatim manual text** for safety-critical queries.

---

## **🔹 Why It Matters in A360**

For your use case (laser manuals), a **Medical Manual QA agent** would be the **foundation agent** that powers:

* **Manual Q\&A \+ Page Cite** (Agent \#1 from your list)

* **Safety & Contraindication Checker** (Agent \#6, if you filter queries against a “warnings” subset)

* **Troubleshooting Wizard** (Agent \#5, if you index the troubleshooting section as decision trees)

Essentially: it’s the **“chat with manual” agent**, but customized so it’s **clinically safe, reference-anchored, and parameter-aware**.

---

## **🔹 Existing Pre-Made Options**

* **LangChain \+ ConversationalRetrievalChain** → generic QA agent, can be tailored for manuals.

* **LlamaIndex Medical QA templates** → prebuilt RAG chains for scientific/medical PDFs.

* **deepset Haystack pipelines** → widely used in biomedicine for QA over guidelines (FDA, PubMed, device docs).

* **HuggingFace Models (BioMedRAG, ClinicalBERT)** → can power the retrieval and summarization layers.

---

👉 So, when I said *“Medical Manual QA,”* I meant:

An agent template that lets clinicians ask free-text questions of a **medical device manual** and get safe, cited answers (parameters, procedures, safety notes) without reading the whole PDF.

---

Would it help if I **sketched a lightweight MVP agent pipeline for A360** (e.g., using LlamaIndex \+ Unstructured.io) that could give you this Medical Manual QA in a week’s work?

##### **You said:**

Yes

###### **ChatGPT said:**

Perfect. Let’s sketch a **lightweight MVP pipeline for a Medical Manual QA agent inside A360**. This is something your dev team could stand up quickly — think **1–2 weeks** to get a usable demo that works on your large laser PDFs.

---

# **⚡ Medical Manual QA – MVP Pipeline for A360**

## **1\. Data Prep (Manual Ingestion)**

* **Inputs**: Manufacturer PDFs (laser manuals, treatment guides).

* **Steps**:

  1. **OCR/Parsing**

     * Use **Unstructured.io** or **AWS Textract** → extracts text, tables, figures.

  2. **Chunking**

     * Split by **headings, paragraphs, tables**.

     * Include metadata: `{page, section, heading, figure_id}`.

**JSON Schema Example**:

 `{`  
  `"id": "chunk_143",`  
  `"text": "Recommended fluence range for Fitzpatrick IV hair removal...",`  
  `"page": 143,`  
  `"section": "7.2.1",`  
  `"type": "parameter_table"`  
`}`

3. 

---

## **2\. Indexing**

* **Vector Index (semantic search)**

  * Store embeddings for all chunks (FAISS or Pinecone for fast prototyping).

* **Keyword Index (exact lookup)**

  * Regex/keyword map for sensitive items (fluence, pulse width, contraindications).

* **Dual retrieval** \= semantic \+ keyword for accuracy.

---

## **3\. Agent Logic**

* Base on **LlamaIndex** or **LangChain ConversationalRetrievalChain**.

* Flow:

  1. User asks: *“What parameters for Fitzpatrick IV hair removal?”*

  2. Retriever pulls top chunks.

  3. LLM (Bedrock/Claude Haiku, GPT-4o mini, or Deepgram Nova) synthesizes answer.

  4. **Answer includes citations** (page/section).

  5. Guardrails check values vs. manual limits (e.g., fluence must be between 10–18 J/cm²).

---

## **4\. UI (A360 Integration)**

* **Split view** (as in the wireframe I drafted):

  * **Left:** PDF viewer with auto-scroll to cited page.

  * **Right:** Chat panel (Manual QA agent).

* Features:

  * “Show Source” → jumps to page.

  * Highlight text in PDF.

  * Chips: *\[Procedure Navigator\]*, *\[Parameters\]*, *\[Troubleshoot\]* (other agents can reuse same backend).

---

## **5\. Safety Guardrails (Non-Negotiable in Med Context)**

* Always cite page/section.

* If outside known safe ranges → respond: *“Manual does not support this parameter.”*

* Hardcode regex alerts for:

  * Contraindications (“pregnant”, “tattoo”, “photosensitizing drugs”).

  * Warnings (⚠️ phrases).

---

## **6\. Stack Recommendation (for Speed)**

* **Backend**:

  * LlamaIndex (for ingestion \+ retrieval orchestration).

  * FAISS (local vector DB, fast & free).

* **Frontend**:

  * Use A360’s React Native UI, embed PDF viewer \+ chat.

* **Model**:

  * Bedrock Claude Haiku (fast \+ safe summarizer).

  * Or GPT-4o-mini for cheap Q\&A.

* **Deployment**:

  * Wrap in a simple API: `/manual-qa/ask`.

---

## **7\. MVP Rollout Timeline**

* **Week 1**:

  * Parse 1–2 laser manuals → build ingestion \+ indexing pipeline.

  * Expose `/ask` API for Q\&A.

* **Week 2**:

  * Add UI split view.

  * Add citations with page previews.

  * Add guardrails for parameter ranges \+ contraindications.

✅ After 2 weeks → Clinician can **upload a manual → ask questions → see cited answers in real time.**

---

👉 Would you like me to **draft the exact JSON schemas \+ API endpoints** (`/ask`, `/parameters`, `/troubleshoot`) so your devs can plug them into A360’s backend right away? That way you’d have a ready-made blueprint for coding.

##### **You said:**

I want to add a layer to this that can ingest a transcription and create specific questions or topics to cover related to this.

###### **ChatGPT said:**

Got it — you want to **bridge transcriptions → Medical Manual QA**, so that instead of relying only on free-text queries, the system can **auto-generate questions/topics** from the consultation and then push those into the manual agent. That creates a **closed-loop workflow** between what’s being said in the room and what the manual can teach or verify.

Here’s how to layer that in:

---

# **🧩 Transcription → Manual QA Layer**

## **1\. Transcription Input**

* Source: A360’s real-time or saved transcription (Deepgram/Bedrock pipeline you already run).

* Data: Raw transcript text with speakers, timestamps.

Example:

 `Doctor: We’ll be treating a Fitzpatrick IV patient for hair removal.`  
`Doctor: I’m considering a starting fluence of 18 J/cm².`   
`Patient: I had sun exposure last week.`

* 

---

## **2\. Topic & Question Generator (NLP Layer)**

Use an LLM (Claude Haiku, GPT-4o mini, or your custom RAG pipeline) to scan the transcript for:

* **Clinical Entities** → Fitzpatrick type, indication, parameters, symptoms, meds.

* **Procedural Mentions** → “hair removal,” “pulse width,” “tattoo,” “contraindication.”

* **Potential Risks** → “recent sun exposure,” “blood thinners.”

From these, generate **targeted questions** for the Manual QA agent.

### **Example Output**

`{`  
  `"topics": [`  
    `"Parameters for Fitzpatrick IV hair removal",`  
    `"Safety guidance for patients with recent sun exposure",`  
    `"Contraindications for treating tattoos",`  
    `"Maximum fluence ranges for this device"`  
  `],`  
  `"questions": [`  
    `"What does the manual recommend as starting fluence for Fitzpatrick IV?",`  
    `"What cautions are listed for treating patients with recent sun exposure?",`  
    `"Are tattoos listed as contraindications in the manual?",`  
    `"What is the maximum fluence limit specified for this handpiece?"`  
  `]`  
`}`

---

## **3\. Pipeline Flow**

1. Transcript captured →

2. **Topic/Question Generator** (LLM agent, fine-tuned on clinical terms) →

3. Sends questions into the **Manual QA Agent** →

4. Returns cited answers with page previews →

5. Displays in A360 UI as **“Recommended Topics”** under the chat panel.

---

## **4\. UI Concept**

* Right panel (Manual Assistant) gains a **“Suggested Topics from Consult”** section above the input box.

* Example:

  * ⚡ Parameters for Fitzpatrick IV

  * ⚡ Sun exposure safety

  * ⚡ Contraindications: tattoos

* Tapping one auto-inserts the question into the QA chat.

---

## **5\. Implementation Details**

* **Extraction**:

  * Use **NER** (spaCy / SciSpaCy) \+ regex for parameter terms (fluence, ms, J/cm²).

  * Use **LLM summarizer** to detect patient factors (sun exposure, meds, pregnancy).

* **Generation**:

  * Template-based:

    * *If parameter mentioned → generate “What does the manual recommend for \[X\]?”*

    * *If risk factor mentioned → generate “What cautions are listed about \[X\]?”*

* **Agent Orchestration**:

  * Can run this as a pre-processor before Manual QA queries.

---

## **6\. MVP Timeline**

* **Week 1**:

  * Extend transcription pipeline to export structured JSON (entities, factors, parameters).

* **Week 2**:

  * Add Topic/Question Generator layer (LLM \+ templates).

  * Pipe output into Manual QA agent.

* **Week 3**:

  * UI integration: “Suggested Topics” chips → QA agent chat.

---

✅ Result: After every consult transcription, A360 automatically surfaces **manual-relevant questions** (parameters, contraindications, troubleshooting). The clinician just taps one to get the cited manual guidance.

---

Would you like me to **design the JSON schema \+ endpoint spec** for this Topic/Question Generator layer (e.g., `/transcript-to-questions` → `/manual-qa/ask`)? That way it slots directly into the A360 backend flow.

##### **You said:**

Yes

###### **ChatGPT said:**

Perfect. Here’s a **blueprint** for the new **Transcript → Questions → Manual QA** layer, with JSON schemas and API endpoints your devs can plug directly into A360.

---

# **⚡ Transcript → Questions → Manual QA Blueprint**

## **1\. New Endpoint: `/transcript-to-questions`**

This service ingests a consultation transcript and outputs **structured topics \+ suggested questions**.

### **Input JSON**

`{`  
  `"transcript_id": "session_2025_08_23_001",`  
  `"transcript_text": "Doctor: We’ll be treating a Fitzpatrick IV patient for hair removal. Doctor: I’m considering a starting fluence of 18 J/cm². Patient: I had sun exposure last week.",`  
  `"metadata": {`  
    `"doctor": "Dr. Miranda",`  
    `"patient_id": "PAT_12345",`  
    `"device": "BrandX Pro 755"`  
  `}`  
`}`

### **Output JSON**

`{`  
  `"transcript_id": "session_2025_08_23_001",`  
  `"topics": [`  
    `{`  
      `"id": "topic_1",`  
      `"label": "Parameters for Fitzpatrick IV hair removal",`  
      `"priority": "high"`  
    `},`  
    `{`  
      `"id": "topic_2",`  
      `"label": "Safety guidance for patients with recent sun exposure",`  
      `"priority": "high"`  
    `},`  
    `{`  
      `"id": "topic_3",`  
      `"label": "Contraindications for treating tattoos",`  
      `"priority": "medium"`  
    `}`  
  `],`  
  `"questions": [`  
    `{`  
      `"id": "q_1",`  
      `"text": "What does the manual recommend as starting fluence for Fitzpatrick IV?",`  
      `"linked_topic": "topic_1"`  
    `},`  
    `{`  
      `"id": "q_2",`  
      `"text": "What cautions are listed for treating patients with recent sun exposure?",`  
      `"linked_topic": "topic_2"`  
    `},`  
    `{`  
      `"id": "q_3",`  
      `"text": "Are tattoos listed as contraindications in the manual?",`  
      `"linked_topic": "topic_3"`  
    `}`  
  `]`  
`}`

---

## **2\. Modified Manual QA Endpoint: `/manual-qa/ask`**

This already exists in your MVP design, but we extend it to accept questions coming directly from `/transcript-to-questions`.

### **Input JSON**

`{`  
  `"question": "What does the manual recommend as starting fluence for Fitzpatrick IV?",`  
  `"device": "BrandX Pro 755",`  
  `"context": {`  
    `"transcript_id": "session_2025_08_23_001",`  
    `"linked_topic": "topic_1"`  
  `}`  
`}`

### **Output JSON**

`{`  
  `"answer": "The manual recommends a starting fluence of 14–18 J/cm² with a pulse duration of 10–20 ms.",`  
  `"citations": [`  
    `{`  
      `"page": 143,`  
      `"section": "7.2.1",`  
      `"excerpt": "For Fitzpatrick IV hair removal, begin with fluence of 14–18 J/cm²..."`  
    `}`  
  `],`  
  `"safety_flags": [],`  
  `"context": {`  
    `"transcript_id": "session_2025_08_23_001",`  
    `"linked_topic": "topic_1"`  
  `}`  
`}`

---

## **3\. UI Integration**

* **Suggested Topics Section** (above input box in the Manual Assistant panel).

* JSON feeds in as clickable **chips**:

  * ⚡ *Parameters for Fitzpatrick IV*

  * ⚡ *Sun exposure safety*

  * ⚡ *Contraindications: tattoos*

Clicking a chip auto-injects the linked `question.text` into `/manual-qa/ask`.

---

## **4\. Processing Layers**

* **NER Layer** (SciSpaCy \+ regex) → extracts medical entities: Fitzpatrick type, parameters, conditions.

* **LLM Layer** (Claude Haiku / GPT-4o mini) → generates natural questions in clinician language.

* **Template Rules** → ensure structure:

  * Parameter mention → “What does the manual recommend for \[parameter\]?”

  * Risk mention → “What cautions are listed for \[risk\]?”

  * Contraindication → “Is \[factor\] contraindicated according to the manual?”

---

## **5\. MVP Deployment Steps**

* Week 1: Build `/transcript-to-questions` → extract entities & risks → generate JSON.

* Week 2: Integrate with `/manual-qa/ask`.

* Week 3: Add “Suggested Topics” UI.

---

✅ End result: **Every consult transcript auto-generates a set of smart, manual-linked questions.** Clinicians can tap a suggestion → instantly get a cited answer from the manual, without having to think of the question themselves.

---

Do you want me to also **draft the JSON schema for how these answers get logged back into the patient’s case record** (so they’re automatically documented in the EMR)? That would close the loop from **Transcript → Manual QA → Case Note.**

# Tools

![][image1]

[https://pdf.ai/use-cases/user-manuals](https://pdf.ai/use-cases/user-manuals)

[https://blog.getodin.ai/how-ai-for-pdf-analysis-can-boost-your-workflow/](https://blog.getodin.ai/how-ai-for-pdf-analysis-can-boost-your-workflow/)

docAnalyzer.ai, PDF.ai, Odin AI,

# Description of Database

# **The idea in one paragraph**

The Global Library is the refinery and the fuel pipeline: a single, vetted source of clinical know-how (procedures, device specs, protocols, patient education) that any agent can tap, consistently, across products and workflows. When a clinic comes onboard, we “carve out” just the entries they actually use into their own editable Practice Library—same fuel, tailored to their pumps—so they can adopt or override content to match their protocols, pricing, and voice. That dual-library model gives us standardization where it matters and customization where it’s needed.

---

## **Where we are (current state, in human terms)**

* **Content and sources.** We’ve collected “ground-truth” manufacturer material (e.g., a 283-page Sciton Joule operator manual), medical literature, and \~6,000 hours of expert podcasts. The plan is to refine that raw material into structured, traceable knowledge that agents can retrieve with citations.

* **The people.** Taner is our long-time AI collaborator from academia (a strategic partner and “second brain”), not hired as the “data scientist”; he knows the platform and the data deeply. We also brought in an AWS-heavy data engineer to stand up a proper lake.

* **Infra foundations.** The data-lake side (multi-account AWS, CDK) and ingestion pipelines (Dagster → S3 → curation) are being set up so we can store raw files, transform them into a structured schema, and publish as APIs and embeddings for agents.

* **What’s unclear.** The lake exists and the approach is sound; what’s fuzzy is exactly how far each lane (collection, structuring, validation) has progressed. That’s why we’ll propose a simple, **staging-first** path below that doesn’t wait on all the long-term plumbing.

---

## **What the Global Library actually is (to a dev)**

* **One, versioned master.** A curated, version-controlled repository organized by taxonomy (devices, procedures, conditions, care protocols), each with consistent fields—for example, a laser device entry carries manufacturer & model, indications, safety limits, recommended ranges, and pre/post care.

* **Traceable sources.** Each field points back to “manufacturer ground truth,” literature, or expert consensus (and we keep those categories distinct for credibility weighting and UI labeling).

* **Published to agents in three ways.** 1\) structured API (fields), 2\) vector search for RAG, and 3\) training/fine-tuning datasets—so any agent can grab facts or rich text with guardrails.

## **What the Practice Library is**

* **A clone of relevant entries.** When a practice signs up, we copy only what they offer into a Practice Library they own. From then on, they can edit, add prices, tweak aftercare, and insert their preferences (e.g., “we run \+10 J above default on Skin Type III”). We show diffs and offer optional pull-updates from Global as it evolves.

* **Clear responsibility.** Once content is in the practice library, clinicians sign off that it reflects their standards (protecting A360 while empowering the clinic to personalize care).

---

## **The short-term plan (fast path in staging, production-friendly later)**

We’ll stand up a **tiny, repeatable “RAG kit” in staging** so teams can use the data immediately while the lake and pipelines harden. This is deliberately simple:

1. **Pick one narrow use-case (LPOA)** and one support use-case (e.g., post-treatment care), then

2. **Extract PDF text → chunk → embed → search**, and

3. **Expose a thin query endpoint** that agents can call in staging.

Concretely:

* **Storage:** S3 staging buckets hold the raw PDFs \+ the chunked text.

* **Search:** a managed vector index (OpenSearch serverless works fine here) with per-project indexes: `global/lpoa`, `practice/<id>/lpoa-overrides`.

* **Loader:** a simple loader job that writes embeddings and tags (tenant, collection, type). (The POC spec already outlines “direct S3 uploads → vectorize → OpenSearch index per metadata.”)

* **Agent access:** one minimal `/rag/query` in the ML microservice that retrieves top-k snippets \+ source URIs for answer assembly. (This is consistent with the RAG POC and fits our agent framework later.)

* **Graduation path:** the same index and schemas move to **prod** once the lake pipelines (Dagster) automate ingestion, QC, and re-embedding; agents keep the same API contract.

Why this works: it lets Taner and the AI team ship usable “mini-databases” for agents **now**, in staging, while the data engineer continues the full lake build. Then we swap the manual loaders for Dagster jobs, but the agent code and the content shape stay the same.

---

## **Example: LPOA (Laser Parameter Optimization Assistant)**

* **What it needs:** Manufacturer ground-truth (device specs, safe limits), plus best-practice notes from textbooks/literature and podcast consensus about sequencing and safety.

* **What the agent does:** Given patient inputs (Fitzpatrick type, indication, area), it retrieves the relevant device parameters, highlights “do not exceed” ranges, and explains the “why” with page-level links back to the manual. It also flags clinic-specific overrides from the Practice Library. (The LPOA POC lists these goals explicitly as *clinical reference, safety highlighting, and explainability*.)

* **Why we start here:** It’s high-value, bounded, and built on PDFs we already have (e.g., Sciton Joule). Nobody reads 283 pages during a busy day; the agent does.

Bonus: when we move beyond lasers, the same “RAG kit” pattern applies to post-care, consult summaries, and plan builders; those agents are already defined in our Agent Framework and can be templatized.

---

## **How this connects to the Agent Framework (lightweight now, scalable later)**

Our Phase-2 “Agentic Framework” gives us templates, role-based configuration, and an internal App/Agent Exchange. In the short term, agents just call `/rag/query` in staging; later, the same agents are packaged, versioned, and distributed with proper role scopes (A360 admin, partner, practice) and bundle into solutions (e.g., the **Laser Optimization Package**).

---

## **Why this matters to the business (one slide’s worth)**

Making our data accessible via simple RAG enables:

* **Faster internal protos** (R\&D can ship agents for real users);

* **Safer, more consistent outputs** (ground-truth \+ consensus \+ traceability);

* **Measurable lift** in conversion/retention once we turn on the consult & follow-up agents (AI-personalized content reliably improves engagement).

---

## **Concrete tasks we should execute (short-term, staging-first)**

**Epic: R\&D Deliverables & Integration Framework for Data Analysis/Processing Agents**  
 **Goal:** Make Taner’s R\&D outputs show up as **(a)** internal tools everyone can see/use and **(b)** clean, stable datasets that real microservices can consume.

1. **Define Internal Tooling for R\&D/PoC**  
    *Acceptance:* Mock out a simple “Data Workbench” UI: dataset browser, recency & status badges, and job/metric tiles (auth \+ roles, progress meters, link-outs to raw/transformed). Integrates with our existing dev env.

2. **Build/Enhance the Dataset Review Tool**  
    *Acceptance:* In staging, show latest datasets and logs, filter/search, diff versions, and deep-link to source on S3 plus transformed tables/chunks (global vs practice slices).

3. **Define Dataset & API Versioning Standards**  
    *Acceptance:* Naming \+ semver for datasets and APIs; criteria to graduate from R\&D to “stable”; storage pattern (S3 \+ a small metadata table); changelog format. (This mirrors our Agent version/bundle patterns.)

4. **Develop the Integration Layer for Microservices**  
    *Acceptance:* Ship a tiny, documented `/rag/query` service \+ one example “consumer” (LPOA agent in staging). Include key-based auth and a sample cURL/JSON doc. Verify with at least one downstream (e.g., plan builder or aftercare agent).

5. **Create a Shared Dev Environment for Data Agents**  
    *Acceptance:* Separate staging/prod datasets; deploy agents to staging; provide test data; turn on logging & basic monitoring of calls (counts, latency, errors).

6. **Establish Downstream Consumption Examples**  
    *Acceptance:* Two worked examples:

   * “Select global library content by profession/treatment” (simple query \+ JSON result), and

   * “LPOA: pass patient inputs → get parameters \+ citations.”  
      Each with a copy-paste request/response and a code snippet.

7. **Documentation & Onboarding Guide**  
    *Acceptance:* One page diagram (R\&D → internal tool → dataset/API → microservice); how to access the Workbench; `/rag/query` reference; and “How to contribute” to R\&D datasets. (This extends the Global Library Onboarding notes.)

---

## **What a developer needs to know about the staging environment (so this ports cleanly to prod)**

* **Schema & taxonomy:** Use the same field names you’ll find in Global Library (devices/procedures/conditions/care-protocols). That lets us swap the manual loader for Dagster later without breaking agents.

* **Tenancy & overrides:** Keep global content in `global/*` indexes and practice edits in `practice/<id>/*`; merge at query-time, surface diffs.

* **Citations:** Always return snippet \+ source URI \+ category (manufacturer, literature, podcast consensus); the UI can badge trust levels accordingly.

* **Graduation:** When pipelines land, they’ll read the same S3 prefixes, run validation/QA, and publish the same embedding/API contracts to prod. Agents won’t change code—just the base URL.

---

## **If you want a single, tangible first win**

Start with **LPOA in staging**: load the Sciton manual and two clinic overrides into the “global/lpoa” and “practice/clinic-X/lpoa-overrides” indexes, wire the minimal `/rag/query` endpoint, and point the prototype LPOA agent at it. It gives doctors safer, faster answers at the point of care, with citations—and it proves out our Global ↔ Practice content model end-to-end.

---

### **Notes**

* As we expand beyond LPOA, the same pattern supports consult summaries, aftercare, care-plan generation, and patient-facing follow-ups—capabilities already outlined in the Agent/Template framework and proven to lift engagement/conversions when personalized.

If you want, I can turn this into a one-page “Dev Quickstart” plus a sample Postman collection for `/rag/query` so the team can hit the staging index on day one.

# LPOA Story

# **The Story Behind the LPOA**

### **1\. The Problem in the Real World**

Laser medicine has a long-standing problem: the manuals are massive, the training is brief, and the stakes are high.

* A Sciton Joule laser manual is **283 pages long**, packed with tables of “optimal settings by skin type and condition.” Chris Cabell summed up the issue bluntly in a Global Library meeting: *“How many people do you think read this 283-page manual? Zero. Nobody reads this. The rep comes in, trains them, the person retains 10% of what they’re told, and they really just don’t have a clue how to use this laser optimally”*.

* Doctors and nurses confirm this. At training workshops and in podcasts, clinicians often admit that “settings come more from what the rep showed us than what’s in the manual.”

* Misuse has consequences. Lasers can **burn, cause pigment changes, or under-treat patients** if parameters aren’t right. Adverse event databases like FDA MAUDE include many laser injuries traced back to “improper settings”.

This means both **manufacturers and doctors share the pain**:

* *Doctors* face inconsistent results, unhappy patients, or liability risk.

* *Manufacturers* get constant support calls, complaints that “the laser doesn’t work,” and slower adoption because clinics fear mistakes.

---

### **2\. The Idea: From Manuals Nobody Reads → Real-Time Guidance**

A360’s **Laser Parameter Optimization Assistant (LPOA)** was designed to turn all that “lost knowledge” into something practical.

* Instead of flipping through a manual, a provider asks the LPOA: *“Tattoo removal, skin type IV, 3-year-old tattoo”* → it instantly pulls from the manufacturer’s specs, peer-reviewed literature, and practice outcome logs to suggest safe, patient-specific settings.

* Chris described it as: *“An agent that tells you the optimal settings and references the page in the manual where it came from”*.

* It doesn’t just parrot the manual; it learns from **real-world usage** too. If 85% of experts and clinics in A360’s podcast/literature database treat a condition a certain way, the LPOA can highlight that consensus as best practice.

Think of it like GPS for lasers: you could still read a map, but why, when the assistant can guide you safely in real time?

---

### **3\. Real-World Cases That Show the Need**

* **Pigment problems in melasma:** Experts repeatedly warn that *“heat-based laser treatments (photo facials) typically worsen melasma”*. Yet patients are still burned because the provider “didn’t know” or relied on outdated rules.

* **Tattoo removal settings:** Providers on forums admit they “start low and guess,” leading to too many sessions and frustrated patients. An LPOA can suggest settings aligned with manufacturer data and updated with thousands of logged cases.

* **FDA adverse events:** Many laser complications reported are simple mistakes like using wrong fluence or wrong pulse width on a darker skin type—mistakes the LPOA can prevent.

---

### **4\. Why Manufacturers Would Pay**

For device companies, the LPOA is not just a nice-to-have—it’s a business tool:

* **Reduces support tickets**: Clinics call less if the AI can answer “what settings should I use?”

* **Faster onboarding**: A new nurse can be guided by the AI, not require repeated onsite training.

* **Usage analytics**: Manufacturers can see anonymized patterns of how their device is actually used, helping R\&D.

* **Stronger adoption**: If providers feel safer, they do more treatments. More treatments \= more consumables and more revenue for the manufacturer.

This is why analysts propose that companies like **Candela or Sciton could license the LPOA** and distribute it bundled with their devices. One PatientNow strategy doc modeled $1M+ ARR if just a few hundred high-volume clinics or device makers adopted LPOA at \~$3,000/year.

---

### **5\. In Plain Words**

* **Doctors** don’t read 283-page manuals. They remember a fraction of what reps tell them. Mistakes happen, patients get burned, and clinics lose money.

* **Manufacturers** deal with support calls and slower device adoption.

* **The LPOA** fixes this by turning the manual, studies, and expert consensus into a real-time assistant that gives the right setting for the right patient, in seconds.

* **Everyone wins**: safer treatments, happier patients, fewer errors, more revenue, stronger manufacturer-provider relationships.

#  **Quote Library for LPOA Narrative**

# **Expanded Quote & Case Library for LPOA**

### **1\. Manuals & Training Are Not Used**

* *“How many people do you think read this 283-page laser manual? Zero. The rep comes in, trains them, they retain 10% of what they’re told, and they don’t have a clue how to use it optimally.”* — Chris Cabell, A360 Global Library meeting

* *“They don’t say, ‘I never read the manual, I didn’t pay attention, or I was hung over the day they came in and did the training.’ They just go online and say ‘this laser sucks.’”* — Clinician commentary in A360 Global Library transcript

* *“Many laser operators report receiving poor training from their equipment suppliers. One experienced trainer notes that about 80% of his trainees had already been trained by suppliers but still struggled to achieve good results.”* — Cited in LPOA white paper, referencing Mike Murphy’s training blog

---

### **2\. Real-World Injury Cases**

* *“In one reported case, a laser therapist used incorrect settings during a hair removal treatment, resulting in burns to the patient’s face, chin, and neck area.”* — New Zealand Health & Disability Commission decision (21HDC00153, 2022\)

* *“Burns, blistering, dyschromia, and scarring remain the most common complications in FDA MAUDE reports for lasers and light devices, most linked to inappropriate settings or operator error.”* — FDA MAUDE data synthesis (internal A360 research notes)

---

### **3\. Structural Training Gaps**

* *“Historically, there were few rules governing laser treatments, leading to a high risk of consumer injury. Standardized training programs were nonexistent.”* — National Laser Institute report on cosmetic laser training

* *“Research suggests practitioners should receive a minimum of 30 hours of cosmetic laser training, regardless of their background. Many manufacturer programs don’t meet this minimum.”* — National Laser Institute training guidance

* *“Users who buy secondhand laser devices often struggle with lack of training and support. They can’t access official educators, which increases safety risks.”* — National Laser Institute, industry blog

---

### **4\. Clinician & Manufacturer Pain**

* *“Somebody comes in, they don’t know how to use it. They put it on the safest setting possible. The safest setting gives terrible results. Patients go online and say ‘I got treated with the Joule laser and it didn’t work.’”* — Clinician feedback, Global Library transcript

* *“Half our support tickets are doctors asking: ‘What setting do I use for this patient?’”* — Laser manufacturer support staff, quoted in A360 internal meeting notes

* *“Manufacturers often design settings to minimize skin damage, which avoids liability but leads to poor or non-existent results after multiple sessions.”* — LPOA draft white paper

---

### **5\. Expert Commentary on Melasma & Lasers**

* *“Heat-based laser treatments (photo facials) typically worsen melasma.”* — Emily Walsh, Master Esthetician, *Glow Boss Podcast*

* *“Treatment planning involves assessing melasma type… PicoSure laser treatments are sometimes considered, but misdiagnosis is common, and inappropriate use aggravates the condition.”* — Dr. Paul Swensen, podcast interview

---

### **6\. Why an Assistant Helps**

* *“If I had something that could just tell me the safe range for this patient, with a reference to the manual, I’d use it every time.”* — Medspa RN, podcast-derived transcript

* *“For manufacturers, every laser user becomes an expert through AI guidance. That means fewer errors, fewer support calls, and more satisfied customers.”* — A360 Demo Meeting, Manufacturer Value Proposition

# Tab 9

I'll create comprehensive technical documentation for the developer. Let me first examine the current codebase structure more deeply, then create detailed technical specifications.

\*\*Files Read:\*\*

\*\*C:\\Users\\Chris\\b360\\web-app\\src\\store\\slices\\Catalog\\types.ts\*\*  
\`\`\`  
import { GLProduct, GLService, PLProduct, PLService } from 'apiServices';  
import { ListOfItems } from 'types';

type GLData \= {  
  GLServices: ListOfItems\<GLService\>;  
  GLProducts: ListOfItems\<GLProduct\>;  
};

type PLData \= {  
  PLServices: ListOfItems\<PLService\>;  
  PLProducts: ListOfItems\<PLProduct\>;  
};

type Library \= 'global' | 'practice';  
type ItemsType \= 'products' | 'services';

export type CatalogInitialState \= {  
  catalogGLData: GLData;  
  catalogPLData: PLData;  
  catalogActiveLibrary: Library;  
  catalogItemsType: ItemsType;  
};

type Actions \= {  
  setGLServices: (data: ListOfItems\<GLService\>) \=\> void;  
  setPLServices: (data: ListOfItems\<PLService\>) \=\> void;  
  setGLProducts: (data: ListOfItems\<GLProduct\>) \=\> void;  
  setPLProducts: (data: ListOfItems\<PLProduct\>) \=\> void;  
  setCatalogActiveLibrary: (value: Library) \=\> void;  
  setCatalogItemsType: (value: ItemsType) \=\> void;  
};

export type CatalogSliceType \= CatalogInitialState & Actions;

// Service  
export type CatalogServiceProfileInitialState \= {  
  GLService: GLService | null;  
  PLService: PLService | null;  
};

type CatalogServiceProfileActions \= {  
  setGLService: (data: GLService) \=\> void;  
  setPLService: (data: PLService) \=\> void;  
};

export type CatalogServiceProfileSliceType \= CatalogServiceProfileInitialState & CatalogServiceProfileActions;

// Products  
export type CatalogProductProfileInitialState \= {  
  GLProduct: GLProduct | null;  
  PLProduct: PLProduct | null;  
};

type CatalogProductProfileActions \= {  
  setGLProduct: (data: GLProduct) \=\> void;  
  setPLProduct: (data: PLProduct) \=\> void;  
};

export type CatalogProductProfileSliceType \= CatalogProductProfileInitialState & CatalogProductProfileActions;

\`\`\`

\*\*Command Executed:\*\*  
\`\`\`bash  
Get-ChildItem \-Path "C:\\Users\\Chris\\b360\\web-app\\src\\types" \-Filter "\*.ts" | Select-Object Name  
\`\`\`

\*\*Output:\*\*  
\`\`\`

Name            
\----            
audio.d.ts      
css.d.ts        
enums.ts        
global.d.ts     
images.d.ts     
index.ts        
mui-theme.d.ts  
RHF-types.ts    
types.ts      

\`\`\`

\*\*Files Read:\*\*

\*\*C:\\Users\\Chris\\b360\\web-app\\src\\types\\types.ts\*\*  
\`\`\`  
export type TypeColor \= 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'text';

export type PaginationParams \= {  
  page: number;  
  size: number;  
};

export type ListOfItems\<T\> \= {  
  items: T\[\];  
  total: number;  
  page: number;  
  size: number;  
  pages: number;  
};

export type BreadcrumbInfo \= {  
  id: string;  
  name: string;  
};

export type BaseSideMenuContentProps \= { closeMenuHandler: () \=\> void; selectedItemId?: string };

export type SortDirection \= 'asc' | 'desc';

export type ColumnOrder\<T extends string\> \= \`${T},${SortDirection}\`;

export type TableHeaderConfig\<T \= undefined\> \= {  
  id: keyof T | (string & {}) | 'actions';  
  label?: string;  
  align?: string;  
  disableSorting?: boolean;  
  width?: number;  
};

export type BaseEnum \= {  
  name: string;  
  value: string;  
};

export type Timestamps \= {  
  created\_at: string;  
  updated\_at: NullableField;  
};

export type BaseDialogWindowProps \= {  
  onCloseDialogHandler: (event?: React.MouseEvent\<HTMLElement\>) \=\> void;  
  isDialogOpen: boolean;  
};

export type NullableField\<T \= string\> \= T | null;

export type NestedObjectValue \= string | number | NestedStringRecord | Array\<string | number | NestedStringRecord\>;

export type NestedStringRecord \= {  
  \[key: string\]: NestedObjectValue;  
};

export type JSONField \= { \[data: string\]: any; questionnaireForm?: any };

export type ActionType \= 'activate' | 'deactivate' | 'copy' | 'delete' | 'publish' | 'unpublish';

export type BaseFilterState \= {  
  isShowDeactivated: boolean;  
};

export type LibraryType \= 'gl' | 'pl';

export type ImportToPLPayload \= {  
  source\_id: string;  
  practice\_id?: string;  
  alternative\_name?: string;  
};

export type UploadAvatarPayload \= {  
  avatarImage: string;  
  cropWidth: number;  
  cropHeight: number;  
  cropX: number;  
  cropY: number;  
};

export type UploadImagePosition \= 'left' | 'right';

export type OptionsInitialState\<T\> \= {  
  isLoading: boolean;  
  totalPages: number | null;  
  items: T\[\];  
};

export type RouteTabConfig\<TRoutes extends Record\<string, string\>, TLabel extends string \= string\> \= ReadonlyArray\<{  
  key: string;  
  label: TLabel;  
  routeKey: keyof TRoutes;  
}\>;

\`\`\`

\*\*C:\\Users\\Chris\\b360\\web-app\\src\\types\\index.ts\*\*  
\`\`\`  
export \* from './RHF-types';  
export \* from './enums';  
export \* from './types';

\`\`\`

\*\*Command Executed:\*\*  
\`\`\`bash  
Get-ChildItem \-Path "C:\\Users\\Chris\\b360\\web-app" \-Filter "\*.env\*" | Select-Object Name  
\`\`\`

\*\*Output:\*\*  
\`\`\`

Name       
\----       
.env.dist

\`\`\`

Now let me check the API client structure and look for any onboarding or file upload functionality:

\*\*Command Executed:\*\*  
\`\`\`bash  
Get-ChildItem \-Path "C:\\Users\\Chris\\b360\\web-app\\src" \-Recurse \-Include "\*onboard\*", "\*upload\*", "\*import\*" \-File | Where-Object { $\_.FullName \-notmatch "node\_modules" } | Select-Object \-First 15 FullName  
\`\`\`

\*\*Output:\*\*  
\`\`\`

FullName                                                             
\--------                                                             
C:\\Users\\Chris\\b360\\web-app\\src\\assets\\icons\\upload\_icon.svg         
C:\\Users\\Chris\\b360\\web-app\\src\\components\\BaseDialogWindow\\Uplo...  
C:\\Users\\Chris\\b360\\web-app\\src\\components\\UploadAvatar\\UploadAv...  
C:\\Users\\Chris\\b360\\web-app\\src\\components\\UploadFileButton\\Uplo...  
C:\\Users\\Chris\\b360\\web-app\\src\\pages\\BeforeAfter\\components\\Upl...

\`\`\`

\*\*Files Read:\*\*

\*\*C:\\Users\\Chris\\b360\\web-app\\src\\lib\\api\\apiClient.ts\*\*  
\`\`\`  
import axios, { AxiosError } from 'axios';

import { notice } from 'components/ToastNotification';  
import { PUBLIC\_ROUTES } from 'constants/routes';

export const BASE\_API\_URL \= \`${process.env.REACT\_APP\_BASE\_API\_URL}/services\`;

const axiosInstance \= axios.create({  
  baseURL: BASE\_API\_URL,  
  timeout: 60\_000,  
});

let requestInterceptorId: number | null \= null;  
let responseInterceptorId: number | null \= null;

let isInterceptorsInitialized \= false;

export const initializeApiClientInterceptors \= (  
  getAuthSession: () \=\> Promise\<string | null\>,  
  signOutCognito: () \=\> Promise\<boolean\>,  
) \=\> {  
  if (isInterceptorsInitialized) return;  
  isInterceptorsInitialized \= true;

  if (requestInterceptorId \!== null) axiosInstance.interceptors.request.eject(requestInterceptorId);

  if (responseInterceptorId \!== null) axiosInstance.interceptors.response.eject(responseInterceptorId);

  requestInterceptorId \= axiosInstance.interceptors.request.use(  
    async config \=\> {  
      const accessToken \= await getAuthSession();

      if (accessToken) config.headers.Authorization \= \`Bearer ${accessToken}\`;

      return config;  
    },  
    error \=\> {  
      return Promise.reject(error);  
    },  
  );

  responseInterceptorId \= axiosInstance.interceptors.response.use(  
    response \=\> {  
      return response;  
    },  
    (error: AxiosError) \=\> {  
      switch (error?.response?.status) {  
        case 401:  
          if (\!PUBLIC\_ROUTES.includes(window.location.pathname)) {  
            signOutCognito();  
            notice('warning', 'Access denied\!');  
          }  
          return Promise.reject(error);  
        default:  
          return Promise.reject(error);  
      }  
    },  
  );  
};

export { axiosInstance as apiClient };

\`\`\`

Now let me create the comprehensive technical documentation:

\*\*Diff:\*\*  
\`\`\`diff  
\--- C:\\Users\\Chris\\b360\\web-app\\TECHNICAL\_SPEC\_GLOBAL\_PRACTICE\_LIBRARY.md  
\+++ C:\\Users\\Chris\\b360\\web-app\\TECHNICAL\_SPEC\_GLOBAL\_PRACTICE\_LIBRARY.md  
@@ \-0,0 \+1,2375 @@  
\+\# Technical Specification: Global & Practice Library System  
\+\#\# Content Management, Onboarding & Override Architecture  
\+  
\+\*\*Document Version:\*\* 1.0    
\+\*\*Date:\*\* October 1, 2025    
\+\*\*Target Audience:\*\* Backend & Frontend Developers    
\+\*\*System:\*\* Aesthetics 360 Web Application  
\+  
\+---  
\+  
\+\#\# Table of Contents  
\+1. \[Executive Summary\](\#executive-summary)  
\+2. \[Current Architecture Analysis\](\#current-architecture-analysis)  
\+3. \[Enhanced Data Models & Schema Design\](\#enhanced-data-models--schema-design)  
\+4. \[Onboarding Workflow Implementation\](\#onboarding-workflow-implementation)  
\+5. \[Content Override System\](\#content-override-system)  
\+6. \[API Specifications\](\#api-specifications)  
\+7. \[Database Migration Strategy\](\#database-migration-strategy)  
\+8. \[Frontend Implementation Guide\](\#frontend-implementation-guide)  
\+9. \[Processing Pipeline Architecture\](\#processing-pipeline-architecture)  
\+10. \[Security & Permissions\](\#security--permissions)  
\+  
\+---  
\+  
\+\#\# 1\. Executive Summary  
\+  
\+\#\#\# 1.1 Business Requirements  
\+The A360 platform requires a sophisticated two-tier library system:  
\+  
\+- \*\*Global Library (GL)\*\*: Master repository containing manufacturer data, medical information, treatment protocols, and standardized content  
\+- \*\*Practice Library (PL)\*\*: Practice-specific instances with customization capabilities, pricing, and content overrides  
\+  
\+\#\#\# 1.2 Key Features to Implement  
\+1. \*\*Multi-format content ingestion\*\* (PDFs, images, videos, text)  
\+2. \*\*Automated content extraction & matching\*\* from practice uploads  
\+3. \*\*Phased onboarding workflow\*\* for large practice datasets  
\+4. \*\*Content editability controls\*\* (manufacturer-locked vs. customizable)  
\+5. \*\*Override system\*\* (avoid content duplication across practices)  
\+6. \*\*Rich media associations\*\* (videos, images, PDFs per item)  
\+7. \*\*Concern-based content\*\* (e.g., Melasma information)  
\+8. \*\*Content visibility toggles\*\* per practice  
\+  
\+---  
\+  
\+\#\# 2\. Current Architecture Analysis  
\+  
\+\#\#\# 2.1 Existing Data Flow  
\+\`\`\`  
\+User Action → React Component → Custom Hook → API Service → Axios Client → Backend API  
\+     ↓  
\+Zustand Store Update → Component Re-render → UI Update  
\+\`\`\`  
\+  
\+\#\#\# 2.2 Current Type Definitions  
\+  
\+\#\#\#\# Global Library (Existing)  
\+\`\`\`typescript  
\+// src/apiServices/dictionary/types.ts  
\+type GLService \= {  
\+  id: string;  
\+  is\_active: boolean;  
\+  title: string;  
\+  description: string;  
\+  cover\_path: string;  
\+  is\_new: boolean;  
\+} & Timestamps;  
\+  
\+type GLProduct \= GLService; // Currently identical  
\+\`\`\`  
\+  
\+\#\#\#\# Practice Library (Existing)  
\+\`\`\`typescript  
\+// src/apiServices/practice/services/types.ts  
\+type PLService \= {  
\+  id: string;  
\+  practice\_id: string;  
\+  practice\_name: string;  
\+  title: string;  
\+  description: string;  
\+  price: number;  
\+  is\_active: boolean;  
\+  is\_new: boolean;  
\+  is\_preferred: boolean;  
\+  is\_published: boolean;  
\+  source\_id: string;        // Links to GL item  
\+  cover\_path: string;  
\+} & Timestamps;  
\+  
\+type PLProduct \= PLService;  // Currently identical  
\+\`\`\`  
\+  
\+\#\#\# 2.3 Current API Endpoints  
\+  
\+\*\*Base URLs:\*\*  
\+- Global Library: \`/services/dict/products\` & \`/services/dict/services\`  
\+- Practice Library: \`/services/practice/products\` & \`/services/practice/services\`  
\+  
\+\*\*Import Functionality (Existing):\*\*  
\+\`\`\`typescript  
\+// src/apiServices/practice/services/servicesPracticeLibrary.api.ts  
\+export const importToPLService \= async (payload: ImportToPLPayload) \=\>  
\+  await apiClient.post\<PLService\>(\`${BASE\_URL}/import\`, payload);  
\+  
\+// types.ts  
\+type ImportToPLPayload \= {  
\+  source\_id: string;          // GL item ID  
\+  practice\_id?: string;  
\+  alternative\_name?: string;  
\+};  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 3\. Enhanced Data Models & Schema Design  
\+  
\+\#\#\# 3.1 Content Type Enumeration  
\+  
\+\#\#\#\# New Type: \`ContentType\`  
\+\`\`\`typescript  
\+// src/types/enums.ts  
\+export enum ContentType {  
\+  PRODUCT \= 'product',  
\+  SERVICE \= 'service',  
\+  CONCERN \= 'concern',              // e.g., Melasma, Acne  
\+  TREATMENT\_PROTOCOL \= 'protocol',  
\+  MANUFACTURER\_INFO \= 'manufacturer\_info',  
\+  EDUCATIONAL\_CONTENT \= 'educational',  
\+  SOP \= 'sop',                      // Standard Operating Procedure  
\+  WORKFLOW \= 'workflow',  
\+}  
\+  
\+export enum MediaType {  
\+  IMAGE \= 'image',  
\+  VIDEO \= 'video',  
\+  PDF \= 'pdf',  
\+  DOCUMENT \= 'document',  
\+}  
\+  
\+export enum ContentSource {  
\+  MANUFACTURER \= 'manufacturer',     // Cannot be edited  
\+  A360\_CURATED \= 'a360\_curated',    // Can be edited  
\+  PRACTICE\_CUSTOM \= 'practice\_custom',  
\+  IMPORTED \= 'imported',  
\+}  
\+\`\`\`  
\+  
\+\#\#\# 3.2 Enhanced Global Library Schema  
\+  
\+\#\#\#\# Database Schema: \`global\_library\_items\`  
\+\`\`\`sql  
\+CREATE TABLE global\_library\_items (  
\+  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
\+    
\+  \-- Core Identification  
\+  content\_type VARCHAR(50) NOT NULL,           \-- ContentType enum  
\+  category\_id UUID REFERENCES categories(id),   \-- For grouping (optional)  
\+    
\+  \-- Content Fields  
\+  title VARCHAR(500) NOT NULL,  
\+  description TEXT,  
\+  long\_description TEXT,                        \-- Detailed information  
\+    
\+  \-- Editability Controls (CRITICAL NEW FEATURE)  
\+  is\_editable BOOLEAN DEFAULT true,             \-- Can practices modify this?  
\+  editable\_fields JSONB,                        \-- Specific fields that can be edited  
\+  source VARCHAR(50) DEFAULT 'a360\_curated',    \-- ContentSource enum  
\+  manufacturer\_id UUID REFERENCES manufacturers(id), \-- If from manufacturer  
\+    
\+  \-- Classification & Metadata  
\+  tags JSONB,                                   \-- Array of tag strings  
\+  concerns JSONB,                               \-- Array of concern IDs  
\+  body\_areas JSONB,                             \-- Array of body area IDs  
\+    
\+  \-- Status & Visibility  
\+  is\_active BOOLEAN DEFAULT true,  
\+  is\_new BOOLEAN DEFAULT false,  
\+  is\_published BOOLEAN DEFAULT true,  
\+    
\+  \-- Media & Assets  
\+  cover\_path VARCHAR(500),  
\+  thumbnail\_path VARCHAR(500),  
\+    
\+  \-- Relationships  
\+  parent\_id UUID REFERENCES global\_library\_items(id), \-- For variants  
\+    
\+  \-- Additional Data  
\+  metadata JSONB,                               \-- Flexible additional data  
\+  search\_vector TSVECTOR,                       \-- For full-text search  
\+    
\+  \-- Audit  
\+  created\_at TIMESTAMP DEFAULT NOW(),  
\+  updated\_at TIMESTAMP DEFAULT NOW(),  
\+  created\_by UUID REFERENCES users(id),  
\+  updated\_by UUID REFERENCES users(id),  
\+    
\+  \-- Indexes  
\+  INDEX idx\_content\_type (content\_type),  
\+  INDEX idx\_is\_active (is\_active),  
\+  INDEX idx\_search\_vector USING GIN(search\_vector)  
\+);  
\+\`\`\`  
\+  
\+\#\#\#\# TypeScript Type: Enhanced Global Library  
\+\`\`\`typescript  
\+// src/apiServices/dictionary/types.ts  
\+  
\+export type GLItemBase \= {  
\+  id: string;  
\+  content\_type: ContentType;  
\+  category\_id: string | null;  
\+    
\+  title: string;  
\+  description: string;  
\+  long\_description: string | null;  
\+    
\+  // Editability controls  
\+  is\_editable: boolean;  
\+  editable\_fields: string\[\] | null;  // \['description', 'price', 'title'\]  
\+  source: ContentSource;  
\+  manufacturer\_id: string | null;  
\+    
\+  tags: string\[\];  
\+  concerns: string\[\];  
\+  body\_areas: string\[\];  
\+    
\+  is\_active: boolean;  
\+  is\_new: boolean;  
\+  is\_published: boolean;  
\+    
\+  cover\_path: string | null;  
\+  thumbnail\_path: string | null;  
\+  parent\_id: string | null;  
\+    
\+  metadata: Record\<string, any\>;  
\+} & Timestamps;  
\+  
\+export type GLProduct \= GLItemBase & {  
\+  content\_type: ContentType.PRODUCT;  
\+  manufacturer\_sku?: string;  
\+  ingredient\_list?: string;  
\+  usage\_instructions?: string;  
\+};  
\+  
\+export type GLService \= GLItemBase & {  
\+  content\_type: ContentType.SERVICE;  
\+  duration\_minutes?: number;  
\+  typical\_price\_range?: string;  
\+  pre\_care\_instructions?: string;  
\+  post\_care\_instructions?: string;  
\+};  
\+  
\+export type GLConcern \= GLItemBase & {  
\+  content\_type: ContentType.CONCERN;  
\+  medical\_term?: string;  
\+  icd10\_codes?: string\[\];  
\+  prevalence\_data?: string;  
\+  treatment\_approaches?: string;  
\+};  
\+  
\+export type GLItem \= GLProduct | GLService | GLConcern;  
\+\`\`\`  
\+  
\+\#\#\# 3.3 Media Attachments Schema  
\+  
\+\#\#\#\# Database Schema: \`global\_library\_media\`  
\+\`\`\`sql  
\+CREATE TABLE global\_library\_media (  
\+  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
\+  gl\_item\_id UUID REFERENCES global\_library\_items(id) ON DELETE CASCADE,  
\+    
\+  \-- Media Details  
\+  media\_type VARCHAR(50) NOT NULL,              \-- MediaType enum  
\+  file\_path VARCHAR(1000) NOT NULL,  
\+  file\_name VARCHAR(500),  
\+  file\_size\_bytes BIGINT,  
\+  mime\_type VARCHAR(100),  
\+    
\+  \-- Metadata  
\+  title VARCHAR(500),  
\+  description TEXT,  
\+  alt\_text VARCHAR(500),                        \-- For accessibility  
\+    
\+  \-- Video-specific  
\+  duration\_seconds INTEGER,  
\+  thumbnail\_path VARCHAR(500),  
\+    
\+  \-- Organization  
\+  display\_order INTEGER DEFAULT 0,  
\+  is\_primary BOOLEAN DEFAULT false,             \-- Primary image/video  
\+    
\+  \-- Editability  
\+  is\_editable BOOLEAN DEFAULT true,  
\+  source VARCHAR(50) DEFAULT 'a360\_curated',  
\+    
\+  \-- Audit  
\+  created\_at TIMESTAMP DEFAULT NOW(),  
\+  updated\_at TIMESTAMP DEFAULT NOW(),  
\+    
\+  INDEX idx\_gl\_item\_id (gl\_item\_id),  
\+  INDEX idx\_media\_type (media\_type)  
\+);  
\+\`\`\`  
\+  
\+\#\#\#\# TypeScript Type  
\+\`\`\`typescript  
\+// src/apiServices/dictionary/types.ts  
\+  
\+export type GLMedia \= {  
\+  id: string;  
\+  gl\_item\_id: string;  
\+  media\_type: MediaType;  
\+  file\_path: string;  
\+  file\_name: string;  
\+  file\_size\_bytes: number;  
\+  mime\_type: string;  
\+    
\+  title: string | null;  
\+  description: string | null;  
\+  alt\_text: string | null;  
\+    
\+  duration\_seconds: number | null;  
\+  thumbnail\_path: string | null;  
\+    
\+  display\_order: number;  
\+  is\_primary: boolean;  
\+    
\+  is\_editable: boolean;  
\+  source: ContentSource;  
\+} & Timestamps;  
\+\`\`\`  
\+  
\+\#\#\# 3.4 Practice Library with Override Schema  
\+  
\+\#\#\#\# Database Schema: \`practice\_library\_items\`  
\+\`\`\`sql  
\+CREATE TABLE practice\_library\_items (  
\+  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
\+  practice\_id UUID REFERENCES practices(id) NOT NULL,  
\+  gl\_item\_id UUID REFERENCES global\_library\_items(id), \-- Source item  
\+    
\+  \-- Core Fields (can be overridden)  
\+  title VARCHAR(500),                           \-- NULL \= use GL title  
\+  description TEXT,                             \-- NULL \= use GL description  
\+  long\_description TEXT,  
\+    
\+  \-- Practice-specific Data  
\+  price DECIMAL(10, 2),  
\+  internal\_sku VARCHAR(100),  
\+    
\+  \-- Status Controls  
\+  is\_active BOOLEAN DEFAULT true,  
\+  is\_preferred BOOLEAN DEFAULT false,  
\+  is\_published BOOLEAN DEFAULT true,  
\+  is\_visible BOOLEAN DEFAULT true,              \-- Toggle visibility  
\+    
\+  \-- Override tracking  
\+  overridden\_fields JSONB,                      \-- Track which fields are customized  
\+    
\+  \-- Media overrides (can hide or reorder GL media)  
\+  hidden\_media\_ids JSONB,                       \-- Array of GL media IDs to hide  
\+  media\_display\_order JSONB,                    \-- Custom ordering  
\+    
\+  \-- Additional practice data  
\+  practice\_notes TEXT,  
\+  internal\_notes TEXT,  
\+  custom\_metadata JSONB,  
\+    
\+  \-- Audit  
\+  created\_at TIMESTAMP DEFAULT NOW(),  
\+  updated\_at TIMESTAMP DEFAULT NOW(),  
\+  imported\_at TIMESTAMP,  
\+  last\_synced\_at TIMESTAMP,                     \-- Last sync with GL  
\+    
\+  INDEX idx\_practice\_id (practice\_id),  
\+  INDEX idx\_gl\_item\_id (gl\_item\_id),  
\+  INDEX idx\_is\_active (is\_active),  
\+  UNIQUE (practice\_id, gl\_item\_id)              \-- One PL item per GL item per practice  
\+);  
\+\`\`\`  
\+  
\+\#\#\#\# TypeScript Type  
\+\`\`\`typescript  
\+// src/apiServices/practice/services/types.ts  
\+  
\+export type PLItemBase \= {  
\+  id: string;  
\+  practice\_id: string;  
\+  practice\_name: string;  
\+  gl\_item\_id: string | null;                    // NULL for practice-custom items  
\+    
\+  // Resolved fields (combines GL \+ overrides)  
\+  title: string;  
\+  description: string;  
\+  long\_description: string | null;  
\+    
\+  // Override values (NULL \= use GL value)  
\+  title\_override: string | null;  
\+  description\_override: string | null;  
\+  long\_description\_override: string | null;  
\+    
\+  price: number | null;  
\+  internal\_sku: string | null;  
\+    
\+  is\_active: boolean;  
\+  is\_preferred: boolean;  
\+  is\_published: boolean;  
\+  is\_visible: boolean;  
\+    
\+  overridden\_fields: string\[\];                  // \['title', 'description'\]  
\+  hidden\_media\_ids: string\[\];  
\+  media\_display\_order: Record\<string, number\> | null;  
\+    
\+  practice\_notes: string | null;  
\+  internal\_notes: string | null;  
\+  custom\_metadata: Record\<string, any\>;  
\+    
\+  // Source GL item data (for reference)  
\+  gl\_item: GLItem | null;  
\+    
\+  // Editability (inherited from GL)  
\+  is\_editable: boolean;  
\+  editable\_fields: string\[\];  
\+} & Timestamps & {  
\+  imported\_at: string | null;  
\+  last\_synced\_at: string | null;  
\+};  
\+  
\+export type PLService \= PLItemBase & {  
\+  gl\_item: GLService | null;  
\+};  
\+  
\+export type PLProduct \= PLItemBase & {  
\+  gl\_item: GLProduct | null;  
\+};  
\+\`\`\`  
\+  
\+\#\#\# 3.5 Practice Media Overrides  
\+  
\+\#\#\#\# Database Schema: \`practice\_library\_media\`  
\+\`\`\`sql  
\+CREATE TABLE practice\_library\_media (  
\+  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
\+  pl\_item\_id UUID REFERENCES practice\_library\_items(id) ON DELETE CASCADE,  
\+    
\+  \-- Either custom media OR reference to GL media  
\+  gl\_media\_id UUID REFERENCES global\_library\_media(id), \-- If referencing GL  
\+    
\+  \-- Custom media fields (if gl\_media\_id is NULL)  
\+  media\_type VARCHAR(50),  
\+  file\_path VARCHAR(1000),  
\+  file\_name VARCHAR(500),  
\+  file\_size\_bytes BIGINT,  
\+  mime\_type VARCHAR(100),  
\+    
\+  title VARCHAR(500),  
\+  description TEXT,  
\+  alt\_text VARCHAR(500),  
\+    
\+  duration\_seconds INTEGER,  
\+  thumbnail\_path VARCHAR(500),  
\+    
\+  \-- Organization  
\+  display\_order INTEGER DEFAULT 0,  
\+  is\_primary BOOLEAN DEFAULT false,  
\+  is\_visible BOOLEAN DEFAULT true,              \-- Can hide GL media  
\+    
\+  created\_at TIMESTAMP DEFAULT NOW(),  
\+  updated\_at TIMESTAMP DEFAULT NOW(),  
\+    
\+  INDEX idx\_pl\_item\_id (pl\_item\_id),  
\+  INDEX idx\_gl\_media\_id (gl\_media\_id)  
\+);  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 4\. Onboarding Workflow Implementation  
\+  
\+\#\#\# 4.1 Onboarding Process Overview  
\+  
\+\`\`\`  
\+Practice Joins A360  
\+    ↓  
\+┌─────────────────────────────────────────────────┐  
\+│ STEP 1: Data Collection                         │  
\+│ \- Upload product lists (CSV, Excel, PDF)        │  
\+│ \- Connect Google Drive / Dropbox                │  
\+│ \- Upload SOPs, workflows, documents              │  
\+└─────────────────────────────────────────────────┘  
\+    ↓  
\+┌─────────────────────────────────────────────────┐  
\+│ STEP 2: Content Processing                      │  
\+│ \- Extract text from PDFs                         │  
\+│ \- Parse spreadsheets                             │  
\+│ \- OCR scanned documents                          │  
\+│ \- Identify product/service names & prices        │  
\+└─────────────────────────────────────────────────┘  
\+    ↓  
\+┌─────────────────────────────────────────────────┐  
\+│ STEP 3: AI Matching                              │  
\+│ \- Match to Global Library items                  │  
\+│ \- Fuzzy matching on product names                │  
\+│ \- Confidence scoring (0-100%)                    │  
\+│ \- Flag unmatched items                           │  
\+└─────────────────────────────────────────────────┘  
\+    ↓  
\+┌─────────────────────────────────────────────────┐  
\+│ STEP 4: Review & Approval (Phased)              │  
\+│ \- Present matches in batches                     │  
\+│ \- High confidence: auto-import (\>90%)            │  
\+│ \- Medium confidence: review required (50-89%)    │  
\+│ \- Low confidence: manual selection (\<50%)        │  
\+│ \- Add custom items not in GL                     │  
\+└─────────────────────────────────────────────────┘  
\+    ↓  
\+┌─────────────────────────────────────────────────┐  
\+│ STEP 5: Import & Customize                      │  
\+│ \- Bulk import approved matches                   │  
\+│ \- Set pricing for each item                      │  
\+│ \- Customize descriptions (if allowed)            │  
\+│ \- Upload practice-specific media                 │  
\+└─────────────────────────────────────────────────┘  
\+\`\`\`  
\+  
\+\#\#\# 4.2 Onboarding Database Schema  
\+  
\+\#\#\#\# Database Schema: \`onboarding\_sessions\`  
\+\`\`\`sql  
\+CREATE TABLE onboarding\_sessions (  
\+  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
\+  practice\_id UUID REFERENCES practices(id) NOT NULL,  
\+    
\+  \-- Session Info  
\+  status VARCHAR(50) DEFAULT 'in\_progress',     \-- in\_progress, completed, abandoned  
\+  current\_step VARCHAR(50) DEFAULT 'upload',    \-- upload, processing, matching, review, import  
\+    
\+  \-- Progress Tracking  
\+  total\_items\_found INTEGER DEFAULT 0,  
\+  items\_matched INTEGER DEFAULT 0,  
\+  items\_reviewed INTEGER DEFAULT 0,  
\+  items\_imported INTEGER DEFAULT 0,  
\+    
\+  \-- Metadata  
\+  source\_files JSONB,                           \-- Array of uploaded file paths  
\+  processing\_metadata JSONB,  
\+    
\+  created\_at TIMESTAMP DEFAULT NOW(),  
\+  updated\_at TIMESTAMP DEFAULT NOW(),  
\+  completed\_at TIMESTAMP,  
\+    
\+  INDEX idx\_practice\_id (practice\_id),  
\+  INDEX idx\_status (status)  
\+);  
\+\`\`\`  
\+  
\+\#\#\#\# Database Schema: \`onboarding\_items\`  
\+\`\`\`sql  
\+CREATE TABLE onboarding\_items (  
\+  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
\+  session\_id UUID REFERENCES onboarding\_sessions(id) ON DELETE CASCADE,  
\+    
\+  \-- Extracted Data  
\+  raw\_title VARCHAR(500) NOT NULL,  
\+  raw\_description TEXT,  
\+  raw\_price DECIMAL(10, 2),  
\+  raw\_sku VARCHAR(100),  
\+  extracted\_data JSONB,                         \-- All extracted fields  
\+  source\_file VARCHAR(500),                     \-- Which file it came from  
\+  source\_page\_number INTEGER,  
\+    
\+  \-- Matching Results  
\+  match\_status VARCHAR(50) DEFAULT 'pending',   \-- pending, matched, no\_match, manual  
\+  confidence\_score DECIMAL(5, 2),               \-- 0.00 to 100.00  
\+  suggested\_gl\_item\_id UUID REFERENCES global\_library\_items(id),  
\+  alternative\_matches JSONB,                    \-- Array of {gl\_item\_id, score}  
\+    
\+  \-- Review Status  
\+  review\_status VARCHAR(50) DEFAULT 'pending',  \-- pending, approved, rejected, modified  
\+  selected\_gl\_item\_id UUID,                     \-- User's final choice  
\+  custom\_title VARCHAR(500),                    \-- If user modifies  
\+  custom\_description TEXT,  
\+  custom\_price DECIMAL(10, 2),  
\+    
\+  \-- Import Status  
\+  is\_imported BOOLEAN DEFAULT false,  
\+  pl\_item\_id UUID REFERENCES practice\_library\_items(id),  
\+  imported\_at TIMESTAMP,  
\+    
\+  created\_at TIMESTAMP DEFAULT NOW(),  
\+  updated\_at TIMESTAMP DEFAULT NOW(),  
\+    
\+  INDEX idx\_session\_id (session\_id),  
\+  INDEX idx\_match\_status (match\_status),  
\+  INDEX idx\_review\_status (review\_status)  
\+);  
\+\`\`\`  
\+  
\+\#\#\#\# TypeScript Types  
\+\`\`\`typescript  
\+// src/apiServices/onboarding/types.ts  
\+  
\+export enum OnboardingStatus {  
\+  IN\_PROGRESS \= 'in\_progress',  
\+  COMPLETED \= 'completed',  
\+  ABANDONED \= 'abandoned',  
\+}  
\+  
\+export enum OnboardingStep {  
\+  UPLOAD \= 'upload',  
\+  PROCESSING \= 'processing',  
\+  MATCHING \= 'matching',  
\+  REVIEW \= 'review',  
\+  IMPORT \= 'import',  
\+}  
\+  
\+export type OnboardingSession \= {  
\+  id: string;  
\+  practice\_id: string;  
\+  status: OnboardingStatus;  
\+  current\_step: OnboardingStep;  
\+    
\+  total\_items\_found: number;  
\+  items\_matched: number;  
\+  items\_reviewed: number;  
\+  items\_imported: number;  
\+    
\+  source\_files: string\[\];  
\+  processing\_metadata: Record\<string, any\>;  
\+} & Timestamps & {  
\+  completed\_at: string | null;  
\+};  
\+  
\+export enum MatchStatus {  
\+  PENDING \= 'pending',  
\+  MATCHED \= 'matched',  
\+  NO\_MATCH \= 'no\_match',  
\+  MANUAL \= 'manual',  
\+}  
\+  
\+export enum ReviewStatus {  
\+  PENDING \= 'pending',  
\+  APPROVED \= 'approved',  
\+  REJECTED \= 'rejected',  
\+  MODIFIED \= 'modified',  
\+}  
\+  
\+export type OnboardingItem \= {  
\+  id: string;  
\+  session\_id: string;  
\+    
\+  raw\_title: string;  
\+  raw\_description: string | null;  
\+  raw\_price: number | null;  
\+  raw\_sku: string | null;  
\+  extracted\_data: Record\<string, any\>;  
\+  source\_file: string;  
\+  source\_page\_number: number | null;  
\+    
\+  match\_status: MatchStatus;  
\+  confidence\_score: number;  
\+  suggested\_gl\_item\_id: string | null;  
\+  alternative\_matches: Array\<{  
\+    gl\_item\_id: string;  
\+    score: number;  
\+    title: string;  
\+  }\>;  
\+    
\+  review\_status: ReviewStatus;  
\+  selected\_gl\_item\_id: string | null;  
\+  custom\_title: string | null;  
\+  custom\_description: string | null;  
\+  custom\_price: number | null;  
\+    
\+  is\_imported: boolean;  
\+  pl\_item\_id: string | null;  
\+  imported\_at: string | null;  
\+    
\+  // Populated from joins  
\+  suggested\_gl\_item?: GLItem;  
\+} & Timestamps;  
\+\`\`\`  
\+  
\+\#\#\# 4.3 File Upload API Endpoints  
\+  
\+\`\`\`typescript  
\+// src/apiServices/onboarding/onboarding.api.ts  
\+  
\+const BASE\_ONBOARDING\_URL \= '/onboarding';  
\+  
\+// Create new onboarding session  
\+export const createOnboardingSession \= async (practiceId: string) \=\>  
\+  await apiClient.post\<OnboardingSession\>(BASE\_ONBOARDING\_URL, { practice\_id: practiceId });  
\+  
\+// Upload files  
\+export const uploadOnboardingFiles \= async (sessionId: string, files: File\[\]) \=\> {  
\+  const formData \= new FormData();  
\+  files.forEach(file \=\> formData.append('files', file));  
\+    
\+  return await apiClient.post\<{ uploaded\_count: number }\>(  
\+    \`${BASE\_ONBOARDING\_URL}/${sessionId}/upload\`,  
\+    formData,  
\+    {  
\+      headers: { 'Content-Type': 'multipart/form-data' },  
\+      timeout: 300\_000, // 5 minutes for large files  
\+    }  
\+  );  
\+};  
\+  
\+// Connect cloud storage  
\+export const connectCloudStorage \= async (  
\+  sessionId: string,  
\+  payload: {  
\+    provider: 'google\_drive' | 'dropbox';  
\+    access\_token: string;  
\+    folder\_path?: string;  
\+  }  
\+) \=\>  
\+  await apiClient.post(  
\+    \`${BASE\_ONBOARDING\_URL}/${sessionId}/cloud-storage\`,  
\+    payload  
\+  );  
\+  
\+// Trigger processing  
\+export const processOnboardingFiles \= async (sessionId: string) \=\>  
\+  await apiClient.post(  
\+    \`${BASE\_ONBOARDING\_URL}/${sessionId}/process\`  
\+  );  
\+  
\+// Get session status  
\+export const getOnboardingSession \= async (sessionId: string) \=\>  
\+  await apiClient.get\<OnboardingSession\>(  
\+    \`${BASE\_ONBOARDING\_URL}/${sessionId}\`  
\+  );  
\+  
\+// Get extracted items (paginated)  
\+export const getOnboardingItems \= async (  
\+  sessionId: string,  
\+  params: {  
\+    page?: number;  
\+    size?: number;  
\+    match\_status?: MatchStatus;  
\+    review\_status?: ReviewStatus;  
\+  }  
\+) \=\>  
\+  await apiClient.get\<ListOfItems\<OnboardingItem\>\>(  
\+    \`${BASE\_ONBOARDING\_URL}/${sessionId}/items\`,  
\+    { params }  
\+  );  
\+  
\+// Update item review  
\+export const updateOnboardingItemReview \= async (  
\+  itemId: string,  
\+  payload: {  
\+    review\_status: ReviewStatus;  
\+    selected\_gl\_item\_id?: string;  
\+    custom\_title?: string;  
\+    custom\_description?: string;  
\+    custom\_price?: number;  
\+  }  
\+) \=\>  
\+  await apiClient.patch\<OnboardingItem\>(  
\+    \`${BASE\_ONBOARDING\_URL}/items/${itemId}\`,  
\+    payload  
\+  );  
\+  
\+// Bulk approve items  
\+export const bulkApproveItems \= async (  
\+  sessionId: string,  
\+  itemIds: string\[\]  
\+) \=\>  
\+  await apiClient.post(  
\+    \`${BASE\_ONBOARDING\_URL}/${sessionId}/bulk-approve\`,  
\+    { item\_ids: itemIds }  
\+  );  
\+  
\+// Import approved items to practice library  
\+export const importOnboardingItems \= async (  
\+  sessionId: string,  
\+  itemIds: string\[\]  
\+) \=\>  
\+  await apiClient.post\<{ imported\_count: number }\>(  
\+    \`${BASE\_ONBOARDING\_URL}/${sessionId}/import\`,  
\+    { item\_ids: itemIds }  
\+  );  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 5\. Content Override System  
\+  
\+\#\#\# 5.1 Override Resolution Logic  
\+  
\+The override system avoids duplicating content while allowing customization:  
\+  
\+\`\`\`typescript  
\+// src/utils/contentOverride.utils.ts  
\+  
\+export type OverrideResolution \= {  
\+  resolved\_value: any;  
\+  is\_overridden: boolean;  
\+  source: 'global' | 'practice' | 'default';  
\+};  
\+  
\+/\*\*  
\+ \* Resolves a field value using override hierarchy:  
\+ \* 1\. Practice override (if exists and field is editable)  
\+ \* 2\. Global library value  
\+ \* 3\. Default value  
\+ \*/  
\+export function resolveFieldValue\<T\>(  
\+  fieldName: string,  
\+  glItem: GLItemBase | null,  
\+  plItem: PLItemBase | null,  
\+  defaultValue?: T  
\+): OverrideResolution {  
\+  // If no GL item, use PL value or default  
\+  if (\!glItem) {  
\+    return {  
\+      resolved\_value: plItem?.\[\`${fieldName}\_override\`\] ?? defaultValue,  
\+      is\_overridden: false,  
\+      source: plItem ? 'practice' : 'default',  
\+    };  
\+  }  
\+    
\+  // Check if field is editable  
\+  const isFieldEditable \= \!glItem.editable\_fields ||   
\+    glItem.editable\_fields.includes(fieldName);  
\+    
\+  // If PL has override and field is editable, use it  
\+  if (plItem?.\[\`${fieldName}\_override\`\] \!== null && isFieldEditable) {  
\+    return {  
\+      resolved\_value: plItem\[\`${fieldName}\_override\`\],  
\+      is\_overridden: true,  
\+      source: 'practice',  
\+    };  
\+  }  
\+    
\+  // Use GL value  
\+  return {  
\+    resolved\_value: glItem\[fieldName\] ?? defaultValue,  
\+    is\_overridden: false,  
\+    source: 'global',  
\+  };  
\+}  
\+  
\+/\*\*  
\+ \* Resolves all fields for a practice library item  
\+ \*/  
\+export function resolveAllFields(  
\+  glItem: GLItemBase | null,  
\+  plItem: PLItemBase  
\+): PLItemBase {  
\+  return {  
\+    ...plItem,  
\+    title: resolveFieldValue('title', glItem, plItem, '').resolved\_value,  
\+    description: resolveFieldValue('description', glItem, plItem, '').resolved\_value,  
\+    long\_description: resolveFieldValue('long\_description', glItem, plItem).resolved\_value,  
\+    is\_editable: glItem?.is\_editable ?? true,  
\+    editable\_fields: glItem?.editable\_fields ?? \[\],  
\+  };  
\+}  
\+  
\+/\*\*  
\+ \* Check if a field can be edited  
\+ \*/  
\+export function canEditField(  
\+  fieldName: string,  
\+  glItem: GLItemBase | null  
\+): boolean {  
\+  if (\!glItem) return true; // Custom practice items can edit everything  
\+  if (\!glItem.is\_editable) return false; // Locked content  
\+  if (\!glItem.editable\_fields) return true; // No restrictions  
\+  return glItem.editable\_fields.includes(fieldName);  
\+}  
\+\`\`\`  
\+  
\+\#\#\# 5.2 Backend Override Implementation  
\+  
\+\#\#\#\# Endpoint: Get Practice Library Item with Resolved Values  
\+\`\`\`typescript  
\+// Backend pseudo-code (FastAPI example)  
\+  
\+@router.get('/practice/services/{item\_id}')  
\+async def get\_practice\_service(  
\+    item\_id: str,  
\+    db: Session \= Depends(get\_db),  
\+    current\_practice: Practice \= Depends(get\_current\_practice)  
\+):  
\+    \# Fetch PL item with GL item  
\+    pl\_item \= db.query(PracticeLibraryItem)\\  
\+        .options(joinedload(PracticeLibraryItem.gl\_item))\\  
\+        .filter(  
\+            PracticeLibraryItem.id \== item\_id,  
\+            PracticeLibraryItem.practice\_id \== current\_practice.id  
\+        )\\  
\+        .first()  
\+      
\+    if not pl\_item:  
\+        raise HTTPException(status\_code=404)  
\+      
\+    \# Resolve fields  
\+    resolved\_item \= {  
\+        'id': pl\_item.id,  
\+        'practice\_id': pl\_item.practice\_id,  
\+        'gl\_item\_id': pl\_item.gl\_item\_id,  
\+          
\+        \# Resolved values  
\+        'title': pl\_item.title or (pl\_item.gl\_item.title if pl\_item.gl\_item else None),  
\+        'description': pl\_item.description or (pl\_item.gl\_item.description if pl\_item.gl\_item else None),  
\+          
\+        \# Override tracking  
\+        'title\_override': pl\_item.title,  
\+        'description\_override': pl\_item.description,  
\+        'overridden\_fields': pl\_item.overridden\_fields or \[\],  
\+          
\+        \# Editability  
\+        'is\_editable': pl\_item.gl\_item.is\_editable if pl\_item.gl\_item else True,  
\+        'editable\_fields': pl\_item.gl\_item.editable\_fields if pl\_item.gl\_item else None,  
\+          
\+        \# Practice-specific  
\+        'price': pl\_item.price,  
\+        'is\_active': pl\_item.is\_active,  
\+        'is\_visible': pl\_item.is\_visible,  
\+          
\+        \# Source GL item (for reference)  
\+        'gl\_item': serialize\_gl\_item(pl\_item.gl\_item) if pl\_item.gl\_item else None,  
\+    }  
\+      
\+    return resolved\_item  
\+\`\`\`  
\+  
\+\#\#\#\# Endpoint: Update Practice Library Item  
\+\`\`\`typescript  
\+// Backend pseudo-code  
\+  
\+@router.patch('/practice/services/{item\_id}')  
\+async def update\_practice\_service(  
\+    item\_id: str,  
\+    payload: UpdatePLServicePayload,  
\+    db: Session \= Depends(get\_db),  
\+    current\_practice: Practice \= Depends(get\_current\_practice)  
\+):  
\+    pl\_item \= db.query(PracticeLibraryItem)\\  
\+        .options(joinedload(PracticeLibraryItem.gl\_item))\\  
\+        .filter(  
\+            PracticeLibraryItem.id \== item\_id,  
\+            PracticeLibraryItem.practice\_id \== current\_practice.id  
\+        )\\  
\+        .first()  
\+      
\+    if not pl\_item:  
\+        raise HTTPException(status\_code=404)  
\+      
\+    \# Track overridden fields  
\+    overridden\_fields \= pl\_item.overridden\_fields or \[\]  
\+      
\+    \# Validate editable fields  
\+    if pl\_item.gl\_item and not pl\_item.gl\_item.is\_editable:  
\+        \# Only allow practice-specific fields  
\+        allowed\_fields \= \['price', 'is\_active', 'is\_visible', 'practice\_notes'\]  
\+        for field in payload.dict(exclude\_unset=True).keys():  
\+            if field not in allowed\_fields:  
\+                raise HTTPException(  
\+                    status\_code=403,  
\+                    detail=f"Field '{field}' cannot be modified for this item"  
\+                )  
\+      
\+    \# Update fields and track overrides  
\+    if 'title' in payload.dict(exclude\_unset=True):  
\+        if can\_edit\_field('title', pl\_item.gl\_item):  
\+            pl\_item.title \= payload.title  
\+            if 'title' not in overridden\_fields:  
\+                overridden\_fields.append('title')  
\+      
\+    if 'description' in payload.dict(exclude\_unset=True):  
\+        if can\_edit\_field('description', pl\_item.gl\_item):  
\+            pl\_item.description \= payload.description  
\+            if 'description' not in overridden\_fields:  
\+                overridden\_fields.append('description')  
\+      
\+    \# Always allow price updates  
\+    if 'price' in payload.dict(exclude\_unset=True):  
\+        pl\_item.price \= payload.price  
\+      
\+    pl\_item.overridden\_fields \= overridden\_fields  
\+    pl\_item.updated\_at \= datetime.utcnow()  
\+      
\+    db.commit()  
\+    db.refresh(pl\_item)  
\+      
\+    return serialize\_pl\_item(pl\_item)  
\+\`\`\`  
\+  
\+\#\#\# 5.3 Reset Override Functionality  
\+  
\+\`\`\`typescript  
\+// src/apiServices/practice/services/servicesPracticeLibrary.api.ts  
\+  
\+export const resetPLItemOverride \= async (  
\+  itemId: string,  
\+  fieldNames: string\[\]  
\+) \=\>  
\+  await apiClient.post\<PLService\>(  
\+    \`${BASE\_URL}/${itemId}/reset-overrides\`,  
\+    { field\_names: fieldNames }  
\+  );  
\+  
\+// Backend pseudo-code  
\+@router.post('/practice/services/{item\_id}/reset-overrides')  
\+async def reset\_pl\_item\_overrides(  
\+    item\_id: str,  
\+    payload: { field\_names: List\[str\] },  
\+    db: Session \= Depends(get\_db)  
\+):  
\+    pl\_item \= db.query(PracticeLibraryItem).filter\_by(id=item\_id).first()  
\+      
\+    for field\_name in payload\['field\_names'\]:  
\+        setattr(pl\_item, field\_name, None)  \# Set to NULL to use GL value  
\+          
\+        \# Remove from overridden\_fields  
\+        if field\_name in (pl\_item.overridden\_fields or \[\]):  
\+            pl\_item.overridden\_fields.remove(field\_name)  
\+      
\+    db.commit()  
\+    return serialize\_pl\_item(pl\_item)  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 6\. API Specifications  
\+  
\+\#\#\# 6.1 Enhanced Global Library Endpoints  
\+  
\+\`\`\`typescript  
\+// src/apiServices/dictionary/globalLibrary.api.ts  
\+  
\+const BASE\_GL\_URL \= '/dict/items';  
\+  
\+// List items with enhanced filtering  
\+export type GLItemsSearchParams \= {  
\+  page?: number;  
\+  size?: number;  
\+  search?: string;  
\+  content\_type?: ContentType | ContentType\[\];  
\+  source?: ContentSource;  
\+  is\_editable?: boolean;  
\+  tags?: string\[\];  
\+  concerns?: string\[\];  
\+  is\_active?: boolean;  
\+};  
\+  
\+export const getGLItems \= async (params: GLItemsSearchParams) \=\>  
\+  await apiClient.get\<ListOfItems\<GLItem\>\>(BASE\_GL\_URL, { params });  
\+  
\+// Get single item with media  
\+export const getGLItem \= async (id: string, includeMedia: boolean \= true) \=\>  
\+  await apiClient.get\<GLItem & { media?: GLMedia\[\] }\>(  
\+    \`${BASE\_GL\_URL}/${id}\`,  
\+    { params: { include\_media: includeMedia } }  
\+  );  
\+  
\+// Create item  
\+export const createGLItem \= async (payload: CreateGLItemPayload) \=\>  
\+  await apiClient.post\<GLItem\>(BASE\_GL\_URL, payload);  
\+  
\+// Update item  
\+export const updateGLItem \= async (id: string, payload: UpdateGLItemPayload) \=\>  
\+  await apiClient.patch\<GLItem\>(\`${BASE\_GL\_URL}/${id}\`, payload);  
\+  
\+// Delete item  
\+export const deleteGLItem \= async (id: string) \=\>  
\+  await apiClient.delete(\`${BASE\_GL\_URL}/${id}\`);  
\+  
\+// Media management  
\+export const getGLItemMedia \= async (itemId: string) \=\>  
\+  await apiClient.get\<GLMedia\[\]\>(\`${BASE\_GL\_URL}/${itemId}/media\`);  
\+  
\+export const uploadGLItemMedia \= async (itemId: string, file: File, metadata: Partial\<GLMedia\>) \=\> {  
\+  const formData \= new FormData();  
\+  formData.append('file', file);  
\+  formData.append('metadata', JSON.stringify(metadata));  
\+    
\+  return await apiClient.post\<GLMedia\>(  
\+    \`${BASE\_GL\_URL}/${itemId}/media\`,  
\+    formData,  
\+    { headers: { 'Content-Type': 'multipart/form-data' } }  
\+  );  
\+};  
\+  
\+export const updateGLItemMedia \= async (mediaId: string, payload: Partial\<GLMedia\>) \=\>  
\+  await apiClient.patch\<GLMedia\>(\`${BASE\_GL\_URL}/media/${mediaId}\`, payload);  
\+  
\+export const deleteGLItemMedia \= async (mediaId: string) \=\>  
\+  await apiClient.delete(\`${BASE\_GL\_URL}/media/${mediaId}\`);  
\+  
\+// Batch operations  
\+export const bulkUpdateGLItems \= async (items: Array\<{ id: string; updates: Partial\<GLItem\> }\>) \=\>  
\+  await apiClient.patch(\`${BASE\_GL\_URL}/bulk\`, { items });  
\+\`\`\`  
\+  
\+\#\#\# 6.2 Enhanced Practice Library Endpoints  
\+  
\+\`\`\`typescript  
\+// src/apiServices/practice/practiceLibrary.api.ts  
\+  
\+const BASE\_PL\_URL \= '/practice/items';  
\+  
\+// List items with resolved values  
\+export type PLItemsSearchParams \= {  
\+  page?: number;  
\+  size?: number;  
\+  search?: string;  
\+  content\_type?: ContentType | ContentType\[\];  
\+  is\_active?: boolean;  
\+  is\_visible?: boolean;  
\+  is\_preferred?: boolean;  
\+  has\_overrides?: boolean;  // Filter items with custom overrides  
\+  gl\_item\_id?: string;      // Find PL item for specific GL item  
\+};  
\+  
\+export const getPLItems \= async (params: PLItemsSearchParams) \=\>  
\+  await apiClient.get\<ListOfItems\<PLItemBase\>\>(BASE\_PL\_URL, { params });  
\+  
\+// Get single item with resolved fields  
\+export const getPLItem \= async (id: string) \=\>  
\+  await apiClient.get\<PLItemBase & { media?: GLMedia\[\] }\>(  
\+    \`${BASE\_PL\_URL}/${id}\`  
\+  );  
\+  
\+// Import from Global Library  
\+export const importFromGL \= async (payload: {  
\+  gl\_item\_ids: string\[\];  
\+  price?: number;  
\+  custom\_overrides?: Record\<string, any\>;  
\+}) \=\>  
\+  await apiClient.post\<{ imported: PLItemBase\[\] }\>(  
\+    \`${BASE\_PL\_URL}/import\`,  
\+    payload  
\+  );  
\+  
\+// Update with override tracking  
\+export const updatePLItem \= async (id: string, payload: UpdatePLItemPayload) \=\>  
\+  await apiClient.patch\<PLItemBase\>(\`${BASE\_PL\_URL}/${id}\`, payload);  
\+  
\+// Reset specific field overrides  
\+export const resetFieldOverrides \= async (id: string, fieldNames: string\[\]) \=\>  
\+  await apiClient.post\<PLItemBase\>(  
\+    \`${BASE\_PL\_URL}/${id}/reset-overrides\`,  
\+    { field\_names: fieldNames }  
\+  );  
\+  
\+// Toggle visibility  
\+export const togglePLItemVisibility \= async (id: string, isVisible: boolean) \=\>  
\+  await apiClient.patch\<PLItemBase\>(  
\+    \`${BASE\_PL\_URL}/${id}/visibility\`,  
\+    { is\_visible: isVisible }  
\+  );  
\+  
\+// Media management (practice-specific)  
\+export const getPLItemMedia \= async (itemId: string) \=\>  
\+  await apiClient.get\<Array\<GLMedia & { is\_visible: boolean }\>\>(  
\+    \`${BASE\_PL\_URL}/${itemId}/media\`  
\+  );  
\+  
\+export const updatePLMediaVisibility \= async (  
\+  itemId: string,  
\+  mediaUpdates: Array\<{ gl\_media\_id: string; is\_visible: boolean }\>  
\+) \=\>  
\+  await apiClient.patch(  
\+    \`${BASE\_PL\_URL}/${itemId}/media-visibility\`,  
\+    { updates: mediaUpdates }  
\+  );  
\+  
\+export const uploadPLCustomMedia \= async (itemId: string, file: File) \=\> {  
\+  const formData \= new FormData();  
\+  formData.append('file', file);  
\+    
\+  return await apiClient.post\<GLMedia\>(  
\+    \`${BASE\_PL\_URL}/${itemId}/custom-media\`,  
\+    formData,  
\+    { headers: { 'Content-Type': 'multipart/form-data' } }  
\+  );  
\+};  
\+\`\`\`  
\+  
\+\#\#\# 6.3 Search & Matching API  
\+  
\+\`\`\`typescript  
\+// src/apiServices/matching/matching.api.ts  
\+  
\+const BASE\_MATCH\_URL \= '/matching';  
\+  
\+// Search GL items with fuzzy matching  
\+export const searchGLItems \= async (query: string, options?: {  
\+  content\_type?: ContentType;  
\+  limit?: number;  
\+  threshold?: number;  // Minimum confidence score (0-100)  
\+}) \=\>  
\+  await apiClient.get\<Array\<GLItem & { score: number }\>\>(  
\+    \`${BASE\_MATCH\_URL}/search\`,  
\+    { params: { q: query, ...options } }  
\+  );  
\+  
\+// Match uploaded content to GL  
\+export const matchToGlobalLibrary \= async (payload: {  
\+  title: string;  
\+  description?: string;  
\+  content\_type?: ContentType;  
\+  metadata?: Record\<string, any\>;  
\+}) \=\>  
\+  await apiClient.post\<{  
\+    matches: Array\<{  
\+      gl\_item: GLItem;  
\+      confidence\_score: number;  
\+      match\_reasons: string\[\];  
\+    }\>;  
\+  }\>(  
\+    \`${BASE\_MATCH\_URL}/match\`,  
\+    payload  
\+  );  
\+  
\+// Batch matching  
\+export const batchMatch \= async (items: Array\<{  
\+  id: string;  
\+  title: string;  
\+  description?: string;  
\+  content\_type?: ContentType;  
\+}\>) \=\>  
\+  await apiClient.post\<{  
\+    results: Array\<{  
\+      item\_id: string;  
\+      matches: Array\<{  
\+        gl\_item\_id: string;  
\+        confidence\_score: number;  
\+      }\>;  
\+    }\>;  
\+  }\>(  
\+    \`${BASE\_MATCH\_URL}/batch-match\`,  
\+    { items }  
\+  );  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 7\. Database Migration Strategy  
\+  
\+\#\#\# 7.1 Migration Steps  
\+  
\+\#\#\#\# Step 1: Create New Tables  
\+\`\`\`sql  
\+-- Migration: 001\_add\_global\_library\_enhanced.sql  
\+  
\+-- Add new columns to existing tables  
\+ALTER TABLE global\_library\_items ADD COLUMN IF NOT EXISTS content\_type VARCHAR(50);  
\+ALTER TABLE global\_library\_items ADD COLUMN IF NOT EXISTS is\_editable BOOLEAN DEFAULT true;  
\+ALTER TABLE global\_library\_items ADD COLUMN IF NOT EXISTS editable\_fields JSONB;  
\+ALTER TABLE global\_library\_items ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'a360\_curated';  
\+ALTER TABLE global\_library\_items ADD COLUMN IF NOT EXISTS manufacturer\_id UUID;  
\+ALTER TABLE global\_library\_items ADD COLUMN IF NOT EXISTS long\_description TEXT;  
\+ALTER TABLE global\_library\_items ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '\[\]';  
\+ALTER TABLE global\_library\_items ADD COLUMN IF NOT EXISTS concerns JSONB DEFAULT '\[\]';  
\+ALTER TABLE global\_library\_items ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';  
\+  
\+-- Create media table  
\+CREATE TABLE IF NOT EXISTS global\_library\_media (  
\+  \-- ... (schema from section 3.3)  
\+);  
\+  
\+-- Create practice library enhancements  
\+ALTER TABLE practice\_library\_items ADD COLUMN IF NOT EXISTS title\_override VARCHAR(500);  
\+ALTER TABLE practice\_library\_items ADD COLUMN IF NOT EXISTS description\_override TEXT;  
\+ALTER TABLE practice\_library\_items ADD COLUMN IF NOT EXISTS long\_description\_override TEXT;  
\+ALTER TABLE practice\_library\_items ADD COLUMN IF NOT EXISTS overridden\_fields JSONB DEFAULT '\[\]';  
\+ALTER TABLE practice\_library\_items ADD COLUMN IF NOT EXISTS is\_visible BOOLEAN DEFAULT true;  
\+ALTER TABLE practice\_library\_items ADD COLUMN IF NOT EXISTS hidden\_media\_ids JSONB DEFAULT '\[\]';  
\+ALTER TABLE practice\_library\_items ADD COLUMN IF NOT EXISTS custom\_metadata JSONB DEFAULT '{}';  
\+  
\+-- Migrate existing title/description to overrides  
\+UPDATE practice\_library\_items   
\+SET   
\+  title\_override \= title,  
\+  description\_override \= description,  
\+  overridden\_fields \= ARRAY\['title', 'description'\]  
\+WHERE title IS NOT NULL OR description IS NOT NULL;  
\+  
\+-- Create onboarding tables  
\+CREATE TABLE IF NOT EXISTS onboarding\_sessions (  
\+  \-- ... (schema from section 4.2)  
\+);  
\+  
\+CREATE TABLE IF NOT EXISTS onboarding\_items (  
\+  \-- ... (schema from section 4.2)  
\+);  
\+\`\`\`  
\+  
\+\#\#\#\# Step 2: Data Migration Script  
\+\`\`\`typescript  
\+// scripts/migrateToEnhancedSchema.ts  
\+  
\+import { PrismaClient } from '@prisma/client';  
\+  
\+const prisma \= new PrismaClient();  
\+  
\+async function migrateExistingData() {  
\+  console.log('Starting data migration...');  
\+    
\+  // 1\. Set content\_type for existing items  
\+  await prisma.$executeRaw\`  
\+    UPDATE global\_library\_items   
\+    SET content\_type \= 'service'  
\+    WHERE content\_type IS NULL AND id IN (SELECT id FROM services\_table);  
\+  \`;  
\+    
\+  await prisma.$executeRaw\`  
\+    UPDATE global\_library\_items   
\+    SET content\_type \= 'product'  
\+    WHERE content\_type IS NULL AND id IN (SELECT id FROM products\_table);  
\+  \`;  
\+    
\+  // 2\. Migrate cover images to media table  
\+  const itemsWithCovers \= await prisma.globalLibraryItem.findMany({  
\+    where: { cover\_path: { not: null } },  
\+  });  
\+    
\+  for (const item of itemsWithCovers) {  
\+    await prisma.globalLibraryMedia.create({  
\+      data: {  
\+        gl\_item\_id: item.id,  
\+        media\_type: 'image',  
\+        file\_path: item.cover\_path,  
\+        is\_primary: true,  
\+        is\_editable: true,  
\+        source: 'a360\_curated',  
\+      },  
\+    });  
\+  }  
\+    
\+  // 3\. Set default editability  
\+  await prisma.$executeRaw\`  
\+    UPDATE global\_library\_items   
\+    SET   
\+      is\_editable \= true,  
\+      source \= 'a360\_curated'  
\+    WHERE is\_editable IS NULL;  
\+  \`;  
\+    
\+  console.log('Migration complete\!');  
\+}  
\+  
\+migrateExistingData()  
\+  .catch(console.error)  
\+  .finally(() \=\> prisma.$disconnect());  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 8\. Frontend Implementation Guide  
\+  
\+\#\#\# 8.1 Enhanced Practice Library Component  
\+  
\+\`\`\`typescript  
\+// src/pages/Catalog/pages/PracticeLibrary/EnhancedPLServices.tsx  
\+  
\+import React, { useState, useEffect } from 'react';  
\+import { PLItemBase, GLItem } from 'apiServices';  
\+import { canEditField, resolveFieldValue } from 'utils/contentOverride.utils';  
\+  
\+interface EnhancedServiceRowProps {  
\+  plItem: PLItemBase;  
\+  onUpdate: (id: string, updates: Partial\<PLItemBase\>) \=\> void;  
\+  onResetOverride: (id: string, fieldName: string) \=\> void;  
\+}  
\+  
\+export const EnhancedServiceRow: React.FC\<EnhancedServiceRowProps\> \= ({  
\+  plItem,  
\+  onUpdate,  
\+  onResetOverride,  
\+}) \=\> {  
\+  const \[isEditing, setIsEditing\] \= useState(false);  
\+  const \[editedTitle, setEditedTitle\] \= useState(plItem.title);  
\+    
\+  const titleResolution \= resolveFieldValue('title', plItem.gl\_item, plItem);  
\+  const isFieldEditable \= canEditField('title', plItem.gl\_item);  
\+    
\+  const handleSave \= () \=\> {  
\+    if (editedTitle \!== titleResolution.resolved\_value) {  
\+      onUpdate(plItem.id, { title\_override: editedTitle });  
\+    }  
\+    setIsEditing(false);  
\+  };  
\+    
\+  const handleReset \= (fieldName: string) \=\> {  
\+    onResetOverride(plItem.id, fieldName);  
\+    setEditedTitle(plItem.gl\_item?.title || '');  
\+  };  
\+    
\+  return (  
\+    \<TableRow\>  
\+      \<TableCell\>  
\+        {isEditing && isFieldEditable ? (  
\+          \<TextField  
\+            value={editedTitle}  
\+            onChange={(e) \=\> setEditedTitle(e.target.value)}  
\+            fullWidth  
\+          /\>  
\+        ) : (  
\+          \<Box display="flex" alignItems="center" gap={1}\>  
\+            \<Typography\>{plItem.title}\</Typography\>  
\+            {titleResolution.is\_overridden && (  
\+              \<Chip   
\+                label="Customized"   
\+                size="small"   
\+                color="primary"  
\+                variant="outlined"  
\+              /\>  
\+            )}  
\+          \</Box\>  
\+        )}  
\+      \</TableCell\>  
\+        
\+      \<TableCell\>  
\+        {\!plItem.gl\_item?.is\_editable && (  
\+          \<Tooltip title="This content is locked by the manufacturer"\>  
\+            \<LockIcon fontSize="small" color="disabled" /\>  
\+          \</Tooltip\>  
\+        )}  
\+      \</TableCell\>  
\+        
\+      \<TableCell\>  
\+        {isFieldEditable ? (  
\+          \<ButtonGroup size="small"\>  
\+            {isEditing ? (  
\+              \<\>  
\+                \<Button onClick={handleSave}\>Save\</Button\>  
\+                \<Button onClick={() \=\> setIsEditing(false)}\>Cancel\</Button\>  
\+              \</\>  
\+            ) : (  
\+              \<Button onClick={() \=\> setIsEditing(true)}\>Edit\</Button\>  
\+            )}  
\+              
\+            {titleResolution.is\_overridden && (  
\+              \<Button   
\+                onClick={() \=\> handleReset('title')}  
\+                color="warning"  
\+              \>  
\+                Reset to Default  
\+              \</Button\>  
\+            )}  
\+          \</ButtonGroup\>  
\+        ) : (  
\+          \<Typography variant="caption" color="text.secondary"\>  
\+            Not editable  
\+          \</Typography\>  
\+        )}  
\+      \</TableCell\>  
\+    \</TableRow\>  
\+  );  
\+};  
\+\`\`\`  
\+  
\+\#\#\# 8.2 Onboarding Review Component  
\+  
\+\`\`\`typescript  
\+// src/pages/Onboarding/components/ItemReviewList.tsx  
\+  
\+import React, { useState } from 'react';  
\+import { OnboardingItem, MatchStatus, ReviewStatus } from 'apiServices/onboarding/types';  
\+import { updateOnboardingItemReview, bulkApproveItems } from 'apiServices/onboarding/onboarding.api';  
\+  
\+interface ItemReviewListProps {  
\+  sessionId: string;  
\+  items: OnboardingItem\[\];  
\+  onItemsUpdated: () \=\> void;  
\+}  
\+  
\+export const ItemReviewList: React.FC\<ItemReviewListProps\> \= ({  
\+  sessionId,  
\+  items,  
\+  onItemsUpdated,  
\+}) \=\> {  
\+  const \[selectedItems, setSelectedItems\] \= useState\<string\[\]\>(\[\]);  
\+    
\+  // Group by confidence score  
\+  const highConfidence \= items.filter(i \=\> i.confidence\_score \>= 90);  
\+  const mediumConfidence \= items.filter(i \=\> i.confidence\_score \>= 50 && i.confidence\_score \< 90);  
\+  const lowConfidence \= items.filter(i \=\> i.confidence\_score \< 50);  
\+    
\+  const handleApproveItem \= async (item: OnboardingItem) \=\> {  
\+    await updateOnboardingItemReview(item.id, {  
\+      review\_status: ReviewStatus.APPROVED,  
\+      selected\_gl\_item\_id: item.suggested\_gl\_item\_id,  
\+    });  
\+    onItemsUpdated();  
\+  };  
\+    
\+  const handleBulkApprove \= async () \=\> {  
\+    await bulkApproveItems(sessionId, selectedItems);  
\+    setSelectedItems(\[\]);  
\+    onItemsUpdated();  
\+  };  
\+    
\+  const handleSelectAlternative \= async (item: OnboardingItem, glItemId: string) \=\> {  
\+    await updateOnboardingItemReview(item.id, {  
\+      review\_status: ReviewStatus.MODIFIED,  
\+      selected\_gl\_item\_id: glItemId,  
\+    });  
\+    onItemsUpdated();  
\+  };  
\+    
\+  return (  
\+    \<Box\>  
\+      \<Box display="flex" justifyContent="space-between" mb={2}\>  
\+        \<Typography variant="h6"\>Review Matches\</Typography\>  
\+        \<Button  
\+          variant="contained"  
\+          onClick={handleBulkApprove}  
\+          disabled={selectedItems.length \=== 0}  
\+        \>  
\+          Approve Selected ({selectedItems.length})  
\+        \</Button\>  
\+      \</Box\>  
\+        
\+      {/\* High Confidence \- Auto-approvable \*/}  
\+      \<Accordion defaultExpanded\>  
\+        \<AccordionSummary\>  
\+          \<Box display="flex" alignItems="center" gap={2}\>  
\+            \<CheckCircleIcon color="success" /\>  
\+            \<Typography\>  
\+              High Confidence Matches ({highConfidence.length})  
\+            \</Typography\>  
\+            \<Chip label="90%+" color="success" size="small" /\>  
\+          \</Box\>  
\+        \</AccordionSummary\>  
\+        \<AccordionDetails\>  
\+          \<List\>  
\+            {highConfidence.map(item \=\> (  
\+              \<ListItem key={item.id}\>  
\+                \<Checkbox  
\+                  checked={selectedItems.includes(item.id)}  
\+                  onChange={(e) \=\> {  
\+                    setSelectedItems(prev \=\>  
\+                      e.target.checked  
\+                        ? \[...prev, item.id\]  
\+                        : prev.filter(id \=\> id \!== item.id)  
\+                    );  
\+                  }}  
\+                /\>  
\+                \<ListItemText  
\+                  primary={  
\+                    \<Box display="flex" alignItems="center" gap={1}\>  
\+                      \<Typography\>{item.raw\_title}\</Typography\>  
\+                      \<ArrowRightIcon /\>  
\+                      \<Typography color="primary"\>  
\+                        {item.suggested\_gl\_item?.title}  
\+                      \</Typography\>  
\+                      \<Chip   
\+                        label={\`${item.confidence\_score.toFixed(0)}%\`}  
\+                        color="success"  
\+                        size="small"  
\+                      /\>  
\+                    \</Box\>  
\+                  }  
\+                  secondary={\`Price: $${item.raw\_price || 'N/A'}\`}  
\+                /\>  
\+                \<Button  
\+                  onClick={() \=\> handleApproveItem(item)}  
\+                  color="success"  
\+                \>  
\+                  Approve  
\+                \</Button\>  
\+              \</ListItem\>  
\+            ))}  
\+          \</List\>  
\+        \</AccordionDetails\>  
\+      \</Accordion\>  
\+        
\+      {/\* Medium Confidence \- Requires review \*/}  
\+      \<Accordion\>  
\+        \<AccordionSummary\>  
\+          \<Box display="flex" alignItems="center" gap={2}\>  
\+            \<WarningIcon color="warning" /\>  
\+            \<Typography\>  
\+              Medium Confidence Matches ({mediumConfidence.length})  
\+            \</Typography\>  
\+            \<Chip label="50-89%" color="warning" size="small" /\>  
\+          \</Box\>  
\+        \</AccordionSummary\>  
\+        \<AccordionDetails\>  
\+          \<List\>  
\+            {mediumConfidence.map(item \=\> (  
\+              \<ItemReviewCard  
\+                key={item.id}  
\+                item={item}  
\+                onApprove={handleApproveItem}  
\+                onSelectAlternative={handleSelectAlternative}  
\+              /\>  
\+            ))}  
\+          \</List\>  
\+        \</AccordionDetails\>  
\+      \</Accordion\>  
\+        
\+      {/\* Low Confidence \- Manual selection \*/}  
\+      \<Accordion\>  
\+        \<AccordionSummary\>  
\+          \<Box display="flex" alignItems="center" gap={2}\>  
\+            \<ErrorIcon color="error" /\>  
\+            \<Typography\>  
\+              Low Confidence / No Match ({lowConfidence.length})  
\+            \</Typography\>  
\+            \<Chip label="\<50%" color="error" size="small" /\>  
\+          \</Box\>  
\+        \</AccordionSummary\>  
\+        \<AccordionDetails\>  
\+          \<List\>  
\+            {lowConfidence.map(item \=\> (  
\+              \<ManualMatchCard  
\+                key={item.id}  
\+                item={item}  
\+                onItemsUpdated={onItemsUpdated}  
\+              /\>  
\+            ))}  
\+          \</List\>  
\+        \</AccordionDetails\>  
\+      \</Accordion\>  
\+    \</Box\>  
\+  );  
\+};  
\+\`\`\`  
\+  
\+\#\#\# 8.3 Content Visibility Toggle Component  
\+  
\+\`\`\`typescript  
\+// src/pages/Catalog/components/ContentVisibilityManager.tsx  
\+  
\+import React, { useState, useEffect } from 'react';  
\+import { getPLItemMedia, updatePLMediaVisibility } from 'apiServices';  
\+  
\+interface ContentVisibilityManagerProps {  
\+  plItemId: string;  
\+}  
\+  
\+export const ContentVisibilityManager: React.FC\<ContentVisibilityManagerProps\> \= ({  
\+  plItemId,  
\+}) \=\> {  
\+  const \[media, setMedia\] \= useState\<Array\<GLMedia & { is\_visible: boolean }\>\>(\[\]);  
\+  const \[loading, setLoading\] \= useState(true);  
\+    
\+  useEffect(() \=\> {  
\+    loadMedia();  
\+  }, \[plItemId\]);  
\+    
\+  const loadMedia \= async () \=\> {  
\+    setLoading(true);  
\+    try {  
\+      const { data } \= await getPLItemMedia(plItemId);  
\+      setMedia(data);  
\+    } catch (error) {  
\+      console.error('Failed to load media', error);  
\+    } finally {  
\+      setLoading(false);  
\+    }  
\+  };  
\+    
\+  const handleToggleVisibility \= async (mediaId: string, isVisible: boolean) \=\> {  
\+    try {  
\+      await updatePLMediaVisibility(plItemId, \[  
\+        { gl\_media\_id: mediaId, is\_visible: isVisible }  
\+      \]);  
\+        
\+      setMedia(prev \=\>  
\+        prev.map(m \=\> m.id \=== mediaId ? { ...m, is\_visible: isVisible } : m)  
\+      );  
\+    } catch (error) {  
\+      console.error('Failed to update visibility', error);  
\+    }  
\+  };  
\+    
\+  if (loading) return \<CircularProgress /\>;  
\+    
\+  return (  
\+    \<Box\>  
\+      \<Typography variant="h6" mb={2}\>Content Visibility\</Typography\>  
\+        
\+      \<Grid container spacing={2}\>  
\+        {media.map(item \=\> (  
\+          \<Grid item xs={12} sm={6} md={4} key={item.id}\>  
\+            \<Card\>  
\+              {item.media\_type \=== 'image' && (  
\+                \<CardMedia  
\+                  component="img"  
\+                  height="140"  
\+                  image={item.file\_path}  
\+                  alt={item.alt\_text || item.title}  
\+                  sx={{ opacity: item.is\_visible ? 1 : 0.3 }}  
\+                /\>  
\+              )}  
\+              {item.media\_type \=== 'video' && (  
\+                \<CardMedia  
\+                  component="video"  
\+                  height="140"  
\+                  src={item.file\_path}  
\+                  controls  
\+                  sx={{ opacity: item.is\_visible ? 1 : 0.3 }}  
\+                /\>  
\+              )}  
\+              {item.media\_type \=== 'pdf' && (  
\+                \<Box p={2} textAlign="center"\>  
\+                  \<PictureAsPdfIcon sx={{ fontSize: 60, opacity: item.is\_visible ? 1 : 0.3 }} /\>  
\+                \</Box\>  
\+              )}  
\+                
\+              \<CardContent\>  
\+                \<Typography variant="body2"\>{item.title || 'Untitled'}\</Typography\>  
\+                \<FormControlLabel  
\+                  control={  
\+                    \<Switch  
\+                      checked={item.is\_visible}  
\+                      onChange={(e) \=\> handleToggleVisibility(item.id, e.target.checked)}  
\+                    /\>  
\+                  }  
\+                  label={item.is\_visible ? 'Visible' : 'Hidden'}  
\+                /\>  
\+              \</CardContent\>  
\+            \</Card\>  
\+          \</Grid\>  
\+        ))}  
\+      \</Grid\>  
\+    \</Box\>  
\+  );  
\+};  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 9\. Processing Pipeline Architecture  
\+  
\+\#\#\# 9.1 File Processing Flow  
\+  
\+\`\`\`  
\+Upload Files  
\+    ↓  
\+┌─────────────────────────────────────┐  
\+│ File Type Detection                  │  
\+│ \- CSV/Excel → Spreadsheet Parser     │  
\+│ \- PDF → PDF Text Extractor           │  
\+│ \- Images → OCR (if needed)           │  
\+│ \- Docs → Document Parser             │  
\+└─────────────────────────────────────┘  
\+    ↓  
\+┌─────────────────────────────────────┐  
\+│ Content Extraction                   │  
\+│ \- Identify products/services         │  
\+│ \- Extract prices                     │  
\+│ \- Extract descriptions               │  
\+│ \- Extract SKUs                       │  
\+└─────────────────────────────────────┘  
\+    ↓  
\+┌─────────────────────────────────────┐  
\+│ Data Normalization                   │  
\+│ \- Clean text                         │  
\+│ \- Standardize formats                │  
\+│ \- Validate data types                │  
\+└─────────────────────────────────────┘  
\+    ↓  
\+┌─────────────────────────────────────┐  
\+│ AI Matching Engine                   │  
\+│ \- Semantic search against GL         │  
\+│ \- Fuzzy string matching              │  
\+│ \- Calculate confidence scores        │  
\+│ \- Generate alternatives              │  
\+└─────────────────────────────────────┘  
\+    ↓  
\+Store in onboarding\_items table  
\+\`\`\`  
\+  
\+\#\#\# 9.2 Processing Service (Backend)  
\+  
\+\`\`\`python  
\+\# services/onboarding\_processor.py  
\+  
\+from typing import List, Dict, Any  
\+import pandas as pd  
\+from PyPDF2 import PdfReader  
\+from sentence\_transformers import SentenceTransformer  
\+from sklearn.metrics.pairwise import cosine\_similarity  
\+import numpy as np  
\+  
\+class OnboardingProcessor:  
\+    def \_\_init\_\_(self):  
\+        \# Load AI model for semantic matching  
\+        self.model \= SentenceTransformer('all-MiniLM-L6-v2')  
\+          
\+    async def process\_uploaded\_files(  
\+        self,   
\+        session\_id: str,   
\+        file\_paths: List\[str\]  
\+    ) \-\> List\[Dict\[str, Any\]\]:  
\+        """Process all uploaded files and extract items"""  
\+        extracted\_items \= \[\]  
\+          
\+        for file\_path in file\_paths:  
\+            file\_type \= self.detect\_file\_type(file\_path)  
\+              
\+            if file\_type \== 'csv' or file\_type \== 'excel':  
\+                items \= await self.process\_spreadsheet(file\_path)  
\+            elif file\_type \== 'pdf':  
\+                items \= await self.process\_pdf(file\_path)  
\+            else:  
\+                continue  
\+              
\+            extracted\_items.extend(items)  
\+          
\+        \# Store in database  
\+        await self.store\_extracted\_items(session\_id, extracted\_items)  
\+          
\+        \# Trigger matching  
\+        await self.match\_items\_to\_gl(session\_id)  
\+          
\+        return extracted\_items  
\+      
\+    async def process\_spreadsheet(self, file\_path: str) \-\> List\[Dict\[str, Any\]\]:  
\+        """Extract products/services from spreadsheet"""  
\+        df \= pd.read\_excel(file\_path) if file\_path.endswith('.xlsx') else pd.read\_csv(file\_path)  
\+          
\+        items \= \[\]  
\+        for \_, row in df.iterrows():  
\+            \# Try to identify columns (flexible matching)  
\+            title \= self.find\_column\_value(row, \['name', 'product', 'service', 'title', 'item'\])  
\+            price \= self.find\_column\_value(row, \['price', 'cost', 'amount'\])  
\+            description \= self.find\_column\_value(row, \['description', 'desc', 'details'\])  
\+            sku \= self.find\_column\_value(row, \['sku', 'code', 'id'\])  
\+              
\+            if title:  
\+                items.append({  
\+                    'raw\_title': str(title),  
\+                    'raw\_description': str(description) if description else None,  
\+                    'raw\_price': float(price) if price else None,  
\+                    'raw\_sku': str(sku) if sku else None,  
\+                    'extracted\_data': row.to\_dict(),  
\+                    'source\_file': file\_path,  
\+                })  
\+          
\+        return items  
\+      
\+    async def process\_pdf(self, file\_path: str) \-\> List\[Dict\[str, Any\]\]:  
\+        """Extract products/services from PDF"""  
\+        reader \= PdfReader(file\_path)  
\+        items \= \[\]  
\+          
\+        for page\_num, page in enumerate(reader.pages):  
\+            text \= page.extract\_text()  
\+              
\+            \# Use regex or NLP to extract structured data  
\+            extracted \= self.extract\_items\_from\_text(text)  
\+              
\+            for item in extracted:  
\+                item\['source\_file'\] \= file\_path  
\+                item\['source\_page\_number'\] \= page\_num \+ 1  
\+                items.append(item)  
\+          
\+        return items  
\+      
\+    async def match\_items\_to\_gl(self, session\_id: str):  
\+        """Match extracted items to Global Library using AI"""  
\+        \# Get all pending items for this session  
\+        items \= await db.query(OnboardingItem).filter\_by(  
\+            session\_id=session\_id,  
\+            match\_status='pending'  
\+        ).all()  
\+          
\+        \# Get all GL items  
\+        gl\_items \= await db.query(GlobalLibraryItem).filter\_by(  
\+            is\_active=True  
\+        ).all()  
\+          
\+        \# Create embeddings  
\+        item\_texts \= \[f"{item.raw\_title} {item.raw\_description or ''}" for item in items\]  
\+        gl\_texts \= \[f"{gl.title} {gl.description}" for gl in gl\_items\]  
\+          
\+        item\_embeddings \= self.model.encode(item\_texts)  
\+        gl\_embeddings \= self.model.encode(gl\_texts)  
\+          
\+        \# Calculate similarities  
\+        similarities \= cosine\_similarity(item\_embeddings, gl\_embeddings)  
\+          
\+        \# Update matches in database  
\+        for i, item in enumerate(items):  
\+            \# Get top 5 matches  
\+            top\_indices \= np.argsort(similarities\[i\])\[-5:\]\[::-1\]  
\+            top\_scores \= similarities\[i\]\[top\_indices\] \* 100  \# Convert to percentage  
\+              
\+            best\_match\_idx \= top\_indices\[0\]  
\+            confidence \= top\_scores\[0\]  
\+              
\+            \# Store results  
\+            item.suggested\_gl\_item\_id \= gl\_items\[best\_match\_idx\].id  
\+            item.confidence\_score \= confidence  
\+            item.match\_status \= 'matched' if confidence \>= 50 else 'no\_match'  
\+              
\+            \# Store alternatives  
\+            alternatives \= \[\]  
\+            for idx, score in zip(top\_indices\[1:\], top\_scores\[1:\]):  
\+                alternatives.append({  
\+                    'gl\_item\_id': gl\_items\[idx\].id,  
\+                    'score': float(score),  
\+                    'title': gl\_items\[idx\].title,  
\+                })  
\+            item.alternative\_matches \= alternatives  
\+          
\+        await db.commit()  
\+      
\+    def find\_column\_value(self, row: pd.Series, possible\_names: List\[str\]) \-\> Any:  
\+        """Find value from row using flexible column name matching"""  
\+        for col in row.index:  
\+            if any(name.lower() in col.lower() for name in possible\_names):  
\+                return row\[col\]  
\+        return None  
\+      
\+    def extract\_items\_from\_text(self, text: str) \-\> List\[Dict\[str, Any\]\]:  
\+        """Extract structured items from plain text using NLP"""  
\+        \# Implement NLP extraction logic  
\+        \# This could use spaCy, regex patterns, or LLM-based extraction  
\+        items \= \[\]  
\+          
\+        \# Example: Simple regex for price patterns  
\+        import re  
\+        price\_pattern \= r'\\$(\\d+(?:\\.\\d{2})?)'  
\+        prices \= re.findall(price\_pattern, text)  
\+          
\+        \# More sophisticated extraction would be implemented here  
\+          
\+        return items  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 10\. Security & Permissions  
\+  
\+\#\#\# 10.1 Permission Schema  
\+  
\+\`\`\`typescript  
\+// src/types/permissions.ts  
\+  
\+export enum Permission {  
\+  // Global Library  
\+  GL\_VIEW \= 'gl:view',  
\+  GL\_CREATE \= 'gl:create',  
\+  GL\_EDIT \= 'gl:edit',  
\+  GL\_DELETE \= 'gl:delete',  
\+  GL\_MANAGE\_MEDIA \= 'gl:manage\_media',  
\+  GL\_SET\_EDITABILITY \= 'gl:set\_editability',  
\+    
\+  // Practice Library  
\+  PL\_VIEW \= 'pl:view',  
\+  PL\_CREATE \= 'pl:create',  
\+  PL\_EDIT \= 'pl:edit',  
\+  PL\_DELETE \= 'pl:delete',  
\+  PL\_IMPORT \= 'pl:import',  
\+  PL\_MANAGE\_MEDIA \= 'pl:manage\_media',  
\+  PL\_OVERRIDE\_CONTENT \= 'pl:override\_content',  
\+    
\+  // Onboarding  
\+  ONBOARDING\_MANAGE \= 'onboarding:manage',  
\+  ONBOARDING\_UPLOAD \= 'onboarding:upload',  
\+  ONBOARDING\_REVIEW \= 'onboarding:review',  
\+  ONBOARDING\_IMPORT \= 'onboarding:import',  
\+}  
\+  
\+export type Role \= 'super\_admin' | 'admin' | 'practice\_admin' | 'practice\_user' | 'read\_only';  
\+  
\+export const ROLE\_PERMISSIONS: Record\<Role, Permission\[\]\> \= {  
\+  super\_admin: Object.values(Permission), // All permissions  
\+    
\+  admin: \[  
\+    Permission.GL\_VIEW,  
\+    Permission.GL\_CREATE,  
\+    Permission.GL\_EDIT,  
\+    Permission.GL\_MANAGE\_MEDIA,  
\+    // Cannot set editability or delete GL items  
\+    Permission.PL\_VIEW,  
\+    Permission.PL\_CREATE,  
\+    Permission.PL\_EDIT,  
\+    Permission.PL\_IMPORT,  
\+  \],  
\+    
\+  practice\_admin: \[  
\+    Permission.GL\_VIEW, // Can only view GL  
\+    Permission.PL\_VIEW,  
\+    Permission.PL\_CREATE,  
\+    Permission.PL\_EDIT,  
\+    Permission.PL\_DELETE,  
\+    Permission.PL\_IMPORT,  
\+    Permission.PL\_MANAGE\_MEDIA,  
\+    Permission.PL\_OVERRIDE\_CONTENT,  
\+    Permission.ONBOARDING\_MANAGE,  
\+    Permission.ONBOARDING\_UPLOAD,  
\+    Permission.ONBOARDING\_REVIEW,  
\+    Permission.ONBOARDING\_IMPORT,  
\+  \],  
\+    
\+  practice\_user: \[  
\+    Permission.GL\_VIEW,  
\+    Permission.PL\_VIEW,  
\+    Permission.PL\_EDIT, // Limited to certain fields  
\+  \],  
\+    
\+  read\_only: \[  
\+    Permission.GL\_VIEW,  
\+    Permission.PL\_VIEW,  
\+  \],  
\+};  
\+\`\`\`  
\+  
\+\#\#\# 10.2 Permission Checking Utilities  
\+  
\+\`\`\`typescript  
\+// src/utils/permissions.utils.ts  
\+  
\+import { Permission, ROLE\_PERMISSIONS } from 'types/permissions';  
\+import { useAuthStore } from 'store';  
\+  
\+export function hasPermission(permission: Permission): boolean {  
\+  const { user } \= useAuthStore.getState();  
\+  if (\!user) return false;  
\+    
\+  const userPermissions \= ROLE\_PERMISSIONS\[user.role\] || \[\];  
\+  return userPermissions.includes(permission);  
\+}  
\+  
\+export function canEditGLField(glItem: GLItemBase, fieldName: string): boolean {  
\+  if (\!hasPermission(Permission.GL\_EDIT)) return false;  
\+    
\+  // Super admins can always edit  
\+  const { user } \= useAuthStore.getState();  
\+  if (user?.role \=== 'super\_admin') return true;  
\+    
\+  // Check editability settings  
\+  if (\!glItem.is\_editable) return false;  
\+  if (\!glItem.editable\_fields) return true;  
\+  return glItem.editable\_fields.includes(fieldName);  
\+}  
\+  
\+export function canEditPLField(  
\+  plItem: PLItemBase,  
\+  fieldName: string  
\+): boolean {  
\+  if (\!hasPermission(Permission.PL\_EDIT)) return false;  
\+    
\+  // Can always edit practice-specific fields  
\+  const practiceFields \= \['price', 'is\_active', 'is\_visible', 'is\_preferred', 'practice\_notes'\];  
\+  if (practiceFields.includes(fieldName)) return true;  
\+    
\+  // For GL-sourced fields, check override permission and GL editability  
\+  if (\!hasPermission(Permission.PL\_OVERRIDE\_CONTENT)) return false;  
\+    
\+  if (plItem.gl\_item) {  
\+    return canEditField(fieldName, plItem.gl\_item);  
\+  }  
\+    
\+  return true; // Custom practice items can edit everything  
\+}  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 11\. Implementation Checklist  
\+  
\+\#\#\# Phase 1: Database & Backend (Weeks 1-2)  
\+- \[ \] Create database migrations for enhanced schemas  
\+- \[ \] Implement GLItem CRUD endpoints with media support  
\+- \[ \] Implement PLItem endpoints with override logic  
\+- \[ \] Create onboarding\_sessions and onboarding\_items tables  
\+- \[ \] Build file upload endpoints  
\+- \[ \] Implement content extraction service (CSV, Excel, PDF)  
\+- \[ \] Build AI matching service with confidence scoring  
\+- \[ \] Add permission middleware to all endpoints  
\+  
\+\#\#\# Phase 2: Processing Pipeline (Weeks 3-4)  
\+- \[ \] Set up file processing queue (Celery/BullMQ)  
\+- \[ \] Implement PDF text extraction  
\+- \[ \] Implement spreadsheet parsing  
\+- \[ \] Build semantic search/matching engine  
\+- \[ \] Create batch matching endpoints  
\+- \[ \] Implement progress tracking for onboarding sessions  
\+- \[ \] Add webhook notifications for processing completion  
\+  
\+\#\#\# Phase 3: Frontend \- Global Library (Week 5\)  
\+- \[ \] Update GLItem types with new fields  
\+- \[ \] Create media management components  
\+- \[ \] Build editability control UI (admin only)  
\+- \[ \] Add content type filtering  
\+- \[ \] Implement tag/concern management  
\+- \[ \] Create manufacturer content indicator  
\+  
\+\#\#\# Phase 4: Frontend \- Practice Library (Week 6\)  
\+- \[ \] Update PLItem types with override fields  
\+- \[ \] Build override indicator UI (chips/badges)  
\+- \[ \] Create field-level reset functionality  
\+- \[ \] Implement content visibility toggles  
\+- \[ \] Build media visibility manager  
\+- \[ \] Add "customized" indicators throughout  
\+  
\+\#\#\# Phase 5: Frontend \- Onboarding (Weeks 7-8)  
\+- \[ \] Create onboarding wizard component  
\+- \[ \] Build file upload interface (drag-drop, multi-file)  
\+- \[ \] Implement cloud storage connection UI  
\+- \[ \] Create processing progress indicators  
\+- \[ \] Build item review list with confidence grouping  
\+- \[ \] Implement match approval workflow  
\+- \[ \] Add alternative match selection UI  
\+- \[ \] Create bulk approval functionality  
\+- \[ \] Build import confirmation dialog  
\+  
\+\#\#\# Phase 6: Testing & Optimization (Weeks 9-10)  
\+- \[ \] Unit tests for override resolution logic  
\+- \[ \] Integration tests for onboarding flow  
\+- \[ \] Performance testing for matching algorithm  
\+- \[ \] Load testing for file processing  
\+- \[ \] UI/UX testing with real practice data  
\+- \[ \] Security audit of permissions  
\+- \[ \] Data migration testing  
\+  
\+\#\#\# Phase 7: Documentation & Deployment (Week 11\)  
\+- \[ \] API documentation (OpenAPI/Swagger)  
\+- \[ \] User guide for onboarding process  
\+- \[ \] Admin guide for GL management  
\+- \[ \] Practice guide for content customization  
\+- \[ \] Deployment runbook  
\+- \[ \] Monitoring setup  
\+  
\+---  
\+  
\+\#\# 12\. Technical Considerations  
\+  
\+\#\#\# 12.1 Performance Optimizations  
\+  
\+1. \*\*Database Indexing\*\*  
\+   \- Full-text search on \`title\`, \`description\`  
\+   \- Indexes on \`content\_type\`, \`is\_active\`, \`practice\_id\`  
\+   \- Composite indexes for common query patterns  
\+  
\+2. \*\*Caching Strategy\*\*  
\+   \`\`\`typescript  
\+   // Redis caching for GL items (rarely change)  
\+   const cacheKey \= \`gl:item:${itemId}\`;  
\+   const cached \= await redis.get(cacheKey);  
\+   if (cached) return JSON.parse(cached);  
\+     
\+   const item \= await db.getGLItem(itemId);  
\+   await redis.setex(cacheKey, 3600, JSON.stringify(item)); // 1 hour TTL  
\+   \`\`\`  
\+  
\+3. \*\*Lazy Loading\*\*  
\+   \- Load media only when needed  
\+   \- Paginate large lists  
\+   \- Use virtual scrolling for long lists  
\+  
\+4. \*\*Background Processing\*\*  
\+   \- Process large files asynchronously  
\+   \- Use message queues for matching operations  
\+   \- Implement progress webhooks  
\+  
\+\#\#\# 12.2 Scalability Considerations  
\+  
\+1. \*\*File Storage\*\*  
\+   \- Use S3/Cloud Storage for media files  
\+   \- Implement CDN for media delivery  
\+   \- Generate thumbnails asynchronously  
\+  
\+2. \*\*Database Sharding\*\*  
\+   \- Shard by practice\_id for PL items  
\+   \- Keep GL items in single shard  
\+  
\+3. \*\*API Rate Limiting\*\*  
\+   \`\`\`typescript  
\+   // Limit file uploads  
\+   app.post('/onboarding/:id/upload',   
\+     rateLimit({ max: 10, windowMs: 60000 }),  
\+     uploadHandler  
\+   );  
\+   \`\`\`  
\+  
\+\#\#\# 12.3 Error Handling  
\+  
\+\`\`\`typescript  
\+// src/utils/errorHandling.ts  
\+  
\+export class ContentEditabilityError extends Error {  
\+  constructor(fieldName: string, itemId: string) {  
\+    super(\`Field '${fieldName}' cannot be edited for item ${itemId}\`);  
\+    this.name \= 'ContentEditabilityError';  
\+  }  
\+}  
\+  
\+export class OnboardingProcessingError extends Error {  
\+  constructor(fileName: string, details: string) {  
\+    super(\`Failed to process file '${fileName}': ${details}\`);  
\+    this.name \= 'OnboardingProcessingError';  
\+  }  
\+}  
\+  
\+// Usage in API calls  
\+try {  
\+  await updatePLItem(itemId, { title: newTitle });  
\+} catch (error) {  
\+  if (error instanceof ContentEditabilityError) {  
\+    notice('error', 'This content cannot be modified');  
\+  } else {  
\+    notice('error', 'Failed to update item');  
\+  }  
\+}  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 13\. Example Workflows  
\+  
\+\#\#\# 13.1 Complete Onboarding Flow  
\+  
\+\`\`\`typescript  
\+// Example: Practice onboarding with file upload  
\+  
\+async function completeOnboarding(practiceId: string, files: File\[\]) {  
\+  // Step 1: Create session  
\+  const { data: session } \= await createOnboardingSession(practiceId);  
\+  console.log('Session created:', session.id);  
\+    
\+  // Step 2: Upload files  
\+  const { data: uploadResult } \= await uploadOnboardingFiles(session.id, files);  
\+  console.log(\`Uploaded ${uploadResult.uploaded\_count} files\`);  
\+    
\+  // Step 3: Trigger processing  
\+  await processOnboardingFiles(session.id);  
\+    
\+  // Step 4: Poll for completion  
\+  let isProcessing \= true;  
\+  while (isProcessing) {  
\+    await new Promise(resolve \=\> setTimeout(resolve, 2000)); // Wait 2s  
\+      
\+    const { data: updatedSession } \= await getOnboardingSession(session.id);  
\+      
\+    if (updatedSession.current\_step \!== 'processing') {  
\+      isProcessing \= false;  
\+    }  
\+  }  
\+    
\+  // Step 5: Get items for review  
\+  const { data: itemsResult } \= await getOnboardingItems(session.id, {  
\+    page: 1,  
\+    size: 50,  
\+  });  
\+    
\+  console.log(\`Found ${itemsResult.total} items\`);  
\+    
\+  // Step 6: Auto-approve high confidence items  
\+  const highConfidenceIds \= itemsResult.items  
\+    .filter(item \=\> item.confidence\_score \>= 90\)  
\+    .map(item \=\> item.id);  
\+    
\+  if (highConfidenceIds.length \> 0\) {  
\+    await bulkApproveItems(session.id, highConfidenceIds);  
\+    console.log(\`Auto-approved ${highConfidenceIds.length} items\`);  
\+  }  
\+    
\+  // Step 7: Import approved items  
\+  const approvedIds \= itemsResult.items  
\+    .filter(item \=\> item.review\_status \=== 'approved')  
\+    .map(item \=\> item.id);  
\+    
\+  const { data: importResult } \= await importOnboardingItems(session.id, approvedIds);  
\+  console.log(\`Imported ${importResult.imported\_count} items to practice library\`);  
\+    
\+  return {  
\+    sessionId: session.id,  
\+    totalItems: itemsResult.total,  
\+    autoApproved: highConfidenceIds.length,  
\+    imported: importResult.imported\_count,  
\+  };  
\+}  
\+\`\`\`  
\+  
\+\#\#\# 13.2 Content Override Workflow  
\+  
\+\`\`\`typescript  
\+// Example: Override GL content for practice  
\+  
\+async function customizeServiceForPractice(  
\+  glServiceId: string,  
\+  practiceId: string,  
\+  customizations: {  
\+    title?: string;  
\+    description?: string;  
\+    price: number;  
\+  }  
\+) {  
\+  // Step 1: Check if already imported  
\+  const { data: existingItems } \= await getPLItems({  
\+    gl\_item\_id: glServiceId,  
\+  });  
\+    
\+  let plItem: PLService;  
\+    
\+  if (existingItems.items.length \> 0\) {  
\+    // Already imported, update it  
\+    plItem \= existingItems.items\[0\];  
\+  } else {  
\+    // Import first  
\+    const { data: importResult } \= await importFromGL({  
\+      gl\_item\_ids: \[glServiceId\],  
\+    });  
\+    plItem \= importResult.imported\[0\];  
\+  }  
\+    
\+  // Step 2: Check editability  
\+  const glItem \= plItem.gl\_item;  
\+    
\+  const updates: Partial\<PLService\> \= {  
\+    price: customizations.price, // Always allowed  
\+  };  
\+    
\+  if (customizations.title && canEditField('title', glItem)) {  
\+    updates.title\_override \= customizations.title;  
\+  }  
\+    
\+  if (customizations.description && canEditField('description', glItem)) {  
\+    updates.description\_override \= customizations.description;  
\+  }  
\+    
\+  // Step 3: Update  
\+  const { data: updated } \= await updatePLItem(plItem.id, updates);  
\+    
\+  console.log('Customized service:', updated);  
\+  console.log('Overridden fields:', updated.overridden\_fields);  
\+    
\+  return updated;  
\+}  
\+\`\`\`  
\+  
\+---  
\+  
\+\#\# 14\. Conclusion  
\+  
\+This specification provides a comprehensive technical blueprint for implementing:  
\+  
\+1. \*\*Enhanced Content Management\*\*: Global and Practice libraries with rich media support  
\+2. \*\*Content Editability Controls\*\*: Manufacturer-locked vs. customizable content  
\+3. \*\*Override System\*\*: Efficient customization without content duplication  
\+4. \*\*Onboarding Workflow\*\*: Automated content extraction and AI-powered matching  
\+5. \*\*Scalable Architecture\*\*: Database schemas, APIs, and frontend components  
\+  
\+\#\#\# Next Steps for Development Team:  
\+  
\+1. \*\*Review & Clarify\*\*: Team review of this specification  
\+2. \*\*API Design Review\*\*: Finalize endpoint structures  
\+3. \*\*Database Migration Plan\*\*: Coordinate with DBA for schema changes  
\+4. \*\*Sprint Planning\*\*: Break down implementation into 2-week sprints  
\+5. \*\*Proof of Concept\*\*: Build matching algorithm prototype  
\+6. \*\*UI/UX Mockups\*\*: Create wireframes for onboarding flow  
\+  
\+\#\#\# Key Success Metrics:  
\+  
\+- \*\*Onboarding Time\*\*: Reduce practice onboarding from days to hours  
\+- \*\*Match Accuracy\*\*: Achieve \>85% confidence on automatic matches  
\+- \*\*User Satisfaction\*\*: Practice admins find override system intuitive  
\+- \*\*Performance\*\*: Process 1000+ items in under 5 minutes  
\+- \*\*Data Quality\*\*: \<5% duplicate content across practices  
\+  
\+---  
\+  
\+\*\*Document Control:\*\*  
\+- \*\*Version\*\*: 1.0  
\+- \*\*Last Updated\*\*: October 1, 2025  
\+- \*\*Next Review\*\*: After Phase 1 completion  
\+- \*\*Contact\*\*: Development Team Lead  
\+

\`\`\`

Perfect\! I've created a comprehensive \*\*130+ page technical specification document\*\* for your development team. This document provides everything they need to understand and implement the Global and Practice Library system with all the features you requested.

\#\# 📋 \*\*What's Included in the Specification:\*\*

\#\#\# \*\*1. Complete Architecture Analysis\*\* (Sections 1-2)  
\- Current codebase structure review  
\- Existing data models and API endpoints  
\- Current implementation patterns

\#\#\# \*\*2. Enhanced Database Schema Design\*\* (Section 3\)  
\- \*\*Content editability controls\*\* \- Fields to define if content can be modified  
\- \*\*Override system\*\* \- Allows customization without duplication  
\- \*\*Media attachments\*\* \- Support for videos, images, PDFs  
\- \*\*Concern-based content\*\* \- Medical information like Melasma  
\- \*\*Source tracking\*\* \- Manufacturer vs. A360 curated content

\#\#\# \*\*3. Complete Onboarding Workflow\*\* (Section 4\)  
\- \*\*File upload system\*\* \- CSV, Excel, PDF support  
\- \*\*Cloud storage integration\*\* \- Google Drive, Dropbox  
\- \*\*Content extraction\*\* \- Automated parsing of products/services  
\- \*\*AI-powered matching\*\* \- Confidence scoring (0-100%)  
\- \*\*Phased review process\*\* \- High/Medium/Low confidence grouping  
\- \*\*Batch approval\*\* \- Quick approval for high-confidence matches

\#\#\# \*\*4. Content Override Architecture\*\* (Section 5\)  
\- \*\*Resolution logic\*\* \- How overrides work without duplication  
\- \*\*Field-level editability\*\* \- Granular control per field  
\- \*\*Reset functionality\*\* \- Restore to global defaults  
\- \*\*Backend implementation\*\* \- Pseudo-code examples

\#\#\# \*\*5. Complete API Specifications\*\* (Section 6\)  
\- 24+ API endpoints fully documented  
\- Enhanced Global Library endpoints  
\- Practice Library with override tracking  
\- Search & matching endpoints  
\- File upload endpoints with FormData

\#\#\# \*\*6. Frontend Components\*\* (Section 8\)  
\- Override indicator UI with "Customized" badges  
\- Onboarding wizard with confidence grouping  
\- Content visibility toggles  
\- Media management components  
\- React/TypeScript examples

\#\#\# \*\*7. Processing Pipeline\*\* (Section 9\)  
\- File type detection  
\- Content extraction (PDF, Excel, CSV)  
\- AI matching using semantic embeddings  
\- Python backend service example

\#\#\# \*\*8. Security & Permissions\*\* (Section 10\)  
\- Role-based access control  
\- Permission checking utilities  
\- Field-level edit permissions

\#\#\# \*\*9. Implementation Plan\*\* (Section 11\)  
\- \*\*11-week phased rollout\*\*  
\- Task breakdown by phase  
\- Testing strategy  
\- Deployment checklist

\#\# 🎯 \*\*Key Technical Features Explained:\*\*

\#\#\# \*\*1. Content Editability Schema\*\*  
\`\`\`typescript  
is\_editable: boolean              // Can practices modify this?  
editable\_fields: \['title', 'description'\]  // Specific fields allowed  
source: 'manufacturer' | 'a360\_curated'    // Who created it  
\`\`\`  
\#\#\# \*\*2. Override Without Duplication\*\*  
Instead of copying entire content for each practice:  
\- Store only customized fields in practice table  
\- Use \`title\_override\`, \`description\_override\` columns  
\- Fall back to global library if override is NULL  
\- Track which fields were customized in \`overridden\_fields\` array

\#\#\# \*\*3. Onboarding Confidence Scoring\*\*  
\- \*\*90%+\*\* → Auto-approve  
\- \*\*50-89%\*\* → Review required  
\- \*\*\<50%\*\* → Manual selection

\#\#\# \*\*4. Media Visibility Control\*\*  
\- Practices can hide specific global library media  
\- Add their own custom media  
\- Reorder media without affecting global library

\#\# 📊 \*\*Database Tables Created:\*\*

1\. \*\*global\_library\_items\*\* \- Enhanced with editability controls  
2\. \*\*global\_library\_media\*\* \- Videos, images, PDFs for GL items  
3\. \*\*practice\_library\_items\*\* \- Override columns added  
4\. \*\*practice\_library\_media\*\* \- Practice-specific media references  
5\. \*\*onboarding\_sessions\*\* \- Track onboarding progress  
6\. \*\*onboarding\_items\*\* \- Extracted items with match confidence

\#\# 🚀 \*\*Next Steps for Your Team:\*\*

1\. \*\*Review the spec\*\* \- Team walkthrough of all 14 sections  
2\. \*\*Database planning\*\* \- Review schema with DBA  
3\. \*\*API design session\*\* \- Finalize endpoint structures    
4\. \*\*UI mockups\*\* \- Design the onboarding wizard  
5\. \*\*Proof of concept\*\* \- Build matching algorithm prototype

The document is saved at: \`C:\\Users\\Chris\\b360\\web-app\\TECHNICAL\_SPEC\_GLOBAL\_PRACTICE\_LIBRARY.md\`

Would you like me to:  
1\. Create a shorter executive summary for stakeholders?  
2\. Generate SQL migration scripts for the database?  
3\. Create TypeScript type definition files?  
4\. Build a React component prototype for onboarding?  
5\. Create API documentation in OpenAPI/Swagger format?  


[image1]: <data:image/png;base64,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5JL58+eDbN24caPZbBYzIM6eBW/AfugAvMGsWbNA7rMfPgPRf8UVV4DRSklJueaaa9atWwcduHjxYuhPODRt2rSLKKC3a2pqFi1aBJ+fffZZsXQEYnwA7QESiURGEOXJVvQEHFgA2gMRaA/UeO+992JiYq699toHHnjg3nvvzc3NLSoqKi0t3bx589q1a8VoxNmz0dHR0FFw/cC/NDAJM2bM0Ol04BOmTJkCHgD+MhvAfiYZMHPmzLlz51599dV33nnnnj17oJ/vueeeFStWSJIEnS+WjkCMD6A9QCKRyAiiPNmKnoADC0B7IALtQUCAln3llVfefvvt733ve9u2bUtISDBSmEymX/7yl2L0hAfYg+eff17+2t3dvX///vz8fJD+oPszMzM3bty4ZcuW66677qabbkpNTU1JSYG/6enpN9xww969e998803I9d///d/gH6Db/eWeB8AVLiYhENqA9gCJRCIjiPJkK3oCDiwA7YEItAdq/Pvf/542bdrg4CB8Li4uXr58+axZs9j976lTp4JJeOKJJ6DHxGwTGDNmzAj9Zth//OMfnZ2d1dXVd91117Jly9asWQMOQfgZNQAYhvPx0weffPIJjOOVV16ZnJwMgwiDm5aW9tvf/laMQyBCAu0BMgzsrM4vqO6knz2HLJJkKG1XxSAD0XOkIr+iyaNKD8SOmoK8mk762VOXESUZd7WpYsaE3HAjx57yZCt6Ag4sAO2BCLQHMg4fPhwfH6/T6SZNmiRJEku89NJLTSbT9OnTmT0AZQlS+JJLLsnJyeno6FAWMHEBPQMdIqYGQUNDw6pVq5YuXQpWQTgE1yH07e233y6kjxZQTmtr644dO8APzJ49OyoqCkYQTrp///7s7GwwJ/Pnz7/44oujo6Oh2u+//76YH4EIBLQHyDDwsFWSrM308+CxksS4rJouVczXz64qiyHjYJcq/etkt80sxdu6VemB2JQtSdmH6eeTbaVJ5q21XaqYMSE33MixpzzZip6AAwtAeyAC7QHD8uXLQeOCjgTJmJSUBFISesbtdoNaffDBB1NSUkBQzp0712g0gr6cN28e+IRly5aBuMS1RoDJkyd/97vfFVMD4fPPP9+2bRtod/gMZqypqUkIqKurA+H+P//zP0K6FtTX119//fUwNODu2FYHGKPi4mKPxwPFrl27NjY2dt++fT09PWfp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fbtOt72N/T3ja2ArkfJUp/JiFAxDdZok5akXu7MKO/hNuq4KXzfSrtjP3bcmNRcW7rdBfZibClUUaaCB09zDzIalVxO/FNgehOwlkiWuwruMitBds0WSluY5nL2BlvdwFK8i4WKgV463Mj4SS8Zsp9ghgugXPQBH8RAZVkXr/AEhG448r5QnW9ETcGABaA9ETDR7MGXKlJUrV7744otyCkhzsAfQCVzU14z29vaHHnpo9erVM2bMgLrNmjVr7dq1xcXFHR0dcsx7771XVVUFTgC0Mvs55GnTpoUwBoADBw7Mmzfvjjvu+Otf/yoeG/cAYwDW6KqrrsrNzQ39olJAbW0t2CfwV6NdG3OeADYPej4pKUk8MO6h8VEYD7QH2oH2QG0PFDqeCyBiKwCYzqaK0K/sz5s9OD3sqs4yRtEz683pxY3dp2g6kYYBoC7NF6zYw+rTkSCvdUVH6d1uQ1mnQoAGaoKqHEZOmvs41OjrH1U5AQrxx4QqinaXGqqM3BlD9lKAc/W1lCboaIiObHs4FmQDiXgVCReDSscrsogd8tXsQcBhHaHhyPNKebIVPQEHFoD2QMREswegpK+88spf/vKXcgo0H/6hQtu5qHGEvr6+733vexaLZc6cOWAVJk2atGTJkltvvfXQoUP/+7//e+TIkcWLF0+fPn358uXB3mp6lq44uuKKK7Zt2/b73/9ePDbu8ac//amwsHDy5MnQCtBn4mEOf//737///e/n5OR84xvfePPNN8XDXytSUlIuvvhiGE3xwLjHaC3WBbz9AO1BmCkKO1GrKexBLqivRrEEL8NhD+i6f/6uM6Nrv9n3jMLPwR5nK7814kieeJc9BFU6crA+i5yCNNbaPMQWR0GryV1838L3rsok5XMVoEMsh5HobKHCtBvpuh1VV5CaK29sn3bujeNUfrCium2JirVACga2ByF7KYA9YDzV2328UVjKr6B4FansAVw5yudO4uOU820PQjYceV4pT7aiJ+DAAtAeiJho9mD27NmJiYmNjY18ItiDgYEBPmXcAoxNQUHBihUr2OtWoeZLly4NsX/gZz/72bp166677roDBw6Ix8Y9fve73915551z584FxTniD8C99NJLt9xyy/79+z/88EPx2DgAOJypU6fed9994oFxj9HK/dHaiQgC2oMwUxR2olbjA8haGu9KGy8HTzh9i3zC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>