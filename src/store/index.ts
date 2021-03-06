import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { CollectionType } from "api/collectionTypes";
import { ApperanceItem } from "pages/Appearance";
import {
  ConfigKeys,
  ConfigState,
  initalConfigState,
  initialConfigKeys,
  Update,
} from "facades/TasksManager";
import { initialUser } from "facades/TasksManager";

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

export interface User {
  username: string;
  token: string;
  email: string;
}

function userReducer(state = initialUser, action: any): User {
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

interface AppearanceState {
  saved: boolean;
  items: ApperanceItem[];
}

function appearanceReducer(
  state: AppearanceState = { saved: true, items: [] },
  action: any
): AppearanceState {
  switch (action.type) {
    case "SET_APPEARANCE":
      return { items: action.payload, saved: false };
    case "SET_APPEARANCE_SAVED":
      return { ...state, saved: true };
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

function configStateReducer(state: ConfigState = initalConfigState, action: any) {
  switch (action.type) {
    case "SET_CONFIG_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function configKeysReducer(state: ConfigKeys = initialConfigKeys, action: any): ConfigKeys {
  switch (action.type) {
    case "SET_CONFIG_KEYS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function updateReducer(
  state: Update = { available: false, gitName: "", gitRepo: "" },
  action: any
): Update {
  switch (action.type) {
    case "SET_UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  configState: configStateReducer,
  configKeys: configKeysReducer,
  update: updateReducer,
  user: userReducer,
  collectionTypes: collectionTypesReducer,
  loading: loadingReducer,
  appearance: appearanceReducer,
  documentChanged: documentChangedReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
