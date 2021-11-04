import { Document, addDocument, getCollection, updateDocument } from "./collections";
import { RoleDocument } from "./roles";

export type FieldInputType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "map"
  | "rich-text"
  | "media"
  | "date"
  | "enum"
  | "password"
  | "relation"
  | "json"
  | "collection"
  | "document"
  | "any";

export type FieldType = {
  id: string;
  type: FieldInputType;
  enumOptions: string[];
  mediaSingle: boolean;
  relatedCollectionTypeDocId: string;
  relationOneToOne: boolean;
  displayOnTable: boolean;
  stringLong: boolean;
  collectionFields: FieldType[];
  documentFields: FieldType[];
  isDefault: boolean;
};

export type CmsEvent = "find" | "find one" | "create" | "update" | "delete";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Webhook {
  event: string;
  method: string;
  url: string;
  collectionId: string;
}

export interface WebhookDocument extends Document, Webhook {}

export interface CollectionType {
  id: string;
  name: string;
  fields: Array<FieldType>;
  draftable: boolean;
  single: boolean;
  docId: string;
  size: number;
  isSystem: boolean;
}

export const createCollectionType = async (type: CollectionType) => {
  try {
    const ROLES_ID = "RolesReservedCollection";
    const COLLECTIONS_ID = "CollectionTypesReservedCollection";

    const finalType = {
      ...type,
      fields: [
        ...type.fields,
        {
          id: "createdAt",
          type: "date",
          displayOnTable: true,
          isDefault: true,
        },
        {
          id: "modifiedAt",
          type: "date",
          displayOnTable: true,
          isDefault: true,
        },
        {
          id: "docId",
          type: "string",
          displayOnTable: true,
          isDefault: true,
        },
      ],
    };

    let doc = await addDocument(COLLECTIONS_ID, finalType);

    if (!doc.error && doc.docId) {
      const roles: RoleDocument[] = await getCollection({
        collectionId: ROLES_ID,
        limit: 1000,
      });

      roles.forEach((x) =>
        updateDocument(ROLES_ID, x.docId, {
          ...x,
          permissions: { ...x.permissions, [doc.docId]: x.defaultPermissions },
        }).then((res: any) => console.log(res))
      );
    }

    return doc;
  } catch (error: any) {
    return Promise.resolve({ error: error.toString() });
  }

  return;
};
