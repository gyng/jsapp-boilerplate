export const Routes: Record<string, () => string> = {
  booklist: () => "/booklist",
  counter: () => "/counter",
  // Example of using parameters
  // counter: (counterId: string = "?") => `/counter/${id}`,
  root: () => "/",
};
