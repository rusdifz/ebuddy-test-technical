import { Request } from "express";

export function setPagination(req: Request, count: number) {
  const query = req.query as any;

  const page = req.query?.page ? parseInt(query.page) : 1; // assign query page with default or requested value
  const limit = req.query?.limit ? parseInt(query.limit) : 10; // assign query limit with default or requested value

  return {
    page,
    total: count,
    total_page: Math.ceil(count / limit),
  };
}
