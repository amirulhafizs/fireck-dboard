import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { CollectionType } from "api/collectionTypes";
import PaymentIcon from "@material-ui/icons/Payment";
import EmailIcon from "@material-ui/icons/Email";

function netlifyAccessTokenReducer(state = "", action: any): string {
  switch (action.type) {
    case "SET_NETLIFY_ACCESS_TOKEN":
      return action.payload;
    default:
      return state;
  }
}

function siteIdReducer(state = "", action: any): string {
  switch (action.type) {
    case "SET_SITE_ID":
      return action.payload;
    default:
      return state;
  }
}

function projectIdReducer(state = "", action: any): string {
  switch (action.type) {
    case "SET_PROJECT_ID":
      return action.payload;
    default:
      return state;
  }
}

function firebaseAppApiKeyReducer(state = "", action: any): string {
  switch (action.type) {
    case "SET_FIREBASE_APP_API_KEY":
      return action.payload;
    default:
      return state;
  }
}

function userReducer(
  state = { username: "", token: "", email: "" },
  action: any
): { username: string; token: string; email: string } {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
}

export const SystemCollectionIds = [
  "EmailTemplatesReservedCollection",
  "RolesReservedCollection",
  "FilesReservedCollection",
  "CollectionTypesReservedCollection",
];

function collectionTypesReducer(
  state = [] as CollectionType[],
  action: any
): Array<CollectionType> {
  switch (action.type) {
    case "SET_COLLECTION_TYPES":
      return action.payload;
    case "UPDATE_COLLECTION_FIELDS":
      return state.map((x) => (x.docId === action.docId ? { ...x, fields: action.payload } : x));
    case "UPDATE_COLLECTION_TYPE":
      return state.map((x) => (x.docId === action.docId ? { ...x, ...action.payload } : x));
    case "ADD_COLLECTION_TYPE":
      return [...state, action.payload];
    case "DELETE_COLLECTION_TYPE":
      return state.filter((x) => x.docId !== action.payload);
    default:
      return state;
  }
}

function systemCollectionTypesReducer(
  state = [] as CollectionType[],
  action: any
): Array<CollectionType> {
  switch (action.type) {
    case "SET_SYSTEM_COLLECTION_TYPES":
      return action.payload;
    default:
      return state;
  }
}

function loadingReducer(state = false, action: any): boolean | string {
  switch (action.type) {
    case "SET_LOADING":
      return action.payload;
    default:
      return state;
  }
}

function firebaseUserTokenReducer(state = "", action: any): string {
  switch (action.type) {
    case "SET_FIREBASE_USER_TOKEN":
      return action.payload;
    default:
      return state;
  }
}

function appearanceReducer(
  state: { logo: string; colors: string[] } = {
    logo: "",
    colors: ["#4C9394", "#19393B", "#23F3F3", "#1DCCCC"],
  },
  action: any
): { logo: string; colors: string[] } {
  switch (action.type) {
    case "SET_APPEARANCE":
      return action.payload;
    default:
      return state;
  }
}

function newAppearanceReducer(
  state: { logo: string; colors: string[] } = {
    logo: "",
    colors: ["#4C9394", "#19393B", "#23F3F3", "#1DCCCC"],
  },
  action: any
): { logo: string; colors: string[] } {
  switch (action.type) {
    case "SET_NEW_APPEARANCE":
      return action.payload;
    case "UPDATE_NEW_APPEARANCE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function documentChangedReducer(state = false, action: any) {
  switch (action.type) {
    case "SET_DOCUMENT_CHANGED":
      return action.payload;
    default:
      return state;
  }
}

interface Integration {
  id: string;
  title: string;
  description: string;
  installed: boolean;
  menuTitle: string;
  icon: React.FC;
  [key: string]: any;
}

const integrations: Integration[] = [
  {
    id: "payments",
    title: "Stripe payments",
    description: "Allows to create charges for your customers.",
    installed: false,
    menuTitle: "Payments",
    icon: PaymentIcon,
    stripe_secret_key: "",
  },
  {
    id: "emails",
    title: "Nodemailer emails",
    description: "Allows to create email templates and send customized emails.",
    installed: false,
    menuTitle: "Emails",
    icon: EmailIcon,
  },
];

function integrationsReducer(
  state = integrations,
  action: {
    type: "SET_INTEGRATIONS" | "UPDATE_INTEGRATION" | "UPDATE_INTEGRATIONS";
    payload: any;
    id: any;
  }
): Integration[] {
  switch (action.type) {
    case "SET_INTEGRATIONS":
      return action.payload;
    case "UPDATE_INTEGRATION":
      return state.map((x) => (x.id === action.id ? { ...x, ...action.payload } : x));
    case "UPDATE_INTEGRATIONS":
      return state.map((x, i) => ({ ...x, ...action.payload[i] }));
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  netlifyAccessToken: netlifyAccessTokenReducer,
  siteId: siteIdReducer,
  projectId: projectIdReducer,
  firebaseAppApiKey: firebaseAppApiKeyReducer, // we need initialize firebase app in client app.
  user: userReducer,
  collectionTypes: collectionTypesReducer,
  loading: loadingReducer,
  firebaseUserToken: firebaseUserTokenReducer,
  appearance: appearanceReducer,
  newAppearance: newAppearanceReducer,
  documentChanged: documentChangedReducer,
  integrations: integrationsReducer,
  systemCollectionTypes: systemCollectionTypesReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
