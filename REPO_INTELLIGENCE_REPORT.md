
# InWork Repository Intelligence Report

Generated:
2026-08-02T09:48:07.980432

Repository:
/content/inwork-ai-repo


# Repository Structure

```
  - .env.example
  - .eslintrc.json
  - README.md
  - config
    - payments_and_maps.json
  - content
    - locations
      - ismailia
  - docs
    - ai-engine.md
    - api-spec.md
    - architecture-blueprint.md
    - brand-and-design-system.md
    - coding-guidelines.md
    - database-design.md
    - deployment.md
    - legal-and-disclaimer.md
    - location-system.md
    - payment-flow.md
    - roadmap.md
    - security.md
    - state-management.md
    - tech-stack-master.md
    - testing.md
    - ui-components.md
    - user-stories.md
    - ux-user-journey.md
  - next.config.mjs
  - package-lock.json
  - package.json
  - postcss.config.mjs
  - public
    - manifest.json
  - scripts
    - auto_setup.py
  - src
    - api
      - handler.py
    - app
      - favicon.ico
      - fonts
      - globals.css
      - layout.tsx
      - page.js
      - page.tsx
    - components
      - UserRoleSelector.jsx
    - core
      - config
      - db
    - features
      - orders
    - utils
      - geo_helper.js
  - tailwind.config.ts
  - tsconfig.json
  - vitest.config.ts
```


# Detected Technologies

- Node.js
- TypeScript
- GitHub Actions


# Packages Found

```json
[
  {
    "path": "package.json",
    "name": "inwork-ai-platform",
    "version": "0.1.0",
    "workspaces": [
      "packages/*"
    ],
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    }
  }
]
```


# Workspace Configuration

{
  "path": "package.json",
  "name": "inwork-ai-platform",
  "version": "0.1.0",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}


# Architecture Components

```json
{
  "storage": [
    "node_modules/next/dist/telemetry/storage.d.ts",
    "node_modules/next/dist/telemetry/storage.js",
    "node_modules/next/dist/telemetry/storage.js.map",
    "node_modules/next/dist/server/async-storage/static-generation-async-storage-wrapper.d.ts",
    "node_modules/next/dist/server/async-storage/request-async-storage-wrapper.js",
    "node_modules/next/dist/server/async-storage/async-storage-wrapper.js.map",
    "node_modules/next/dist/server/async-storage/request-async-storage-wrapper.js.map",
    "node_modules/next/dist/server/async-storage/async-storage-wrapper.d.ts",
    "node_modules/next/dist/server/async-storage/async-storage-wrapper.js",
    "node_modules/next/dist/server/async-storage/static-generation-async-storage-wrapper.js.map",
    "node_modules/next/dist/server/async-storage/request-async-storage-wrapper.d.ts",
    "node_modules/next/dist/server/async-storage/static-generation-async-storage-wrapper.js",
    "node_modules/next/dist/client/components/action-async-storage-instance.d.ts",
    "node_modules/next/dist/client/components/request-async-storage-instance.js",
    "node_modules/next/dist/client/components/static-generation-async-storage.external.js",
    "node_modules/next/dist/client/components/request-async-storage.external.d.ts",
    "node_modules/next/dist/client/components/static-generation-async-storage-instance.js",
    "node_modules/next/dist/client/components/action-async-storage.external.js",
    "node_modules/next/dist/client/components/async-local-storage.js.map",
    "node_modules/next/dist/client/components/static-generation-async-storage.external.js.map",
    "node_modules/next/dist/client/components/static-generation-async-storage-instance.js.map",
    "node_modules/next/dist/client/components/request-async-storage.external.js.map",
    "node_modules/next/dist/client/components/request-async-storage-instance.js.map",
    "node_modules/next/dist/client/components/async-local-storage.js",
    "node_modules/next/dist/client/components/action-async-storage-instance.js.map",
    "node_modules/next/dist/client/components/action-async-storage-instance.js",
    "node_modules/next/dist/client/components/action-async-storage.external.js.map",
    "node_modules/next/dist/client/components/action-async-storage.external.d.ts",
    "node_modules/next/dist/client/components/static-generation-async-storage-instance.d.ts",
    "node_modules/next/dist/client/components/static-generation-async-storage.external.d.ts",
    "node_modules/next/dist/client/components/request-async-storage.external.js",
    "node_modules/next/dist/client/components/async-local-storage.d.ts",
    "node_modules/next/dist/client/components/request-async-storage-instance.d.ts",
    "node_modules/next/dist/esm/server/async-storage/request-async-storage-wrapper.js",
    "node_modules/next/dist/esm/server/async-storage/async-storage-wrapper.js.map",
    "node_modules/next/dist/esm/server/async-storage/request-async-storage-wrapper.js.map",
    "node_modules/next/dist/esm/server/async-storage/async-storage-wrapper.js",
    "node_modules/next/dist/esm/server/async-storage/static-generation-async-storage-wrapper.js.map",
    "node_modules/next/dist/esm/server/async-storage/static-generation-async-storage-wrapper.js",
    "node_modules/next/dist/esm/client/components/request-async-storage-instance.js",
    "node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js",
    "node_modules/next/dist/esm/client/components/static-generation-async-storage-instance.js",
    "node_modules/next/dist/esm/client/components/action-async-storage.external.js",
    "node_modules/next/dist/esm/client/components/async-local-storage.js.map",
    "node_modules/next/dist/esm/client/components/static-generation-async-storage.external.js.map",
    "node_modules/next/dist/esm/client/components/static-generation-async-storage-instance.js.map",
    "node_modules/next/dist/esm/client/components/request-async-storage.external.js.map",
    "node_modules/next/dist/esm/client/components/request-async-storage-instance.js.map",
    "node_modules/next/dist/esm/client/components/async-local-storage.js",
    "node_modules/next/dist/esm/client/components/action-async-storage-instance.js.map"
  ],
  "repository": [],
  "usecase": [],
  "use-case": [],
  "domain": [
    "node_modules/next/dist/client/detect-domain-locale.js",
    "node_modules/next/dist/client/get-domain-locale.js",
    "node_modules/next/dist/client/detect-domain-locale.js.map",
    "node_modules/next/dist/client/get-domain-locale.d.ts",
    "node_modules/next/dist/client/detect-domain-locale.d.ts",
    "node_modules/next/dist/client/get-domain-locale.js.map",
    "node_modules/next/dist/esm/client/detect-domain-locale.js",
    "node_modules/next/dist/esm/client/get-domain-locale.js",
    "node_modules/next/dist/esm/client/detect-domain-locale.js.map",
    "node_modules/next/dist/esm/client/get-domain-locale.js.map",
    "node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js",
    "node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js.map",
    "node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js",
    "node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js.map",
    "node_modules/next/dist/shared/lib/i18n/detect-domain-locale.d.ts",
    "node_modules/@types/node/domain.d.ts"
  ],
  "aggregate": [],
  "event": [
    "node_modules/jsx-ast-utils/eventHandlers.js",
    "node_modules/jsx-ast-utils/eventHandlersByType.js",
    "node_modules/undici-types/eventsource.d.ts",
    "node_modules/axios/lib/helpers/progressEventReducer.js",
    "node_modules/react-hook-form/dist/types/events.d.ts",
    "node_modules/react-hook-form/dist/types/events.d.ts.map",
    "node_modules/react-hook-form/dist/logic/getEventValue.d.ts",
    "node_modules/react-hook-form/dist/logic/getEventValue.d.ts.map",
    "node_modules/next/dist/server/web/spec-extension/fetch-event.js.map",
    "node_modules/next/dist/server/web/spec-extension/fetch-event.js",
    "node_modules/next/dist/server/web/spec-extension/fetch-event.d.ts",
    "node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js.map",
    "node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js",
    "node_modules/next/dist/compiled/events/events.js",
    "node_modules/next/dist/compiled/@edge-runtime/primitives/events.js.text.js",
    "node_modules/next/dist/compiled/@edge-runtime/primitives/events.d.ts",
    "node_modules/next/dist/compiled/@edge-runtime/primitives/events.js.LEGAL.txt",
    "node_modules/eslint-plugin-jsx-a11y/docs/rules/mouse-events-have-key-events.md",
    "node_modules/eslint-plugin-jsx-a11y/docs/rules/click-events-have-key-events.md",
    "node_modules/eslint-plugin-jsx-a11y/lib/rules/mouse-events-have-key-events.js",
    "node_modules/eslint-plugin-jsx-a11y/lib/rules/click-events-have-key-events.js",
    "node_modules/eslint-plugin-jsx-a11y/__tests__/src/rules/mouse-events-have-key-events-test.js",
    "node_modules/eslint-plugin-jsx-a11y/__tests__/src/rules/click-events-have-key-events-test.js",
    "node_modules/jsx-ast-utils/lib/eventHandlers.js",
    "node_modules/jsx-ast-utils/src/eventHandlers.js",
    "node_modules/jsx-ast-utils/__tests__/src/eventHandlers-test.js",
    "node_modules/caniuse-lite/data/features/pointer-events.js",
    "node_modules/caniuse-lite/data/features/eventsource.js",
    "node_modules/caniuse-lite/data/features/keyboardevent-location.js",
    "node_modules/caniuse-lite/data/features/keyboardevent-key.js",
    "node_modules/caniuse-lite/data/features/addeventlistener.js",
    "node_modules/caniuse-lite/data/features/focusin-focusout-events.js",
    "node_modules/caniuse-lite/data/features/page-transition-events.js",
    "node_modules/caniuse-lite/data/features/input-event.js",
    "node_modules/caniuse-lite/data/features/keyboardevent-which.js",
    "node_modules/caniuse-lite/data/features/passive-event-listener.js",
    "node_modules/caniuse-lite/data/features/keyboardevent-getmodifierstate.js",
    "node_modules/caniuse-lite/data/features/customevent.js",
    "node_modules/caniuse-lite/data/features/dispatchevent.js",
    "node_modules/caniuse-lite/data/features/once-event-listener.js",
    "node_modules/caniuse-lite/data/features/keyboardevent-charcode.js",
    "node_modules/caniuse-lite/data/features/keyboardevent-code.js",
    "node_modules/caniuse-lite/data/features/mutation-events.js",
    "node_modules/eslint/lib/linter/node-event-generator.js",
    "node_modules/leaflet/src/core/Events.js",
    "node_modules/leaflet/src/core/Events.leafdoc",
    "node_modules/leaflet/src/dom/DomEvent.Pointer.js",
    "node_modules/leaflet/src/dom/DomEvent.js",
    "node_modules/leaflet/src/dom/DomEvent.DoubleTap.js",
    "node_modules/@react-leaflet/core/lib/events.d.ts"
  ],
  "queue": [
    "node_modules/fastq/queue.js",
    "node_modules/next/dist/client/components/promise-queue.d.ts",
    "node_modules/next/dist/client/components/promise-queue.js",
    "node_modules/next/dist/client/components/promise-queue.js.map",
    "node_modules/next/dist/client/components/promise-queue.test.d.ts",
    "node_modules/next/dist/esm/client/components/promise-queue.js",
    "node_modules/next/dist/esm/client/components/promise-queue.js.map",
    "node_modules/next/dist/esm/shared/lib/router/action-queue.js.map",
    "node_modules/next/dist/esm/shared/lib/router/action-queue.js",
    "node_modules/next/dist/shared/lib/router/action-queue.js.map",
    "node_modules/next/dist/shared/lib/router/action-queue.js",
    "node_modules/next/dist/shared/lib/router/action-queue.d.ts"
  ],
  "lock": [
    "package-lock.json",
    "node_modules/.package-lock.json",
    "node_modules/uri-js/yarn.lock",
    "node_modules/combined-stream/yarn.lock",
    "node_modules/next/dist/lib/patch-incorrect-lockfile.js.map",
    "node_modules/next/dist/lib/patch-incorrect-lockfile.d.ts",
    "node_modules/next/dist/lib/patch-incorrect-lockfile.js",
    "node_modules/next/dist/server/lib/router-utils/block-cross-site.js.map",
    "node_modules/next/dist/server/lib/router-utils/block-cross-site.d.ts",
    "node_modules/next/dist/server/lib/router-utils/block-cross-site.js",
    "node_modules/next/dist/client/components/react-dev-overlay/internal/components/Overlay/body-locker.d.ts",
    "node_modules/next/dist/client/components/react-dev-overlay/internal/components/Overlay/body-locker.js",
    "node_modules/next/dist/client/components/react-dev-overlay/internal/components/Overlay/body-locker.js.map",
    "node_modules/next/dist/esm/lib/patch-incorrect-lockfile.js.map",
    "node_modules/next/dist/esm/lib/patch-incorrect-lockfile.js",
    "node_modules/next/dist/esm/server/lib/router-utils/block-cross-site.js.map",
    "node_modules/next/dist/esm/server/lib/router-utils/block-cross-site.js",
    "node_modules/next/dist/esm/client/components/react-dev-overlay/internal/components/Overlay/body-locker.js",
    "node_modules/next/dist/esm/client/components/react-dev-overlay/internal/components/Overlay/body-locker.js.map",
    "node_modules/next/dist/compiled/babel/core-lib-block-hoist-plugin.js",
    "node_modules/lucide-react/dist/esm/icons/clock-11.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/clock-arrow-down.mjs",
    "node_modules/lucide-react/dist/esm/icons/file-clock.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/clock-arrow-down.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/alarm-clock-check.mjs",
    "node_modules/lucide-react/dist/esm/icons/clock-alert.mjs",
    "node_modules/lucide-react/dist/esm/icons/clock-arrow-left.mjs",
    "node_modules/lucide-react/dist/esm/icons/earth-lock.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/user-lock.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/lock-keyhole-open.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/clock-fading.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/folder-lock.mjs",
    "node_modules/lucide-react/dist/esm/icons/rotate-ccw-clock.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/clock-10.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/unlock.mjs",
    "node_modules/lucide-react/dist/esm/icons/alarm-clock-plus.mjs",
    "node_modules/lucide-react/dist/esm/icons/clock-12.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/clock-check.mjs",
    "node_modules/lucide-react/dist/esm/icons/globe-lock.mjs",
    "node_modules/lucide-react/dist/esm/icons/calendar-clock.mjs",
    "node_modules/lucide-react/dist/esm/icons/clock-8.mjs",
    "node_modules/lucide-react/dist/esm/icons/clock-7.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/clock-arrow-right.mjs",
    "node_modules/lucide-react/dist/esm/icons/earth-lock.mjs",
    "node_modules/lucide-react/dist/esm/icons/message-square-lock.mjs",
    "node_modules/lucide-react/dist/esm/icons/alarm-clock-off.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/door-closed-locked.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/clock-1.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/clock-arrow-left.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/clock-3.mjs.map"
  ],
  "cache": [
    "node_modules/eslint-module-utils/ModuleCache.d.ts",
    "node_modules/eslint-module-utils/ModuleCache.js",
    "node_modules/next/cache.js",
    "node_modules/next/cache.d.ts",
    "node_modules/undici-types/cache.d.ts",
    "node_modules/file-entry-cache/cache.js",
    "node_modules/semver/internal/lrucache.js",
    "node_modules/tailwind-merge/src/lib/lru-cache.ts",
    "node_modules/@tanstack/react-query/build/codemods/src/utils/transformers/query-cache-transformer.cjs",
    "node_modules/@tanstack/query-core/src/mutationCache.ts",
    "node_modules/@tanstack/query-core/src/queryCache.ts",
    "node_modules/@tanstack/query-core/build/modern/mutationCache.cjs.map",
    "node_modules/@tanstack/query-core/build/modern/queryCache.js",
    "node_modules/@tanstack/query-core/build/modern/queryCache.cjs",
    "node_modules/@tanstack/query-core/build/modern/mutationCache.js.map",
    "node_modules/@tanstack/query-core/build/modern/mutationCache.d.ts",
    "node_modules/@tanstack/query-core/build/modern/mutationCache.d.cts",
    "node_modules/@tanstack/query-core/build/modern/queryCache.d.ts",
    "node_modules/@tanstack/query-core/build/modern/queryCache.js.map",
    "node_modules/@tanstack/query-core/build/modern/mutationCache.cjs",
    "node_modules/@tanstack/query-core/build/modern/mutationCache.js",
    "node_modules/@tanstack/query-core/build/modern/queryCache.d.cts",
    "node_modules/@tanstack/query-core/build/modern/queryCache.cjs.map",
    "node_modules/@tanstack/query-core/build/legacy/mutationCache.cjs.map",
    "node_modules/@tanstack/query-core/build/legacy/queryCache.js",
    "node_modules/@tanstack/query-core/build/legacy/queryCache.cjs",
    "node_modules/@tanstack/query-core/build/legacy/mutationCache.js.map",
    "node_modules/@tanstack/query-core/build/legacy/mutationCache.d.ts",
    "node_modules/@tanstack/query-core/build/legacy/mutationCache.d.cts",
    "node_modules/@tanstack/query-core/build/legacy/queryCache.d.ts",
    "node_modules/@tanstack/query-core/build/legacy/queryCache.js.map",
    "node_modules/@tanstack/query-core/build/legacy/mutationCache.cjs",
    "node_modules/@tanstack/query-core/build/legacy/mutationCache.js",
    "node_modules/@tanstack/query-core/build/legacy/queryCache.d.cts",
    "node_modules/@tanstack/query-core/build/legacy/queryCache.cjs.map",
    "node_modules/tailwindcss/lib/lib/cacheInvalidation.js",
    "node_modules/tailwindcss/src/lib/cacheInvalidation.js",
    "node_modules/next/dist/lib/with-promise-cache.d.ts",
    "node_modules/next/dist/lib/with-promise-cache.js.map",
    "node_modules/next/dist/lib/with-promise-cache.js",
    "node_modules/next/dist/server/lib/incremental-cache-server.d.ts",
    "node_modules/next/dist/server/lib/incremental-cache-server.js.map",
    "node_modules/next/dist/server/lib/incremental-cache-server.js",
    "node_modules/next/dist/server/future/route-matcher-providers/dev/file-cache-route-matcher-provider.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/dev/file-cache-route-matcher-provider.js",
    "node_modules/next/dist/server/future/route-matcher-providers/dev/file-cache-route-matcher-provider.js.map",
    "node_modules/next/dist/server/future/route-matcher-providers/helpers/cached-route-matcher-provider.js.map",
    "node_modules/next/dist/server/future/route-matcher-providers/helpers/cached-route-matcher-provider.js",
    "node_modules/next/dist/server/future/route-matcher-providers/helpers/cached-route-matcher-provider.d.ts",
    "node_modules/next/dist/server/lib/incremental-cache/file-system-cache.d.ts"
  ],
  "provider": [
    "node_modules/@tanstack/react-query/src/QueryClientProvider.tsx",
    "node_modules/@tanstack/react-query/src/IsRestoringProvider.ts",
    "node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js",
    "node_modules/@tanstack/react-query/build/modern/QueryClientProvider.cjs",
    "node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.d.cts",
    "node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js.map",
    "node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.cjs.map",
    "node_modules/@tanstack/react-query/build/modern/QueryClientProvider.d.ts",
    "node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js",
    "node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.cjs",
    "node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.d.ts",
    "node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js.map",
    "node_modules/@tanstack/react-query/build/modern/QueryClientProvider.d.cts",
    "node_modules/@tanstack/react-query/build/modern/QueryClientProvider.cjs.map",
    "node_modules/@tanstack/react-query/build/legacy/QueryClientProvider.js",
    "node_modules/@tanstack/react-query/build/legacy/QueryClientProvider.cjs",
    "node_modules/@tanstack/react-query/build/legacy/IsRestoringProvider.d.cts",
    "node_modules/@tanstack/react-query/build/legacy/IsRestoringProvider.js.map",
    "node_modules/@tanstack/react-query/build/legacy/IsRestoringProvider.cjs.map",
    "node_modules/@tanstack/react-query/build/legacy/QueryClientProvider.d.ts",
    "node_modules/@tanstack/react-query/build/legacy/IsRestoringProvider.js",
    "node_modules/@tanstack/react-query/build/legacy/IsRestoringProvider.cjs",
    "node_modules/@tanstack/react-query/build/legacy/IsRestoringProvider.d.ts",
    "node_modules/@tanstack/react-query/build/legacy/QueryClientProvider.js.map",
    "node_modules/@tanstack/react-query/build/legacy/QueryClientProvider.d.cts",
    "node_modules/@tanstack/react-query/build/legacy/QueryClientProvider.cjs.map",
    "node_modules/next/dist/server/async-storage/draft-mode-provider.js",
    "node_modules/next/dist/server/async-storage/draft-mode-provider.d.ts",
    "node_modules/next/dist/server/async-storage/draft-mode-provider.js.map",
    "node_modules/next/dist/server/future/helpers/i18n-provider.d.ts",
    "node_modules/next/dist/server/future/helpers/i18n-provider.js",
    "node_modules/next/dist/server/future/helpers/i18n-provider.js.map",
    "node_modules/next/dist/server/future/helpers/i18n-provider.test.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/pages-route-matcher-provider.test.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/manifest-route-matcher-provider.js",
    "node_modules/next/dist/server/future/route-matcher-providers/pages-api-route-matcher-provider.test.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/route-matcher-provider.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/app-route-route-matcher-provider.test.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/app-route-route-matcher-provider.js.map",
    "node_modules/next/dist/server/future/route-matcher-providers/pages-api-route-matcher-provider.js",
    "node_modules/next/dist/server/future/route-matcher-providers/app-route-route-matcher-provider.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/app-page-route-matcher-provider.test.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/route-matcher-provider.js",
    "node_modules/next/dist/server/future/route-matcher-providers/app-page-route-matcher-provider.js.map",
    "node_modules/next/dist/server/future/route-matcher-providers/app-route-route-matcher-provider.js",
    "node_modules/next/dist/server/future/route-matcher-providers/manifest-route-matcher-provider.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/manifest-route-matcher-provider.js.map",
    "node_modules/next/dist/server/future/route-matcher-providers/pages-route-matcher-provider.d.ts",
    "node_modules/next/dist/server/future/route-matcher-providers/pages-route-matcher-provider.js",
    "node_modules/next/dist/server/future/route-matcher-providers/pages-route-matcher-provider.js.map"
  ],
  "di": [
    ".git/COMMIT_EDITMSG",
    "docs/legal-and-disclaimer.md",
    "docs/coding-guidelines.md",
    ".github/workflows/security-audit.yml",
    "node_modules/object.fromentries/.editorconfig",
    "node_modules/side-channel-weakmap/.editorconfig",
    "node_modules/is-typed-array/.editorconfig",
    "node_modules/regexp.prototype.flags/.editorconfig",
    "node_modules/is-data-view/.editorconfig",
    "node_modules/eslint-module-utils/pkgDir.d.ts",
    "node_modules/eslint-module-utils/pkgDir.js",
    "node_modules/is-regex/.editorconfig",
    "node_modules/side-channel-list/.editorconfig",
    "node_modules/string.prototype.matchall/.editorconfig",
    "node_modules/which-typed-array/.editorconfig",
    "node_modules/didyoumean/didYouMean-1.2.1.min.js",
    "node_modules/didyoumean/didYouMean-1.2.1.js",
    "node_modules/which-boxed-primitive/.editorconfig",
    "node_modules/side-channel/.editorconfig",
    "node_modules/internal-slot/.editorconfig",
    "node_modules/is-boolean-object/.editorconfig",
    "node_modules/define-properties/.editorconfig",
    "node_modules/array.prototype.flat/.editorconfig",
    "node_modules/functions-have-names/.editorconfig",
    "node_modules/object.assign/.editorconfig",
    "node_modules/function.prototype.name/.editorconfig",
    "node_modules/for-each/.editorconfig",
    "node_modules/object.entries/.editorconfig",
    "node_modules/is-weakmap/.editorconfig",
    "node_modules/is-set/.editorconfig",
    "node_modules/string.prototype.trimstart/.editorconfig",
    "node_modules/arraybuffer.prototype.slice/.editorconfig",
    "node_modules/is-map/.editorconfig",
    "node_modules/zustand/traditional.d.ts",
    "node_modules/zustand/traditional.js",
    "node_modules/is-symbol/.editorconfig",
    "node_modules/es-abstract/.editorconfig",
    "node_modules/string.prototype.repeat/.editorconfig",
    "node_modules/object-keys/.editorconfig",
    "node_modules/unbox-primitive/.editorconfig",
    "node_modules/string.prototype.includes/.editorconfig",
    "node_modules/is-negative-zero/.editorconfig",
    "node_modules/object.values/.editorconfig",
    "node_modules/is-number-object/.editorconfig",
    "node_modules/resolve/.editorconfig",
    "node_modules/is-date-object/.editorconfig",
    "node_modules/string.prototype.trimend/.editorconfig",
    "node_modules/undici-types/dispatcher.d.ts",
    "node_modules/undici-types/diagnostics-channel.d.ts",
    "node_modules/undici-types/global-dispatcher.d.ts"
  ],
  "container": [
    "node_modules/postcss-selector-parser/dist/selectors/container.js",
    "node_modules/react-leaflet/lib/MapContainer.d.ts",
    "node_modules/react-leaflet/lib/MapContainer.js",
    "node_modules/next/node_modules/postcss/lib/container.js",
    "node_modules/next/node_modules/postcss/lib/container.d.ts",
    "node_modules/eslint-plugin-jsx-a11y/__mocks__/JSXExpressionContainerMock.js",
    "node_modules/lucide-react/dist/esm/icons/container.mjs.map",
    "node_modules/lucide-react/dist/esm/icons/container.mjs",
    "node_modules/caniuse-lite/data/features/css-container-query-units.js",
    "node_modules/caniuse-lite/data/features/css-container-queries.js",
    "node_modules/caniuse-lite/data/features/css-container-queries-style.js",
    "node_modules/postcss/lib/container.js",
    "node_modules/postcss/lib/container.d.ts",
    "node_modules/axobject-query/lib/etc/objects/TableHeaderContainerRole.js"
  ]
}
```


# TypeScript Files Count

Total: 4

tailwind.config.ts
vitest.config.ts
src/core/db/github-api.ts
src/features/orders/tests/order-concurrency.race.test.ts


# Internal Imports

@edge-runtime/primitives
@edge-runtime/primitives/load
@fastify/busboy
@inwork/storage-engine
@inwork/storage-engine/dist/providers/InMemoryStorageProvider.js
@jest/types
@jridgewell/resolve-uri
@jridgewell/sourcemap-codec
@jridgewell/trace-mapping
@next/env
@nodelib/fs.scandir
@nodelib/fs.stat
@nodelib/fs.walk
@opentelemetry/api
@playwright/test
@react-leaflet/core
@react-native-async-storage/async-storage
@supabase/auth-js
@supabase/functions-js
@supabase/phoenix
@supabase/postgrest-js
@supabase/realtime-js
@supabase/storage-js
@supabase/supabase-js
@supabase/supabase-js/cors
@supabase/tracing
@swc/core
@tanstack/query-core
@tanstack/react-query
@typescript-eslint/project-service
@typescript-eslint/scope-manager
@typescript-eslint/type-utils
@typescript-eslint/types
@typescript-eslint/typescript-estree
@typescript-eslint/utils
@typescript-eslint/utils/ast-utils
@typescript-eslint/utils/ts-eslint
@typescript-eslint/visitor-keys
@vercel/og


# Git Status

```
 M package-lock.json
 M package.json
?? src/features/
?? vitest.config.ts

```


# Dependency Lock Files

package-lock.json
