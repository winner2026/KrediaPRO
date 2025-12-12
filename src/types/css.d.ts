declare module '*.css' {
  const css: { readonly [className: string]: string };
  export default css;
}
