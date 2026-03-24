import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import { User } from "../user/user.model";
import {
  DocumentStatus,
  DocumentTemplate,
  DocumentType,
} from "./document.enums";

class StructuredSectionClass {
  @prop({ required: false, trim: true })
  public heading?: string;

  @prop({ type: () => [String], required: true, default: [] })
  public paragraphs!: string[];

  @prop({ type: () => [String], required: false, default: [] })
  public bullets?: string[];
}

class StructuredDocumentClass {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({
    type: () => [StructuredSectionClass],
    required: true,
    default: [],
    _id: false,
  })
  public sections!: StructuredSectionClass[];
}

@index({ userId: 1, createdAt: -1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "documents",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Document {
  @prop({
    ref: () => User,
    required: true,
    index: true,
  })
  public userId!: Ref<User>;

  @prop({
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 150,
  })
  public title!: string;

  @prop({
    required: true,
    trim: true,
    maxlength: 50000,
  })
  public rawContent!: string;

  @prop({
    required: true,
    trim: true,
    maxlength: 50000,
  })
  public cleanedContent!: string;

  @prop({
    required: true,
    type: () => StructuredDocumentClass,
    _id: false,
  })
  public structuredContent!: StructuredDocumentClass;

  @prop({
    required: true,
    enum: DocumentType,
    type: String,
  })
  public documentType!: DocumentType;

  @prop({
    required: true,
    enum: DocumentTemplate,
    type: String,
  })
  public template!: DocumentTemplate;

  @prop({
    required: true,
    enum: DocumentStatus,
    type: String,
    default: DocumentStatus.PROCESSED,
  })
  public status!: DocumentStatus;

  public createdAt?: Date;
  public updatedAt?: Date;
}

export const DocumentModel = getModelForClass(Document);
