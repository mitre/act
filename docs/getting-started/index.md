---
title: Introduction to MITRE Adaptive Capabilities Testing (ACT)(tm)
description: Decide with Insight. ACT with Confidence.
---

::: tip Quick Links

- **[MITRE ACT Templates](/templates)** - Download templates, guides, and workaids
- **[Contact the MITRE ACT Team](mailto:act@mitre.org)** - Get support from the ACT development team
  :::

## Transform Your Cybersecurity Assessment Approach

MITRE ACT(tm) is a flexible, efficient, and customizable security and risk assessment framework that empowers organizations to make smarter, risk-informed cybersecurity decisions. ACT turns your existing compliance data into insight about mission-critical risks, helping you allocate resources where they matter most. ACT can be integrated into your organization's existing Authorization and Assessment (A&A) program and can provide the primary risk-based decision-making layer in your processes.

---

## What is MITRE ACT?

MITRE Adaptive Capabilities Testing (ACT) is a **capabilities-focused** assessment framework that encourages and drives **risk-based decision-making** by considering all available **Risk Information Sources (RIS)**. Compliance assessments produce valuable data, but without context it's hard to tell what matters. MITRE ACT helps organizations move beyond checklists to understand what security findings practically mean for their mission... and whether compliance meaningfully reduces risk.

::: tip
ACT is currently a manual process that is designed with automation in mind - ultimately enabling real-time risk dashboards derived from all available Risk Information Sources (RIS). The ACT framework is currently implemented in various document templates and work aids, with full automation of the ACT risk identification and assessment process under active development.
:::

### The MITRE ACT Difference

While traditional assessments, such as Security Control Assessments (SCAs), implement valuable Risk Information Sources (RIS's) that generate valuable lists of low-level technical findings, these RIS's are typically considered and acted-upon in isolation from each other. MITRE ACT **transforms** this data into **actionable intelligence**:

- **Synthesizes all available Risk Information Sources (RIS's)** - ACT considers more than just the findings from your latest compliance assessment -- it uses _all_ available RIS's to inform your risk posture.
- **More understandable and actionable** - ACT adds context, clarifies priorities, and both drives and justifies decisions.
- **Risk-driven rather than compliance-driven** - ACT focuses on risk identification and analysis at the capability level, de-emphasizing technical findings and compliance checkboxes.
- **Capability-oriented rather than control-oriented** - ACT elevates analysis and decision-making to the mission objective (or capability) level, using compliance data to help determine how (and how much) those objectives and capabilities are enhanced or degraded.

---

## Why MITRE ACT Matters

### The Problem with Compliance-Oriented Decision-Making

Compliance-oriented decision-making often results in poor decisions and wasted resources:

1. Detailed low-level technical findings are handed directly to less-technical decision makers.
2. Decision-makers lack an appropriate framework for understanding the actual risks.
3. Without risk context, decision-makers often default to "close everything" - **regardless of cost or impact**.
4. Blindly closing all findings rather than making risk-based decisions gets the system to a temporary state of compliance without understanding whether the new configuration enhances or degrades the overall mission objectives and capabilities.
5. **Money and resources are wasted on inefficient and ineffective compliance efforts**.

### The MITRE ACT Solution

MITRE ACT addresses these challenges by:

1. Implementing a risk-based decision-making framework that is tailored to the needs of your specific organization, while maintaining compatibility and comparability with other organizations' ACT implementations
2. Providing context that explains what technical findings mean to your mission
3. Empowering decision-makers to understand and choose when and how to comply, and when to accept risk
4. Focusing resources on the highest-impact security improvements
5. Supporting efficient, cost-effective, and repeatable risk-based assessment processes

### A Real-World Example: Doctor Visit

You ask your doctor for a full health assessment. The doctor examines you to collect data: she draws blood for testing by the lab, checks various aspects of your body (blood pressure, reflexes, lung sounds, etc.), and has you undergo full-body MRI imaging.

These different assessment activities check your data against a large list of predetermined "normal" (compliant) values/value ranges. The results of all the checks are documented, with abnormal (non-compliant) values highlighted, and reported back to the doctor.

The doctor has you return to her office to hear the result of your exam. Upon entering the room she drops on the table 500 pages of detailed medical jargon about your bloodwork, MRI, and physical exam and tells you to "**fix everything immediately**."

She points at every yellow-flagged lab value, every slight imperfection the MRI software circled, and every borderline reading from the physical. Her prescription list includes ten specialists, a restrictive diet, three medications "just to be safe," and a follow-up MRI in six months - an aggressive, expensive campaign aimed at driving every metric back inside its textbook range.

That is the compliance mind-set in action:

| Compliance Approach (Standards/Requirement Level)                | Consequence                                                                               |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Treat every out-of-range number as equally urgent                | No prioritization - high cholesterol gets the same attention as mild cosmetic scoliosis   |
| Assume zero deviation is the only acceptable outcome             | Leads to "over-treat" decisions (unneeded scans, procedures, pills)                       |
| Measure success by checklist closure ("all findings remediated") | Ignores whether the patient's quality of life or long-term health actually improves       |
| Resource usage is invisible                                      | Patient (or insurer) absorbs the cost; time and money siphoned from truly beneficial care |

#### How a Risk-Based (Capability/Mission Objective) Doctor Responds

Now rewind. Same data, but this time the doctor uses a risk-assessment lens - the MITRE ACT way:

1. Derive plain-language risk statements from all technical findings _in context_:
   - \*Your elevated LDL ("bad cholesterol") increases the risk of a heart attack by about 5 percent if left untreated over the next decade.
   - However, your elevated HDL ("good cholesterol") helps to counteract the LDL, and some simple diet changes can improve this further, so I'm not very concerned about it at this time.
   - Your recurring plantar fasciitis, while not life threatening, is more of a concern since you are very active and this is a limiting factor for you right now.\*

2. Map each risk to the patient's mission objectives:
   - Objective: Maintain energy to keep up with a growing child and finish a half-marathon next spring.

3. Prioritize risks by impact and likelihood:
   - High priority: Referral to specialist for treating plantar fasciitis.
   - Medium priority: Cholesterol management (diet + statin discussion) and shoulder MRI artifact (likely benign; monitor, no surgery at this time).
   - Acceptable/low: mildly low vitamin D - sunlight and multivitamin, reassess annually.

::: info
This example shows how the high LDL "bad cholesterol" value (a low-level finding) was ranked lower priority (even though categorically it can be life-threatening) because of a corresponding high level of HDL - good cholesterol(a compensating control). Meanwhile, the strategic consideration of an active adult raising young children and planning to run a marathon drives up the priority of treating plantar fasciitis despite that fact that this was not an emphasized finding in standard tests and is not life-threatening.
:::

4. Offer decision options with costs, benefits, and trade-offs.
   - \*Here's the cost and recovery time for surgery for your plantar fasciitis, potential side effects, and the risk reduction curve.
   - You can also try physical therapy first, which has less cost and side effects but lower likelihood of success.
   - We'll get a specialist's opinion and meet again in 90 days and decide.\*
5. Document residual risk and rationale.
   - Everything is traceable: why surgery was deferred, why vitamin D wasn't escalated, and how each choice supports the patient's capability goals (energy, longevity, athletic performance).

| Risk-Based Approach (Capability/Mission Level)                   | Benefit                                                                             |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Focus on highest-impact risks first                              | Resources (time, money, attention) align with what actually protects health/mission |
| Provide context and alternatives                                 | Empowers informed decisions instead of reflexive remediation                        |
| Measure success by risk reduction relative to mission objectives | Ensures actions truly enhance desired capabilities                                  |
| Transparent residual-risk acceptance                             | Stakeholders understand and own the risk, preventing hidden liabilities             |

#### Why This Matters for Cybersecurity

Just as a patient doesn't need every metric forced into the "normal" range, your organization doesn't need every low-level security finding closed at any cost. MITRE ACT reframes hundreds of raw technical findings into a concise, prioritized set of risks directly tied to your mission objectives.

- Decision-makers see the few contextualized issues that materially threaten capabilities, not an enormous and inscrutable jargon dump.
- Resources target the changes that move the risk needle, not busy-work that only satisfies a checklist.
- Stakeholders knowingly accept or remediate residual risk, ensuring accountability and preventing surprise failures.

::: info
**ACT turns "close _every_ gap" into "close the _right_ gaps" - protecting your mission, your budget, and your sanity.**
:::

---

### A Real-World Example: Cybersecurity Team

Imagine a federal agency system that supports disaster response coordination. After a routine security controls assessment (SCA), the cybersecurity team receives a report listing 137 findings - everything from missing patches to default SNMP strings on unused interfaces, to missing multifactor authentication (MFA) on low-sensitivity subsystems.

The report is handed to the Authorizing Official (AO) with the recommendation: **fix everything immediately**.

To the AO, who lacks deep technical context, the list appears urgent and indiscriminate. So the team launches an all-out remediation campaign. Servers are rebooted during business hours to apply patches. Services thought to be unused are hastily disabled, impacting data feeds. A token-based MFA system is quickly bought and rolled out to all users, but it ends up being expensive and hard for non-technical users to use. When an actual crisis hits, degraded performance delays emergency coordination and key data updates arrive late. Compliance is achieved, but at the cost of mission success.

This demonstrates a common compliance-driven pitfall: treat all findings with equal urgency, without understanding mission impact.

#### How a Risk-Based (ACT) Assessment Responds

Now rewind. The same findings exist, but the team uses the ACT framework to perform a **risk-based analysis**:

1. **Derive plain-language risk statements** from all technical findings _in context_:
   - "The user portal implements only single factor (password) authentication, which could allow compromised credentials to be used."
   - "Missing patch on an admin portal creates could allow unauthorized access, but that portal is IP-restricted which reduces exposure."
   - "The default SNMP string exists on a decommissioned interface that's not reachable from any network - risk is negligible."

2. **Map risks to Capabilities**:
   - The lack of MFA on the user portal degrades the Manage Credentials and Authentication (CRED) capability.
   - The unpatched admin portal degrades the Vulnerability (Patch) Management (VULN) capability.
   - Presence of default SNMP string degrades the Manage Privileges and Accounts (PRIV) capability, but the interface in question has been decommissioned and has minimal sensitivity and so the PRIV capability is not meaningfully degraded.

3. **Prioritize based on mission impact**:
   - High priority: lack of MFA on public-facing portal that manages personnel deployment (critical to life-saving coordination) - implementation of MFA will require coordination and distribution of MFA tokens to all users of the portal.
   - Medium priority: patch for the admin portal - can be installed and tested during off-hours.
   - Low priority: SNMP issue on decommissioned interface - fix will have no impact on actual operation of the system.

4. **Offer decision-makers options**:
   - "Here are two ways to strengthen authentication: one is low-cost but partial; the other is stronger but requires downtime. Based on your mission schedule, which option works best?"

5. **Document residual risk and rationale**:
   - The AO formally accepts risk for non-critical findings and redirects saved resources to better protect operational workflows.

#### Why This Matters for Your Organization

Instead of blindly chasing a clean findings report, the ACT approach focuses effort where it matters most:

- Leadership sees mission-aligned risk, not technical clutter.
- Security teams know which issues demand action and why.
- Risk acceptance becomes transparent and justified.
- Mission impact is preserved and even enhanced.

**ACT helps you protect what matters most - not just what's easiest to check off.**

## How ACT Works

### Security Capabilities Focus

ACT organizes security objectives into high-level Capabilities such as:

- **CRED**: Manage Credentials and Authentication
- **PRIV**: Manage Privileges and Accounts
- **VULN**: Vulnerability (Patch) Management
- **BEHAVE**: Manage Behavioral Expectations

Each Capability (and their multiple Sub-Capabilities) reflects the high-level _**what**_ a system needs to provide, while implementation and compliance standards specify the low-level _**how**_ the Capability is provided.

These Capabilities are mapped to the various compliance standards that your organization cares about, creating a common language that both technical teams and executives can understand. Examples of mapped compliance standards might include:

- National Institute of Standards and Technology (NIST) Special Publication (SP) 800-53 security controls
- Office of Management and Budget (OMB) memos
- Internal policies and directives
- Health Insurance Portability and Accountability Act (HIPAA) requirements
- Financial laws and regulations
- Industry best practices

### Comprehensive Risk Analysis

ACT provides a comprehensive view of your organization's risks by integrating your available Risk Information Sources, such as:

- Risk Assessment Reports (RARs)
- Security Control Assessment (SCA) Reports
- Security Assessment Reports (SARs)
- Penetration Testing Results
- Vulnerability Assessments
- Other Audit Findings
- Incident Response Evaluations
- Continuous Monitoring Data
- Real-time Sensor Data
- News and World Events
- And more...

ACT works regardless of how much or how little data you have - it integrates robust sets of risk information and identifies the risk of informational blind spots when no RIS are available.

### Risk-Based Decision-Making Framework

ACT applies all RIS's to each other to determine three types of actionable risks:

1. **Inherent Risks**: Direct risks resulting from unmitigated findings and threats
2. **Residual Risks**: Indirect risks that remain after mitigation
3. **Inherited Risks**: Risks originating from interconnected systems

---

## Benefits for Your Organization

### For Organizations

- **Impactful Security**: Focus on risks that actually matter to your mission
- **Enhanced Understanding**: Bridge the gap between technical teams and leadership
- **Efficient Assessment**: Streamline assessment processes from weeks to days
- **Reduced Cost**: Eliminate wasteful compliance activities and configuration changes

### For Leadership & Decision Makers

- Make informed decisions about security investments
- Understand security posture in business terms
- Prioritize resources based on mission impact
- Justify risk-acceptance or risk mitigation
- Support risk-based Authorization to Operate (ATO) decisions

### For Security Teams

- Reduce "finding fatigue" and repeat findings
- Focus efforts on meaningful security improvements
- Streamline assessment processes
- Improve communication with leadership

---

## ACT in Practice

### Assessment Types

ACT implements two complementary assessment types:

**Risk Assessment**

- Analyzes all available risk information sources (RIS)
- Identifies mission-impact risks
- Drives strategic, contextualized, risk-informed decision-making
- Provides justification for risk-based decisions

**Security Assessment**

- Implements optional streamlined version of a traditional Security Controls Assessment (SCA)
- Identifies compliance and non-compliance with a defined set of security controls or requirements
- Provides one potential source of risk information
- Ideal for organizations with nonexistent or ineffective SCA program, but not required in order to perform ACT Risk Assessment.

### Flexible Implementation

ACT adapts to your needs with:

- Multiple levels (1 - 4) of assessment rigor
- Scalable scope options (comprehensive, tailored, application-only, infrastructure-only)
- Support for various system types including cloud, on-premises, and hybrid environments

---

## Getting Started with ACT

MITRE ACT provides a complete framework including:

- Comprehensive assessment handbook and methodology
- Ready-to-use templates and work aids
- Capability mappings to major compliance frameworks
- Risk scoring methodologies
- Training and implementation guidance

Explore the resources available to help you understand and implement ACT(tm):

::: tip Quick Links

- **[MITRE ACT Templates](/templates)** - Download templates, guides, and workaids
- **[Contact the MITRE ACT Team](mailto:act@mitre.org)** - Get support from the ACT development team
  :::
