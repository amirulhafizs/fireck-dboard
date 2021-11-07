import String from "./String";
import Number from "./Number";
import Map from "./Map";
import Array from "./Array";
import Boolean from "./Boolean";
import Date from "./Date";
import Media from "./Media";
import RichText from "./RichText";
import Json from "./Json";
import Enum from "./Enum";
import Password from "./Password";
import Relation from "./Relation";
import Subcollection from "./Subcollection";

const fieldTypes = [
  { type: "string", Badge: String },
  { type: "number", Badge: Number },
  { type: "map", Badge: Map },
  { type: "array", Badge: Array },
  { type: "boolean", Badge: Boolean },
  { type: "date", Badge: Date },
  { type: "media", Badge: Media },
  { type: "rich-text", Badge: RichText },
  { type: "json", Badge: Json },
  { type: "enum", Badge: Enum },
  { type: "password", Badge: Password },
  { type: "relation", Badge: Relation },
  { type: "collection", Badge: Subcollection },
];

export default fieldTypes;
