<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'

const { Layout } = DefaultTheme

function showCookiePreferences() {
  if (typeof window !== 'undefined' && (window as any).Osano?.cm) {
    (window as any).Osano.cm.showDrawer('osano-cm-dom-info-dialog-open')
  }
}

onMounted(() => {
  const manageCookiesLink = document.querySelector('a.manage-cookies')
  if (manageCookiesLink) {
    manageCookiesLink.addEventListener('click', (e) => {
      e.preventDefault()
      showCookiePreferences()
    })
  }
})
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <footer class="custom-footer">
        <div class="footer-links">
          <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
          <span class="footer-separator">&bull;</span>
          <a href="/terms-of-use" class="footer-link">Terms of Use</a>
          <span class="footer-separator">&bull;</span>
          <a href="javascript:void(0)" class="footer-link manage-cookies">Manage Cookies</a>
        </div>
        <p class="footer-message">
          MITRE Adaptive Capabilities Testing (MITRE ACT) is a trademark of The MITRE Corporation. Released under the Apache 2.0 License.
        </p>
        <p class="footer-copyright">
          Copyright &copy; 2026 The MITRE Corporation
        </p>
      </footer>
    </template>
  </Layout>
</template>

<style scoped>
.custom-footer {
  padding: 2rem 1.5rem;
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
