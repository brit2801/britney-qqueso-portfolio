<script setup>
import { PortfolioService } from '../services/portfolio.service.js';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const { t } = useI18n();
const profile = PortfolioService.getProfile();
</script>

<template>
  <section id="contact" class="contact-section section" aria-labelledby="contact-heading">
    <div class="container">
      <div class="reveal contact-content">
        <div class="contact-avatar">
          <img
            src="/assets/profile-photo.png"
            alt="Britney Qqueso Rodriguez"
            class="avatar-img"
          />
        </div>

        <h2 id="contact-heading" class="contact-name">{{ profile.fullName }}</h2>
        <p class="contact-role">{{ t.role }}</p>

        <p class="contact-label">{{ t.contactGetInTouch }}</p>
        <a
          :href="`mailto:${profile.email}`"
          class="contact-email"
          :aria-label="`Send email to ${profile.email}`"
        >
          {{ profile.email }}
        </a>

        <div class="contact-socials" role="list" aria-label="Social media links">
          <a
            :href="profile.social.linkedin"
            target="_blank"
            rel="noopener"
            class="social-btn"
            aria-label="LinkedIn profile"
            role="listitem"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a
            :href="profile.social.github"
            target="_blank"
            rel="noopener"
            class="social-btn"
            aria-label="GitHub profile"
            role="listitem"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

          <a
            :href="`tel:${profile.phone}`"
            class="social-btn"
            aria-label="Phone number"
            role="listitem"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 3.5rem 2rem;
  text-align: center;
}

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.25rem;
  border: 2px solid var(--border);
  transition: border-color 0.3s;
}

.contact-avatar:hover {
  border-color: var(--cyan);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.contact-name {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-1);
  margin-bottom: 0.15rem;
}

.contact-role {
  font-size: 0.95rem;
  color: var(--text-2);
  margin-bottom: 1.5rem;
}

.contact-label {
  font-size: 0.88rem;
  color: var(--text-3);
  margin-bottom: 0.3rem;
}

.contact-email {
  font-family: var(--font-mono);
  font-size: 0.92rem;
  color: var(--cyan);
  transition: color 0.2s;
}

.contact-email:hover {
  color: var(--teal);
}

.contact-socials {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.social-btn {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
  color: var(--text-3);
}

.social-btn:hover {
  border-color: var(--border-hover);
  color: var(--text-1);
  transform: translateY(-2px);
}

.social-btn svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 480px) {
  .contact-section {
    padding: 4rem 1.25rem;
  }
}
</style>
