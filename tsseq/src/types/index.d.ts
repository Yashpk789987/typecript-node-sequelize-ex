import { BuildOptions, Model } from "sequelize";
export interface BookAttributes {
  id?: number;
  name: string;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface BookModel extends Model<BookAttributes>, BookAttributes {}
export class Book extends Model<BookModel, BookAttributes> {}
export type BookStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BookModel;
};

export interface AuthorAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface AuthorModel
  extends Model<AuthorAttributes>,
    AuthorAttributes {}
export class Author extends Model<AuthorModel, AuthorAttributes> {}
export type AuthorStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AuthorModel;
};
