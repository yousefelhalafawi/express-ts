import { Document, Query } from "mongoose";

interface QueryString {
  [key: string]: any;
  sort?: string;
  fields?: string;
  page?: string;
  limit?: string;
}
export class GetAllFeature<T extends Document> {
  private query: Query<T[], T>;
  private queryString: QueryString;
  constructor(query: Query<T[], T>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter(): this {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate(): this {
    const page = parseInt(this.queryString.page || "1", 10);
    const limit = parseInt(this.queryString.limit || "100", 10);
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  getQuery(): Query<T[], T> {
    return this.query;
  }
}
