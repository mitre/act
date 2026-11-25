---
title: How ACT Works
description: See how ACT uses risk information to guide decisions, then learn how to plan your own assessment.
---

# How ACT Works

ACT assesses what could disrupt the mission, how likely it is, and what the team can do about it. In the [disaster response example](/introduction/why-act-matters#a-cybersecurity-example), the agency uses a public-facing portal to deploy responders. The assessor brings together several kinds of evidence to understand the risks to that operation.

::: tip ACT and Automation
Note that ACT (the process) is mature and in use today by various governmental and corporate entities. MITRE is currently developing an agentic tool (Agentic ACT (AACT) to for use by the risk assessor - see [Agentic ACT](/agentic-act.md) for more details.
:::

## Gather risk information

**Risk Information Sources (RIS)** are the sources an assessor draws on to understand risk. ACT ingests your existing silos of information about the system and its context.

Evidence of compliance and noncompliance with requirements are equally valuable. A requirement that is met may reveal a safeguard that **lowers or raises risk**, while an unmet requirement may reveal an important **gap in coverage** or a **wise choice to not comply** because of context. A compliant system can still face risk when conditions change or requirements conflict.

| Example Risk Information Source     | What it tells the assessor in this example                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Controls assessment                 | The public portal falls short of its multifactor authentication (MFA) requirement. The admin portal meets a separate requirement to restrict network access. |
| Running configurations              | The identity service confirms that public users can sign in with a password alone. The firewall shows which networks can reach the admin portal.             |
| News and threat reporting           | Imagine news reports describe credential theft targeting emergency response agencies. The assessor checks whether the reports apply to this agency.          |
| Policies and operating requirements | Patching rules call for a quick fix to the admin portal, while continuity requirements limit service interruptions during a response.                        |
| System documentation and interviews | The system team explains which accounts can change personnel assignments and what a portal outage would disrupt.                                             |

## Connect it to a capability {#security-capabilities-focus}

ACT groups security objectives into **capabilities** which help to meet **high-level mission objectives**. **Manage Credentials and Authentication (CRED)** helps ensure that only authorized users can sign in. **Vulnerability (Patch) Management (VULN)** helps keep systems protected from known vulnerabilities. These capabilities give assessors a way to connect technical evidence to what the system needs to do.

## Use evidence to explain the mission impact {#comprehensive-risk-analysis}

The public portal’s sign-in configuration, relevant threat reporting, and the ability to change assignments point to a risk of disrupted deployment. On the admin portal, the missing patch creates an exposure, but the verified network restrictions limit who can reach it. If patching requires a restart, the assessor weighs the risk of waiting against the risk of interrupting a response.

## Make and document the decision {#risk-based-decision-making-framework}

The team prioritizes MFA on the public portal and works with the system owner to schedule the admin patch around critical operations. It records the sources it relied on, the safeguards it verified, how it handled conflicting requirements, and the risk that remains.

Record the portal finding in the [Security Assessment Findings spreadsheet (C-05)](/templates#collect-evidence) and the risk decision in the [Risk Assessment Risks spreadsheet (C-06)](/templates#analyze-risk).

## Put ACT into practice

### Choose an assessment approach {#assessment-types}

Start with the risk information you already have. Inventory available evidence and identify gaps that could change a decision. If you need fresh evidence about selected requirements, add an optional security assessment. Use both compliance and noncompliance results in the risk assessment.

### Plan your assessment {#getting-started-with-act}

1. Use the [Preliminary Intake Form (P-01)](/templates#plan-the-assessment) to capture the mission, stakeholders, and available evidence. For the disaster response team, that means identifying who depends on the deployment portal and what the team already knows about sign-in and access.
2. Agree with the system team on the assessment boundary and scope. Choose one of ACT’s four levels of assessment rigor based on what the assessment needs to establish.
3. Record those choices in a risk assessment plan, a security assessment plan, or both, depending on the work in scope.

The [planning templates](/templates#plan-the-assessment) include the intake form, assessment plans, and guidance on rigor. The [downloadable ACT Handbook](/templates#handbook-and-fact-sheet) walks through the full process.
