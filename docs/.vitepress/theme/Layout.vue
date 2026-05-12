<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <div class="custom-footer">
        <div class="footer-links">
          <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
          <span class="footer-separator">&bull;</span>
          <a href="/terms-of-use" class="footer-link">Terms of Use</a>
        </div>
        <p class="footer-message">
          MITRE Adaptive Capabilities Testing (MITRE ACT) is a trademark of The MITRE Corporation. Released under the Apache 2.0 License.
        </p>
        <p class="footer-copyright">
          Copyright &copy; 2026 The MITRE Corporation
        </p>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.custom-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.footer-links {
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.footer-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.footer-separator {
  margin: 0 0.75rem;
  color: var(--vp-c-text-3);
}

.footer-message,
.footer-copyright {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 0.5rem 0;
}
</style>
