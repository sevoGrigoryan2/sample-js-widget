
export const getUrl = (isSandbox) => {
  let url =  'https://flexipay.com'
  if (isSandbox) url = 'https://flexipay.sandbox.com'
  return url;
}