const wrapperForFetch = async (
  func: () => Promise<void>,
  handler: (data: Awaited<void>) => void
) => {
  const data = await func();

  handler(data);
};

export default wrapperForFetch;
