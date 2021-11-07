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

type SimpleInputType =
  | "number"
  | "boolean"
  | "array"
  | "map"
  | "json"
  | "rich-text"
  | "date"
  | "password"
  | "any";

export type BaseField = {
  id: string;
  isDefault: boolean;
  displayOnTable: boolean;
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

export type AnyField =
  | RelationField
  | EnumField
  | StringField
  | MediaField
  | CollectionField
  | DocumentField
  | SimpleField;

export interface SimpleField extends BaseField {
  type: SimpleInputType;
}

export interface RelationField extends BaseField {
  type: "relation";
  relatedCollectionTypeDocId: string;
  relationOneToOne: boolean;
}

export interface EnumField extends BaseField {
  enumOptions: string[];
  type: "enum";
}

export interface StringField extends BaseField {
  type: "string";
  stringLong: boolean;
}

export interface MediaField extends BaseField {
  type: "media";
  mediaSingle: boolean;
}

export interface CollectionField extends BaseField {
  type: "collection";
  collectionFields: AnyField[];
}

export interface DocumentField extends BaseField {
  type: "document";
  documentFields: AnyField[];
}

export interface CollectionType extends Partial<Document> {
  id: string;
  name: string;
  fields: Array<AnyField>;
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
