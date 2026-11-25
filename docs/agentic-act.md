---
title: Agentic ACT
description: Agentic ACT is in active development to help risk assessors review evidence and draft traceable risk statements. Release planned for 2027.
---

# Agentic ACT

Agentic ACT (AACT) is an AI-assisted tool built around the MITRE ACT assessment process. It is in active development, with release planned for 2027. Its goal is to give risk assessors more time for analysis by speeding up the work of organizing, comparing, and summarizing evidence.

## From evidence to a draft risk statement

AACT is designed to review sources such as system documentation, vulnerability scan results, and interview notes. It connects related evidence and drafts plain-language risk statements that assessors can trace back to their sources.

![Agentic ACT workflow. Ingest evidence, build a knowledge graph, retrieve and reason over evidence, generate risk insights, then send them for human review and approval.](/images/AACT-workflow.png)

In the [disaster response example](/introduction/how-act-works), AACT could bring together controls assessment results, running configurations, and threat reporting with interviews about how the portal supports personnel deployment. It could then draft a risk statement about unauthorized access disrupting that work, with links to the evidence. The assessor checks that the evidence is current and relevant before approving or revising the draft.

## Assessors direct the work

Risk assessors guide the analysis, verify the evidence, and revise or approve draft risk statements. They use their knowledge of the system and its mission to explain what the evidence means. The responsible decision-makers decide how to respond and which risks to accept.

## LLM backend that works for you

AACT is designed to support on-device models, organization-hosted models, and commercial model services. Teams can choose models for different analysis steps based on their needs and security requirements.

## Use ACT today

Learn [the ACT process](/introduction/) or see [which manual templates document the portal finding and risk](/templates#record-the-portal-finding-and-risk).
