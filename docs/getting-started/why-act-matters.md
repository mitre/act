---
title: Why ACT Matters
description: The problem with compliance-oriented decision-making and how ACT provides a risk-based alternative.
---

# Why ACT Matters

## The Problem with Compliance-Oriented Decision-Making

Compliance-oriented decision-making often results in poor decisions and wasted resources:

1. Detailed low-level technical findings are handed directly to less-technical decision makers.
2. Decision-makers lack an appropriate framework for understanding the actual risks.
3. Without risk context, decision-makers often default to "close everything" — **regardless of cost or impact**.
4. Blindly closing all findings rather than making risk-based decisions gets the system to a temporary state of compliance without understanding whether the new configuration enhances or degrades the overall mission objectives and capabilities.
5. **Money and resources are wasted on inefficient and ineffective compliance efforts**.

## The MITRE ACT Solution

MITRE ACT addresses these challenges by:

1. Implementing a risk-based decision-making framework tailored to your specific organization, while maintaining compatibility with other organizations' ACT implementations
2. Providing context that explains what technical findings mean to your mission
3. Empowering decision-makers to understand and choose when and how to comply, and when to accept risk
4. Focusing resources on the highest-impact security improvements
5. Supporting efficient, cost-effective, and repeatable risk-based assessment processes

---

## Real-World Example: The Doctor Visit

You ask your doctor for a full health assessment. She draws blood, checks blood pressure, reflexes, lung sounds, and has you undergo full-body MRI imaging. These assessments check your data against predetermined "normal" (compliant) values. The results are documented, with abnormal values highlighted and reported back to the doctor.

Upon entering the room, the doctor drops 500 pages of detailed medical jargon on the table and tells you to "**fix everything immediately**." She points at every yellow-flagged lab value, every slight imperfection the MRI software circled, and every borderline reading. Her prescription includes ten specialists, a restrictive diet, three medications "just to be safe" — an aggressive, expensive campaign aimed at driving every metric back inside its textbook range.

That is the compliance mindset in action:

| Compliance Approach                                  | Consequence                                                                             |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Treat every out-of-range number as equally urgent    | No prioritization — high cholesterol gets the same attention as mild cosmetic scoliosis |
| Assume zero deviation is the only acceptable outcome | Leads to "over-treat" decisions (unneeded scans, procedures, pills)                     |
| Measure success by checklist closure                 | Ignores whether the patient's quality of life actually improves                         |
| Resource usage is invisible                          | Patient absorbs the cost; time and money siphoned from truly beneficial care            |

### How a Risk-Based Doctor Responds

Now rewind. Same data, but this time the doctor uses a risk-assessment lens — the MITRE ACT way:

1. **Derive plain-language risk statements** from all technical findings _in context_:
   - _Your elevated LDL ("bad cholesterol") increases the risk of a heart attack by about 5 percent if left untreated over the next decade._
   - _However, your elevated HDL ("good cholesterol") helps to counteract the LDL, and some simple diet changes can improve this further, so I'm not very concerned about it at this time._
   - _Your recurring plantar fasciitis, while not life threatening, is more of a concern since you are very active and this is a limiting factor for you right now._

2. **Map each risk to the patient's mission objectives:**
   - Objective: Maintain energy to keep up with a growing child and finish a half-marathon next spring.

3. **Prioritize risks by impact and likelihood:**
   - High priority: Referral to specialist for treating plantar fasciitis.
   - Medium priority: Cholesterol management (diet + statin discussion) and shoulder MRI artifact (likely benign; monitor, no surgery at this time).
   - Acceptable/low: Mildly low vitamin D — sunlight and multivitamin, reassess annually.

::: info
This example shows how the high LDL "bad cholesterol" value (a low-level finding) was ranked lower priority — even though categorically it can be life-threatening — because of a corresponding high level of HDL (a compensating control). Meanwhile, the strategic consideration of an active adult raising young children drives up the priority of treating plantar fasciitis, despite it not being life-threatening.
:::

4. **Offer decision options** with costs, benefits, and trade-offs.
5. **Document residual risk and rationale** — everything is traceable.

| Risk-Based Approach                                      | Benefit                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| Focus on highest-impact risks first                      | Resources align with what actually protects health/mission   |
| Provide context and alternatives                         | Empowers informed decisions instead of reflexive remediation |
| Measure success by risk reduction relative to objectives | Ensures actions truly enhance desired capabilities           |
| Transparent residual-risk acceptance                     | Stakeholders understand and own the risk                     |

::: info
**ACT turns "close _every_ gap" into "close the _right_ gaps" — protecting your mission, your budget, and your sanity.**
:::

---

## Real-World Example: Cybersecurity Team

Imagine a federal agency system that supports disaster response coordination. After a routine security controls assessment (SCA), the cybersecurity team receives a report listing 137 findings — everything from missing patches to default SNMP strings on unused interfaces, to missing multifactor authentication (MFA) on low-sensitivity subsystems.

The report is handed to the Authorizing Official (AO) with the recommendation: **fix everything immediately**.

The team launches an all-out remediation campaign. Servers are rebooted during business hours. Services thought to be unused are hastily disabled, impacting data feeds. A token-based MFA system is quickly bought and rolled out to all users, but it ends up being expensive and hard for non-technical users to use. When an actual crisis hits, degraded performance delays emergency coordination. Compliance is achieved, but at the cost of mission success.

### How a Risk-Based (ACT) Assessment Responds

The same findings exist, but the team uses the ACT framework to perform a **risk-based analysis**:

1. **Derive plain-language risk statements** from all technical findings _in context_:
   - "The user portal implements only single factor (password) authentication, which could allow compromised credentials to be used."
   - "Missing patch on an admin portal could allow unauthorized access, but that portal is IP-restricted which reduces exposure."
   - "The default SNMP string exists on a decommissioned interface that's not reachable from any network — risk is negligible."

2. **Map risks to Capabilities:**
   - The lack of MFA on the user portal degrades the Manage Credentials and Authentication (CRED) capability.
   - The unpatched admin portal degrades the Vulnerability (Patch) Management (VULN) capability.
   - The SNMP issue on a decommissioned interface does not meaningfully degrade any capability.

3. **Prioritize based on mission impact:**
   - High priority: Lack of MFA on public-facing portal that manages personnel deployment.
   - Medium priority: Patch for the admin portal — can be installed during off-hours.
   - Low priority: SNMP issue on decommissioned interface — no operational impact.

4. **Offer decision-makers options:**
   - "Here are two ways to strengthen authentication: one is low-cost but partial; the other is stronger but requires downtime. Based on your mission schedule, which option works best?"

5. **Document residual risk and rationale:**
   - The AO formally accepts risk for non-critical findings and redirects saved resources to better protect operational workflows.

### Why This Matters

Instead of blindly chasing a clean findings report, the ACT approach focuses effort where it matters most:

- Leadership sees mission-aligned risk, not technical clutter.
- Security teams know which issues demand action and why.
- Risk acceptance becomes transparent and justified.
- Mission impact is preserved and even enhanced.

**ACT helps you protect what matters most — not just what's easiest to check off.**
