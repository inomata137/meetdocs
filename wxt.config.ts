import tailwindcss from '@tailwindcss/vite'
import { type UserManifestFn, defineConfig, defineWebExtConfig } from 'wxt'

const webExtConfig = defineWebExtConfig({
  disabled: true
})

const manifest: UserManifestFn = (env) => ({
  name: env.mode === 'production' ? 'MeetDocs' : 'MeetDocs (Dev)',
  description: 'Easy access to attached resources from Google Meet',
  version: '1.0',
  manifest_version: 3,
  oauth2: {
    client_id: import.meta.env.WXT_GOOGLE_OAUTH_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly']
  },
  permissions: ['tabs', 'identity']
})

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()]
  }),
  webExt: webExtConfig,
  manifest
})
