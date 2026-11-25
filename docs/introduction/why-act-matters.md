---
title: Why ACT Matters
description: See how ACT uses evidence and mission context to decide what to address first and what risk to accept.
outline: 2
---

# Why ACT Matters

## The Problem

A compliance assessment only shows which existing requirements a system meets and fails, but it doesn't understand or consider the context and impact of compliance or non-compliance. ACT considers all of your compliance assessment results alongside other operational evidence, changes in the threat environment, and other available context. That gives decision-makers a strong and defendable basis for deciding what puts the mission at risk, which compliance issues to address, and which resulting risks to accept.

## A Medical Example

### What the doctor found

<div class="example-intro">
  <img src="/images/clipboard-medical.png" alt="" width="277" height="351" loading="lazy" />
  <p>Imagine a medical assessment that flags elevated cholesterol and an unexpected result on a shoulder scan. You also tell your doctor that recurring foot pain makes it hard to keep up with your child and train for a half-marathon.</p>
</div>

### What happens when everything is urgent

The doctor treats every flagged result as equally urgent and orders follow-up tests and specialist visits for all of them. Those appointments take time and money, and the foot pain that limits your daily activities has to compete for attention.

### What ACT prioritizes

**Address the foot pain first so you can stay active and train for the race.** In this example, the doctor weighs the other findings against your health history and discusses which need follow-up and when. You leave with a plan that reflects both your health risks and what you want to be able to do.

## A Cybersecurity Example

### What the compliance assessors found

<div class="example-intro">
  <img src="/images/clipboard-cyber.png" alt="" width="294" height="349" loading="lazy" />
  <p>A federal agency system supports disaster response coordination. A routine security controls assessment identifies 137 findings, including missing multifactor authentication (MFA) on a public-facing personnel deployment portal, a missing patch on a restricted admin portal, and a default SNMP configuration on a decommissioned interface.</p>
</div>

### What happens when everything is urgent

The Authorizing Official asks the team to fix all 137 findings immediately. The team restarts servers during business hours and disables services that still supply data feeds. When an emergency hits, those disruptions delay coordination.

### What ACT prioritizes

**Secure the public-facing portal first to protect personnel deployment during disaster response.** The team confirms how users sign in and considers who is targeting similar organizations. The admin portal meets its network access requirement, and the running firewall configuration confirms that safeguard. The team schedules the patch around emergency operations. It also verifies that the decommissioned interface is unreachable before the Authorizing Official accepts its remaining risk.

## What ACT changes

1. Use all relevant risk information to explain what could disrupt the mission and which safeguards are working.
2. Prioritize risks by how likely they are and how much they could affect the mission. Give decision-makers options with clear costs and trade-offs.
3. Record what will be addressed, what risk will be accepted, and why.

[How ACT Works](/introduction/how-act-works) explains how teams carry out these steps.

<style scoped>
.example-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 140px;
  align-items: center;
  gap: 1rem 1.25rem;
  margin-block: 1rem;
}

.example-intro img {
  grid-column: 2;
  grid-row: 1;
  width: 140px;
  height: auto;
}

.example-intro p {
  grid-column: 1;
  grid-row: 1;
  margin: 0;
}

@media (max-width: 640px) {
  .example-intro {
    grid-template-columns: minmax(0, 1fr);
  }

  .example-intro img {
    grid-column: 1;
    justify-self: center;
  }

  .example-intro p {
    grid-row: 2;
  }
}
</style>
