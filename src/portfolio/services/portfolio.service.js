/**
 * portfolio.service.js
 * Service layer for the portfolio bounded context.
 * Provides methods to retrieve domain entities.
 */

import {
  profileData,
  projects,
  certifications
} from '../model/portfolio.model.js';

export const PortfolioService = {
  getProfile() {
    return profileData;
  },

  getFeaturedProjects() {
    return projects.slice(0, 3);
  },

  getAllProjects() {
    return projects;
  },

  getFeaturedCertifications(limit = 5) {
    return certifications.slice(0, limit);
  },

  getAllCertifications() {
    return certifications;
  }
};
