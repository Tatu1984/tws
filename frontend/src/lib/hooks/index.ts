// Auth hooks
export {
  useAuthInit,
  useRequireAuth,
  useRedirectIfAuthenticated,
  useAuthStore,
  useHasRole,
  useIsAdmin,
  useCanEdit,
} from './useAuth';

// Pages hooks
export {
  pageKeys,
  usePages,
  usePage,
  useCreatePage,
  useUpdatePage,
  useDeletePage,
  useDuplicatePage,
  usePublishPage,
  useUnpublishPage,
  useReorderSections,
  useAddSectionToPage,
  useRemoveSectionFromPage,
} from './usePages';

// Sections hooks
export {
  sectionKeys,
  useSections,
  useReusableSections,
  useGlobalSections,
  useSection,
  useCreateSection,
  useUpdateSection,
  useDeleteSection,
  useAddBlock,
  useUpdateBlock,
  useDeleteBlock,
  useReorderBlocks,
} from './useSections';

// Headers hooks
export {
  headerKeys,
  useHeaders,
  useDefaultHeader,
  useHeader,
  useCreateHeader,
  useUpdateHeader,
  useDeleteHeader,
  useSetDefaultHeader,
} from './useHeaders';

// Footers hooks
export {
  footerKeys,
  useFooters,
  useDefaultFooter,
  useFooter,
  useCreateFooter,
  useUpdateFooter,
  useDeleteFooter,
  useSetDefaultFooter,
} from './useFooters';

// Media hooks
export {
  mediaKeys,
  useMedia,
  useImages,
  useMediaFolders,
  useMediaItem,
  useUploadMedia,
  useUploadMultipleMedia,
  useUpdateMedia,
  useDeleteMedia,
  useDeleteMultipleMedia,
} from './useMedia';

// Settings hooks
export {
  settingsKeys,
  useSiteSettings,
  useUpdateSiteSettings,
  useUpdateSettingsSection,
} from './useSettings';

// Users hooks
export {
  userKeys,
  useUsers,
  useUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useToggleUserActive,
  useChangeUserRole,
} from './useUsers';
