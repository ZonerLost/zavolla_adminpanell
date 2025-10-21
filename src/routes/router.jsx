import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { PATHS } from "./paths";
import Loading from "../components/Loading";

// helper that validates the resolved module default export is renderable
function safeLazy(loader) {
  return lazy(() =>
    loader().then((mod) => {
      const d = mod && mod.default;
      const ok =
        typeof d === "function" || (typeof d === "object" && d !== null);
      if (!ok) {
        // try to extract the import path from the loader's source for debugging
        let label = "<unknown>";
        try {
          const s = loader.toString();
          const m = s.match(/import\((?:'|\")([^'\"]+)(?:'|\")\)/);
          if (m) label = m[1];
        } catch (e) {
          /* ignore */
        }
        // throw an informative error that includes the module path and the resolved keys
        const keys = Object.keys(mod || {}).join(",");
        throw new Error(
          `Lazy-loaded module "${label}" does not export a React component as default. Resolved keys: ${keys}`
        );
      }
      return mod;
    })
  );
}

// Lazy imports for primary pages
const Dashboard = safeLazy(() => import("../modules/dashboard/Dashboard.jsx"));

/* Integrations */
const PartnersList = safeLazy(() =>
  import("../modules/integrations/partners/List.jsx")
);
const MenuSync = safeLazy(() =>
  import("../modules/integrations/menus/Sync.jsx")
);
const DeliveryFeed = safeLazy(() =>
  import("../modules/integrations/orders/Feed.jsx")
);
const WebhookLogs = safeLazy(() =>
  import("../modules/integrations/webhooks/Logs.jsx")
);

/* Hardware */
const HardwareHealth = safeLazy(() =>
  import("../modules/hardware/health/Overview.jsx")
);
const TerminalsList = safeLazy(() =>
  import("../modules/hardware/terminals/List.jsx")
);
const PrintersList = safeLazy(() =>
  import("../modules/hardware/printers/List.jsx")
);

/* Sales */
const OrdersList = safeLazy(() => import("../modules/sales/orders/List.jsx"));
const PaymentSessions = safeLazy(() =>
  import("../modules/sales/payments/Sessions.jsx")
);
const TablesBoard = safeLazy(() => import("../modules/sales/tables/Board.jsx"));

/* Biz catalog */
const BusinessesList = safeLazy(() =>
  import("../modules/biz-catalog/businesses/List.jsx")
);
const LocationsList = safeLazy(() =>
  import("../modules/biz-catalog/locations/List.jsx")
);
const AreasTablesEditor = safeLazy(() =>
  import("../modules/biz-catalog/locations/AreasTablesEditor.jsx")
);
const CategoriesList = safeLazy(() =>
  import("../modules/biz-catalog/categories/List.jsx")
);
const ItemsList = safeLazy(() =>
  import("../modules/biz-catalog/items/List.jsx")
);
const MenusBuilder = safeLazy(() =>
  import("../modules/biz-catalog/menus/Builder.jsx")
);
const DiscountsList = safeLazy(() =>
  import("../modules/biz-catalog/discounts/List.jsx")
);

/* IAM */
const UsersList = safeLazy(() => import("../modules/iam/users/UsersList.jsx"));
const InvitesList = safeLazy(() =>
  import("../modules/iam/invites/InvitesList.jsx")
);
const RolesPage = safeLazy(() => import("../modules/iam/roles/RolesPage.jsx"));
const PoliciesPage = safeLazy(() =>
  import("../modules/iam/policies/PoliciesPage.jsx")
);

/* Settings & Auth */
const Settings = safeLazy(() => import("../modules/settings/Settings.jsx"));
const Login = safeLazy(() => import("../modules/auth/login.jsx"));
const Logout = safeLazy(() => import("../modules/auth/logout.jsx"));

const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <AdminLayout />,
    children: [
      // Dashboard as landing page at "/"
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },

      // Dashboard explicit path
      {
        path: PATHS.DASHBOARD.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },

      // Analytics
      {
        path: PATHS.ANALYTICS_TRANSACTIONS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard /> {/* swap in TransactionsList if separate view */}
          </Suspense>
        ),
      },

      // Integrations
      {
        path: PATHS.INTEGRATIONS_PARTNERS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <PartnersList />
          </Suspense>
        ),
      },
      {
        path: PATHS.INTEGRATIONS_MENU_SYNC.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <MenuSync />
          </Suspense>
        ),
      },
      {
        path: PATHS.INTEGRATIONS_FEED.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <DeliveryFeed />
          </Suspense>
        ),
      },
      {
        path: PATHS.INTEGRATIONS_WEBHOOKS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <WebhookLogs />
          </Suspense>
        ),
      },

      // Hardware
      {
        path: PATHS.HARDWARE_HEALTH.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <HardwareHealth />
          </Suspense>
        ),
      },
      {
        path: PATHS.HARDWARE_TERMINALS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <TerminalsList />
          </Suspense>
        ),
      },
      {
        path: PATHS.HARDWARE_PRINTERS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <PrintersList />
          </Suspense>
        ),
      },

      // Sales
      {
        path: PATHS.SALES_ORDERS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <OrdersList />
          </Suspense>
        ),
      },
      {
        path: PATHS.SALES_PAYMENTS_SESSIONS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <PaymentSessions />
          </Suspense>
        ),
      },
      {
        path: PATHS.SALES_TABLES.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <TablesBoard />
          </Suspense>
        ),
      },

      // Biz catalog
      {
        path: PATHS.BIZ_BUSINESSES.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <BusinessesList />
          </Suspense>
        ),
      },
      {
        path: PATHS.BIZ_LOCATIONS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <LocationsList />
          </Suspense>
        ),
      },
      {
        path: PATHS.BIZ_AREAS_TABLES.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <AreasTablesEditor />
          </Suspense>
        ),
      },
      {
        path: PATHS.BIZ_CATEGORIES.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <CategoriesList />
          </Suspense>
        ),
      },
      {
        path: PATHS.BIZ_ITEMS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <ItemsList />
          </Suspense>
        ),
      },
      {
        path: PATHS.BIZ_MENUS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <MenusBuilder />
          </Suspense>
        ),
      },
      {
        path: PATHS.BIZ_DISCOUNTS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <DiscountsList />
          </Suspense>
        ),
      },

      // IAM
      {
        path: PATHS.IAM_USERS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <UsersList />
          </Suspense>
        ),
      },
      {
        path: PATHS.IAM_INVITES.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <InvitesList />
          </Suspense>
        ),
      },
      {
        path: PATHS.IAM_ROLES.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <RolesPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.IAM_POLICIES.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <PoliciesPage />
          </Suspense>
        ),
      },

      // Settings & Auth
      {
        path: PATHS.SETTINGS.slice(1),
        element: (
          <Suspense fallback={<Loading />}>
            <Settings />
          </Suspense>
        ),
      },
      // (auth routes moved to top-level so they render without the AdminLayout)
    ],
  },
  // Top-level auth routes (render outside AdminLayout)
  {
    path: PATHS.AUTH_LOGIN,
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: PATHS.AUTH_LOGOUT,
    element: (
      <Suspense fallback={<Loading />}>
        <Logout />
      </Suspense>
    ),
  },
  { path: "*", element: <div className="card p-8">Not Found</div> },
]);

export default router;
