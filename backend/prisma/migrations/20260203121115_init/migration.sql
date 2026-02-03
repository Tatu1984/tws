-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "template" TEXT NOT NULL DEFAULT 'default',
    "order" INTEGER NOT NULL DEFAULT 0,
    "showInNavigation" BOOLEAN NOT NULL DEFAULT true,
    "navigationLabel" TEXT,
    "isHomePage" BOOLEAN NOT NULL DEFAULT false,
    "customCSS" TEXT,
    "customJS" TEXT,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    "headerId" TEXT,
    "footerId" TEXT,
    CONSTRAINT "Page_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Page_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Page_headerId_fkey" FOREIGN KEY ("headerId") REFERENCES "Header" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Page_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'section',
    "blocks" TEXT NOT NULL DEFAULT '[]',
    "style" TEXT NOT NULL DEFAULT '{}',
    "settings" TEXT NOT NULL DEFAULT '{}',
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    CONSTRAINT "Section_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Section_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PageSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "PageSection_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PageSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Header" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "logo" TEXT NOT NULL DEFAULT '{}',
    "navigation" TEXT NOT NULL DEFAULT '[]',
    "ctaButton" TEXT,
    "style" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    CONSTRAINT "Header_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Header_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Footer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "logo" TEXT NOT NULL DEFAULT '{}',
    "description" TEXT,
    "columns" TEXT NOT NULL DEFAULT '[]',
    "socialLinks" TEXT NOT NULL DEFAULT '[]',
    "contactInfo" TEXT NOT NULL DEFAULT '{}',
    "bottomBar" TEXT NOT NULL DEFAULT '{}',
    "style" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    CONSTRAINT "Footer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Footer_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteName" TEXT NOT NULL DEFAULT 'Ten Sparrows',
    "siteDescription" TEXT,
    "logo" TEXT NOT NULL DEFAULT '{}',
    "seo" TEXT NOT NULL DEFAULT '{}',
    "colors" TEXT NOT NULL DEFAULT '{}',
    "typography" TEXT NOT NULL DEFAULT '{}',
    "social" TEXT NOT NULL DEFAULT '{}',
    "contact" TEXT NOT NULL DEFAULT '{}',
    "analytics" TEXT NOT NULL DEFAULT '{}',
    "customCode" TEXT NOT NULL DEFAULT '{}',
    "maintenance" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "updatedById" TEXT,
    CONSTRAINT "SiteSettings_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "caption" TEXT,
    "folder" TEXT NOT NULL DEFAULT 'uploads',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_slug_idx" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_status_order_idx" ON "Page"("status", "order");

-- CreateIndex
CREATE INDEX "Page_showInNavigation_order_idx" ON "Page"("showInNavigation", "order");

-- CreateIndex
CREATE INDEX "Section_type_idx" ON "Section"("type");

-- CreateIndex
CREATE INDEX "Section_isGlobal_idx" ON "Section"("isGlobal");

-- CreateIndex
CREATE INDEX "PageSection_pageId_order_idx" ON "PageSection"("pageId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "PageSection_pageId_sectionId_key" ON "PageSection"("pageId", "sectionId");
