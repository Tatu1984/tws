import { apiClient } from './client';
import type { Page, PageWithPopulatedSections, Header, Footer, SiteSettings } from '../types';

export interface PublicPagesResponse {
  success: boolean;
  data: Page[];
}

export interface PublicPageResponse {
  success: boolean;
  data: PageWithPopulatedSections;
}

export interface PublicHeaderResponse {
  success: boolean;
  data: Header;
}

export interface PublicFooterResponse {
  success: boolean;
  data: Footer;
}

export interface PublicSettingsResponse {
  success: boolean;
  data: SiteSettings;
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavigationItem[];
}

export interface PublicNavigationResponse {
  success: boolean;
  data: NavigationItem[];
}

// Public API (no authentication required)
export const publicApi = {
  // Get published pages
  async getPages(): Promise<Page[]> {
    const response = await apiClient.get<PublicPagesResponse>('/public/pages');
    return response.data.data;
  },

  // Get published page by slug
  async getPageBySlug(slug: string): Promise<PageWithPopulatedSections> {
    const response = await apiClient.get<PublicPageResponse>(`/public/pages/${slug}`);
    return response.data.data;
  },

  // Get navigation menu (pages set to show in navigation)
  async getNavigation(): Promise<NavigationItem[]> {
    const response = await apiClient.get<PublicNavigationResponse>('/public/navigation');
    return response.data.data;
  },

  // Get active/default header
  async getHeader(): Promise<Header> {
    const response = await apiClient.get<PublicHeaderResponse>('/public/header');
    return response.data.data;
  },

  // Get active/default footer
  async getFooter(): Promise<Footer> {
    const response = await apiClient.get<PublicFooterResponse>('/public/footer');
    return response.data.data;
  },

  // Get site settings (public portion)
  async getSiteSettings(): Promise<SiteSettings> {
    const response = await apiClient.get<PublicSettingsResponse>('/public/site-settings');
    return response.data.data;
  },

  // Get home page
  async getHomePage(): Promise<PageWithPopulatedSections | null> {
    try {
      const pages = await this.getPages();
      const homePage = pages.find((p) => p.isHomePage);
      if (homePage) {
        return this.getPageBySlug(homePage.slug);
      }
      return null;
    } catch {
      return null;
    }
  },
};
