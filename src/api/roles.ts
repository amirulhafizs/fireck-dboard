export type RoleType = "admin" | "user";
export type CollectionPermission =
  | "find"
  | "find one"
  | "count"
  | "create"
  | "update"
  | "delete"
  | "type";

export const permissions: CollectionPermission[] = [
  "find",
  "find one",
  "count",
  "create",
  "update",
  "delete",
  "type",
];

export type RoleDocument = {
  docId: string;
  name: string;
  defaultPermissions: CollectionPermission[];
  permissions: { [collectionName: string]: CollectionPermission[] };
};
