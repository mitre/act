---
title: How ACT Works
description: See how ACT connects compliance results, running configurations, and other risk information to decisions about mission risk.
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

See [the process templates](/templates#record-the-portal-finding-and-risk) or read [ACT in Practice](/introduction/act-in-practice) for real-world examples.
