interface Window {
  validateStep3?: () => boolean;
  submitStep3?: () => Promise<boolean>;
}

declare module "*.cairo" {
  const content: string;
  export default content;
}
