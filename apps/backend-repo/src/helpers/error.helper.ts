class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err: any, res: any) => {
  const { statusCode, message } = err;

  res.status(statusCode ?? 500).json({
    status: "error",
    statusCode,
    message,
  });

  // res.status(500).json({ error: "Internal Server Error" });
};

export { ErrorHandler, handleError };
