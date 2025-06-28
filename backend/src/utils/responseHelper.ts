
export const successResponse = (data: any, message: string = 'Success') => ({
  success: true,
  message,
  data
});

export const errorResponse = (message: string = 'Error', statusCode: number = 500) => ({
  success: false,
  message,
  statusCode
});
