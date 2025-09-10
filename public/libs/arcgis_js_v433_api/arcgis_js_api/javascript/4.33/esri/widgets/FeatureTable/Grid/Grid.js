// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["../../../chunks/tslib.es6","../../../chunks/componentsUtils","../../../core/arrayUtils","../../../core/events","../../../core/maybe","../../../core/reactiveUtils","../../../core/sanitizerUtils","../../../core/accessorSupport/decorators/property","../../../core/has","../../../core/Logger","../../../core/accessorSupport/decorators/subclass","../../Widget","./GridViewModel","../../support/globalCss","../../support/widgetUtils","../../support/decorators/messageBundle","../../support/jsxFactory"],(function(e,t,i,r,o,s,n,a,l,d,h,c,u,_,p,m,g){"use strict";window.Vaadin||={},window.Vaadin.featureFlags||={};const f={};function b(e,t="24.7.6"){if(Object.defineProperty(e,"version",{get:()=>t}),e.experimental){const t="string"==typeof e.experimental?e.experimental:`${i=e.is.split("-").slice(1).join("-"),i.replace(/-[a-z]/gu,(e=>e[1].toUpperCase()))}Component`;if(!window.Vaadin.featureFlags[t]&&!f[t])return f[t]=new Set,f[t].add(e),void Object.defineProperty(window.Vaadin.featureFlags,t,{get:()=>0===f[t].size,set(e){e&&f[t].size>0&&(f[t].forEach((e=>{customElements.define(e.is,e)})),f[t].clear())}});if(f[t])return void f[t].add(e)}var i;const r=customElements.get(e.is);if(r){const t=r.version;t&&e.version&&t===e.version?console.warn(`The component ${e.is} has been loaded twice`):console.error(`Tried to define ${e.is} version ${e.version} when version ${r.version} is already in use. Something will probably break.`)}else customElements.define(e.is,e)}class v extends HTMLElement{static get is(){return"vaadin-lumo-styles"}}b(v);const y=e=>class extends e{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),"theme"===e&&this._set_theme(i)}},C=[],w=new Set,A=new Set;function x(e){return e&&Object.prototype.hasOwnProperty.call(e,"__themes")}function S(e,t){return(e||"").split(" ").some((e=>new RegExp(`^${e.split("*").join(".*")}$`,"u").test(t)))}function E(e){return e.map((e=>e.cssText)).join("\n")}const I="vaadin-themable-mixin-style";function P(e){e.prototype instanceof t.i$2?e.elementStyles=e.finalizeStyles(e.styles):e.prototype._template.content.getElementById(I).textContent=E(e.getStylesForThis()),A.forEach((t=>{const i=customElements.get(t);i!==e&&i.prototype instanceof e&&P(i)}))}function T(e,i,r={}){i=function(e=[]){return[e].flat(1/0).filter((e=>e instanceof t.n||(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1)))}(i),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(e,i,r):C.push({themeFor:e,styles:i,include:r.include,moduleId:r.moduleId}),e&&A.forEach((r=>{if(S(e,r)&&function(e){return x(customElements.get(e))}(r)){const e=customElements.get(r);!function(e,t){const i=e.__themes;return!(!i||!t)&&i.some((e=>e.styles.some((e=>t.some((t=>t.cssText===e.cssText))))))}(e,i)?window.Vaadin&&window.Vaadin.suppressPostFinalizeStylesWarning||console.warn(`The custom element definition for "${r}" was finalized before a style module was registered. Ideally, import component specific style modules before importing the corresponding custom element. This warning can be suppressed by setting "window.Vaadin.suppressPostFinalizeStylesWarning = true".`):console.warn(`Registering styles that already exist for ${r}`),P(e),function(e){w.forEach((i=>{const r=i.deref();r instanceof e?function(e){if(!e.shadowRoot)return;const i=e.constructor;if(e instanceof t.i$2)[...e.shadowRoot.querySelectorAll("style")].forEach((e=>e.remove())),t.S(e.shadowRoot,i.elementStyles);else{const t=e.shadowRoot.getElementById(I),r=i.prototype._template;t.textContent=r.content.getElementById(I).textContent}}(r):r||w.delete(i)}))}(e)}}))}function z(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():C}function k(e=""){let t=0;return e.startsWith("lumo-")||e.startsWith("material-")?t=1:e.startsWith("vaadin-")&&(t=2),t}function R(e){const t=[];return e.include&&[].concat(e.include).forEach((e=>{const i=z().find((t=>t.moduleId===e));i?t.push(...R(i),...i.styles):console.warn(`Included moduleId ${e} not found in style registry`)}),e.styles),t}function O(e){const t=`${e}-default-theme`,i=z().filter((i=>i.moduleId!==t&&S(i.themeFor,e))).map((e=>({...e,styles:[...R(e),...e.styles],includePriority:k(e.moduleId)}))).sort(((e,t)=>t.includePriority-e.includePriority));return i.length>0?i:z().filter((e=>e.moduleId===t))}const N=e=>class extends(y(e)){constructor(){super(),w.add(new WeakRef(this))}static finalize(){if(super.finalize(),this.is&&A.add(this.is),this.elementStyles)return;const e=this.prototype._template;e&&!x(this)&&function(e,t){const i=document.createElement("style");i.id=I,i.textContent=E(e),t.content.appendChild(i)}(this.getStylesForThis(),e)}static finalizeStyles(e){const t=this.getStylesForThis();return e?[...[e].flat(1/0),...t]:t}static getStylesForThis(){const t=e.__themes||[],i=Object.getPrototypeOf(this.prototype),r=(i?i.constructor.__themes:[])||[];this.__themes=[...t,...r,...O(this.is)];const o=this.__themes.flatMap((e=>e.styles));return o.filter(((e,t)=>t===o.lastIndexOf(e)))}},F=(e,...t)=>{((e,...t)=>{const i=document.createElement("style");i.id=e,i.textContent=t.map((e=>e.toString())).join("\n").replace(":host","html"),document.head.insertAdjacentElement("afterbegin",i)})(`lumo-${e}`,t)};F("color-props",t.i`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`),T("",t.i`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
  pre code {
    background: transparent;
  }
`,{moduleId:"lumo-color"}),F("font-icons",t.i`
  @font-face {
    font-family: 'lumo-icons';
    src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABHAAAsAAAAAI6AAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAQwAAAFZAIUuNY21hcAAAAYgAAAD+AAADymne8hxnbHlmAAACiAAAC+gAABioIzlOlWhlYWQAAA5wAAAAMAAAADZa/6SsaGhlYQAADqAAAAAdAAAAJAbpA4BobXR4AAAOwAAAABAAAAC0q+AAAGxvY2EAAA7QAAAAXAAAAFyF7o1GbWF4cAAADywAAAAfAAAAIAFMAXBuYW1lAAAPTAAAATEAAAIuUUJZCHBvc3QAABCAAAABPQAAAgfdkltveJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGS+xDiBgZWBgamKaQ8DA0MPhGZ8wGDIyAQUZWBlZsAKAtJcUxgcXjG+0mEO+p/FEMUcxDANKMwIkgMABvgMMAB4nO3SV26EMABF0UsZpjG9d6Y3FpgF5StLYxMTP16WEUvHV1gGIQzQAJKgDFKIfojQ+A6rUb2e0KnXU77qPanWq/LzCXOkOVyn9RyHvWl4YkaTFu1wX5ecHn0GDBkxZsKUGXMWLFmxZsOWHXsOFBw5cebClRt3Hjx58dZ7RRn/I9cUF39Xpb691acRG2piOtUqNZ1P1TCdeJUZatNQW4baNtSO6U+ouoaam96u6hlq31AHhjo01JGhjg11YqhTQ50Z6txQF4a6NNSVoa4NdWOoW0PdGereUA+GWhjq0VBPhno21IuhXg31Zqh3Q30Y6tNQX4b6NtTSKH8BOIRpQQAAeJy1WH1sW9UVv+fG9vPz+7Bf/N6zHcd2/J04jbP6s0lap4kDpB9JWzUUCqxNgaHxpTI6hNhUNLVr17HSISb2D2iAJrWb6FTWahNQdQxRvmHamAR0qibE1E18CG3QaVNFvJ17n+3YIf1AiMQ679x77j3v3HPPPed3H7ER/OsYpw8TmQRIiuQJ8RZK+WjO1B3xaCzla21orY10a+OQ6aHTHtP0zB31mBs1GZ6RNU2uXc7oPL+xdRS9R9X1oK4fVfijdsBqvqF6vd1eLzPrYrYZ57WteF7bPDIc5+ZcJnta+S9i2Vfhs4MaMwZNQmO0Vv7gF/MZcNsCcJp4sJFSwYyAmRuFCmTBDRBUkwGqnlViyjmVBpLqaXhNpt0J5V1JOqMkuqn8WkMHvZX+iOlImiqkBiFVYDrCqINulmkwKb8ry2fkZBBn7FcTlk4ZdfpRZ9MOesLSAakKt0N3g4p2jAL8eIEOOqom/U0lgQRXUl8LtXM7HFkojUIpF0ErVBhcZC1vtyjtpsqr83a8RVcSH+ool8LgcIMjNohmVCACuDs506BdO6WIQeXjUsh1XKZGRNpp9piv3+Givoh00OU6KEV81HUHTLtN093Q+YGlE3wLHWRtMNy9XWqdLm2HKbaNsGzhu+41eswFOjE6WKSk2/1Wpt+qHeM6phbohmVmj3GvpdcVkiy9zbXfzHVqKuDB0IR2P6ZpF+D7dy6YC/9svGmBE5hKB9+X2+hh4iYRMkhGyTqyFc9APmeGQHf043tWQKHkizmwaY5AroTNVJzJDc2SFzUu92kOLsdmKu77vByb8/IjtxmhkMFISRBFISO4XMLJlj4XgGuRXtaHw2FLyHifdSOpisIhJjgkiPBAyJh7lfXTkhEadwk1mUngrOC6MazX7mASeEAPV1FyjEumBOaEDu4DP/ogRDKkiLEV1woVyMeLLKJCEM+FwdCwL4XLcRgdbfkhbzS8BNvXDKzNQiAWgOzagTXF1Eyq+Ci6/TPm/JrNY/59p1epKN4jQFGe0fx+LTMwNVCrAU2VSqnaKYzIiGmWe2Rvp9KDJhncrjLaFce8VCUbyQ1kB9lNfkJ+To6R58mfyd/Ip9ABXohDHqqwEW7A2Mij1ehntLu+h8xMtocjUJcYwoLdtYafv/1Vjy8vjLaLtBfOt3/B931Rexa24e5zstgnyqvZHs69zuhq3vFgRpQVJyN7FuE++RLSeW4xMi+t6Zeo5sIK6S5dlGVRD2hWnGoB3j7OV3lesvNLic8tOnLRSRfRdOna63VJp/1WbYs5dFZjy1AqpGICQEWKmNI+CZNoVTJ7pNop+IZkRrBHgnEmqr3TrEsfw1Gi8LqE+S1aV0SNNwXVVVvuUoU3ld6TLwmditIpvKTU50zSzWwO1h0rL8awnulwTXMYrGDT4aQ1fb4GPkyv5vMEh5Vec6yw0AMXnfcx1l/rfVZaKLDi0W4j/HfeyGZuHOf1IUGW1udizU2leXY0OmLpVDpVKJfKpZzPRKHgEBzpXAUKWYipoIeBdl3JfLZVBizEqWun1i4ZGFiyduq3DebayXsmJ+95gBG4+Urm1a2SdpKV57lP2wZyZqI+FAlfUtO+NCmgdWhMOS1gDY+jHWnBhwjBQLMEXxmLbx6t9JXTWDLtsSxgisfErqvQMbbBoywZmeyLeWe8OWNydFDxzMx4lMGRtX0xN3YFJkeW+O0bascGNwwObtjCCOzrzAVWjSwN2K9cpyn9o5cZOXMmkAuM85EbNHnJyHhfLLCnPhxJYw9eoIMkyC3l+4ZuY5ig7lW2oYUynDgg+Xrk+++Xe3zSgRYetnyuy+KbfjiB+GAAtZ8HHXmtijZfFFgrujhmOs2qkXvuSV6WqA1WLYqhPHOfsa26rklKFqbAGL2dOIlGurB6LWFVFd/KoBBaYTFYVBs93hZRFlrG5Ex4NVFIJguJVvqnBW2kNNvFGx90YUcSEvyZSMDeZjc0xYlEYy8+hHcWx9YrZOaPPyCGepP5Q34aXnGBr8d1QhSf4yjtiebZqNJfEYl4SY6dDRb8WSguLZW9ZQtBpoW4hX0QMyB2KmsYcOh8HMQxBn288oZ6BXV0GOq/ClKsC6T8g9X3OFKZNkJrYkOx2lEk+KNDy953+wGHXuGGzhGZ+uLK8FVrQkbtKBv+9EztU2sgTCNpvXMdJjqJ4tkdw+x00dPKkZ1QR254x7GQoFmvfakSnL3gCc5nREly2mN2pyTLMacMipNT7YInGU7JzlN2p9N+yinXTirOKEvPUafSWMNDmCf9pIQYaG19DSxKGqvAQ+xg60iabEm5MheUU2n+HxO4TDDbjnw6xxK8QzfhbHXq8pWVqanKysun9s6ztdt7sivGqruqYyuyPS6Hw9XehGt6q+l0dT0jvaFMZjiTuTHo7+vdtHJTb58/2ML+IxHt9/n9vv5owiWKrrbWD+sakKxhKoYzxF5f7y9INxki42QNuYrVFDPfvqxyY83xWNMV+ZxPSMWb62W+wPSCJwkDDl1WZOGW84nAEo4A7HjB/uWmOdayRFnKjazi668u/ajJlUd87aPk048Crlu4j1Oh9gxdL3Z1inNPIt2xvKNlsU4hn54Z5Y6YbTDu9hHOvkcFAb35fU6hNovKOrtQmcvbNV9/Ntfv5xf4atDWOOTX6CSHZ08xujhPs51+f9zvf1YLIGoPPKvxVh0TSLAXzzUBFiXs7GJVB7vH5/PAXznd4+vx4a95h3qI/oYIpIdMkA1kC7kVLS3GhWI5bwj1fIaVKG/Ei5gXWOjhtcJbzFthaMQrwIcIRj0ppvO6yV95icu9j/YPDNySWp7w+kOr95R1RfGpfVlDVhS/2geJ5Umv2mn0rkxBvzvgdisndJXaVF1X5z5jdHGe2n/QnYo8+b2uaMivhowgjYcLnVqnrEpQezsieyVZ6ooETbdJO6ip+cORLpes6BL82/qg8VHbo45B/vch/YQeJX28QvEANR3sQhxh+TcMCEd4l8BKF7uID7KM05tRYlIHHXY63YIi2fXQyj5XSBbcMeewKLpttkJ2Syz33YJfDdJdSYkqHbYb3VHRJgTV8c0TAy67YHeK7htwOKWax5co7Do8Pfh1tKdx1g5j9o6TZeQyMo27FuW3vbYsbY/Op3AG06DMKionRlpgHzCEeMmLU5opRrCyS670RzppZeW5p/iT3jL3lB4O63QS6dzzh8SAtOqwGJK3bv+lGJTWbr++471wsVKMRJCEK5H+cLg/Qp+IDsdqs7HhKD7hMXyyrD/Li8RjRqimHhI7HP2vSDZn9brplySb0L9dgpURSwmSiBFhilrwB8OA9gZ29NkRO/669parW9e7XZDxwvgRu+SE7zgl+xG5p/HtRqJ3cdwSZwsbwTA1WT3jEdyPN0sWxvDGy+xovIzHosnwc9LePf9tywun0fMkWaFYZbB4oovRq8VyKYUBkMVXqVhBHSylQ0wanvla3+rQ1XbR8ZzstYOo2Mf7vjk8ftcGDWxdSdXx0cAVveHg1TZFtEOn8ntBBFs11V++vuLUQ5qz+U6d/oUjpGIdNjOQhJXNqn5YCS1Yy5PofLGEs6Js2yOKe2yyOLxtaGjbt7cNIURCEDdWfaQ6lurtRYbePCuItv1iUNxvE4Vdw2zQ0LZhdv2fxjHp5uAmdlBpopHXoJGU8e6BRc0yi+PztkaHTRRrW1m2hcfFLlEUzzD+DGczjEVCg9jEQZhFcdAL2DjD+DPiSWQzjM2I89g5RXdxfECS+CIWy1hTGmFs6EIbkv/pbtkfU3aPrZ+4c2Lizn07qufym/L5TTdtyuU2/We3HPeDsjtb3bGPSSfW31aX3LQpX/d9sL7fWYpRJPBbCJavYjrFjj0rT2GWCZjf6Ytffr8beXl/HYeyGwJiIK8FLDHbfo65xGz7YCSRqCQSkbbHI5eUU5X4sjj+zrU9aHnRlEnrd7YGptd0x2Jf/RbH9PAiovadckSnEsJ661OgPFuH9B4O6e202vIN0h9xHXSJh1wRP5Vqv1uI6Wn9Gxmrwzqrii1gqhEscJanuAlGas+s2/uzvetgS72NpHZ6aHbZstmh/wPq1seEeJxjYGRgYADi31ySEvH8Nl8ZuJlfAEUYalQ3NCLo/6+ZpzLdAnI5GJhAogAiBgraeJxjYGRgYA76nwUkXzAAAfNUBkYGVKALAFb4A3EAAAB4nGNgYGBgfjG0MAAMzihlAAAAAABOAJoA6AEKASwBTgFwAZoBxAHuAhoCnALoBJoEvATWBPIFDgUqBXoF0AX+BkQGlga4BwgHagfiCGoIpAi8CVAJmAoQCiwKVgqQCtYLGAtOC4gL6AwuDFR4nGNgZGBg0GVMYRBlAAEmIOYCQgaG/2A+AwAYygG+AHicbZE9TsMwGIbf9A/RSggEYmHxAgtq+jN2ZGj3Dt3T1GlTOXHkuBW9AyfgEByCgTNwCA7BW/NJlVBtyd/jx+8XKwmAa3whwnFE6Ib1OBq44O6Pm6Qb4Rb5QbiNHh6FO/RD4S6eMRHu4RaaT4halzR3eBVu4Apvwk36d+EW+UO4jXt8Cnfov4W7WOBHuIen6MXsCtvPU1vWc73emcSdxIkW2tW5LdUoHp7kTJfaJV6v1PKg6v167H2mMmcLNbWl18ZYVTm71amPN95Xk8EgEx+ntoDBDgUs+siRspaoMef7rukNEriziXNuwS7Hmoe9wggxv+e55IzJMqQTeNYV00scuNbY8+YxrUfGfcaMZb/CNPQe04bT0lThbEuT0sfYhK6K/23Amf3Lx+H24hcj4GScAAAAeJxtjuduwzAMhH2NnTqOk+6993TfSZFY24giGZTVon36eiRFf5SAiO/A05HBWtBXEvxfGdYwQIgIQ6wjxggJxkgxwRQb2MQWtrGDXexhHwc4xBGOcYJTnOEcF7jEFa5xg1vc4R4PeMQTnvGCV2R4C1Khy9xkkkxNnPRC03s97pHLvKgTYXJNmbKfZom9o8POEffsq0Qw28+ltcPe2uHS2rGvRjPBmSwE1+GMtI6l0GSU4JEsSM4XgudpQx9sTRf3K9rAyUr0962UryKprZwPpM0jyda5uP2qrVBjxSLPCmGUplixrdpBSKqsI2oO4gF9Udq8TJVOzDSpcEHGR4vSeJdaVsSkMl26OqoKa6jttQ0rLb6a5l3YjO2QqV01YXLlNy2XDR0JlkXojbJTb/5GDX3V+kPviIPgB9AUks0AAAA=)
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html {
    --lumo-icons-align-center: '\\ea01';
    --lumo-icons-align-left: '\\ea02';
    --lumo-icons-align-right: '\\ea03';
    --lumo-icons-angle-down: '\\ea04';
    --lumo-icons-angle-left: '\\ea05';
    --lumo-icons-angle-right: '\\ea06';
    --lumo-icons-angle-up: '\\ea07';
    --lumo-icons-arrow-down: '\\ea08';
    --lumo-icons-arrow-left: '\\ea09';
    --lumo-icons-arrow-right: '\\ea0a';
    --lumo-icons-arrow-up: '\\ea0b';
    --lumo-icons-bar-chart: '\\ea0c';
    --lumo-icons-bell: '\\ea0d';
    --lumo-icons-calendar: '\\ea0e';
    --lumo-icons-checkmark: '\\ea0f';
    --lumo-icons-chevron-down: '\\ea10';
    --lumo-icons-chevron-left: '\\ea11';
    --lumo-icons-chevron-right: '\\ea12';
    --lumo-icons-chevron-up: '\\ea13';
    --lumo-icons-clock: '\\ea14';
    --lumo-icons-cog: '\\ea15';
    --lumo-icons-cross: '\\ea16';
    --lumo-icons-download: '\\ea17';
    --lumo-icons-drag-handle: '\\ea18';
    --lumo-icons-dropdown: '\\ea19';
    --lumo-icons-edit: '\\ea1a';
    --lumo-icons-error: '\\ea1b';
    --lumo-icons-eye: '\\ea1c';
    --lumo-icons-eye-disabled: '\\ea1d';
    --lumo-icons-menu: '\\ea1e';
    --lumo-icons-minus: '\\ea1f';
    --lumo-icons-ordered-list: '\\ea20';
    --lumo-icons-phone: '\\ea21';
    --lumo-icons-photo: '\\ea22';
    --lumo-icons-play: '\\ea23';
    --lumo-icons-plus: '\\ea24';
    --lumo-icons-redo: '\\ea25';
    --lumo-icons-reload: '\\ea26';
    --lumo-icons-resize-handle: '\\ea27';
    --lumo-icons-search: '\\ea28';
    --lumo-icons-undo: '\\ea29';
    --lumo-icons-unordered-list: '\\ea2a';
    --lumo-icons-upload: '\\ea2b';
    --lumo-icons-user: '\\ea2c';
  }
`),F("sizing-props",t.i`
  :host {
    --lumo-size-xs: 1.625rem;
    --lumo-size-s: 1.875rem;
    --lumo-size-m: 2.25rem;
    --lumo-size-l: 2.75rem;
    --lumo-size-xl: 3.5rem;

    /* Icons */
    --lumo-icon-size-s: 1.25em;
    --lumo-icon-size-m: 1.5em;
    --lumo-icon-size-l: 2.25em;
    /* For backwards compatibility */
    --lumo-icon-size: var(--lumo-icon-size-m);
  }
`),F("spacing-props",t.i`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`);const D=t.i`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`;t.i`
  html {
    /* Button */
    --vaadin-button-background: var(--lumo-contrast-5pct);
    --vaadin-button-border: none;
    --vaadin-button-border-radius: var(--lumo-border-radius-m);
    --vaadin-button-font-size: var(--lumo-font-size-m);
    --vaadin-button-font-weight: 500;
    --vaadin-button-height: var(--lumo-size-m);
    --vaadin-button-margin: var(--lumo-space-xs) 0;
    --vaadin-button-min-width: calc(var(--vaadin-button-height) * 2);
    --vaadin-button-padding: 0 calc(var(--vaadin-button-height) / 3 + var(--lumo-border-radius-m) / 2);
    --vaadin-button-text-color: var(--lumo-primary-text-color);
    --vaadin-button-primary-background: var(--lumo-primary-color);
    --vaadin-button-primary-border: none;
    --vaadin-button-primary-font-weight: 600;
    --vaadin-button-primary-text-color: var(--lumo-primary-contrast-color);
    --vaadin-button-tertiary-background: transparent !important;
    --vaadin-button-tertiary-text-color: var(--lumo-primary-text-color);
    --vaadin-button-tertiary-font-weight: 500;
    --vaadin-button-tertiary-padding: 0 calc(var(--vaadin-button-height) / 6);
    /* Checkbox */
    --vaadin-checkbox-background: var(--lumo-contrast-20pct);
    --vaadin-checkbox-background-hover: var(--lumo-contrast-30pct);
    --vaadin-checkbox-border-radius: var(--lumo-border-radius-s);
    --vaadin-checkbox-checkmark-char: var(--lumo-icons-checkmark);
    --vaadin-checkbox-checkmark-char-indeterminate: '';
    --vaadin-checkbox-checkmark-color: var(--lumo-primary-contrast-color);
    --vaadin-checkbox-checkmark-size: calc(var(--vaadin-checkbox-size) + 2px);
    --vaadin-checkbox-label-color: var(--lumo-body-text-color);
    --vaadin-checkbox-label-font-size: var(--lumo-font-size-m);
    --vaadin-checkbox-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs);
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    --vaadin-checkbox-disabled-checkmark-color: var(--lumo-contrast-30pct);
    --vaadin-checkbox-disabled-background: var(--lumo-contrast-10pct);
    /* Radio button */
    --vaadin-radio-button-background: var(--lumo-contrast-20pct);
    --vaadin-radio-button-background-hover: var(--lumo-contrast-30pct);
    --vaadin-radio-button-dot-color: var(--lumo-primary-contrast-color);
    --vaadin-radio-button-dot-size: 3px;
    --vaadin-radio-button-label-color: var(--lumo-body-text-color);
    --vaadin-radio-button-label-font-size: var(--lumo-font-size-m);
    --vaadin-radio-button-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs)
      var(--lumo-space-xs);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-radio-button-disabled-background: var(--lumo-contrast-10pct);
    --vaadin-radio-button-disabled-dot-color: var(--lumo-contrast-30pct);
    --vaadin-selection-color: var(--lumo-primary-color);
    --vaadin-selection-color-text: var(--lumo-primary-text-color);
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
    --vaadin-focus-ring-color: var(--lumo-primary-color-50pct);
    --vaadin-focus-ring-width: 2px;
    /* Label */
    --vaadin-input-field-label-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-focused-label-color: var(--lumo-primary-text-color);
    --vaadin-input-field-hovered-label-color: var(--lumo-body-text-color);
    --vaadin-input-field-label-font-size: var(--lumo-font-size-s);
    --vaadin-input-field-label-font-weight: 500;
    /* Helper */
    --vaadin-input-field-helper-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-helper-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-helper-font-weight: 400;
    --vaadin-input-field-helper-spacing: 0.4em;
    /* Error message */
    --vaadin-input-field-error-color: var(--lumo-error-text-color);
    --vaadin-input-field-error-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-error-font-weight: 400;
    /* Input field */
    --vaadin-input-field-background: var(--lumo-contrast-10pct);
    --vaadin-input-field-icon-color: var(--lumo-contrast-60pct);
    --vaadin-input-field-icon-size: var(--lumo-icon-size-m);
    --vaadin-input-field-invalid-background: var(--lumo-error-color-10pct);
    --vaadin-input-field-invalid-hover-highlight: var(--lumo-error-color-50pct);
    --vaadin-input-field-disabled-background: var(--lumo-contrast-5pct);
    --vaadin-input-field-disabled-value-color: var(--lumo-disabled-text-color);
    --vaadin-input-field-height: var(--lumo-size-m);
    --vaadin-input-field-hover-highlight: var(--lumo-contrast-50pct);
    --vaadin-input-field-placeholder-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-readonly-border: 1px dashed var(--lumo-contrast-30pct);
    --vaadin-input-field-value-color: var(--lumo-body-text-color);
    --vaadin-input-field-value-font-size: var(--lumo-font-size-m);
    --vaadin-input-field-value-font-weight: 500;
  }
`,F("style-props",D);const M=t.i`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`;T("",t.i`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`,{moduleId:"lumo-typography"}),F("typography-props",M),T("vaadin-grid",t.i`
    :host {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      line-height: var(--lumo-line-height-s);
      color: var(--lumo-body-text-color);
      background-color: var(--lumo-base-color);
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
      --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
      /* For internal use only */
      --_lumo-grid-border-color: var(--lumo-contrast-20pct);
      --_lumo-grid-secondary-border-color: var(--lumo-contrast-10pct);
      --_lumo-grid-border-width: 1px;
      --_lumo-grid-selected-row-color: var(--lumo-primary-color-10pct);
    }

    /* No (outer) border */

    :host(:not([theme~='no-border'])) {
      border: var(--_lumo-grid-border-width) solid var(--_lumo-grid-border-color);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    /* Cell styles */

    [part~='cell'] {
      min-height: var(--lumo-size-m);
      background-color: var(--vaadin-grid-cell-background, var(--lumo-base-color));
      cursor: default;
      --_cell-padding: var(--vaadin-grid-cell-padding, var(--_cell-default-padding));
      --_cell-default-padding: var(--lumo-space-xs) var(--lumo-space-m);
    }

    [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      cursor: inherit;
      padding: var(--_cell-padding);
    }

    /* Apply row borders by default and introduce the "no-row-borders" variant */
    :host(:not([theme~='no-row-borders'])) [part~='cell']:not([part~='details-cell']) {
      border-top: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    /* Hide first body row top border */
    :host(:not([theme~='no-row-borders'])) [part~='first-row'] [part~='cell']:not([part~='details-cell']) {
      border-top: 0;
      min-height: calc(var(--lumo-size-m) - var(--_lumo-grid-border-width));
    }

    /* Focus-ring */

    [part~='row'] {
      position: relative;
    }

    [part~='row']:focus,
    [part~='focused-cell']:focus {
      outline: none;
    }

    :host([navigating]) [part~='row']:focus::before,
    :host([navigating]) [part~='focused-cell']:focus::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
    }

    :host([navigating]) [part~='row']:focus::before {
      transform: translateX(calc(-1 * var(--_grid-horizontal-scroll-position)));
      z-index: 3;
    }

    /* Empty state */
    [part~='empty-state'] {
      padding: var(--lumo-space-m);
      color: var(--lumo-secondary-text-color);
    }

    /* Drag and Drop styles */
    :host([dragover])::after {
      content: '';
      position: absolute;
      z-index: 100;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
    }

    [part~='row'][dragover] {
      z-index: 100 !important;
    }

    [part~='row'][dragover] [part~='cell'] {
      overflow: visible;
    }

    [part~='row'][dragover] [part~='cell']::after {
      content: '';
      position: absolute;
      inset: 0;
      height: calc(var(--_lumo-grid-border-width) + 2px);
      pointer-events: none;
      background: var(--lumo-primary-color-50pct);
    }

    [part~='row'][dragover] [part~='cell'][last-frozen]::after {
      right: -1px;
    }

    :host([theme~='no-row-borders']) [dragover] [part~='cell']::after {
      height: 2px;
    }

    [part~='row'][dragover='below'] [part~='cell']::after {
      top: 100%;
      bottom: auto;
      margin-top: -1px;
    }

    :host([all-rows-visible]) [part~='last-row'][dragover='below'] [part~='cell']::after {
      height: 1px;
    }

    [part~='row'][dragover='above'] [part~='cell']::after {
      top: auto;
      bottom: 100%;
      margin-bottom: -1px;
    }

    [part~='row'][details-opened][dragover='below'] [part~='cell']:not([part~='details-cell'])::after,
    [part~='row'][details-opened][dragover='above'] [part~='details-cell']::after {
      display: none;
    }

    [part~='row'][dragover][dragover='on-top'] [part~='cell']::after {
      height: 100%;
      opacity: 0.5;
    }

    [part~='row'][dragstart] [part~='cell'] {
      border: none !important;
      box-shadow: none !important;
    }

    [part~='row'][dragstart] [part~='cell'][last-column] {
      border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
    }

    [part~='row'][dragstart] [part~='cell'][first-column] {
      border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
    }

    #scroller [part~='row'][dragstart]:not([dragstart=''])::after {
      display: block;
      position: absolute;
      left: var(--_grid-drag-start-x);
      top: var(--_grid-drag-start-y);
      z-index: 100;
      content: attr(dragstart);
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: calc(var(--lumo-space-xs) * 0.8);
      color: var(--lumo-error-contrast-color);
      background-color: var(--lumo-error-color);
      border-radius: var(--lumo-border-radius-m);
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
      font-weight: 500;
      text-transform: initial;
      letter-spacing: initial;
      min-width: calc(var(--lumo-size-s) * 0.7);
      text-align: center;
    }

    /* Headers and footers */

    [part~='header-cell'],
    [part~='footer-cell'],
    [part~='reorder-ghost'] {
      font-size: var(--lumo-font-size-s);
      font-weight: 500;
    }

    [part~='footer-cell'] {
      font-weight: 400;
    }

    [part~='row']:only-child [part~='header-cell'] {
      min-height: var(--lumo-size-xl);
    }

    /* Header borders */

    /* Hide first header row top border */
    :host(:not([theme~='no-row-borders'])) [part~='row']:first-child [part~='header-cell'] {
      border-top: 0;
    }

    /* Hide header row top border if previous row is hidden */
    [part~='row'][hidden] + [part~='row'] [part~='header-cell'] {
      border-top: 0;
    }

    [part~='row']:last-child [part~='header-cell'] {
      border-bottom: var(--_lumo-grid-border-width) solid transparent;
    }

    :host(:not([theme~='no-row-borders'])) [part~='row']:last-child [part~='header-cell'] {
      border-bottom-color: var(--_lumo-grid-secondary-border-color);
    }

    /* Overflow uses a stronger border color */
    :host([overflow~='top']) [part~='row']:last-child [part~='header-cell'] {
      border-bottom-color: var(--_lumo-grid-border-color);
    }

    /* Footer borders */

    [part~='row']:first-child [part~='footer-cell'] {
      border-top: var(--_lumo-grid-border-width) solid transparent;
    }

    :host(:not([theme~='no-row-borders'])) [part~='row']:first-child [part~='footer-cell'] {
      border-top-color: var(--_lumo-grid-secondary-border-color);
    }

    /* Overflow uses a stronger border color */
    :host([overflow~='bottom']) [part~='row']:first-child [part~='footer-cell'] {
      border-top-color: var(--_lumo-grid-border-color);
    }

    /* Column reordering */

    :host([reordering]) [part~='cell'] {
      background: linear-gradient(var(--lumo-shade-20pct), var(--lumo-shade-20pct)) var(--lumo-base-color);
    }

    :host([reordering]) [part~='cell'][reorder-status='allowed'] {
      background: var(--lumo-base-color);
    }

    :host([reordering]) [part~='cell'][reorder-status='dragging'] {
      background: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct)) var(--lumo-base-color);
    }

    [part~='reorder-ghost'] {
      opacity: 0.85;
      box-shadow: var(--lumo-box-shadow-s);
      /* TODO Use the same styles as for the cell element (reorder-ghost copies styles from the cell element) */
      padding: var(--lumo-space-s) var(--lumo-space-m) !important;
    }

    /* Column resizing */

    [part='resize-handle'] {
      --_resize-handle-width: 3px;
      width: var(--_resize-handle-width);
      background-color: var(--lumo-primary-color-50pct);
      opacity: 0;
      transition: opacity 0.2s;
    }

    [part='resize-handle']::before {
      transform: translateX(calc(-50% + var(--_resize-handle-width) / 2));
      width: var(--lumo-size-s);
    }

    :host(:not([reordering])) *:not([column-resizing]) [part~='cell']:hover [part='resize-handle'],
    [part='resize-handle']:active {
      opacity: 1;
      transition-delay: 0.15s;
    }

    /* Column borders */

    :host([theme~='column-borders']) [part~='cell']:not([last-column]):not([part~='details-cell']) {
      border-right: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    /* Frozen columns */

    [last-frozen] {
      border-right: var(--_lumo-grid-border-width) solid transparent;
      overflow: hidden;
    }

    :host([overflow~='start']) [part~='cell'][last-frozen]:not([part~='details-cell']) {
      border-right-color: var(--_lumo-grid-border-color);
    }

    [first-frozen-to-end] {
      border-left: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([overflow~='end']) [part~='cell'][first-frozen-to-end]:not([part~='details-cell']) {
      border-left-color: var(--_lumo-grid-border-color);
    }

    /* Row stripes */

    :host([theme~='row-stripes']) [part~='even-row'] [part~='body-cell'],
    :host([theme~='row-stripes']) [part~='even-row'] [part~='details-cell'] {
      background-image: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
      background-repeat: repeat-x;
    }

    /* Selected row */

    /* Raise the selected rows above unselected rows (so that box-shadow can cover unselected rows) */
    :host(:not([reordering])) [part~='row'][selected] {
      z-index: 1;
    }

    :host(:not([reordering])) [part~='row'][selected] [part~='body-cell']:not([part~='details-cell']) {
      background-image: linear-gradient(var(--_lumo-grid-selected-row-color), var(--_lumo-grid-selected-row-color));
      background-repeat: repeat;
    }

    /* Cover the border of an unselected row */
    :host(:not([theme~='no-row-borders'])) [part~='row'][selected] [part~='cell']:not([part~='details-cell']) {
      box-shadow: 0 var(--_lumo-grid-border-width) 0 0 var(--_lumo-grid-selected-row-color);
    }

    /* Compact */

    :host([theme~='compact']) [part~='row']:only-child [part~='header-cell'] {
      min-height: var(--lumo-size-m);
    }

    :host([theme~='compact']) [part~='cell'] {
      min-height: var(--lumo-size-s);
      --_cell-default-padding: var(--lumo-space-xs) var(--lumo-space-s);
    }

    :host([theme~='compact']) [part~='first-row'] [part~='cell']:not([part~='details-cell']) {
      min-height: calc(var(--lumo-size-s) - var(--_lumo-grid-border-width));
    }

    :host([theme~='compact']) [part~='empty-state'] {
      padding: var(--lumo-space-s);
    }

    /* Wrap cell contents */

    :host([theme~='wrap-cell-content']) [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      white-space: normal;
    }

    /* RTL specific styles */

    :host([dir='rtl']) [part~='row'][dragstart] [part~='cell'][last-column] {
      border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
    }

    :host([dir='rtl']) [part~='row'][dragstart] [part~='cell'][first-column] {
      border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
    }

    :host([dir='rtl'][theme~='column-borders']) [part~='cell']:not([last-column]):not([part~='details-cell']) {
      border-right: none;
      border-left: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    :host([dir='rtl']) [last-frozen] {
      border-right: none;
      border-left: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([dir='rtl']) [first-frozen-to-end] {
      border-left: none;
      border-right: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([dir='rtl'][overflow~='start']) [part~='cell'][last-frozen]:not([part~='details-cell']) {
      border-left-color: var(--_lumo-grid-border-color);
    }

    :host([dir='rtl'][overflow~='end']) [part~='cell'][first-frozen-to-end]:not([part~='details-cell']) {
      border-right-color: var(--_lumo-grid-border-color);
    }
  `,{moduleId:"lumo-grid"}),window.JSCompiler_renameProperty=function(e,t){return e};let L,H,B=/(url\()([^)]*)(\))/g,V=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function G(e,t){if(e&&V.test(e))return e;if("//"===e)return e;if(void 0===L){L=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",L="http://a/c%20d"===e.href}catch(e){}}if(t||(t=document.baseURI||window.location.href),L)try{return new URL(e,t).href}catch(t){return e}return H||(H=document.implementation.createHTMLDocument("temp"),H.base=H.createElement("base"),H.head.appendChild(H.base),H.anchor=H.createElement("a"),H.body.appendChild(H.anchor)),H.base.href=t,H.anchor.href=e,H.anchor.href||e}function $(e,t){return e.replace(B,(function(e,i,r,o){return i+"'"+G(r.replace(/["']/g,""),t)+"'"+o}))}function W(e){return e.substring(0,e.lastIndexOf("/")+1)}const U=!window.ShadyDOM||!window.ShadyDOM.inUse;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss);const q=U&&"adoptedStyleSheets"in Document.prototype&&"replaceSync"in CSSStyleSheet.prototype&&(()=>{try{const e=new CSSStyleSheet;e.replaceSync("");const t=document.createElement("div");return t.attachShadow({mode:"open"}),t.shadowRoot.adoptedStyleSheets=[e],t.shadowRoot.adoptedStyleSheets[0]===e}catch(e){return!1}})();let j=window.Polymer&&window.Polymer.rootPath||W(document.baseURI||window.location.href),Y=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;window.Polymer&&window.Polymer.setPassiveTouchGestures;let K=window.Polymer&&window.Polymer.strictTemplatePolicy||!1,X=window.Polymer&&window.Polymer.allowTemplateFromDomModule||!1,J=window.Polymer&&window.Polymer.legacyOptimizations||!1,Z=window.Polymer&&window.Polymer.legacyWarnings||!1,Q=window.Polymer&&window.Polymer.syncInitialRender||!1,ee=window.Polymer&&window.Polymer.legacyUndefined||!1,te=window.Polymer&&window.Polymer.orderedComputed||!1,ie=window.Polymer&&window.Polymer.removeNestedTemplates||!1,re=window.Polymer&&window.Polymer.fastDomIf||!1;window.Polymer&&window.Polymer.suppressTemplateNotifications,window.Polymer&&window.Polymer.legacyNoObservedAttributes;let oe=window.Polymer&&window.Polymer.useAdoptedStyleSheetsWithBuiltCSS||!1,se=0;const ne=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let i=se++;return function(r){let o=r.__mixinSet;if(o&&o[i])return r;let s=t,n=s.get(r);if(!n){n=e(r),s.set(r,n);let t=Object.create(n.__mixinSet||o||null);t[i]=!0,n.__mixinSet=t}return n}};let ae={},le={};function de(e,t){ae[e]=le[e.toLowerCase()]=t}function he(e){return ae[e]||le[e.toLowerCase()]}class ce extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let i=he(e);return i&&t?i.querySelector(t):i}return null}attributeChangedCallback(e,t,i,r){t!==i&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=G(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=W(t)}return this.__assetpath}register(e){if(e=e||this.id){if(K&&void 0!==he(e))throw de(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,de(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}ce.prototype.modules=ae,customElements.define("dom-module",ce);const ue="shady-unscoped";function _e(e){return ce.import(e)}function pe(e){const t=$((e.body?e.body:e).textContent,e.baseURI),i=document.createElement("style");return i.textContent=t,i}function me(e){const t=e.trim().split(/\s+/),i=[];for(let e=0;e<t.length;e++)i.push(...ge(t[e]));return i}function ge(e){const t=_e(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...be(t));const i=t.querySelector("template");i&&e.push(...fe(i,t.assetpath)),t._styles=e}return t._styles}function fe(e,t){if(!e._styles){const i=[],r=e.content.querySelectorAll("style");for(let e=0;e<r.length;e++){let o=r[e],s=o.getAttribute("include");s&&i.push(...me(s).filter((function(e,t,i){return i.indexOf(e)===t}))),t&&(o.textContent=$(o.textContent,t)),i.push(o)}e._styles=i}return e._styles}function be(e){const t=[],i=e.querySelectorAll("link[rel=import][type~=css]");for(let e=0;e<i.length;e++){let r=i[e];if(r.import){const e=r.import,i=r.hasAttribute(ue);if(i&&!e._unscopedStyle){const t=pe(e);t.setAttribute(ue,""),e._unscopedStyle=t}else e._style||(e._style=pe(e));t.push(i?e._unscopedStyle:e._style)}}return t}const ve=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?e=>ShadyDOM.patch(e):e=>e;function ye(e){return e.indexOf(".")>=0}function Ce(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function we(e,t){return 0===t.indexOf(e+".")}function Ae(e,t,i){return t+i.slice(e.length)}function xe(e){if(Array.isArray(e)){let t=[];for(let i=0;i<e.length;i++){let r=e[i].toString().split(".");for(let e=0;e<r.length;e++)t.push(r[e])}return t.join(".")}return e}function Se(e){return Array.isArray(e)?xe(e).split("."):e.toString().split(".")}function Ee(e,t,i){let r=e,o=Se(t);for(let e=0;e<o.length;e++){if(!r)return;r=r[o[e]]}return i&&(i.path=o.join(".")),r}function Ie(e,t,i){let r=e,o=Se(t),s=o[o.length-1];if(o.length>1){for(let e=0;e<o.length-1;e++)if(r=r[o[e]],!r)return;r[s]=i}else r[t]=i;return o.join(".")}const Pe={},Te=/-[a-z]/g,ze=/([A-Z])/g;function ke(e){return Pe[e]||(Pe[e]=e.indexOf("-")<0?e:e.replace(Te,(e=>e[1].toUpperCase())))}function Re(e){return Pe[e]||(Pe[e]=e.replace(ze,"-$1").toLowerCase())}let Oe=0,Ne=0,Fe=[],De=0,Me=!1,Le=document.createTextNode("");new window.MutationObserver((function(){Me=!1;const e=Fe.length;for(let t=0;t<e;t++){let e=Fe[t];if(e)try{e()}catch(e){setTimeout((()=>{throw e}))}}Fe.splice(0,e),Ne+=e})).observe(Le,{characterData:!0});const He={run:e=>(Me||(Me=!0,Le.textContent=De++),Fe.push(e),Oe++),cancel(e){const t=e-Ne;if(t>=0){if(!Fe[t])throw new Error("invalid async handle: "+e);Fe[t]=null}}},Be=ne((e=>class extends e{static createProperties(e){const t=this.prototype;for(let i in e)i in t||t._createPropertyAccessor(i)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor",this))||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes",this))||(this.__dataAttributes=Object.assign({},this.__dataAttributes));let t=this.__dataAttributes[e];return t||(t=this.constructor.attributeNameForProperty(e),this.__dataAttributes[t]=e),t}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this.__data[e]},set:t?function(){}:function(t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__dataCounter=0,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,i){let r=this.__data[e],o=this._shouldPropertyChange(e,t,r);return o&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),this.__dataOld&&!(e in this.__dataOld)&&(this.__dataOld[e]=r),this.__data[e]=t,this.__dataPending[e]=t),o}_isPropertyPending(e){return!(!this.__dataPending||!this.__dataPending.hasOwnProperty(e))}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,He.run((()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())})))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){this.__dataCounter++;const e=this.__data,t=this.__dataPending,i=this.__dataOld;this._shouldPropertiesChange(e,t,i)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,i)),this.__dataCounter--}_shouldPropertiesChange(e,t,i){return Boolean(t)}_propertiesChanged(e,t,i){}_shouldPropertyChange(e,t,i){return i!==t&&(i==i||t==t)}attributeChangedCallback(e,t,i,r){t!==i&&this._attributeToProperty(e,i),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,i,r)}_attributeToProperty(e,t,i){if(!this.__serializing){const r=this.__dataAttributes,o=r&&r[e]||e;this[o]=this._deserializeValue(t,i||this.constructor.typeForProperty(o))}}_propertyToAttribute(e,t,i){this.__serializing=!0,i=arguments.length<3?this[e]:i,this._valueToNodeAttribute(this,i,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,i){const r=this._serializeValue(t);"class"!==i&&"name"!==i&&"slot"!==i||(e=ve(e)),void 0===r?e.removeAttribute(i):e.setAttribute(i,""===r&&window.trustedTypes?window.trustedTypes.emptyScript:r)}_serializeValue(e){return"boolean"==typeof e?e?"":void 0:null!=e?e.toString():void 0}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}})),Ve={};let Ge=HTMLElement.prototype;for(;Ge;){let e=Object.getOwnPropertyNames(Ge);for(let t=0;t<e.length;t++)Ve[e[t]]=!0;Ge=Object.getPrototypeOf(Ge)}const $e=window.trustedTypes?e=>trustedTypes.isHTML(e)||trustedTypes.isScript(e)||trustedTypes.isScriptURL(e):()=>!1,We=ne((e=>{const t=Be(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(ke(e[t]))}static attributeNameForProperty(e){return Re(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){this.hasAttribute(e)||this._valueToNodeAttribute(this,t,e)}_serializeValue(e){if("object"==typeof e){if(e instanceof Date)return e.toString();if(e){if($e(e))return e;try{return JSON.stringify(e)}catch(e){return""}}}return super._serializeValue(e)}_deserializeValue(e,t){let i;switch(t){case Object:try{i=JSON.parse(e)}catch(t){i=e}break;case Array:try{i=JSON.parse(e)}catch(t){i=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:i=isNaN(e)?String(e):Number(e),i=new Date(i);break;default:i=super._deserializeValue(e,t)}return i}_definePropertyAccessor(e,t){!function(e,t){if(!Ve[t]){let i=e[t];void 0!==i&&(e.__data?e._setPendingProperty(t,i):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=i))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}})),Ue={"dom-if":!0,"dom-repeat":!0};let qe=!1,je=!1;const Ye=(()=>{const e=window.trustedTypes&&window.trustedTypes.createPolicy("polymer-template-event-attribute-policy",{createScript:e=>e});return(t,i,r)=>{const o=i.getAttribute(r);e&&r.startsWith("on-")?t.setAttribute(r,e.createScript(o,r)):t.setAttribute(r,o)}})();function Ke(e){let t=e.getAttribute("is");if(t&&Ue[t]){let i=e;for(i.removeAttribute("is"),e=i.ownerDocument.createElement(t),i.parentNode.replaceChild(e,i),e.appendChild(i);i.attributes.length;){const{name:t}=i.attributes[0];Ye(e,i,t),i.removeAttribute(t)}}return e}function Xe(e,t){let i=t.parentInfo&&Xe(e,t.parentInfo);if(!i)return e;for(let e=i.firstChild,r=0;e;e=e.nextSibling)if(t.parentIndex===r++)return e}function Je(e,t,i,r){r.id&&(t[r.id]=i)}function Ze(e,t,i){if(i.events&&i.events.length)for(let r,o=0,s=i.events;o<s.length&&(r=s[o]);o++)e._addMethodEventListenerToNode(t,r.name,r.value,e)}function Qe(e,t,i,r){i.templateInfo&&(t._templateInfo=i.templateInfo,t._parentTemplateInfo=r)}const et=ne((e=>class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let i=e._templateInfo={};i.nodeInfoList=[],i.nestedTemplate=Boolean(t),i.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute&&e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,i,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,i){return this._parseTemplateNode(e.content,t,i)}static _parseTemplateNode(e,t,i){let r=!1,o=e;return"template"!=o.localName||o.hasAttribute("preserve-content")?"slot"===o.localName&&(t.hasInsertionPoint=!0):r=this._parseTemplateNestedTemplate(o,t,i)||r,function(e){(function(){if(!qe){qe=!0;const e=document.createElement("textarea");e.placeholder="a",je=e.placeholder===e.textContent}return je})()&&"textarea"===e.localName&&e.placeholder&&e.placeholder===e.textContent&&(e.textContent=null)}(o),o.firstChild&&this._parseTemplateChildNodes(o,t,i),o.hasAttributes&&o.hasAttributes()&&(r=this._parseTemplateNodeAttributes(o,t,i)||r),r||i.noted}static _parseTemplateChildNodes(e,t,i){if("script"!==e.localName&&"style"!==e.localName)for(let r,o=e.firstChild,s=0;o;o=r){if("template"==o.localName&&(o=Ke(o)),r=o.nextSibling,o.nodeType===Node.TEXT_NODE){let i=r;for(;i&&i.nodeType===Node.TEXT_NODE;)o.textContent+=i.textContent,r=i.nextSibling,e.removeChild(i),i=r;if(t.stripWhiteSpace&&!o.textContent.trim()){e.removeChild(o);continue}}let n={parentIndex:s,parentInfo:i};this._parseTemplateNode(o,t,n)&&(n.infoIndex=t.nodeInfoList.push(n)-1),o.parentNode&&s++}}static _parseTemplateNestedTemplate(e,t,i){let r=e,o=this._parseTemplate(r,t);return(o.content=r.content.ownerDocument.createDocumentFragment()).appendChild(r.content),i.templateInfo=o,!0}static _parseTemplateNodeAttributes(e,t,i){let r=!1,o=Array.from(e.attributes);for(let s,n=o.length-1;s=o[n];n--)r=this._parseTemplateNodeAttribute(e,t,i,s.name,s.value)||r;return r}static _parseTemplateNodeAttribute(e,t,i,r,o){return"on-"===r.slice(0,3)?(e.removeAttribute(r),i.events=i.events||[],i.events.push({name:r.slice(3),value:o}),!0):"id"===r&&(i.id=o,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e,t){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let i=(t=t||this.constructor._parseTemplate(e)).nodeInfoList,r=t.content||e.content,o=document.importNode(r,!0);o.__noInsertionPoint=!t.hasInsertionPoint;let s=o.nodeList=new Array(i.length);o.$={};for(let e,r=0,n=i.length;r<n&&(e=i[r]);r++){let i=s[r]=Xe(o,e);Je(0,o.$,i,e),Qe(0,i,e,t),Ze(this,i,e)}return o}_addMethodEventListenerToNode(e,t,i,r){let o=function(e,t,i){return e=e._methodHost||e,function(t){e[i]?e[i](t,t.detail):console.warn("listener method `"+i+"` not defined")}}(r=r||e,0,i);return this._addEventListenerToNode(e,t,o),o}_addEventListenerToNode(e,t,i){e.addEventListener(t,i)}_removeEventListenerFromNode(e,t,i){e.removeEventListener(t,i)}}));let tt=0;const it=[],rt={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},ot="__computeInfo",st=/[A-Z]/;function nt(e,t,i){let r=e[t];if(r){if(!e.hasOwnProperty(t)&&(r=e[t]=Object.create(e[t]),i))for(let e in r){let t=r[e],i=r[e]=Array(t.length);for(let e=0;e<t.length;e++)i[e]=t[e]}}else r=e[t]={};return r}function at(e,t,i,r,o,s){if(t){let n=!1;const a=tt++;for(let l in i){let d=t[o?Ce(l):l];if(d)for(let t,h=0,c=d.length;h<c&&(t=d[h]);h++)t.info&&t.info.lastRun===a||o&&!dt(l,t.trigger)||(t.info&&(t.info.lastRun=a),t.fn(e,l,i,r,t.info,o,s),n=!0)}return n}return!1}function lt(e,t,i,r,o,s,n,a){let l=!1,d=t[n?Ce(r):r];if(d)for(let t,h=0,c=d.length;h<c&&(t=d[h]);h++)t.info&&t.info.lastRun===i||n&&!dt(r,t.trigger)||(t.info&&(t.info.lastRun=i),t.fn(e,r,o,s,t.info,n,a),l=!0);return l}function dt(e,t){if(t){let i=t.name;return i==e||!(!t.structured||!function(e,t){return 0===e.indexOf(t+".")}(i,e))||!(!t.wildcard||!we(i,e))}return!0}function ht(e,t,i,r,o){let s="string"==typeof o.method?e[o.method]:o.method,n=o.property;s?s.call(e,e.__data[n],r[n]):o.dynamicFn||console.warn("observer method `"+o.method+"` not defined")}function ct(e,t,i){let r=Ce(t);return r!==t&&(ut(e,Re(r)+"-changed",i[t],t),!0)}function ut(e,t,i,r){let o={value:i,queueProperty:!0};r&&(o.path=r),ve(e).dispatchEvent(new CustomEvent(t,{detail:o}))}function _t(e,t,i,r,o,s){let n=(s?Ce(t):t)!=t?t:null,a=n?Ee(e,n):e.__data[t];n&&void 0===a&&(a=i[t]),ut(e,o.eventName,a,n)}function pt(e,t,i,r,o){let s=e.__data[t];Y&&(s=Y(s,o.attrName,"attribute",e)),e._propertyToAttribute(t,o.attrName,s)}const mt=(e,t,i)=>{let r=0,o=t.length-1,s=-1;for(;r<=o;){const n=r+o>>1,a=i.get(t[n].methodInfo)-i.get(e.methodInfo);if(a<0)r=n+1;else{if(!(a>0)){s=n;break}o=n-1}}s<0&&(s=o+1),t.splice(s,0,e)},gt=(e,t,i,r,o)=>{const s=t[o?Ce(e):e];if(s)for(let t=0;t<s.length;t++){const n=s[t];n.info.lastRun===tt||o&&!dt(e,n.trigger)||(n.info.lastRun=tt,mt(n.info,i,r))}};function ft(e,t,i,r,o){let s=xt(e,t,i,0,o);if(s===it)return!1;let n=o.methodInfo;return e.__dataHasAccessor&&e.__dataHasAccessor[n]?e._setPendingProperty(n,s,!0):(e[n]=s,!1)}function bt(e,t,i,r,o,s,n){i.bindings=i.bindings||[];let a={kind:r,target:o,parts:s,literal:n,isCompound:1!==s.length};if(i.bindings.push(a),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(a)){let{event:e,negate:t}=a.parts[0];a.listenerEvent=e||Re(o)+"-changed",a.listenerNegate=t}let l=t.nodeInfoList.length;for(let i=0;i<a.parts.length;i++){let r=a.parts[i];r.compoundIndex=i,vt(e,t,a,r,l)}}function vt(e,t,i,r,o){if(!r.literal)if("attribute"===i.kind&&"-"===i.target[0])console.warn("Cannot set attribute "+i.target+' because "-" is not a valid attribute starting character');else{let s=r.dependencies,n={index:o,binding:i,part:r,evaluator:e};for(let i=0;i<s.length;i++){let r=s[i];"string"==typeof r&&(r=kt(r),r.wildcard=!0),e._addTemplatePropertyEffect(t,r.rootProperty,{fn:yt,info:n,trigger:r})}}}function yt(e,t,i,r,o,s,n){let a=n[o.index],l=o.binding,d=o.part;if(s&&d.source&&t.length>d.source.length&&"property"==l.kind&&!l.isCompound&&a.__isPropertyEffectsClient&&a.__dataHasAccessor&&a.__dataHasAccessor[l.target]){let r=i[t];t=Ae(d.source,l.target,t),a._setPendingPropertyOrPath(t,r,!1,!0)&&e._enqueueClient(a)}else{let n=o.evaluator._evaluateBinding(e,d,t,i,r,s);n!==it&&function(e,t,i,r,o){if(o=function(e,t,i,r){if(i.isCompound){let o=e.__dataCompoundStorage[i.target];o[r.compoundIndex]=t,t=o.join("")}return"attribute"!==i.kind&&("textContent"!==i.target&&("value"!==i.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=t??"")),t}(t,o,i,r),Y&&(o=Y(o,i.target,i.kind,t)),"attribute"==i.kind)e._valueToNodeAttribute(t,o,i.target);else{let r=i.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[r]?t[rt.READ_ONLY]&&t[rt.READ_ONLY][r]||t._setPendingProperty(r,o)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,r,o)}}(e,a,l,d,n)}}function Ct(e,t){if(t.isCompound){let i=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),r=t.parts,o=new Array(r.length);for(let e=0;e<r.length;e++)o[e]=r[e].literal;let s=t.target;i[s]=o,t.literal&&"property"==t.kind&&("className"===s&&(e=ve(e)),e[s]=t.literal)}}function wt(e,t,i){if(i.listenerEvent){let r=i.parts[0];e.addEventListener(i.listenerEvent,(function(e){!function(e,t,i,r,o){let s,n=e.detail,a=n&&n.path;a?(r=Ae(i,r,a),s=n&&n.value):s=e.currentTarget[i],s=o?!s:s,t[rt.READ_ONLY]&&t[rt.READ_ONLY][r]||!t._setPendingPropertyOrPath(r,s,!0,Boolean(a))||n&&n.queueProperty||t._invalidateProperties()}(e,t,i.target,r.source,r.negate)}))}}function At(e,t,i,r,o,s){s=t.static||s&&("object"!=typeof s||s[t.methodName]);let n={methodName:t.methodName,args:t.args,methodInfo:o,dynamicFn:s};for(let o,s=0;s<t.args.length&&(o=t.args[s]);s++)o.literal||e._addPropertyEffect(o.rootProperty,i,{fn:r,info:n,trigger:o});return s&&e._addPropertyEffect(t.methodName,i,{fn:r,info:n}),n}function xt(e,t,i,r,o){let s=e._methodHost||e,n=s[o.methodName];if(n){let r=e._marshalArgs(o.args,t,i);return r===it?it:n.apply(s,r)}o.dynamicFn||console.warn("method `"+o.methodName+"` not defined")}const St=[],Et="(?:[a-zA-Z_$][\\w.:$\\-*]*)",It="(?:("+Et+"|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)",Pt=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?("+Et+"\\s*(?:\\(\\s*(?:(?:"+It+"(?:,\\s*"+It+")*)?)\\)\\s*)?)(?:]]|}})","g");function Tt(e){let t="";for(let i=0;i<e.length;i++)t+=e[i].literal||"";return t}function zt(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:St};return t[2].trim()?function(e,t){return t.args=e.map((function(e){let i=kt(e);return i.literal||(t.static=!1),i}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e):e}return null}function kt(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),i={name:t,value:"",literal:!1},r=t[0];switch("-"===r&&(r=t[1]),r>="0"&&r<="9"&&(r="#"),r){case"'":case'"':i.value=t.slice(1,-1),i.literal=!0;break;case"#":i.value=Number(t),i.literal=!0}return i.literal||(i.rootProperty=Ce(t),i.structured=ye(t),i.structured&&(i.wildcard=".*"==t.slice(-2),i.wildcard&&(i.name=t.slice(0,-2)))),i}function Rt(e,t,i){let r=Ee(e,i);return void 0===r&&(r=t[i]),r}function Ot(e,t,i,r){const o={indexSplices:r};ee&&!e._overrideLegacyUndefined&&(t.splices=o),e.notifyPath(i+".splices",o),e.notifyPath(i+".length",t.length),ee&&!e._overrideLegacyUndefined&&(o.indexSplices=[])}function Nt(e,t,i,r,o,s){Ot(e,t,i,[{index:r,addedCount:o,removed:s,object:t,type:"splice"}])}const Ft=ne((e=>{const t=et(We(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__computeInfo,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo,this._overrideLegacyUndefined}get PROPERTY_EFFECT_TYPES(){return rt}_initializeProperties(){super._initializeProperties(),this._registerHost(),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_registerHost(){if(Dt.length){let e=Dt[Dt.length-1];e._enqueueClient(this),this.__dataHost=e}}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[rt.READ_ONLY];for(let i in e)t&&t[i]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[i]=this.__dataPending[i]=e[i])}_addPropertyEffect(e,t,i){this._createPropertyAccessor(e,t==rt.READ_ONLY);let r=nt(this,t,!0)[e];r||(r=this[t][e]=[]),r.push(i)}_removePropertyEffect(e,t,i){let r=nt(this,t,!0)[e],o=r.indexOf(i);o>=0&&r.splice(o,1)}_hasPropertyEffect(e,t){let i=this[t];return Boolean(i&&i[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,rt.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,rt.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,rt.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,rt.COMPUTE)}_setPendingPropertyOrPath(e,t,i,r){if(r||Ce(Array.isArray(e)?e[0]:e)!==e){if(!r){let i=Ee(this,e);if(!(e=Ie(this,e,t))||!super._shouldPropertyChange(e,t,i))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,i))return function(e,t,i){let r=e.__dataLinkedPaths;if(r){let o;for(let s in r){let n=r[s];we(s,t)?(o=Ae(s,n,t),e._setPendingPropertyOrPath(o,i,!0,!0)):we(n,t)&&(o=Ae(n,s,t),e._setPendingPropertyOrPath(o,i,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,i);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,i){i===e[t]&&"object"!=typeof i||("className"===t&&(e=ve(e)),e[t]=i)}_setPendingProperty(e,t,i){let r=this.__dataHasPaths&&ye(e),o=r?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,o[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),r?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(r||this[rt.NOTIFY]&&this[rt.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=i),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let i=e[t];i.__dataEnabled?i.__dataPending&&i._flushProperties():i._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let i in e)!t&&this[rt.READ_ONLY]&&this[rt.READ_ONLY][i]||this._setPendingPropertyOrPath(i,e[i],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,i){let r,o=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,i,r){let o=e[rt.COMPUTE];if(o)if(te){tt++;const s=function(e){let t=e.constructor.__orderedComputedDeps;if(!t){t=new Map;const i=e[rt.COMPUTE];let r,{counts:o,ready:s,total:n}=function(e){const t=e[ot],i={},r=e[rt.COMPUTE],o=[];let s=0;for(let e in t){const r=t[e];s+=i[e]=r.args.filter((e=>!e.literal)).length+(r.dynamicFn?1:0)}for(let e in r)t[e]||o.push(e);return{counts:i,ready:o,total:s}}(e);for(;r=s.shift();){t.set(r,t.size);const e=i[r];e&&e.forEach((e=>{const t=e.info.methodInfo;--n,0===--o[t]&&s.push(t)}))}if(0!==n){const t=e;console.warn(`Computed graph for ${t.localName} incomplete; circular?`)}e.constructor.__orderedComputedDeps=t}return t}(e),n=[];for(let e in t)gt(e,o,n,s,r);let a;for(;a=n.shift();)ft(e,"",t,0,a)&&gt(a.methodInfo,o,n,s,r);Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),e.__dataPending=null}else{let s=t;for(;at(e,o,s,i,r);)Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),s=e.__dataPending,e.__dataPending=null}}(this,t,i,o),r=this.__dataToNotify,this.__dataToNotify=null,this._propagatePropertyChanges(t,i,o),this._flushClients(),at(this,this[rt.REFLECT],t,i,o),at(this,this[rt.OBSERVE],t,i,o),r&&function(e,t,i,r,o){let s,n,a=e[rt.NOTIFY],l=tt++;for(let n in t)t[n]&&(a&&lt(e,a,l,n,i,r,o)||o&&ct(e,n,i))&&(s=!0);s&&(n=e.__dataHost)&&n._invalidateProperties&&n._invalidateProperties()}(this,r,t,i,o),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,i){this[rt.PROPAGATE]&&at(this,this[rt.PROPAGATE],e,t,i),this.__templateInfo&&this._runEffectsForTemplate(this.__templateInfo,e,t,i)}_runEffectsForTemplate(e,t,i,r){const o=(t,r)=>{at(this,e.propertyEffects,t,i,r,e.nodeList);for(let o=e.firstChild;o;o=o.nextSibling)this._runEffectsForTemplate(o,t,i,r)};e.runEffects?e.runEffects(o,t,r):o(t,r)}linkPaths(e,t){e=xe(e),t=xe(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=xe(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let i={path:""};Ot(this,Ee(this,e,i),i.path,t)}get(e,t){return Ee(t||this,e)}set(e,t,i){i?Ie(i,e,t):this[rt.READ_ONLY]&&this[rt.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let i={path:""},r=Ee(this,e,i),o=r.length,s=r.push(...t);return t.length&&Nt(this,r,i.path,o,t.length,[]),s}pop(e){let t={path:""},i=Ee(this,e,t),r=Boolean(i.length),o=i.pop();return r&&Nt(this,i,t.path,i.length,0,[o]),o}splice(e,t,i,...r){let o,s={path:""},n=Ee(this,e,s);return t<0?t=n.length-Math.floor(-t):t&&(t=Math.floor(t)),o=2===arguments.length?n.splice(t):n.splice(t,i,...r),(r.length||o.length)&&Nt(this,n,s.path,t,r.length,o),o}shift(e){let t={path:""},i=Ee(this,e,t),r=Boolean(i.length),o=i.shift();return r&&Nt(this,i,t.path,0,0,[o]),o}unshift(e,...t){let i={path:""},r=Ee(this,e,i),o=r.unshift(...t);return t.length&&Nt(this,r,i.path,0,t.length,[]),o}notifyPath(e,t){let i;if(1==arguments.length){let r={path:""};t=Ee(this,e,r),i=r.path}else i=Array.isArray(e)?xe(e):e;this._setPendingPropertyOrPath(i,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var i;this._addPropertyEffect(e,rt.READ_ONLY),t&&(this["_set"+(i=e,i[0].toUpperCase()+i.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,i){let r={property:e,method:t,dynamicFn:Boolean(i)};this._addPropertyEffect(e,rt.OBSERVE,{fn:ht,info:r,trigger:{name:e}}),i&&this._addPropertyEffect(t,rt.OBSERVE,{fn:ht,info:r,trigger:{name:t}})}_createMethodObserver(e,t){let i=zt(e);if(!i)throw new Error("Malformed observer expression '"+e+"'");At(this,i,rt.OBSERVE,xt,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,rt.NOTIFY,{fn:_t,info:{eventName:Re(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,rt.REFLECT,{fn:pt,info:{attrName:t}})}_createComputedProperty(e,t,i){let r=zt(t);if(!r)throw new Error("Malformed computed expression '"+t+"'");const o=At(this,r,rt.COMPUTE,ft,e,i);nt(this,ot)[e]=o}_marshalArgs(e,t,i){const r=this.__data,o=[];for(let s=0,n=e.length;s<n;s++){let{name:n,structured:a,wildcard:l,value:d,literal:h}=e[s];if(!h)if(l){const e=we(n,t),o=Rt(r,i,e?t:n);d={path:e?t:n,value:o,base:e?Ee(r,n):o}}else d=a?Rt(r,i,n):r[n];if(ee&&!this._overrideLegacyUndefined&&void 0===d&&e.length>1)return it;o[s]=d}return o}static addPropertyEffect(e,t,i){this.prototype._addPropertyEffect(e,t,i)}static createPropertyObserver(e,t,i){this.prototype._createPropertyObserver(e,t,i)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,i){this.prototype._createComputedProperty(e,t,i)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let i=this.constructor._parseTemplate(e),r=this.__preBoundTemplateInfo==i;if(!r)for(let e in i.propertyEffects)this._createPropertyAccessor(e);if(t)if(i=Object.create(i),i.wasPreBound=r,this.__templateInfo){const t=e._parentTemplateInfo||this.__templateInfo,r=t.lastChild;i.parent=t,t.lastChild=i,i.previousSibling=r,r?r.nextSibling=i:t.firstChild=i}else this.__templateInfo=i;else this.__preBoundTemplateInfo=i;return i}static _addTemplatePropertyEffect(e,t,i){(e.hostProps=e.hostProps||{})[t]=!0;let r=e.propertyEffects=e.propertyEffects||{};(r[t]=r[t]||[]).push(i)}_stampTemplate(e,t){t=t||this._bindTemplate(e,!0),Dt.push(this);let i=super._stampTemplate(e,t);if(Dt.pop(),t.nodeList=i.nodeList,!t.wasPreBound){let e=t.childNodes=[];for(let t=i.firstChild;t;t=t.nextSibling)e.push(t)}return i.templateInfo=t,function(e,t){let{nodeList:i,nodeInfoList:r}=t;if(r.length)for(let t=0;t<r.length;t++){let o=r[t],s=i[t],n=o.bindings;if(n)for(let t=0;t<n.length;t++){let i=n[t];Ct(s,i),wt(s,e,i)}s.__dataHost=e}}(this,t),this.__dataClientsReady&&(this._runEffectsForTemplate(t,this.__data,null,!1),this._flushClients()),i}_removeBoundDom(e){const t=e.templateInfo,{previousSibling:i,nextSibling:r,parent:o}=t;i?i.nextSibling=r:o&&(o.firstChild=r),r?r.previousSibling=i:o&&(o.lastChild=i),t.nextSibling=t.previousSibling=null;let s=t.childNodes;for(let e=0;e<s.length;e++){let t=s[e];ve(ve(t).parentNode).removeChild(t)}}static _parseTemplateNode(e,i,r){let o=t._parseTemplateNode.call(this,e,i,r);if(e.nodeType===Node.TEXT_NODE){let t=this._parseBindings(e.textContent,i);t&&(e.textContent=Tt(t)||" ",bt(this,i,r,"text","textContent",t),o=!0)}return o}static _parseTemplateNodeAttribute(e,i,r,o,s){let n=this._parseBindings(s,i);if(n){let t=o,s="property";st.test(o)?s="attribute":"$"==o[o.length-1]&&(o=o.slice(0,-1),s="attribute");let a=Tt(n);return a&&"attribute"==s&&("class"==o&&e.hasAttribute("class")&&(a+=" "+e.getAttribute(o)),e.setAttribute(o,a)),"attribute"==s&&"disable-upgrade$"==t&&e.setAttribute(o,""),"input"===e.localName&&"value"===t&&e.setAttribute(t,""),e.removeAttribute(t),"property"===s&&(o=ke(o)),bt(this,i,r,s,o,n,a),!0}return t._parseTemplateNodeAttribute.call(this,e,i,r,o,s)}static _parseTemplateNestedTemplate(e,i,r){let o=t._parseTemplateNestedTemplate.call(this,e,i,r);const s=e.parentNode,n=r.templateInfo,a="dom-if"===s.localName,l="dom-repeat"===s.localName;ie&&(a||l)&&(s.removeChild(e),(r=r.parentInfo).templateInfo=n,r.noted=!0,o=!1);let d=n.hostProps;if(re&&a)d&&(i.hostProps=Object.assign(i.hostProps||{},d),ie||(r.parentInfo.noted=!0));else{let e="{";for(let t in d)bt(this,i,r,"property","_host_"+t,[{mode:e,source:t,dependencies:[t],hostProp:!0}])}return o}static _parseBindings(e,t){let i,r=[],o=0;for(;null!==(i=Pt.exec(e));){i.index>o&&r.push({literal:e.slice(o,i.index)});let s=i[1][0],n=Boolean(i[2]),a=i[3].trim(),l=!1,d="",h=-1;"{"==s&&(h=a.indexOf("::"))>0&&(d=a.substring(h+2),a=a.substring(0,h),l=!0);let c=zt(a),u=[];if(c){let{args:e,methodName:i}=c;for(let t=0;t<e.length;t++){let i=e[t];i.literal||u.push(i)}let r=t.dynamicFns;(r&&r[i]||c.static)&&(u.push(i),c.dynamicFn=!0)}else u.push(a);r.push({source:a,mode:s,negate:n,customEvent:l,signature:c,dependencies:u,event:d}),o=Pt.lastIndex}if(o&&o<e.length){let t=e.substring(o);t&&r.push({literal:t})}return r.length?r:null}static _evaluateBinding(e,t,i,r,o,s){let n;return n=t.signature?xt(e,i,r,0,t.signature):i!=t.source?Ee(e,t.source):s&&ye(i)?Ee(e,i):e.__data[i],t.negate&&(n=!n),n}}})),Dt=[],Mt=ne((e=>{const t=Be(e);function i(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof o?t:null}function r(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const i=e.properties;i&&(t=function(e){const t={};for(let i in e){const r=e[i];t[i]="function"==typeof r?{type:r}:r}return t}(i))}e.__ownProperties=t}return e.__ownProperties}class o extends t{static get observedAttributes(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))){this.prototype;const e=this._properties;this.__observedAttributes=e?Object.keys(e).map((e=>this.prototype._addPropertyToAttributeMap(e))):[]}return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=i(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=r(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=i(this);this.__properties=Object.assign({},e&&e._properties,r(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return o})),Lt=window.ShadyCSS&&window.ShadyCSS.cssBuild,Ht=ne((e=>{const t=Mt(Ft(e));function i(e,t,i,r){i.computed&&(i.readOnly=!0),i.computed&&(e._hasReadOnlyEffect(t)?console.warn(`Cannot redefine computed property '${t}'.`):e._createComputedProperty(t,i.computed,r)),i.readOnly&&!e._hasReadOnlyEffect(t)?e._createReadOnlyProperty(t,!i.computed):!1===i.readOnly&&e._hasReadOnlyEffect(t)&&console.warn(`Cannot make readOnly property '${t}' non-readOnly.`),i.reflectToAttribute&&!e._hasReflectEffect(t)?e._createReflectedProperty(t):!1===i.reflectToAttribute&&e._hasReflectEffect(t)&&console.warn(`Cannot make reflected property '${t}' non-reflected.`),i.notify&&!e._hasNotifyEffect(t)?e._createNotifyingProperty(t):!1===i.notify&&e._hasNotifyEffect(t)&&console.warn(`Cannot make notify property '${t}' non-notify.`),i.observer&&e._createPropertyObserver(t,i.observer,r[i.observer]),e._addPropertyToAttributeMap(t)}return class extends t{static get polymerElementVersion(){return"3.5.2"}static _finalizeClass(){t._finalizeClass.call(this);const e=((i=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",i))||(i.__ownObservers=i.hasOwnProperty(JSCompiler_renameProperty("observers",i))?i.observers:null),i.__ownObservers);var i;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):J||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let t in e)i(this.prototype,t,e[t],e)}static createObservers(e,t){const i=this.prototype;for(let r=0;r<e.length;r++)i._createMethodObserver(e[r],t)}static get template(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_template",this))){let e=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:void 0;"function"==typeof e&&(e=e()),this._template=void 0!==e?e:this.hasOwnProperty(JSCompiler_renameProperty("is",this))&&function(e){let t=null;if(e&&(!K||X)&&(t=ce.import(e,"template"),K&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template}return this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=W(e.url);else{const e=ce.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=j,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let i in t){let r=t[i];"value"in r&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[i]=r)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let i=e[t];if(this._canApplyPropertyDefault(t)){let e="function"==typeof i.value?i.value.call(this):i.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}_canApplyPropertyDefault(e){return!this.hasOwnProperty(e)}static _processStyleText(e,t){return $(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const i=this.importPath;(function(e,t,i,r){if(!Lt){const o=t.content.querySelectorAll("style"),s=fe(t),n=function(e){let t=_e(e);return t?be(t):[]}(i),a=t.content.firstElementChild;for(let i=0;i<n.length;i++){let o=n[i];o.textContent=e._processStyleText(o.textContent,r),t.content.insertBefore(o,a)}let l=0;for(let t=0;t<s.length;t++){let i=s[t],n=o[l];n!==i?(i=i.cloneNode(!0),n.parentNode.insertBefore(i,n)):l++,i.textContent=e._processStyleText(i.textContent,r)}}if(window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,i),oe&&Lt&&q){const i=t.content.querySelectorAll("style");if(i){let t="";Array.from(i).forEach((e=>{t+=e.textContent,e.parentNode.removeChild(e)})),e._styleSheet=new CSSStyleSheet,e._styleSheet.replaceSync(t)}}})(this,t,e,i?G(i):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=ve(this);if(t.attachShadow)return e?(t.shadowRoot||(t.attachShadow({mode:"open",shadyUpgradeFragment:e}),t.shadowRoot.appendChild(e),this.constructor._styleSheet&&(t.shadowRoot.adoptedStyleSheets=[this.constructor._styleSheet])),Q&&window.ShadyDOM&&window.ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=G(this.importPath)),G(e,t)}static _parseTemplateContent(e,i,r){return i.dynamicFns=i.dynamicFns||this._properties,t._parseTemplateContent.call(this,e,i,r)}static _addTemplatePropertyEffect(e,i,r){return!Z||i in this._properties||r.info.part.signature&&r.info.part.signature.static||r.info.part.hostProp||e.nestedTemplate||console.warn(`Property '${i}' used in template but not declared in 'properties'; attribute will not be observed.`),t._addTemplatePropertyEffect.call(this,e,i,r)}}})),Bt=window.trustedTypes&&trustedTypes.createPolicy("polymer-html-literal",{createHTML:e=>e});class Vt{constructor(e,t){Wt(e,t);const i=t.reduce(((t,i,r)=>t+Gt(i)+e[r+1]),e[0]);this.value=i.toString()}toString(){return this.value}}function Gt(e){if(e instanceof Vt)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}const $t=function(e,...t){Wt(e,t);const i=document.createElement("template");let r=t.reduce(((t,i,r)=>t+function(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof Vt)return Gt(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}(i)+e[r+1]),e[0]);return Bt&&(r=Bt.createHTML(r)),i.innerHTML=r,i},Wt=(e,t)=>{if(!Array.isArray(e)||!Array.isArray(e.raw)||t.length!==e.length-1)throw new TypeError("Invalid call to the html template tag")},Ut=Ht(HTMLElement);let qt=0,jt=0;const Yt=[];let Kt=!1;const Xt={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},Jt={run:e=>window.requestAnimationFrame(e),cancel(e){window.cancelAnimationFrame(e)}},Zt={run:e=>window.requestIdleCallback?window.requestIdleCallback(e):window.setTimeout(e,16),cancel(e){window.cancelIdleCallback?window.cancelIdleCallback(e):window.clearTimeout(e)}},Qt={run(e){Kt||(Kt=!0,queueMicrotask((()=>function(){Kt=!1;const e=Yt.length;for(let t=0;t<e;t++){const e=Yt[t];if(e)try{e()}catch(e){setTimeout((()=>{throw e}))}}Yt.splice(0,e),jt+=e}()))),Yt.push(e);const t=qt;return qt+=1,t},cancel(e){const t=e-jt;if(t>=0){if(!Yt[t])throw new Error(`invalid async handle: ${e}`);Yt[t]=null}}},ei=new Set;class ti{static debounce(e,t,i){return e instanceof ti?e._cancelAsync():e=new ti,e.setConfig(t,i),e}constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run((()=>{this._timer=null,ei.delete(this),this._callback()}))}cancel(){this.isActive()&&(this._cancelAsync(),ei.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}}function ii(e){ei.add(e)}function ri(){const e=Boolean(ei.size);return ei.forEach((e=>{try{e.flush()}catch(e){setTimeout((()=>{throw e}))}})),e}const oi=()=>{let e;do{e=ri()}while(e)},si=[];function ni(e,t,i=e.getAttribute("dir")){t?e.setAttribute("dir",t):null!=i&&e.removeAttribute("dir")}function ai(){return document.documentElement.getAttribute("dir")}new MutationObserver((function(){const e=ai();si.forEach((t=>{ni(t,e)}))})).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});const li=e=>class extends e{static get properties(){return{dir:{type:String,value:"",reflectToAttribute:!0,converter:{fromAttribute:e=>e||"",toAttribute:e=>""===e?null:e}}}}get __isRTL(){return"rtl"===this.getAttribute("dir")}connectedCallback(){super.connectedCallback(),this.hasAttribute("dir")&&!this.__restoreSubscription||(this.__subscribe(),ni(this,ai(),null))}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),"dir"!==e)return;const r=ai(),o=i===r&&-1===si.indexOf(this),s=!i&&t&&-1===si.indexOf(this),n=i!==r&&t===r;o||s?(this.__subscribe(),ni(this,r,i)):n&&this.__unsubscribe()}disconnectedCallback(){super.disconnectedCallback(),this.__restoreSubscription=si.includes(this),this.__unsubscribe()}_valueToNodeAttribute(e,t,i){("dir"!==i||""!==t||e.hasAttribute("dir"))&&super._valueToNodeAttribute(e,t,i)}_attributeToProperty(e,t,i){"dir"!==e||t?super._attributeToProperty(e,t,i):this.dir=""}__subscribe(){si.includes(this)||si.push(this)}__unsubscribe(){si.includes(this)&&si.splice(si.indexOf(this),1)}};function di(e,t){return e.split(".").reduce(((e,t)=>e?e[t]:void 0),t)}function hi(e){window.Vaadin&&window.Vaadin.templateRendererCallback?window.Vaadin.templateRendererCallback(e):e.querySelector("template")&&console.warn(`WARNING: <template> inside <${e.localName}> is no longer supported. Import @vaadin/polymer-legacy-adapter/template-renderer.js to enable compatibility.`)}function ci(e,t){return t?t.closest(e)||ci(e,t.getRootNode().host):null}function ui(e){return e?new Set(e.split(" ")):new Set}function _i(e){return e?[...e].join(" "):""}function pi(e,t,i){const r=ui(e.getAttribute(t));r.add(i),e.setAttribute(t,_i(r))}function mi(e,t,i){const r=ui(e.getAttribute(t));r.delete(i),0!==r.size?e.setAttribute(t,_i(r)):e.removeAttribute(t)}function gi(e){return e.__cells||Array.from(e.querySelectorAll('[part~="cell"]:not([part~="details-cell"])'))}function fi(e,t){[...e.children].forEach(t)}function bi(e,t){gi(e).forEach(t),e.__detailsCell&&t(e.__detailsCell)}function vi(e,t,i){let r=1;e.forEach((e=>{r%10==0&&(r+=1),e._order=i+r*t,r+=1}))}function yi(e,t,i){switch(typeof i){case"boolean":e.toggleAttribute(t,i);break;case"string":e.setAttribute(t,i);break;default:e.removeAttribute(t)}}function Ci(e,t,i){t||""===t?pi(e,"part",i):mi(e,"part",i)}function wi(e,t,i){e.forEach((e=>{Ci(e,i,t)}))}function Ai(e,t){const i=gi(e);Object.entries(t).forEach((([t,r])=>{yi(e,t,r);const o=`${t}-row`;Ci(e,r,o),wi(i,`${o}-cell`,r)}))}function xi(e,t){const i=gi(e);Object.entries(t).forEach((([t,r])=>{const o=e.getAttribute(t);if(yi(e,t,r),o){const r=`${t}-${o}-row`;Ci(e,!1,r),wi(i,`${r}-cell`,!1)}if(r){const o=`${t}-${r}-row`;Ci(e,r,o),wi(i,`${o}-cell`,r)}}))}function Si(e,t,i,r,o){yi(e,t,i),o&&Ci(e,!1,o),Ci(e,i,r||`${t}-cell`)}class Ei{constructor(e,t){this.__host=e,this.__callback=t,this.__currentSlots=[],this.__onMutation=this.__onMutation.bind(this),this.__observer=new MutationObserver(this.__onMutation),this.__observer.observe(e,{childList:!0}),this.__initialCallDebouncer=ti.debounce(this.__initialCallDebouncer,Qt,(()=>this.__onMutation()))}disconnect(){this.__observer.disconnect(),this.__initialCallDebouncer.cancel(),this.__toggleSlotChangeListeners(!1)}flush(){this.__onMutation()}__toggleSlotChangeListeners(e){this.__currentSlots.forEach((t=>{e?t.addEventListener("slotchange",this.__onMutation):t.removeEventListener("slotchange",this.__onMutation)}))}__onMutation(){const e=!this.__currentColumns;this.__currentColumns=this.__currentColumns||[];const t=Ei.getColumns(this.__host),i=t.filter((e=>!this.__currentColumns.includes(e))),r=this.__currentColumns.filter((e=>!t.includes(e))),o=this.__currentColumns.some(((e,i)=>e!==t[i]));this.__currentColumns=t,this.__toggleSlotChangeListeners(!1),this.__currentSlots=[...this.__host.children].filter((e=>e instanceof HTMLSlotElement)),this.__toggleSlotChangeListeners(!0),(e||i.length||r.length||o)&&this.__callback(i,r)}static __isColumnElement(e){return e.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(e.localName)}static getColumns(e){const t=[],i=e._isColumnElement||Ei.__isColumnElement;return[...e.children].forEach((e=>{i(e)?t.push(e):e instanceof HTMLSlotElement&&[...e.assignedElements({flatten:!0})].filter((e=>i(e))).forEach((e=>t.push(e)))})),t}}const Ii=e=>class extends e{static get properties(){return{resizable:{type:Boolean,sync:!0,value(){if("vaadin-grid-column-group"===this.localName)return;const e=this.parentNode;return e&&"vaadin-grid-column-group"===e.localName&&e.resizable||!1}},frozen:{type:Boolean,value:!1,sync:!0},frozenToEnd:{type:Boolean,value:!1,sync:!0},rowHeader:{type:Boolean,value:!1,sync:!0},hidden:{type:Boolean,value:!1,sync:!0},header:{type:String,sync:!0},textAlign:{type:String,sync:!0},headerPartName:{type:String,sync:!0},footerPartName:{type:String,sync:!0},_lastFrozen:{type:Boolean,value:!1,sync:!0},_bodyContentHidden:{type:Boolean,value:!1,sync:!0},_firstFrozenToEnd:{type:Boolean,value:!1,sync:!0},_order:{type:Number,sync:!0},_reorderStatus:{type:Boolean,sync:!0},_emptyCells:Array,_headerCell:{type:Object,sync:!0},_footerCell:{type:Object,sync:!0},_grid:Object,__initialized:{type:Boolean,value:!0},headerRenderer:{type:Function,sync:!0},_headerRenderer:{type:Function,computed:"_computeHeaderRenderer(headerRenderer, header, __initialized)"},footerRenderer:{type:Function,sync:!0},_footerRenderer:{type:Function,computed:"_computeFooterRenderer(footerRenderer, __initialized)"},__gridColumnElement:{type:Boolean,value:!0}}}static get observers(){return["_widthChanged(width, _headerCell, _footerCell, _cells)","_frozenChanged(frozen, _headerCell, _footerCell, _cells)","_frozenToEndChanged(frozenToEnd, _headerCell, _footerCell, _cells)","_flexGrowChanged(flexGrow, _headerCell, _footerCell, _cells)","_textAlignChanged(textAlign, _cells, _headerCell, _footerCell)","_orderChanged(_order, _headerCell, _footerCell, _cells)","_lastFrozenChanged(_lastFrozen)","_firstFrozenToEndChanged(_firstFrozenToEnd)","_onRendererOrBindingChanged(_renderer, _cells, _bodyContentHidden, path)","_onHeaderRendererOrBindingChanged(_headerRenderer, _headerCell, path, header)","_onFooterRendererOrBindingChanged(_footerRenderer, _footerCell)","_resizableChanged(resizable, _headerCell)","_reorderStatusChanged(_reorderStatus, _headerCell, _footerCell, _cells)","_hiddenChanged(hidden, _headerCell, _footerCell, _cells)","_rowHeaderChanged(rowHeader, _cells)","__headerFooterPartNameChanged(_headerCell, _footerCell, headerPartName, footerPartName)"]}get _grid(){return this._gridValue||(this._gridValue=this._findHostGrid()),this._gridValue}get _allCells(){return[].concat(this._cells||[]).concat(this._emptyCells||[]).concat(this._headerCell).concat(this._footerCell).filter((e=>e))}connectedCallback(){super.connectedCallback(),requestAnimationFrame((()=>{this._grid&&this._allCells.forEach((e=>{e._content.parentNode||this._grid.appendChild(e._content)}))}))}disconnectedCallback(){super.disconnectedCallback(),requestAnimationFrame((()=>{this._grid||this._allCells.forEach((e=>{e._content.parentNode&&e._content.parentNode.removeChild(e._content)}))})),this._gridValue=void 0}ready(){super.ready(),hi(this)}_findHostGrid(){let e=this;for(;e&&!/^vaadin.*grid(-pro)?$/u.test(e.localName);)e=e.assignedSlot?e.assignedSlot.parentNode:e.parentNode;return e||void 0}_renderHeaderAndFooter(){this._renderHeaderCellContent(this._headerRenderer,this._headerCell),this._renderFooterCellContent(this._footerRenderer,this._footerCell)}_flexGrowChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("flexGrow"),this._allCells.forEach((t=>{t.style.flexGrow=e}))}_orderChanged(e){this._allCells.forEach((t=>{t.style.order=e}))}_widthChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("width"),this._allCells.forEach((t=>{t.style.width=e}))}_frozenChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("frozen",e),this._allCells.forEach((t=>{Si(t,"frozen",e)})),this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_frozenToEndChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("frozenToEnd",e),this._allCells.forEach((t=>{this._grid&&t.parentElement===this._grid.$.sizer||Si(t,"frozen-to-end",e)})),this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_lastFrozenChanged(e){this._allCells.forEach((t=>{Si(t,"last-frozen",e)})),this.parentElement&&this.parentElement._columnPropChanged&&(this.parentElement._lastFrozen=e)}_firstFrozenToEndChanged(e){this._allCells.forEach((t=>{this._grid&&t.parentElement===this._grid.$.sizer||Si(t,"first-frozen-to-end",e)})),this.parentElement&&this.parentElement._columnPropChanged&&(this.parentElement._firstFrozenToEnd=e)}_rowHeaderChanged(e,t){t&&t.forEach((t=>{t.setAttribute("role",e?"rowheader":"gridcell")}))}_generateHeader(e){return e.substr(e.lastIndexOf(".")+1).replace(/([A-Z])/gu,"-$1").toLowerCase().replace(/-/gu," ").replace(/^./u,(e=>e.toUpperCase()))}_reorderStatusChanged(e){const t=this.__previousReorderStatus,i=t?`reorder-${t}-cell`:"",r=`reorder-${e}-cell`;this._allCells.forEach((t=>{Si(t,"reorder-status",e,r,i)})),this.__previousReorderStatus=e}_resizableChanged(e,t){void 0!==e&&void 0!==t&&t&&[t].concat(this._emptyCells).forEach((t=>{if(t){const i=t.querySelector('[part~="resize-handle"]');if(i&&t.removeChild(i),e){const e=document.createElement("div");e.setAttribute("part","resize-handle"),t.appendChild(e)}}}))}_textAlignChanged(e){if(void 0===e||void 0===this._grid)return;if(-1===["start","end","center"].indexOf(e))return void console.warn('textAlign can only be set as "start", "end" or "center"');let t;"ltr"===getComputedStyle(this._grid).direction?"start"===e?t="left":"end"===e&&(t="right"):"start"===e?t="right":"end"===e&&(t="left"),this._allCells.forEach((i=>{i._content.style.textAlign=e,getComputedStyle(i._content).textAlign!==e&&(i._content.style.textAlign=t)}))}_hiddenChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("hidden",e),!!e!=!!this._previousHidden&&this._grid&&(!0===e&&this._allCells.forEach((e=>{e._content.parentNode&&e._content.parentNode.removeChild(e._content)})),this._grid._debouncerHiddenChanged=ti.debounce(this._grid._debouncerHiddenChanged,Jt,(()=>{this._grid&&this._grid._renderColumnTree&&this._grid._renderColumnTree(this._grid._columnTree)})),this._grid._debounceUpdateFrozenColumn&&this._grid._debounceUpdateFrozenColumn(),this._grid._resetKeyboardNavigation&&this._grid._resetKeyboardNavigation()),this._previousHidden=e}_runRenderer(e,t,i){const r=i&&i.item&&!t.parentElement.hidden;if(!r&&e!==this._headerRenderer&&e!==this._footerRenderer)return;const o=[t._content,this];r&&o.push(i),e.apply(this,o)}__renderCellsContent(e,t){!this.hidden&&this._grid&&t.forEach((t=>{if(!t.parentElement)return;const i=this._grid.__getRowModel(t.parentElement);e&&(t._renderer!==e&&this._clearCellContent(t),t._renderer=e,this._runRenderer(e,t,i))}))}_clearCellContent(e){e._content.innerHTML="",delete e._content._$litPart$}_renderHeaderCellContent(e,t){t&&e&&(this.__renderCellsContent(e,[t]),this._grid&&t.parentElement&&this._grid.__debounceUpdateHeaderFooterRowVisibility(t.parentElement))}_onHeaderRendererOrBindingChanged(e,t,...i){this._renderHeaderCellContent(e,t)}__headerFooterPartNameChanged(e,t,i,r){[{cell:e,partName:i},{cell:t,partName:r}].forEach((({cell:e,partName:t})=>{if(e){const i=e.__customParts||[];e.part.remove(...i),e.__customParts=t?t.trim().split(" "):[],e.part.add(...e.__customParts)}}))}_renderBodyCellsContent(e,t){t&&e&&this.__renderCellsContent(e,t)}_onRendererOrBindingChanged(e,t,...i){this._renderBodyCellsContent(e,t)}_renderFooterCellContent(e,t){t&&e&&(this.__renderCellsContent(e,[t]),this._grid&&t.parentElement&&this._grid.__debounceUpdateHeaderFooterRowVisibility(t.parentElement))}_onFooterRendererOrBindingChanged(e,t){this._renderFooterCellContent(e,t)}__setTextContent(e,t){e.textContent!==t&&(e.textContent=t)}__textHeaderRenderer(){this.__setTextContent(this._headerCell._content,this.header)}_defaultHeaderRenderer(){this.path&&this.__setTextContent(this._headerCell._content,this._generateHeader(this.path))}_defaultRenderer(e,t,{item:i}){this.path&&this.__setTextContent(e,di(this.path,i))}_defaultFooterRenderer(){}_computeHeaderRenderer(e,t){return e||(null!=t?this.__textHeaderRenderer:this._defaultHeaderRenderer)}_computeRenderer(e){return e||this._defaultRenderer}_computeFooterRenderer(e){return e||this._defaultFooterRenderer}};class Pi extends((e=>class extends(Ii(li(e))){static get properties(){return{width:{type:String,value:"100px",sync:!0},flexGrow:{type:Number,value:1,sync:!0},renderer:{type:Function,sync:!0},_renderer:{type:Function,computed:"_computeRenderer(renderer, __initialized)"},path:{type:String,sync:!0},autoWidth:{type:Boolean,value:!1},_focusButtonMode:{type:Boolean,value:!1},_cells:{type:Array,sync:!0}}}})(Ut)){static get is(){return"vaadin-grid-column"}}b(Pi);const Ti=ne((e=>"function"==typeof e.prototype.addController?e:class extends e{constructor(){super(),this.__controllers=new Set}connectedCallback(){super.connectedCallback(),this.__controllers.forEach((e=>{e.hostConnected&&e.hostConnected()}))}disconnectedCallback(){super.disconnectedCallback(),this.__controllers.forEach((e=>{e.hostDisconnected&&e.hostDisconnected()}))}addController(e){this.__controllers.add(e),void 0!==this.$&&this.isConnected&&e.hostConnected&&e.hostConnected()}removeController(e){this.__controllers.delete(e)}})),zi=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,ki=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function Ri(e,t){if("function"!=typeof e)return;const i=zi.exec(e.toString());if(i)try{e=new Function(i[1])}catch(e){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",e)}return e(t)}function Oi(){}let Ni;window.Vaadin=window.Vaadin||{},void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(ki?!(ki&&Object.keys(ki).map((e=>ki[e])).filter((e=>e.productionMode)).length>0):!Ri((function(){return!0})))}catch(e){return!1}}()),window.Vaadin||(window.Vaadin={}),window.Vaadin.registrations||(window.Vaadin.registrations=[]),window.Vaadin.developmentModeCallback||(window.Vaadin.developmentModeCallback={}),window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]=function(){var e;e=Oi,window.Vaadin.developmentMode&&Ri(e,void 0)};const Fi=new Set,Di=e=>class extends(li(e)){static finalize(){super.finalize();const{is:e}=this;e&&!Fi.has(e)&&(window.Vaadin.registrations.push(this),Fi.add(e),window.Vaadin.developmentModeCallback&&(Ni=ti.debounce(Ni,Zt,(()=>{window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]()})),ii(Ni)))}constructor(){super(),null===document.doctype&&console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.')}},Mi=ne((e=>class extends e{static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0,sync:!0}}}_disabledChanged(e){this._setAriaDisabled(e)}_setAriaDisabled(e){e?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled")}click(){this.disabled||super.click()}})),Li=e=>class extends(Mi(e)){static get properties(){return{tabindex:{type:Number,reflectToAttribute:!0,observer:"_tabindexChanged"},_lastTabIndex:{type:Number}}}_disabledChanged(e,t){super._disabledChanged(e,t),this.__shouldAllowFocusWhenDisabled()||(e?(void 0!==this.tabindex&&(this._lastTabIndex=this.tabindex),this.tabindex=-1):t&&(this.tabindex=this._lastTabIndex))}_tabindexChanged(e){this.__shouldAllowFocusWhenDisabled()||this.disabled&&-1!==e&&(this._lastTabIndex=e,this.tabindex=-1)}focus(){this.disabled&&!this.__shouldAllowFocusWhenDisabled()||super.focus()}__shouldAllowFocusWhenDisabled(){return!1}},Hi=e=>e.test(navigator.userAgent),Bi=e=>e.test(navigator.platform),Vi=Hi(/Android/u),Gi=Hi(/Chrome/u)&&/Google Inc/u.test(navigator.vendor),$i=Hi(/Firefox/u),Wi=Bi(/^iPad/u)||Bi(/^Mac/u)&&navigator.maxTouchPoints>1,Ui=Bi(/^iPhone/u)||Wi,qi=Hi(/^((?!chrome|android).)*safari/iu),ji=(()=>{try{return document.createEvent("TouchEvent"),!0}catch(e){return!1}})(),Yi=window.ShadowRoot&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;class Ki{constructor(e,t){this.slot=e,this.callback=t,this._storedNodes=[],this._connected=!1,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){this.slot.addEventListener("slotchange",this._boundSchedule),this._connected=!0}disconnect(){this.slot.removeEventListener("slotchange",this._boundSchedule),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,queueMicrotask((()=>{this.flush()})))}flush(){this._connected&&(this._scheduled=!1,this._processNodes())}_processNodes(){const e=this.slot.assignedNodes({flatten:!0});let t=[];const i=[],r=[];e.length&&(t=e.filter((e=>!this._storedNodes.includes(e)))),this._storedNodes.length&&this._storedNodes.forEach(((t,o)=>{const s=e.indexOf(t);-1===s?i.push(t):s!==o&&r.push(t)})),(t.length||i.length||r.length)&&this.callback({addedNodes:t,currentNodes:e,movedNodes:r,removedNodes:i}),this._storedNodes=e}}let Xi=0;class Ji extends EventTarget{static generateId(e,t="default"){return`${t}-${e.localName}-${Xi++}`}constructor(e,t,i,r={}){super();const{initializer:o,multiple:s,observe:n,useUniqueId:a,uniqueIdPrefix:l}=r;this.host=e,this.slotName=t,this.tagName=i,this.observe="boolean"!=typeof n||n,this.multiple="boolean"==typeof s&&s,this.slotInitializer=o,s&&(this.nodes=[]),a&&(this.defaultId=this.constructor.generateId(e,l||t))}hostConnected(){this.initialized||(this.multiple?this.initMultiple():this.initSingle(),this.observe&&this.observeSlot(),this.initialized=!0)}initSingle(){let e=this.getSlotChild();e?(this.node=e,this.initAddedNode(e)):(e=this.attachDefaultNode(),this.initNode(e))}initMultiple(){const e=this.getSlotChildren();if(0===e.length){const e=this.attachDefaultNode();e&&(this.nodes=[e],this.initNode(e))}else this.nodes=e,e.forEach((e=>{this.initAddedNode(e)}))}attachDefaultNode(){const{host:e,slotName:t,tagName:i}=this;let r=this.defaultNode;return!r&&i&&(r=document.createElement(i),r instanceof Element&&(""!==t&&r.setAttribute("slot",t),this.defaultNode=r)),r&&(this.node=r,e.appendChild(r)),r}getSlotChildren(){const{slotName:e}=this;return Array.from(this.host.childNodes).filter((t=>t.nodeType===Node.ELEMENT_NODE&&t.slot===e||t.nodeType===Node.TEXT_NODE&&t.textContent.trim()&&""===e))}getSlotChild(){return this.getSlotChildren()[0]}initNode(e){const{slotInitializer:t}=this;t&&t(e,this.host)}initCustomNode(e){}teardownNode(e){}initAddedNode(e){e!==this.defaultNode&&(this.initCustomNode(e),this.initNode(e))}observeSlot(){const{slotName:e}=this,t=""===e?"slot:not([name])":`slot[name=${e}]`,i=this.host.shadowRoot.querySelector(t);this.__slotObserver=new Ki(i,(({addedNodes:e,removedNodes:t})=>{const i=this.multiple?this.nodes:[this.node],r=e.filter((e=>!function(e){return e.nodeType===Node.TEXT_NODE&&""===e.textContent.trim()}(e)&&!i.includes(e)));t.length&&(this.nodes=i.filter((e=>!t.includes(e))),t.forEach((e=>{this.teardownNode(e)}))),r&&r.length>0&&(this.multiple?(this.defaultNode&&this.defaultNode.remove(),this.nodes=[...i,...r].filter((e=>e!==this.defaultNode)),r.forEach((e=>{this.initAddedNode(e)}))):(this.node&&this.node.remove(),this.node=r[0],this.initAddedNode(this.node)))}))}}class Zi extends Ji{constructor(e){super(e,"tooltip"),this.setTarget(e)}initCustomNode(e){e.target=this.target,void 0!==this.ariaTarget&&(e.ariaTarget=this.ariaTarget),void 0!==this.context&&(e.context=this.context),void 0!==this.manual&&(e.manual=this.manual),void 0!==this.opened&&(e.opened=this.opened),void 0!==this.position&&(e._position=this.position),void 0!==this.shouldShow&&(e.shouldShow=this.shouldShow),this.__notifyChange()}teardownNode(){this.__notifyChange()}setAriaTarget(e){this.ariaTarget=e;const t=this.node;t&&(t.ariaTarget=e)}setContext(e){this.context=e;const t=this.node;t&&(t.context=e)}setManual(e){this.manual=e;const t=this.node;t&&(t.manual=e)}setOpened(e){this.opened=e;const t=this.node;t&&(t.opened=e)}setPosition(e){this.position=e;const t=this.node;t&&(t._position=e)}setShouldShow(e){this.shouldShow=e;const t=this.node;t&&(t.shouldShow=e)}setTarget(e){this.target=e;const t=this.node;t&&(t.target=e)}__notifyChange(){this.dispatchEvent(new CustomEvent("tooltip-changed",{detail:{node:this.node}}))}}const Qi=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/u),er=Qi&&Qi[1]>=8,tr={_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_lastVisibleIndexVal:null,_maxPages:2,_templateCost:0,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){return this._physicalSize-this._viewportHeight},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){const e=this._virtualCount;return Math.max(0,e-this._physicalCount)},get _virtualStart(){return this._virtualStartVal||0},set _virtualStart(e){e=this._clamp(e,0,this._maxVirtualStart),this._virtualStartVal=e},get _physicalStart(){return this._physicalStartVal||0},set _physicalStart(e){(e%=this._physicalCount)<0&&(e=this._physicalCount+e),this._physicalStartVal=e},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},get _physicalCount(){return this._physicalCountVal||0},set _physicalCount(e){this._physicalCountVal=e},get _optPhysicalSize(){return 0===this._viewportHeight?1/0:this._viewportHeight*this._maxPages},get _isVisible(){return Boolean(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){let e=this._firstVisibleIndexVal;if(null==e){let t=this._physicalTop+this._scrollOffset;e=this._iterateItems(((e,i)=>{if(t+=this._getPhysicalSizeIncrement(e),t>this._scrollPosition)return i}))||0,this._firstVisibleIndexVal=e}return e},get lastVisibleIndex(){let e=this._lastVisibleIndexVal;if(null==e){let t=this._physicalTop+this._scrollOffset;this._iterateItems(((i,r)=>{t<this._scrollBottom&&(e=r),t+=this._getPhysicalSizeIncrement(i)})),this._lastVisibleIndexVal=e}return e},get _scrollOffset(){return this._scrollerPaddingTop+this.scrollOffset},_scrollHandler(){const e=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop));let t=e-this._scrollPosition;const i=t>=0;if(this._scrollPosition=e,this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,Math.abs(t)>this._physicalSize&&this._physicalSize>0){t-=this._scrollOffset;const e=Math.round(t/this._physicalAverage);this._virtualStart+=e,this._physicalStart+=e,this._physicalTop=Math.min(Math.floor(this._virtualStart)*this._physicalAverage,this._scrollPosition),this._update()}else if(this._physicalCount>0){const e=this._getReusables(i);i?(this._physicalTop=e.physicalTop,this._virtualStart+=e.indexes.length,this._physicalStart+=e.indexes.length):(this._virtualStart-=e.indexes.length,this._physicalStart-=e.indexes.length),this._update(e.indexes,i?null:e.indexes),this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),Qt)}},_getReusables(e){let t,i,r;const o=[],s=this._hiddenContentSize*this._ratio,n=this._virtualStart,a=this._virtualEnd,l=this._physicalCount;let d=this._physicalTop+this._scrollOffset;const h=this._physicalBottom+this._scrollOffset,c=this._scrollPosition,u=this._scrollBottom;for(e?(t=this._physicalStart,i=c-d):(t=this._physicalEnd,i=h-u);r=this._getPhysicalSizeIncrement(t),i-=r,!(o.length>=l||i<=s);)if(e){if(a+o.length+1>=this._virtualCount)break;if(d+r>=c-this._scrollOffset)break;o.push(t),d+=r,t=(t+1)%l}else{if(n-o.length<=0)break;if(d+this._physicalSize-r<=u)break;o.push(t),d-=r,t=0===t?l-1:t-1}return{indexes:o,physicalTop:d-this._scrollOffset}},_update(e,t){if(!(e&&0===e.length||0===this._physicalCount)){if(this._assignModels(e),this._updateMetrics(e),t)for(;t.length;){const e=t.pop();this._physicalTop-=this._getPhysicalSizeIncrement(e)}this._positionItems(),this._updateScrollerSize()}},_isClientFull(){return 0!==this._scrollBottom&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded(e){const t=this._clamp(this._physicalCount+e,3,this._virtualCount-this._virtualStart)-this._physicalCount;let i=Math.round(.5*this._physicalCount);if(!(t<0)){if(t>0){const e=window.performance.now();[].push.apply(this._physicalItems,this._createPool(t));for(let e=0;e<t;e++)this._physicalSizes.push(0);this._physicalCount+=t,this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd&&(this._physicalStart+=t),this._update(),this._templateCost=(window.performance.now()-e)/t,i=Math.round(.5*this._physicalCount)}this._virtualEnd>=this._virtualCount-1||0===i||(this._isClientFull()?this._physicalSize<this._optPhysicalSize&&this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,i)),Zt):this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,i),Qt))}},_render(){if(this.isAttached&&this._isVisible)if(0!==this._physicalCount){const e=this._getReusables(!0);this._physicalTop=e.physicalTop,this._virtualStart+=e.indexes.length,this._physicalStart+=e.indexes.length,this._update(e.indexes),this._update(),this._increasePoolIfNeeded(0)}else this._virtualCount>0&&(this.updateViewportBoundaries(),this._increasePoolIfNeeded(3))},_itemsChanged(e){"items"===e.path&&(this._virtualStart=0,this._physicalTop=0,this._virtualCount=this.items?this.items.length:0,this._physicalIndexForKey={},this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._physicalItems||(this._physicalItems=[]),this._physicalSizes||(this._physicalSizes=[]),this._physicalStart=0,this._scrollTop>this._scrollOffset&&this._resetScrollPosition(0),this._debounce("_render",this._render,Jt))},_iterateItems(e,t){let i,r,o,s;if(2===arguments.length&&t){for(s=0;s<t.length;s++)if(i=t[s],r=this._computeVidx(i),null!=(o=e.call(this,i,r)))return o}else{for(i=this._physicalStart,r=this._virtualStart;i<this._physicalCount;i++,r++)if(null!=(o=e.call(this,i,r)))return o;for(i=0;i<this._physicalStart;i++,r++)if(null!=(o=e.call(this,i,r)))return o}},_computeVidx(e){return e>=this._physicalStart?this._virtualStart+(e-this._physicalStart):this._virtualStart+(this._physicalCount-this._physicalStart)+e},_positionItems(){this._adjustScrollPosition();let e=this._physicalTop;this._iterateItems((t=>{this.translate3d(0,`${e}px`,0,this._physicalItems[t]),e+=this._physicalSizes[t]}))},_getPhysicalSizeIncrement(e){return this._physicalSizes[e]},_adjustScrollPosition(){const e=0===this._virtualStart?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);if(0!==e){this._physicalTop-=e;const t=this._scrollPosition;!er&&t>0&&this._resetScrollPosition(t-e)}},_resetScrollPosition(e){this.scrollTarget&&e>=0&&(this._scrollTop=e,this._scrollPosition=this._scrollTop)},_updateScrollerSize(e){const t=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage;this._estScrollHeight=t,(e||0===this._scrollHeight||this._scrollPosition>=t-this._physicalSize||Math.abs(t-this._scrollHeight)>=this._viewportHeight)&&(this.$.items.style.height=`${t}px`,this._scrollHeight=t)},scrollToIndex(e){if("number"!=typeof e||e<0||e>this.items.length-1)return;if(oi(),0===this._physicalCount)return;e=this._clamp(e,0,this._virtualCount-1),(!this._isIndexRendered(e)||e>=this._maxVirtualStart)&&(this._virtualStart=e-1),this._assignModels(),this._updateMetrics(),this._physicalTop=this._virtualStart*this._physicalAverage;let t=this._physicalStart,i=this._virtualStart,r=0;const o=this._hiddenContentSize;for(;i<e&&r<=o;)r+=this._getPhysicalSizeIncrement(t),t=(t+1)%this._physicalCount,i+=1;this._updateScrollerSize(!0),this._positionItems(),this._resetScrollPosition(this._physicalTop+this._scrollOffset+r),this._increasePoolIfNeeded(0),this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null},_resetAverage(){this._physicalAverage=0,this._physicalAverageCount=0},_resizeHandler(){this._debounce("_render",(()=>{this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._isVisible?(this.updateViewportBoundaries(),this.toggleScrollListener(!0),this._resetAverage(),this._render()):this.toggleScrollListener(!1)}),Jt)},_isIndexRendered(e){return e>=this._virtualStart&&e<=this._virtualEnd},_getPhysicalIndex(e){return(this._physicalStart+(e-this._virtualStart))%this._physicalCount},_clamp:(e,t,i)=>Math.min(i,Math.max(t,e)),_debounce(e,t,i){this._debouncers||(this._debouncers={}),this._debouncers[e]=ti.debounce(this._debouncers[e],i,t.bind(this)),ii(this._debouncers[e])}},ir=1e3;class rr{constructor({createElements:e,updateElement:t,scrollTarget:i,scrollContainer:r,elementsContainer:o,reorderElements:s}){this.isAttached=!0,this._vidxOffset=0,this.createElements=e,this.updateElement=t,this.scrollTarget=i,this.scrollContainer=r,this.elementsContainer=o||r,this.reorderElements=s,this._maxPages=1.3,this.__placeholderHeight=200,this.__elementHeightQueue=Array(10),this.timeouts={SCROLL_REORDER:500,IGNORE_WHEEL:500,FIX_INVALID_ITEM_POSITIONING:100},this.__resizeObserver=new ResizeObserver((()=>this._resizeHandler())),"visible"===getComputedStyle(this.scrollTarget).overflow&&(this.scrollTarget.style.overflow="auto"),"static"===getComputedStyle(this.scrollContainer).position&&(this.scrollContainer.style.position="relative"),this.__resizeObserver.observe(this.scrollTarget),this.scrollTarget.addEventListener("scroll",(()=>this._scrollHandler())),new ResizeObserver((([{contentRect:e}])=>{const t=0===e.width&&0===e.height;!t&&this.__scrollTargetHidden&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition),this.__scrollTargetHidden=t})).observe(this.scrollTarget),this._scrollLineHeight=this._getScrollLineHeight(),this.scrollTarget.addEventListener("wheel",(e=>this.__onWheel(e))),this.scrollTarget.addEventListener("virtualizer-element-focused",(e=>this.__onElementFocused(e))),this.elementsContainer.addEventListener("focusin",(()=>{this.scrollTarget.dispatchEvent(new CustomEvent("virtualizer-element-focused",{detail:{element:this.__getFocusedElement()}}))})),this.reorderElements&&(this.scrollTarget.addEventListener("mousedown",(()=>{this.__mouseDown=!0})),this.scrollTarget.addEventListener("mouseup",(()=>{this.__mouseDown=!1,this.__pendingReorder&&this.__reorderElements()})))}get scrollOffset(){return 0}get adjustedFirstVisibleIndex(){return this.firstVisibleIndex+this._vidxOffset}get adjustedLastVisibleIndex(){return this.lastVisibleIndex+this._vidxOffset}get _maxVirtualIndexOffset(){return this.size-this._virtualCount}__hasPlaceholders(){return this.__getVisibleElements().some((e=>e.__virtualizerPlaceholder))}scrollToIndex(e){if("number"!=typeof e||isNaN(e)||0===this.size||!this.scrollTarget.offsetHeight)return;delete this.__pendingScrollToIndex,this._physicalCount<=3&&this.flush(),e=this._clamp(e,0,this.size-1);const t=this.__getVisibleElements().length;let i=Math.floor(e/this.size*this._virtualCount);this._virtualCount-i<t?(i=this._virtualCount-(this.size-e),this._vidxOffset=this._maxVirtualIndexOffset):i<t?e<ir?(i=e,this._vidxOffset=0):(i=ir,this._vidxOffset=e-i):this._vidxOffset=e-i,this.__skipNextVirtualIndexAdjust=!0,super.scrollToIndex(i),this.adjustedFirstVisibleIndex!==e&&this._scrollTop<this._maxScrollTop&&!this.grid&&(this._scrollTop-=this.__getIndexScrollOffset(e)||0),this._scrollHandler(),this.__hasPlaceholders()&&(this.__pendingScrollToIndex=e)}flush(){0!==this.scrollTarget.offsetHeight&&(this._resizeHandler(),oi(),this._scrollHandler(),this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.flush(),this.__scrollReorderDebouncer&&this.__scrollReorderDebouncer.flush(),this.__debouncerWheelAnimationFrame&&this.__debouncerWheelAnimationFrame.flush())}hostConnected(){this.scrollTarget.offsetParent&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition)}update(e=0,t=this.size-1){const i=[];this.__getVisibleElements().forEach((r=>{r.__virtualIndex>=e&&r.__virtualIndex<=t&&(this.__updateElement(r,r.__virtualIndex,!0),i.push(r))})),this.__afterElementsUpdated(i)}_updateMetrics(e){oi();let t=0,i=0;const r=this._physicalAverageCount,o=this._physicalAverage;this._iterateItems(((e,r)=>{i+=this._physicalSizes[e],this._physicalSizes[e]=Math.ceil(this.__getBorderBoxHeight(this._physicalItems[e])),t+=this._physicalSizes[e],this._physicalAverageCount+=this._physicalSizes[e]?1:0}),e),this._physicalSize=this._physicalSize+t-i,this._physicalAverageCount!==r&&(this._physicalAverage=Math.round((o*r+t)/this._physicalAverageCount))}__getBorderBoxHeight(e){const t=getComputedStyle(e),i=parseFloat(t.height)||0;return"border-box"===t.boxSizing?i:i+(parseFloat(t.paddingBottom)||0)+(parseFloat(t.paddingTop)||0)+(parseFloat(t.borderBottomWidth)||0)+(parseFloat(t.borderTopWidth)||0)}__updateElement(e,t,i){e.__virtualizerPlaceholder&&(e.style.paddingTop="",e.style.opacity="",e.__virtualizerPlaceholder=!1),this.__preventElementUpdates||e.__lastUpdatedIndex===t&&!i||(this.updateElement(e,t),e.__lastUpdatedIndex=t)}__afterElementsUpdated(e){e.forEach((e=>{const t=e.offsetHeight;if(0===t)e.style.paddingTop=`${this.__placeholderHeight}px`,e.style.opacity="0",e.__virtualizerPlaceholder=!0,this.__placeholderClearDebouncer=ti.debounce(this.__placeholderClearDebouncer,Jt,(()=>this._resizeHandler()));else{this.__elementHeightQueue.push(t),this.__elementHeightQueue.shift();const e=this.__elementHeightQueue.filter((e=>void 0!==e));this.__placeholderHeight=Math.round(e.reduce(((e,t)=>e+t),0)/e.length)}})),void 0===this.__pendingScrollToIndex||this.__hasPlaceholders()||this.scrollToIndex(this.__pendingScrollToIndex)}__getIndexScrollOffset(e){const t=this.__getVisibleElements().find((t=>t.__virtualIndex===e));return t?this.scrollTarget.getBoundingClientRect().top-t.getBoundingClientRect().top:void 0}get size(){return this.__size}set size(e){if(e===this.size)return;let t,i;if(this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.cancel(),this._debouncers&&this._debouncers._increasePoolIfNeeded&&this._debouncers._increasePoolIfNeeded.cancel(),this.__preventElementUpdates=!0,e>0&&(t=this.adjustedFirstVisibleIndex,i=this.__getIndexScrollOffset(t)),this.__size=e,this._itemsChanged({path:"items"}),oi(),e>0){t=Math.min(t,e-1),this.scrollToIndex(t);const r=this.__getIndexScrollOffset(t);void 0!==i&&void 0!==r&&(this._scrollTop+=i-r)}this.__preventElementUpdates=!1,this._isVisible||this._assignModels(),this.elementsContainer.children.length||requestAnimationFrame((()=>this._resizeHandler())),this._resizeHandler(),oi(),this._debounce("_update",this._update,Qt)}get _scrollTop(){return this.scrollTarget.scrollTop}set _scrollTop(e){this.scrollTarget.scrollTop=e}get items(){return{length:Math.min(this.size,1e5)}}get offsetHeight(){return this.scrollTarget.offsetHeight}get $(){return{items:this.scrollContainer}}updateViewportBoundaries(){const e=window.getComputedStyle(this.scrollTarget);this._scrollerPaddingTop=this.scrollTarget===this?0:parseInt(e["padding-top"],10),this._isRTL=Boolean("rtl"===e.direction),this._viewportWidth=this.elementsContainer.offsetWidth,this._viewportHeight=this.scrollTarget.offsetHeight,this._scrollPageHeight=this._viewportHeight-this._scrollLineHeight,this.grid&&this._updateGridMetrics()}setAttribute(){}_createPool(e){const t=this.createElements(e),i=document.createDocumentFragment();return t.forEach((e=>{e.style.position="absolute",i.appendChild(e),this.__resizeObserver.observe(e)})),this.elementsContainer.appendChild(i),t}_assignModels(e){const t=[];this._iterateItems(((e,i)=>{const r=this._physicalItems[e];r.hidden=i>=this.size,r.hidden?delete r.__lastUpdatedIndex:(r.__virtualIndex=i+(this._vidxOffset||0),this.__updateElement(r,r.__virtualIndex),t.push(r))}),e),this.__afterElementsUpdated(t)}_isClientFull(){return setTimeout((()=>{this.__clientFull=!0})),this.__clientFull||super._isClientFull()}translate3d(e,t,i,r){r.style.transform=`translateY(${t})`}toggleScrollListener(){}__getFocusedElement(e=this.__getVisibleElements()){return e.find((e=>e.contains(this.elementsContainer.getRootNode().activeElement)||e.contains(this.scrollTarget.getRootNode().activeElement)))}__nextFocusableSiblingMissing(e,t){return t.indexOf(e)===t.length-1&&this.size>e.__virtualIndex+1}__previousFocusableSiblingMissing(e,t){return 0===t.indexOf(e)&&e.__virtualIndex>0}__onElementFocused(e){if(!this.reorderElements)return;const t=e.detail.element;if(!t)return;const i=this.__getVisibleElements();(this.__previousFocusableSiblingMissing(t,i)||this.__nextFocusableSiblingMissing(t,i))&&this.flush();const r=this.__getVisibleElements();this.__nextFocusableSiblingMissing(t,r)?(this._scrollTop+=Math.ceil(t.getBoundingClientRect().bottom)-Math.floor(this.scrollTarget.getBoundingClientRect().bottom-1),this.flush()):this.__previousFocusableSiblingMissing(t,r)&&(this._scrollTop-=Math.ceil(this.scrollTarget.getBoundingClientRect().top+1)-Math.floor(t.getBoundingClientRect().top),this.flush())}_scrollHandler(){if(0===this.scrollTarget.offsetHeight)return;this._adjustVirtualIndexOffset(this._scrollTop-(this.__previousScrollTop||0));const e=this.scrollTarget.scrollTop-this._scrollPosition;if(super._scrollHandler(),0!==this._physicalCount){const t=e>=0,i=this._getReusables(!t);i.indexes.length&&(this._physicalTop=i.physicalTop,t?(this._virtualStart-=i.indexes.length,this._physicalStart-=i.indexes.length):(this._virtualStart+=i.indexes.length,this._physicalStart+=i.indexes.length),this._resizeHandler())}e&&(this.__fixInvalidItemPositioningDebouncer=ti.debounce(this.__fixInvalidItemPositioningDebouncer,Xt.after(this.timeouts.FIX_INVALID_ITEM_POSITIONING),(()=>this.__fixInvalidItemPositioning()))),this.reorderElements&&(this.__scrollReorderDebouncer=ti.debounce(this.__scrollReorderDebouncer,Xt.after(this.timeouts.SCROLL_REORDER),(()=>this.__reorderElements()))),this.__previousScrollTop=this._scrollTop,0===this._scrollTop&&0!==this.firstVisibleIndex&&Math.abs(e)>0&&this.scrollToIndex(0)}__fixInvalidItemPositioning(){if(!this.scrollTarget.isConnected)return;const e=this._physicalTop>this._scrollTop,t=this._physicalBottom<this._scrollBottom,i=0===this.adjustedFirstVisibleIndex,r=this.adjustedLastVisibleIndex===this.size-1;if(e&&!i||t&&!r){const e=t,i=this._ratio;this._ratio=0,this._scrollPosition=this._scrollTop+(e?-1:1),this._scrollHandler(),this._ratio=i}}__onWheel(e){if(e.ctrlKey||this._hasScrolledAncestor(e.target,e.deltaX,e.deltaY))return;let t=e.deltaY;if(e.deltaMode===WheelEvent.DOM_DELTA_LINE?t*=this._scrollLineHeight:e.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(t*=this._scrollPageHeight),this._deltaYAcc||(this._deltaYAcc=0),this._wheelAnimationFrame)return this._deltaYAcc+=t,void e.preventDefault();t+=this._deltaYAcc,this._deltaYAcc=0,this._wheelAnimationFrame=!0,this.__debouncerWheelAnimationFrame=ti.debounce(this.__debouncerWheelAnimationFrame,Jt,(()=>{this._wheelAnimationFrame=!1}));const i=Math.abs(e.deltaX)+Math.abs(t);this._canScroll(this.scrollTarget,e.deltaX,t)?(e.preventDefault(),this.scrollTarget.scrollTop+=t,this.scrollTarget.scrollLeft+=e.deltaX,this._hasResidualMomentum=!0,this._ignoreNewWheel=!0,this._debouncerIgnoreNewWheel=ti.debounce(this._debouncerIgnoreNewWheel,Xt.after(this.timeouts.IGNORE_WHEEL),(()=>{this._ignoreNewWheel=!1}))):this._hasResidualMomentum&&i<=this._previousMomentum||this._ignoreNewWheel?e.preventDefault():i>this._previousMomentum&&(this._hasResidualMomentum=!1),this._previousMomentum=i}_hasScrolledAncestor(e,t,i){return e!==this.scrollTarget&&e!==this.scrollTarget.getRootNode().host&&(!(!this._canScroll(e,t,i)||-1===["auto","scroll"].indexOf(getComputedStyle(e).overflow))||(e!==this&&e.parentElement?this._hasScrolledAncestor(e.parentElement,t,i):void 0))}_canScroll(e,t,i){return i>0&&e.scrollTop<e.scrollHeight-e.offsetHeight||i<0&&e.scrollTop>0||t>0&&e.scrollLeft<e.scrollWidth-e.offsetWidth||t<0&&e.scrollLeft>0}_increasePoolIfNeeded(e){if(this._physicalCount>2&&e){const t=Math.ceil(this._optPhysicalSize/this._physicalAverage)-this._physicalCount;super._increasePoolIfNeeded(Math.max(e,Math.min(100,t)))}else super._increasePoolIfNeeded(e)}get _optPhysicalSize(){const e=super._optPhysicalSize;return e<=0||this.__hasPlaceholders()?e:e+this.__getItemHeightBuffer()}__getItemHeightBuffer(){if(0===this._physicalCount)return 0;const e=Math.ceil(this._viewportHeight*(this._maxPages-1)/2),t=Math.max(...this._physicalSizes);return t>Math.min(...this._physicalSizes)?Math.max(0,t-e):0}_getScrollLineHeight(){const e=document.createElement("div");e.style.fontSize="initial",e.style.display="none",document.body.appendChild(e);const t=window.getComputedStyle(e).fontSize;return document.body.removeChild(e),t?window.parseInt(t):void 0}__getVisibleElements(){return Array.from(this.elementsContainer.children).filter((e=>!e.hidden))}__reorderElements(){if(this.__mouseDown)return void(this.__pendingReorder=!0);this.__pendingReorder=!1;const e=this._virtualStart+(this._vidxOffset||0),t=this.__getVisibleElements(),i=this.__getFocusedElement(t)||t[0];if(!i)return;const r=i.__virtualIndex-e,o=t.indexOf(i)-r;if(o>0)for(let e=0;e<o;e++)this.elementsContainer.appendChild(t[e]);else if(o<0)for(let e=t.length+o;e<t.length;e++)this.elementsContainer.insertBefore(t[e],t[0]);if(qi){const{transform:e}=this.scrollTarget.style;this.scrollTarget.style.transform="translateZ(0)",setTimeout((()=>{this.scrollTarget.style.transform=e}))}}_adjustVirtualIndexOffset(e){const t=this._maxVirtualIndexOffset;if(this._virtualCount>=this.size)this._vidxOffset=0;else if(this.__skipNextVirtualIndexAdjust)this.__skipNextVirtualIndexAdjust=!1;else if(Math.abs(e)>1e4){const e=this._scrollTop/(this.scrollTarget.scrollHeight-this.scrollTarget.clientHeight);this._vidxOffset=Math.round(e*t)}else{const e=this._vidxOffset,i=ir,r=100;0===this._scrollTop?(this._vidxOffset=0,e!==this._vidxOffset&&super.scrollToIndex(0)):this.firstVisibleIndex<i&&this._vidxOffset>0&&(this._vidxOffset-=Math.min(this._vidxOffset,r),super.scrollToIndex(this.firstVisibleIndex+(e-this._vidxOffset))),this._scrollTop>=this._maxScrollTop&&this._maxScrollTop>0?(this._vidxOffset=t,e!==this._vidxOffset&&super.scrollToIndex(this._virtualCount-1)):this.firstVisibleIndex>this._virtualCount-i&&this._vidxOffset<t&&(this._vidxOffset+=Math.min(t-this._vidxOffset,r),super.scrollToIndex(this.firstVisibleIndex-(this._vidxOffset-e)))}}}Object.setPrototypeOf(rr.prototype,tr);class or{constructor(e){this.__adapter=new rr(e)}get firstVisibleIndex(){return this.__adapter.adjustedFirstVisibleIndex}get lastVisibleIndex(){return this.__adapter.adjustedLastVisibleIndex}get size(){return this.__adapter.size}set size(e){this.__adapter.size=e}scrollToIndex(e){this.__adapter.scrollToIndex(e)}update(e=0,t=this.size-1){this.__adapter.update(e,t)}flush(){this.__adapter.flush()}hostConnected(){this.__adapter.hostConnected()}}const sr=e=>class extends e{static get properties(){return{accessibleName:{type:String}}}static get observers(){return["_a11yUpdateGridSize(size, _columnTree)"]}_a11yGetHeaderRowCount(e){return e.filter((e=>e.some((e=>e.headerRenderer||e.path&&null!==e.header||e.header)))).length}_a11yGetFooterRowCount(e){return e.filter((e=>e.some((e=>e.headerRenderer)))).length}_a11yUpdateGridSize(e,t){if(void 0===e||void 0===t)return;const i=t[t.length-1];this.$.table.setAttribute("aria-rowcount",e+this._a11yGetHeaderRowCount(t)+this._a11yGetFooterRowCount(t)),this.$.table.setAttribute("aria-colcount",i&&i.length||0),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows()}_a11yUpdateHeaderRows(){fi(this.$.header,((e,t)=>{e.setAttribute("aria-rowindex",t+1)}))}_a11yUpdateFooterRows(){fi(this.$.footer,((e,t)=>{e.setAttribute("aria-rowindex",this._a11yGetHeaderRowCount(this._columnTree)+this.size+t+1)}))}_a11yUpdateRowRowindex(e,t){e.setAttribute("aria-rowindex",t+this._a11yGetHeaderRowCount(this._columnTree)+1)}_a11yUpdateRowSelected(e,t){e.setAttribute("aria-selected",Boolean(t)),bi(e,(e=>{e.setAttribute("aria-selected",Boolean(t))}))}_a11yUpdateRowExpanded(e){this.__isRowExpandable(e)?e.setAttribute("aria-expanded","false"):this.__isRowCollapsible(e)?e.setAttribute("aria-expanded","true"):e.removeAttribute("aria-expanded")}_a11yUpdateRowLevel(e,t){t>0||this.__isRowCollapsible(e)||this.__isRowExpandable(e)?e.setAttribute("aria-level",t+1):e.removeAttribute("aria-level")}_a11ySetRowDetailsCell(e,t){bi(e,(e=>{e!==t&&e.setAttribute("aria-controls",t.id)}))}_a11yUpdateCellColspan(e,t){e.setAttribute("aria-colspan",Number(t))}_a11yUpdateSorters(){Array.from(this.querySelectorAll("vaadin-grid-sorter")).forEach((e=>{let t=e.parentNode;for(;t&&"vaadin-grid-cell-content"!==t.localName;)t=t.parentNode;t&&t.assignedSlot&&t.assignedSlot.parentNode.setAttribute("aria-sort",{asc:"ascending",desc:"descending"}[String(e.direction)]||"none")}))}};let nr=!1;function ar(){return nr}function lr(e){return e.checkVisibility?!e.checkVisibility({visibilityProperty:!0}):null===e.offsetParent&&0===e.clientWidth&&0===e.clientHeight||function(e){const t=e.style;if("hidden"===t.visibility||"none"===t.display)return!0;const i=window.getComputedStyle(e);return"hidden"===i.visibility||"none"===i.display}(e)}window.addEventListener("keydown",(()=>{nr=!0}),{capture:!0}),window.addEventListener("mousedown",(()=>{nr=!1}),{capture:!0});const dr=e=>class extends e{static get properties(){return{activeItem:{type:Object,notify:!0,value:null,sync:!0}}}ready(){super.ready(),this.$.scroller.addEventListener("click",this._onClick.bind(this)),this.addEventListener("cell-activate",this._activateItem.bind(this)),this.addEventListener("row-activate",this._activateItem.bind(this))}_activateItem(e){const t=e.detail.model,i=t?t.item:null;i&&(this.activeItem=this._itemsEqual(this.activeItem,i)?null:i)}_shouldPreventCellActivationOnClick(e){const{cell:t}=this._getGridEventLocation(e);return e.defaultPrevented||!t||t.getAttribute("part").includes("details-cell")||t===this.$.emptystatecell||t._content.contains(this.getRootNode().activeElement)||this._isFocusable(e.target)||e.target instanceof HTMLLabelElement}_onClick(e){if(this._shouldPreventCellActivationOnClick(e))return;const{cell:t}=this._getGridEventLocation(e);t&&this.dispatchEvent(new CustomEvent("cell-activate",{detail:{model:this.__getRowModel(t.parentElement)}}))}_isFocusable(e){return(e=>{return e.offsetParent&&!e.part.contains("body-cell")&&!(t=e).matches('[tabindex="-1"]')&&(t.matches("input, select, textarea, button, object")?t.matches(":not([disabled])"):t.matches("a[href], area[href], iframe, [tabindex], [contentEditable]"))&&"hidden"!==getComputedStyle(e).visibility;var t})(e)}};function hr(e,t){return e.split(".").reduce(((e,t)=>e[t]),t)}function cr(e,t,i){if(0===i.length)return!1;let r=!0;return e.forEach((({path:e})=>{e&&-1!==e.indexOf(".")&&void 0===hr(e.replace(/\.[^.]*$/u,""),i[0])&&(console.warn(`Path "${e}" used for ${t} does not exist in all of the items, ${t} is disabled.`),r=!1)})),r}function ur(e){return[void 0,null].indexOf(e)>=0?"":isNaN(e)?e.toString():e}function _r(e,t){return(e=ur(e))<(t=ur(t))?-1:e>t?1:0}const pr=e=>class extends e{static get properties(){return{items:{type:Array,sync:!0}}}static get observers(){return["__dataProviderOrItemsChanged(dataProvider, items, isAttached, items.*)"]}__setArrayDataProvider(e){const t=(i=this.items,(e,t)=>{let r=i?[...i]:[];e.filters&&cr(e.filters,"filtering",r)&&(r=function(e,t){return e.filter((e=>t.every((t=>{const i=ur(hr(t.path,e)),r=ur(t.value).toString().toLowerCase();return i.toString().toLowerCase().includes(r)}))))}(r,e.filters)),Array.isArray(e.sortOrders)&&e.sortOrders.length&&cr(e.sortOrders,"sorting",r)&&(r=function(e,t){return e.sort(((e,i)=>t.map((t=>"asc"===t.direction?_r(hr(t.path,e),hr(t.path,i)):"desc"===t.direction?_r(hr(t.path,i),hr(t.path,e)):0)).reduce(((e,t)=>0!==e?e:t),0)))}(r,e.sortOrders));const o=Math.min(r.length,e.pageSize),s=e.page*o,n=s+o;t(r.slice(s,n),r.length)});var i;t.__items=e,this._arrayDataProvider=t,this.size=e.length,this.dataProvider=t}_onDataProviderPageReceived(){super._onDataProviderPageReceived(),this._arrayDataProvider&&(this.size=this._flatSize)}__dataProviderOrItemsChanged(e,t,i){i&&(this._arrayDataProvider?e!==this._arrayDataProvider?(this._arrayDataProvider=void 0,this.items=void 0):t?this._arrayDataProvider.__items===t?this.clearCache():this.__setArrayDataProvider(t):(this._arrayDataProvider=void 0,this.dataProvider=void 0,this.size=0,this.clearCache()):t&&this.__setArrayDataProvider(t))}},mr=e=>class extends e{static get properties(){return{__pendingRecalculateColumnWidths:{type:Boolean,value:!0}}}static get observers(){return["__dataProviderChangedAutoWidth(dataProvider)","__columnTreeChangedAutoWidth(_columnTree)","__flatSizeChangedAutoWidth(_flatSize)"]}constructor(){super(),this.addEventListener("animationend",this.__onAnimationEndAutoWidth)}__onAnimationEndAutoWidth(e){0===e.animationName.indexOf("vaadin-grid-appear")&&this.__tryToRecalculateColumnWidthsIfPending()}__dataProviderChangedAutoWidth(e){this.__hasHadRenderedRowsForColumnWidthCalculation||this.recalculateColumnWidths()}__columnTreeChangedAutoWidth(e){queueMicrotask((()=>this.recalculateColumnWidths()))}__flatSizeChangedAutoWidth(){requestAnimationFrame((()=>this.__tryToRecalculateColumnWidthsIfPending()))}_onDataProviderPageLoaded(){super._onDataProviderPageLoaded(),this.__tryToRecalculateColumnWidthsIfPending()}_updateFrozenColumn(){super._updateFrozenColumn(),this.__tryToRecalculateColumnWidthsIfPending()}__getIntrinsicWidth(e){return this.__intrinsicWidthCache.has(e)||this.__calculateAndCacheIntrinsicWidths([e]),this.__intrinsicWidthCache.get(e)}__getDistributedWidth(e,t){if(null==e||e===this)return 0;const i=Math.max(this.__getIntrinsicWidth(e),this.__getDistributedWidth((e.assignedSlot||e).parentElement,e));if(!t)return i;const r=i,o=e._visibleChildColumns.map((e=>this.__getIntrinsicWidth(e))).reduce(((e,t)=>e+t),0),s=Math.max(0,r-o),n=this.__getIntrinsicWidth(t)/o*s;return this.__getIntrinsicWidth(t)+n}_recalculateColumnWidths(){this.__virtualizer.flush(),[...this.$.header.children,...this.$.footer.children].forEach((e=>{e.__debounceUpdateHeaderFooterRowVisibility&&e.__debounceUpdateHeaderFooterRowVisibility.flush()})),this.__hasHadRenderedRowsForColumnWidthCalculation=this.__hasHadRenderedRowsForColumnWidthCalculation||this._getRenderedRows().length>0,this.__intrinsicWidthCache=new Map;const e=this._firstVisibleIndex,t=this._lastVisibleIndex;this.__viewportRowsCache=this._getRenderedRows().filter((i=>i.index>=e&&i.index<=t));const i=this.__getAutoWidthColumns();this.__calculateAndCacheIntrinsicWidths(i),i.forEach((e=>{e.width=`${this.__getDistributedWidth(e)}px`}))}__setVisibleCellContentAutoWidth(e,t){e._allCells.filter((e=>!this.$.items.contains(e)||this.__viewportRowsCache.includes(e.parentElement))).forEach((e=>{e.__measuringAutoWidth=t,e.__measuringAutoWidth?(e.__originalWidth=e.style.width,e.style.width="auto",e.style.position="absolute"):(e.style.width=e.__originalWidth,delete e.__originalWidth,e.style.position="")})),t?this.$.scroller.setAttribute("measuring-auto-width",""):this.$.scroller.removeAttribute("measuring-auto-width")}__getAutoWidthCellsMaxWidth(e){return e._allCells.reduce(((e,t)=>t.__measuringAutoWidth?Math.max(e,t.offsetWidth+1):e),0)}__calculateAndCacheIntrinsicWidths(e){e.forEach((e=>this.__setVisibleCellContentAutoWidth(e,!0))),e.forEach((e=>{const t=this.__getAutoWidthCellsMaxWidth(e);this.__intrinsicWidthCache.set(e,t)})),e.forEach((e=>this.__setVisibleCellContentAutoWidth(e,!1)))}recalculateColumnWidths(){this.__isReadyForColumnWidthCalculation()?this._recalculateColumnWidths():this.__pendingRecalculateColumnWidths=!0}__tryToRecalculateColumnWidthsIfPending(){this.__pendingRecalculateColumnWidths&&(this.__pendingRecalculateColumnWidths=!1,this.recalculateColumnWidths())}__getAutoWidthColumns(){return this._getColumns().filter((e=>!e.hidden&&e.autoWidth))}__isReadyForColumnWidthCalculation(){if(!this._columnTree)return!1;const e=this.__getAutoWidthColumns().filter((e=>!customElements.get(e.localName)));if(e.length)return Promise.all(e.map((e=>customElements.whenDefined(e.localName)))).then((()=>{this.__tryToRecalculateColumnWidthsIfPending()})),!1;const t=[...this.$.items.children].some((e=>void 0===e.index)),i=this._debouncerHiddenChanged&&this._debouncerHiddenChanged.isActive(),r=this.__debounceUpdateFrozenColumn&&this.__debounceUpdateFrozenColumn.isActive(),o=this.clientHeight>0;return!this._dataProviderController.isLoading()&&!t&&!lr(this)&&!i&&!r&&o}},gr="string"==typeof document.head.style.touchAction,fr="__polymerGestures",br="__polymerGesturesHandled",vr="__polymerGesturesTouchAction",yr=["mousedown","mousemove","mouseup","click"],Cr=[0,1,4,2],wr=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function Ar(e){return yr.indexOf(e)>-1}let xr=!1;!function(){try{const e=Object.defineProperty({},"passive",{get(){xr=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();const Sr=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/u),Er={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Ir(e){const t=e.type;if(!Ar(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!wr&&(t=Cr[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}const Pr={touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Tr(e,t,i){e.movefn=t,e.upfn=i,document.addEventListener("mousemove",t),document.addEventListener("mouseup",i)}function zr(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}const kr=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],Rr={},Or=[];function Nr(e){const t=kr(e);return t.length>0?t[0]:e.target}function Fr(e){const t=e.type,i=e.currentTarget[fr];if(!i)return;const r=i[t];if(!r)return;if(!e[br]&&(e[br]={},t.startsWith("touch"))){const i=e.changedTouches[0];if("touchstart"===t&&1===e.touches.length&&(Pr.touch.id=i.identifier),Pr.touch.id!==i.identifier)return;gr||"touchstart"!==t&&"touchmove"!==t||function(e){const t=e.changedTouches[0],i=e.type;if("touchstart"===i)Pr.touch.x=t.clientX,Pr.touch.y=t.clientY,Pr.touch.scrollDecided=!1;else if("touchmove"===i){if(Pr.touch.scrollDecided)return;Pr.touch.scrollDecided=!0;const i=function(e){let t="auto";const i=kr(e);for(let e,r=0;r<i.length;r++)if(e=i[r],e[vr]){t=e[vr];break}return t}(e);let r=!1;const o=Math.abs(Pr.touch.x-t.clientX),s=Math.abs(Pr.touch.y-t.clientY);e.cancelable&&("none"===i?r=!0:"pan-x"===i?r=s>o:"pan-y"===i&&(r=o>s)),r?e.preventDefault():Hr("track")}}(e)}const o=e[br];if(!o.skip){for(let t,i=0;i<Or.length;i++)t=Or[i],r[t.name]&&!o[t.name]&&t.flow&&t.flow.start.indexOf(e.type)>-1&&t.reset&&t.reset();for(let i,s=0;s<Or.length;s++)i=Or[s],r[i.name]&&!o[i.name]&&(o[i.name]=!0,i[t](e))}}function Dr(e,t,i){return!!Rr[t]&&(function(e,t,i){const r=Rr[t],o=r.deps,s=r.name;let n=e[fr];n||(e[fr]=n={});for(let t,i,r=0;r<o.length;r++)t=o[r],Sr&&Ar(t)&&"click"!==t||(i=n[t],i||(n[t]=i={_count:0}),0===i._count&&e.addEventListener(t,Fr,void Ar(t)),i[s]=(i[s]||0)+1,i._count=(i._count||0)+1);e.addEventListener(t,i),r.touchAction&&function(e,t){gr&&e instanceof HTMLElement&&Qt.run((()=>{e.style.touchAction=t})),e[vr]=t}(e,r.touchAction)}(e,t,i),!0)}function Mr(e){Or.push(e),e.emits.forEach((t=>{Rr[t]=e}))}function Lr(e,t,i){const r=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(r.detail=i,e.dispatchEvent(r),r.defaultPrevented){const e=i.preventer||i.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function Hr(e){const t=function(e){for(let t,i=0;i<Or.length;i++){t=Or[i];for(let i,r=0;r<t.emits.length;r++)if(i=t.emits[r],i===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function Br(e,t,i,r){t&&Lr(t,e,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:r,prevent:e=>Hr(e)})}function Vr(e,t,i){if(e.prevent)return!1;if(e.started)return!0;const r=Math.abs(e.x-t),o=Math.abs(e.y-i);return r>=5||o>=5}function Gr(e,t,i){if(!t)return;const r=e.moves[e.moves.length-2],o=e.moves[e.moves.length-1],s=o.x-e.x,n=o.y-e.y;let a,l=0;r&&(a=o.x-r.x,l=o.y-r.y),Lr(t,"track",{state:e.state,x:i.clientX,y:i.clientY,dx:s,dy:n,ddx:a,ddy:l,sourceEvent:i,hover:()=>function(e,t){let i=document.elementFromPoint(e,t),r=i;for(;r&&r.shadowRoot&&!window.ShadyDOM;){const o=r;if(r=r.shadowRoot.elementFromPoint(e,t),o===r)break;r&&(i=r)}return i}(i.clientX,i.clientY)})}function $r(e,t,i){const r=Math.abs(t.clientX-e.x),o=Math.abs(t.clientY-e.y),s=Nr(i||t);!s||Er[s.localName]&&s.hasAttribute("disabled")||(isNaN(r)||isNaN(o)||r<=25&&o<=25||function(e){if("click"===e.type){if(0===e.detail)return!0;const t=Nr(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;const i=t.getBoundingClientRect(),r=e.pageX,o=e.pageY;return!(r>=i.left&&r<=i.right&&o>=i.top&&o<=i.bottom)}return!1}(t))&&(e.prevent||Lr(s,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:i}))}Mr({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset(){zr(this.info)},mousedown(e){if(!Ir(e))return;const t=Nr(e),i=this;Tr(this.info,(e=>{Ir(e)||(Br("up",t,e),zr(i.info))}),(e=>{Ir(e)&&Br("up",t,e),zr(i.info)})),Br("down",t,e)},touchstart(e){Br("down",Nr(e),e.changedTouches[0],e)},touchend(e){Br("up",Nr(e),e.changedTouches[0],e)}}),Mr({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,zr(this.info)},mousedown(e){if(!Ir(e))return;const t=Nr(e),i=this,r=e=>{const r=e.clientX,o=e.clientY;Vr(i.info,r,o)&&(i.info.state=i.info.started?"mouseup"===e.type?"end":"track":"start","start"===i.info.state&&Hr("tap"),i.info.addMove({x:r,y:o}),Ir(e)||(i.info.state="end",zr(i.info)),t&&Gr(i.info,t,e),i.info.started=!0)};Tr(this.info,r,(e=>{i.info.started&&r(e),zr(i.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove(e){const t=Nr(e),i=e.changedTouches[0],r=i.clientX,o=i.clientY;Vr(this.info,r,o)&&("start"===this.info.state&&Hr("tap"),this.info.addMove({x:r,y:o}),Gr(this.info,t,i),this.info.state="track",this.info.started=!0)},touchend(e){const t=Nr(e),i=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),Gr(this.info,t,i))}}),Mr({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown(e){Ir(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click(e){Ir(e)&&$r(this.info,e)},touchstart(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend(e){$r(this.info,e.changedTouches[0],e)}});const Wr=e=>class extends e{static get properties(){return{columnReorderingAllowed:{type:Boolean,value:!1},_orderBaseScope:{type:Number,value:1e7}}}static get observers(){return["_updateOrders(_columnTree)"]}ready(){super.ready(),Dr(this,"track",this._onTrackEvent),this._reorderGhost=this.shadowRoot.querySelector('[part="reorder-ghost"]'),this.addEventListener("touchstart",this._onTouchStart.bind(this)),this.addEventListener("touchmove",this._onTouchMove.bind(this)),this.addEventListener("touchend",this._onTouchEnd.bind(this)),this.addEventListener("contextmenu",this._onContextMenu.bind(this))}_onContextMenu(e){this.hasAttribute("reordering")&&(e.preventDefault(),ji||this._onTrackEnd())}_onTouchStart(e){this._startTouchReorderTimeout=setTimeout((()=>{this._onTrackStart({detail:{x:e.touches[0].clientX,y:e.touches[0].clientY}})}),100)}_onTouchMove(e){this._draggedColumn&&e.preventDefault(),clearTimeout(this._startTouchReorderTimeout)}_onTouchEnd(){clearTimeout(this._startTouchReorderTimeout),this._onTrackEnd()}_onTrackEvent(e){if("start"===e.detail.state){const t=e.composedPath(),i=t[t.indexOf(this.$.header)-2];if(!i||!i._content)return;if(i._content.contains(this.getRootNode().activeElement))return;if(this.$.scroller.hasAttribute("column-resizing"))return;this._touchDevice||this._onTrackStart(e)}else"track"===e.detail.state?this._onTrack(e):"end"===e.detail.state&&this._onTrackEnd(e)}_onTrackStart(e){if(!this.columnReorderingAllowed)return;const t=e.composedPath&&e.composedPath();if(t&&t.some((e=>e.hasAttribute&&e.hasAttribute("draggable"))))return;const i=this._cellFromPoint(e.detail.x,e.detail.y);if(i&&i.getAttribute("part").includes("header-cell")){for(this.toggleAttribute("reordering",!0),this._draggedColumn=i._column;1===this._draggedColumn.parentElement.childElementCount;)this._draggedColumn=this._draggedColumn.parentElement;this._setSiblingsReorderStatus(this._draggedColumn,"allowed"),this._draggedColumn._reorderStatus="dragging",this._updateGhost(i),this._reorderGhost.style.visibility="visible",this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._autoScroller()}}_onTrack(e){if(!this._draggedColumn)return;const t=this._cellFromPoint(e.detail.x,e.detail.y);if(!t)return;const i=this._getTargetColumn(t,this._draggedColumn);if(this._isSwapAllowed(this._draggedColumn,i)&&this._isSwappableByPosition(i,e.detail.x)){const e=this._columnTree.findIndex((e=>e.includes(i))),t=this._getColumnsInOrder(e),r=t.indexOf(this._draggedColumn),o=t.indexOf(i),s=r<o?1:-1;for(let e=r;e!==o;e+=s)this._swapColumnOrders(this._draggedColumn,t[e+s])}this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._lastDragClientX=e.detail.x}_onTrackEnd(){this._draggedColumn&&(this.toggleAttribute("reordering",!1),this._draggedColumn._reorderStatus="",this._setSiblingsReorderStatus(this._draggedColumn,""),this._draggedColumn=null,this._lastDragClientX=null,this._reorderGhost.style.visibility="hidden",this.dispatchEvent(new CustomEvent("column-reorder",{detail:{columns:this._getColumnsInOrder()}})))}_getColumnsInOrder(e=this._columnTree.length-1){return this._columnTree[e].filter((e=>!e.hidden)).sort(((e,t)=>e._order-t._order))}_cellFromPoint(e=0,t=0){this._draggedColumn||this.$.scroller.toggleAttribute("no-content-pointer-events",!0);const i=this.shadowRoot.elementFromPoint(e,t);return this.$.scroller.toggleAttribute("no-content-pointer-events",!1),this._getCellFromElement(i)}_getCellFromElement(e){if(e){if(e._column)return e;const{parentElement:t}=e;if(t&&t._focusButton===e)return t}return null}_updateGhostPosition(e,t){const i=this._reorderGhost.getBoundingClientRect(),r=e-i.width/2,o=t-i.height/2,s=parseInt(this._reorderGhost._left||0),n=parseInt(this._reorderGhost._top||0);this._reorderGhost._left=s-(i.left-r),this._reorderGhost._top=n-(i.top-o),this._reorderGhost.style.transform=`translate(${this._reorderGhost._left}px, ${this._reorderGhost._top}px)`}_updateGhost(e){const t=this._reorderGhost;t.textContent=e._content.innerText;const i=window.getComputedStyle(e);return["boxSizing","display","width","height","background","alignItems","padding","border","flex-direction","overflow"].forEach((e=>{t.style[e]=i[e]})),t}_updateOrders(e){void 0!==e&&(e[0].forEach((e=>{e._order=0})),vi(e[0],this._orderBaseScope,0))}_setSiblingsReorderStatus(e,t){fi(e.parentNode,(i=>{/column/u.test(i.localName)&&this._isSwapAllowed(i,e)&&(i._reorderStatus=t)}))}_autoScroller(){if(this._lastDragClientX){const e=this._lastDragClientX-this.getBoundingClientRect().right+50,t=this.getBoundingClientRect().left-this._lastDragClientX+50;e>0?this.$.table.scrollLeft+=e/10:t>0&&(this.$.table.scrollLeft-=t/10)}this._draggedColumn&&setTimeout((()=>this._autoScroller()),10)}_isSwapAllowed(e,t){if(e&&t){const i=e!==t,r=e.parentElement===t.parentElement,o=e.frozen&&t.frozen||e.frozenToEnd&&t.frozenToEnd||!e.frozen&&!e.frozenToEnd&&!t.frozen&&!t.frozenToEnd;return i&&r&&o}}_isSwappableByPosition(e,t){const i=Array.from(this.$.header.querySelectorAll('tr:not([hidden]) [part~="cell"]')).find((t=>e.contains(t._column))),r=this.$.header.querySelector("tr:not([hidden]) [reorder-status=dragging]").getBoundingClientRect(),o=i.getBoundingClientRect();return o.left>r.left?t>o.right-r.width:t<o.left+r.width}_swapColumnOrders(e,t){[e._order,t._order]=[t._order,e._order],this._debounceUpdateFrozenColumn(),this._updateFirstAndLastColumn()}_getTargetColumn(e,t){if(e&&t){let i=e._column;for(;i.parentElement!==t.parentElement&&i!==this;)i=i.parentElement;return i.parentElement===t.parentElement?i:e._column}}},Ur=e=>class extends e{ready(){super.ready();const e=this.$.scroller;Dr(e,"track",this._onHeaderTrack.bind(this)),e.addEventListener("touchmove",(t=>e.hasAttribute("column-resizing")&&t.preventDefault())),e.addEventListener("contextmenu",(e=>"resize-handle"===e.target.getAttribute("part")&&e.preventDefault())),e.addEventListener("mousedown",(e=>"resize-handle"===e.target.getAttribute("part")&&e.preventDefault()))}_onHeaderTrack(e){const t=e.target;if("resize-handle"===t.getAttribute("part")){let i=t.parentElement._column;for(this.$.scroller.toggleAttribute("column-resizing",!0);"vaadin-grid-column-group"===i.localName;)i=i._childColumns.slice(0).sort(((e,t)=>e._order-t._order)).filter((e=>!e.hidden)).pop();const r=this.__isRTL,o=e.detail.x,s=Array.from(this.$.header.querySelectorAll('[part~="row"]:last-child [part~="cell"]')),n=s.find((e=>e._column===i));if(n.offsetWidth){const e=getComputedStyle(n._content),t=10+parseInt(e.paddingLeft)+parseInt(e.paddingRight)+parseInt(e.borderLeftWidth)+parseInt(e.borderRightWidth)+parseInt(e.marginLeft)+parseInt(e.marginRight);let s;const a=n.offsetWidth,l=n.getBoundingClientRect();s=n.hasAttribute("frozen-to-end")?a+(r?o-l.right:l.left-o):a+(r?l.left-o:o-l.right),i.width=`${Math.max(t,s)}px`,i.flexGrow=0}s.sort(((e,t)=>e._column._order-t._column._order)).forEach(((e,t,i)=>{t<i.indexOf(n)&&(e._column.width=`${e.offsetWidth}px`,e._column.flexGrow=0)}));const a=this._frozenToEndCells[0];if(a&&this.$.table.scrollWidth>this.$.table.offsetWidth){const e=a.getBoundingClientRect(),t=o-(r?e.right:e.left);(r&&t<=0||!r&&t>=0)&&(this.$.table.scrollLeft+=t)}"end"===e.detail.state&&(this.$.scroller.toggleAttribute("column-resizing",!1),this.dispatchEvent(new CustomEvent("column-resize",{detail:{resizedColumn:i}}))),this._resizeHandler()}}};function qr(e,t,i=0){let r=t;for(const t of e.subCaches){const e=t.parentCacheIndex;if(r<=e)break;if(r<=e+t.flatSize)return qr(t,r-e-1,i+1);r-=t.flatSize}return{cache:e,item:e.items[r],index:r,page:Math.floor(r/e.pageSize),level:i}}function jr({getItemId:e},t,i,r=0,o=0){for(let s=0;s<t.items.length;s++){const n=t.items[s];if(n&&e(n)===e(i))return{cache:t,level:r,item:n,index:s,page:Math.floor(s/t.pageSize),subCache:t.getSubCache(s),flatIndex:o+t.getFlatIndex(s)}}for(const s of t.subCaches){const n=jr({getItemId:e},s,i,r+1,o+t.getFlatIndex(s.parentCacheIndex)+1);if(n)return n}}function Yr(e,[t,...i],r=0){t===1/0&&(t=e.size-1);const o=e.getFlatIndex(t),s=e.getSubCache(t);return s&&s.flatSize>0&&i.length?Yr(s,i,r+o+1):r+o}class Kr{context;pageSize;items=[];pendingRequests={};__subCacheByIndex={};__size=0;__flatSize=0;constructor(e,t,i,r,o){this.context=e,this.pageSize=t,this.size=i,this.parentCache=r,this.parentCacheIndex=o,this.__flatSize=i||0}get parentItem(){return this.parentCache&&this.parentCache.items[this.parentCacheIndex]}get subCaches(){return Object.values(this.__subCacheByIndex)}get isLoading(){return Object.keys(this.pendingRequests).length>0||this.subCaches.some((e=>e.isLoading))}get flatSize(){return this.__flatSize}get effectiveSize(){return console.warn("<vaadin-grid> The `effectiveSize` property of ItemCache is deprecated and will be removed in Vaadin 25."),this.flatSize}get size(){return this.__size}set size(e){if(this.__size!==e){if(this.__size=e,void 0!==this.context.placeholder){this.items.length=e||0;for(let t=0;t<e;t++)this.items[t]||=this.context.placeholder}Object.keys(this.pendingRequests).forEach((e=>{parseInt(e)*this.pageSize>=this.size&&delete this.pendingRequests[e]}))}}recalculateFlatSize(){this.__flatSize=!this.parentItem||this.context.isExpanded(this.parentItem)?this.size+this.subCaches.reduce(((e,t)=>(t.recalculateFlatSize(),e+t.flatSize)),0):0}setPage(e,t){const i=e*this.pageSize;t.forEach(((e,t)=>{const r=i+t;(void 0===this.size||r<this.size)&&(this.items[r]=e)}))}getSubCache(e){return this.__subCacheByIndex[e]}removeSubCache(e){delete this.__subCacheByIndex[e]}removeSubCaches(){this.__subCacheByIndex={}}createSubCache(e){const t=new Kr(this.context,this.pageSize,0,this,e);return this.__subCacheByIndex[e]=t,t}getFlatIndex(e){const t=Math.max(0,Math.min(this.size-1,e));return this.subCaches.reduce(((e,i)=>{const r=i.parentCacheIndex;return t>r?e+i.flatSize:e}),t)}getItemForIndex(e){console.warn("<vaadin-grid> The `getItemForIndex` method of ItemCache is deprecated and will be removed in Vaadin 25.");const{item:t}=qr(this,e);return t}getCacheAndIndex(e){console.warn("<vaadin-grid> The `getCacheAndIndex` method of ItemCache is deprecated and will be removed in Vaadin 25.");const{cache:t,index:i}=qr(this,e);return{cache:t,scaledIndex:i}}updateSize(){console.warn("<vaadin-grid> The `updateSize` method of ItemCache is deprecated and will be removed in Vaadin 25."),this.recalculateFlatSize()}ensureSubCacheForScaledIndex(e){if(console.warn("<vaadin-grid> The `ensureSubCacheForScaledIndex` method of ItemCache is deprecated and will be removed in Vaadin 25."),!this.getSubCache(e)){const t=this.createSubCache(e);this.context.__controller.__loadCachePage(t,0)}}get grid(){return console.warn("<vaadin-grid> The `grid` property of ItemCache is deprecated and will be removed in Vaadin 25."),this.context.__controller.host}get itemCaches(){return console.warn("<vaadin-grid> The `itemCaches` property of ItemCache is deprecated and will be removed in Vaadin 25."),this.__subCacheByIndex}}class Xr extends EventTarget{host;dataProvider;dataProviderParams;pageSize;isExpanded;getItemId;rootCache;placeholder;isPlaceholder;constructor(e,{size:t,pageSize:i,isExpanded:r,getItemId:o,isPlaceholder:s,placeholder:n,dataProvider:a,dataProviderParams:l}){super(),this.host=e,this.pageSize=i,this.getItemId=o,this.isExpanded=r,this.placeholder=n,this.isPlaceholder=s,this.dataProvider=a,this.dataProviderParams=l,this.rootCache=this.__createRootCache(t)}get flatSize(){return this.rootCache.flatSize}get __cacheContext(){return{isExpanded:this.isExpanded,placeholder:this.placeholder,__controller:this}}isLoading(){return this.rootCache.isLoading}setPageSize(e){this.pageSize=e,this.clearCache()}setDataProvider(e){this.dataProvider=e,this.clearCache()}recalculateFlatSize(){this.rootCache.recalculateFlatSize()}clearCache(){this.rootCache=this.__createRootCache(this.rootCache.size)}getFlatIndexContext(e){return qr(this.rootCache,e)}getItemContext(e){return jr({getItemId:this.getItemId},this.rootCache,e)}getFlatIndexByPath(e){return Yr(this.rootCache,e)}ensureFlatIndexLoaded(e){const{cache:t,page:i,item:r}=this.getFlatIndexContext(e);this.__isItemLoaded(r)||this.__loadCachePage(t,i)}ensureFlatIndexHierarchy(e){const{cache:t,item:i,index:r}=this.getFlatIndexContext(e);if(this.__isItemLoaded(i)&&this.isExpanded(i)&&!t.getSubCache(r)){const e=t.createSubCache(r);this.__loadCachePage(e,0)}}loadFirstPage(){this.__loadCachePage(this.rootCache,0)}__createRootCache(e){return new Kr(this.__cacheContext,this.pageSize,e)}__loadCachePage(e,t){if(!this.dataProvider||e.pendingRequests[t])return;let i={page:t,pageSize:this.pageSize,parentItem:e.parentItem};this.dataProviderParams&&(i={...i,...this.dataProviderParams()});const r=(o,s)=>{e.pendingRequests[t]===r&&(void 0!==s?e.size=s:i.parentItem&&(e.size=o.length),e.setPage(t,o),this.recalculateFlatSize(),this.dispatchEvent(new CustomEvent("page-received")),delete e.pendingRequests[t],this.dispatchEvent(new CustomEvent("page-loaded")))};e.pendingRequests[t]=r,this.dispatchEvent(new CustomEvent("page-requested")),this.dataProvider(i,r)}__isItemLoaded(e){return this.isPlaceholder?!this.isPlaceholder(e):this.placeholder?e!==this.placeholder:!!e}}const Jr=e=>class extends e{static get properties(){return{size:{type:Number,notify:!0,sync:!0},_flatSize:{type:Number,sync:!0},pageSize:{type:Number,value:50,observer:"_pageSizeChanged",sync:!0},dataProvider:{type:Object,notify:!0,observer:"_dataProviderChanged",sync:!0},loading:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0},_hasData:{type:Boolean,value:!1,sync:!0},itemHasChildrenPath:{type:String,value:"children",observer:"__itemHasChildrenPathChanged",sync:!0},itemIdPath:{type:String,value:null,sync:!0},expandedItems:{type:Object,notify:!0,value:()=>[],sync:!0},__expandedKeys:{type:Object,computed:"__computeExpandedKeys(itemIdPath, expandedItems)"}}}static get observers(){return["_sizeChanged(size)","_expandedItemsChanged(expandedItems)"]}constructor(){super(),this._dataProviderController=new Xr(this,{size:this.size||0,pageSize:this.pageSize,getItemId:this.getItemId.bind(this),isExpanded:this._isExpanded.bind(this),dataProvider:this.dataProvider?this.dataProvider.bind(this):null,dataProviderParams:()=>({sortOrders:this._mapSorters(),filters:this._mapFilters()})}),this._dataProviderController.addEventListener("page-requested",this._onDataProviderPageRequested.bind(this)),this._dataProviderController.addEventListener("page-received",this._onDataProviderPageReceived.bind(this)),this._dataProviderController.addEventListener("page-loaded",this._onDataProviderPageLoaded.bind(this))}get _cache(){return console.warn("<vaadin-grid> The `_cache` property is deprecated and will be removed in Vaadin 25."),this._dataProviderController.rootCache}get _effectiveSize(){return console.warn("<vaadin-grid> The `_effectiveSize` property is deprecated and will be removed in Vaadin 25."),this._flatSize}_sizeChanged(e){this._dataProviderController.rootCache.size=e,this._dataProviderController.recalculateFlatSize(),this._flatSize=this._dataProviderController.flatSize}__itemHasChildrenPathChanged(e,t){(t||"children"!==e)&&this.requestContentUpdate()}_getItem(e,t){t.index=e;const{item:i}=this._dataProviderController.getFlatIndexContext(e);i?(this.__updateLoading(t,!1),this._updateItem(t,i),this._isExpanded(i)&&this._dataProviderController.ensureFlatIndexHierarchy(e)):(this.__updateLoading(t,!0),this._dataProviderController.ensureFlatIndexLoaded(e))}__updateLoading(e,t){const i=gi(e);yi(e,"loading",t),wi(i,"loading-row-cell",t),t&&(this._generateCellClassNames(e),this._generateCellPartNames(e))}getItemId(e){return this.itemIdPath?di(this.itemIdPath,e):e}_isExpanded(e){return this.__expandedKeys&&this.__expandedKeys.has(this.getItemId(e))}_expandedItemsChanged(){this._dataProviderController.recalculateFlatSize(),this._flatSize=this._dataProviderController.flatSize,this.__updateVisibleRows()}__computeExpandedKeys(e,t){const i=t||[],r=new Set;return i.forEach((e=>{r.add(this.getItemId(e))})),r}expandItem(e){this._isExpanded(e)||(this.expandedItems=[...this.expandedItems,e])}collapseItem(e){this._isExpanded(e)&&(this.expandedItems=this.expandedItems.filter((t=>!this._itemsEqual(t,e))))}_getIndexLevel(e=0){const{level:t}=this._dataProviderController.getFlatIndexContext(e);return t}_loadPage(e,t){console.warn("<vaadin-grid> The `_loadPage` method is deprecated and will be removed in Vaadin 25."),this._dataProviderController.__loadCachePage(t,e)}_onDataProviderPageRequested(){this._setLoading(!0)}_onDataProviderPageReceived(){this._flatSize!==this._dataProviderController.flatSize&&(this._shouldUpdateAllRenderedRowsAfterPageLoad=!0,this._flatSize=this._dataProviderController.flatSize),this._getRenderedRows().forEach((e=>{this._dataProviderController.ensureFlatIndexHierarchy(e.index)})),this._hasData=!0}_onDataProviderPageLoaded(){this._debouncerApplyCachedData=ti.debounce(this._debouncerApplyCachedData,Xt.after(0),(()=>{this._setLoading(!1);const e=this._shouldUpdateAllRenderedRowsAfterPageLoad;this._shouldUpdateAllRenderedRowsAfterPageLoad=!1,this._getRenderedRows().forEach((t=>{const{item:i}=this._dataProviderController.getFlatIndexContext(t.index);(i||e)&&this._getItem(t.index,t)})),this.__scrollToPendingIndexes(),this.__dispatchPendingBodyCellFocus()})),this._dataProviderController.isLoading()||this._debouncerApplyCachedData.flush()}__debounceClearCache(){this.__clearCacheDebouncer=ti.debounce(this.__clearCacheDebouncer,Qt,(()=>this.clearCache()))}clearCache(){this._dataProviderController.clearCache(),this._dataProviderController.rootCache.size=this.size||0,this._dataProviderController.recalculateFlatSize(),this._hasData=!1,this.__updateVisibleRows(),this.__virtualizer&&this.__virtualizer.size||this._dataProviderController.loadFirstPage()}_pageSizeChanged(e,t){this._dataProviderController.setPageSize(e),void 0!==t&&e!==t&&this.clearCache()}_checkSize(){void 0===this.size&&0===this._flatSize&&console.warn("The <vaadin-grid> needs the total number of items in order to display rows, which you can specify either by setting the `size` property, or by providing it to the second argument of the `dataProvider` function `callback` call.")}_dataProviderChanged(e,t){this._dataProviderController.setDataProvider(e?e.bind(this):null),void 0!==t&&this.clearCache(),this._ensureFirstPageLoaded(),this._debouncerCheckSize=ti.debounce(this._debouncerCheckSize,Xt.after(2e3),this._checkSize.bind(this))}_ensureFirstPageLoaded(){this._hasData||this._dataProviderController.loadFirstPage()}_itemsEqual(e,t){return this.getItemId(e)===this.getItemId(t)}_getItemIndexInArray(e,t){let i=-1;return t.forEach(((t,r)=>{this._itemsEqual(t,e)&&(i=r)})),i}scrollToIndex(...e){let t;for(;t!==(t=this._dataProviderController.getFlatIndexByPath(e));)this._scrollToFlatIndex(t);!this._dataProviderController.isLoading()&&this.clientHeight&&this._columnTree||(this.__pendingScrollToIndexes=e)}__scrollToPendingIndexes(){if(this.__pendingScrollToIndexes&&this.$.items.children.length){const e=this.__pendingScrollToIndexes;delete this.__pendingScrollToIndexes,this.scrollToIndex(...e)}}},Zr="between",Qr="on-top-or-between",eo="above",to="below",io="empty",ro=e=>class extends e{static get properties(){return{dropMode:{type:String,sync:!0},rowsDraggable:{type:Boolean,sync:!0},dragFilter:{type:Function,sync:!0},dropFilter:{type:Function,sync:!0},__dndAutoScrollThreshold:{value:50},__draggedItems:{value:()=>[]}}}static get observers(){return["_dragDropAccessChanged(rowsDraggable, dropMode, dragFilter, dropFilter, loading)"]}constructor(){super(),this.__onDocumentDragStart=this.__onDocumentDragStart.bind(this)}ready(){super.ready(),this.$.table.addEventListener("dragstart",this._onDragStart.bind(this)),this.$.table.addEventListener("dragend",this._onDragEnd.bind(this)),this.$.table.addEventListener("dragover",this._onDragOver.bind(this)),this.$.table.addEventListener("dragleave",this._onDragLeave.bind(this)),this.$.table.addEventListener("drop",this._onDrop.bind(this)),this.$.table.addEventListener("dragenter",(e=>{this.dropMode&&(e.preventDefault(),e.stopPropagation())}))}connectedCallback(){super.connectedCallback(),document.addEventListener("dragstart",this.__onDocumentDragStart,{capture:!0})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("dragstart",this.__onDocumentDragStart,{capture:!0})}_onDragStart(e){if(this.rowsDraggable){let t=e.target;if("vaadin-grid-cell-content"===t.localName&&(t=t.assignedSlot.parentNode.parentNode),t.parentNode!==this.$.items)return;if(e.stopPropagation(),this.toggleAttribute("dragging-rows",!0),this._safari){const e=t.style.transform;t.style.top=/translateY\((.*)\)/u.exec(e)[1],t.style.transform="none",requestAnimationFrame((()=>{t.style.top="",t.style.transform=e}))}const i=t.getBoundingClientRect();e.dataTransfer.setDragImage(t,e.clientX-i.left,e.clientY-i.top);let r=[t];this._isSelected(t._item)&&(r=this.__getViewportRows().filter((e=>this._isSelected(e._item))).filter((e=>!this.dragFilter||this.dragFilter(this.__getRowModel(e))))),this.__draggedItems=r.map((e=>e._item)),e.dataTransfer.setData("text",this.__formatDefaultTransferData(r)),Ai(t,{dragstart:r.length>1?`${r.length}`:""}),this.style.setProperty("--_grid-drag-start-x",e.clientX-i.left+20+"px"),this.style.setProperty("--_grid-drag-start-y",e.clientY-i.top+10+"px"),requestAnimationFrame((()=>{Ai(t,{dragstart:!1}),this.style.setProperty("--_grid-drag-start-x",""),this.style.setProperty("--_grid-drag-start-y",""),this.requestContentUpdate()}));const o=new CustomEvent("grid-dragstart",{detail:{draggedItems:[...this.__draggedItems],setDragData:(t,i)=>e.dataTransfer.setData(t,i),setDraggedItemsCount:e=>t.setAttribute("dragstart",e)}});o.originalEvent=e,this.dispatchEvent(o)}}_onDragEnd(e){this.toggleAttribute("dragging-rows",!1),e.stopPropagation();const t=new CustomEvent("grid-dragend");t.originalEvent=e,this.dispatchEvent(t),this.__draggedItems=[],this.requestContentUpdate()}_onDragLeave(e){this.dropMode&&(e.stopPropagation(),this._clearDragStyles())}_onDragOver(e){if(this.dropMode){if(this._dropLocation=void 0,this._dragOverItem=void 0,this.__dndAutoScroll(e.clientY))return void this._clearDragStyles();let t=e.composedPath().find((e=>"tr"===e.localName));if(this._flatSize&&"on-grid"!==this.dropMode)if(t&&t.parentNode===this.$.items){const i=t.getBoundingClientRect();if(this._dropLocation="on-top",this.dropMode===Zr){const t=e.clientY-i.top<i.bottom-e.clientY;this._dropLocation=t?eo:to}else this.dropMode===Qr&&(e.clientY-i.top<i.height/3?this._dropLocation=eo:e.clientY-i.top>i.height/3*2&&(this._dropLocation=to))}else{if(t)return;if(this.dropMode!==Zr&&this.dropMode!==Qr)return;t=Array.from(this.$.items.children).filter((e=>!e.hidden)).pop(),this._dropLocation=to}else this._dropLocation=io;if(t&&t.hasAttribute("drop-disabled"))return void(this._dropLocation=void 0);e.stopPropagation(),e.preventDefault(),this._dropLocation===io?this.toggleAttribute("dragover",!0):t?(this._dragOverItem=t._item,t.getAttribute("dragover")!==this._dropLocation&&xi(t,{dragover:this._dropLocation})):this._clearDragStyles()}}__onDocumentDragStart(e){if(e.target.contains(this)){const t=[e.target,this.$.items,this.$.scroller],i=t.map((e=>e.style.cssText));this.$.table.scrollHeight>2e4&&(this.$.scroller.style.display="none"),Gi&&(e.target.style.willChange="transform"),qi&&(this.$.items.style.flexShrink=1),requestAnimationFrame((()=>{t.forEach(((e,t)=>{e.style.cssText=i[t]}))}))}}__dndAutoScroll(e){if(this.__dndAutoScrolling)return!0;const t=this.$.header.getBoundingClientRect().bottom,i=this.$.footer.getBoundingClientRect().top,r=t-e+this.__dndAutoScrollThreshold,o=e-i+this.__dndAutoScrollThreshold;let s=0;if(o>0?s=2*o:r>0&&(s=2*-r),s){const e=this.$.table.scrollTop;if(this.$.table.scrollTop+=s,e!==this.$.table.scrollTop)return this.__dndAutoScrolling=!0,setTimeout((()=>{this.__dndAutoScrolling=!1}),20),!0}}__getViewportRows(){const e=this.$.header.getBoundingClientRect().bottom,t=this.$.footer.getBoundingClientRect().top;return Array.from(this.$.items.children).filter((i=>{const r=i.getBoundingClientRect();return r.bottom>e&&r.top<t}))}_clearDragStyles(){this.removeAttribute("dragover"),fi(this.$.items,(e=>{xi(e,{dragover:null})}))}__updateDragSourceParts(e,t){Ai(e,{"drag-source":this.__draggedItems.includes(t.item)})}_onDrop(e){if(this.dropMode){e.stopPropagation(),e.preventDefault();const t=e.dataTransfer.types&&Array.from(e.dataTransfer.types).map((t=>({type:t,data:e.dataTransfer.getData(t)})));this._clearDragStyles();const i=new CustomEvent("grid-drop",{bubbles:e.bubbles,cancelable:e.cancelable,detail:{dropTargetItem:this._dragOverItem,dropLocation:this._dropLocation,dragData:t}});i.originalEvent=e,this.dispatchEvent(i)}}__formatDefaultTransferData(e){return e.map((e=>Array.from(e.children).filter((e=>!e.hidden&&-1===e.getAttribute("part").indexOf("details-cell"))).sort(((e,t)=>e._column._order>t._column._order?1:-1)).map((e=>e._content.textContent.trim())).filter((e=>e)).join("\t"))).join("\n")}_dragDropAccessChanged(){this.filterDragAndDrop()}filterDragAndDrop(){fi(this.$.items,(e=>{e.hidden||this._filterDragAndDrop(e,this.__getRowModel(e))}))}_filterDragAndDrop(e,t){const i=this.loading||e.hasAttribute("loading"),r=!this.rowsDraggable||i||this.dragFilter&&!this.dragFilter(t),o=!this.dropMode||i||this.dropFilter&&!this.dropFilter(t);bi(e,(e=>{r?e._content.removeAttribute("draggable"):e._content.setAttribute("draggable",!0)})),Ai(e,{"drag-disabled":!!r,"drop-disabled":!!o})}};function oo(e,t){if(!e||!t||e.length!==t.length)return!1;for(let i=0,r=e.length;i<r;i++)if(e[i]instanceof Array&&t[i]instanceof Array){if(!oo(e[i],t[i]))return!1}else if(e[i]!==t[i])return!1;return!0}const so=e=>class extends e{static get properties(){return{_columnTree:{type:Object,sync:!0}}}ready(){super.ready(),this._addNodeObserver()}_hasColumnGroups(e){return e.some((e=>"vaadin-grid-column-group"===e.localName))}_getChildColumns(e){return Ei.getColumns(e)}_flattenColumnGroups(e){return e.map((e=>"vaadin-grid-column-group"===e.localName?this._getChildColumns(e):[e])).reduce(((e,t)=>e.concat(t)),[])}_getColumnTree(){const e=Ei.getColumns(this),t=[e];let i=e;for(;this._hasColumnGroups(i);)i=this._flattenColumnGroups(i),t.push(i);return t}_debounceUpdateColumnTree(){this.__updateColumnTreeDebouncer=ti.debounce(this.__updateColumnTreeDebouncer,Qt,(()=>this._updateColumnTree()))}_updateColumnTree(){const e=this._getColumnTree();oo(e,this._columnTree)||(this._columnTree=e)}_addNodeObserver(){this._observer=new Ei(this,((e,t)=>{const i=t.flatMap((e=>e._allCells)),r=e=>i.filter((t=>t&&t._content.contains(e))).length;this.__removeSorters(this._sorters.filter(r)),this.__removeFilters(this._filters.filter(r)),this._debounceUpdateColumnTree(),this._debouncerCheckImports=ti.debounce(this._debouncerCheckImports,Xt.after(2e3),this._checkImports.bind(this)),this._ensureFirstPageLoaded()}))}_checkImports(){["vaadin-grid-column-group","vaadin-grid-filter","vaadin-grid-filter-column","vaadin-grid-tree-toggle","vaadin-grid-selection-column","vaadin-grid-sort-column","vaadin-grid-sorter"].forEach((e=>{this.querySelector(e)&&!customElements.get(e)&&console.warn(`Make sure you have imported the required module for <${e}> element.`)}))}_updateFirstAndLastColumn(){Array.from(this.shadowRoot.querySelectorAll("tr")).forEach((e=>this._updateFirstAndLastColumnForRow(e)))}_updateFirstAndLastColumnForRow(e){Array.from(e.querySelectorAll('[part~="cell"]:not([part~="details-cell"])')).sort(((e,t)=>e._column._order-t._column._order)).forEach(((e,t,i)=>{Si(e,"first-column",0===t),Si(e,"last-column",t===i.length-1)}))}_isColumnElement(e){return e.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(e.localName)}},no=e=>class extends e{getEventContext(e){const t={},{cell:i}=this._getGridEventLocation(e);return i?(t.section=["body","header","footer","details"].find((e=>i.getAttribute("part").indexOf(e)>-1)),i._column&&(t.column=i._column),"body"!==t.section&&"details"!==t.section||Object.assign(t,this.__getRowModel(i.parentElement)),t):t}},ao=e=>class extends e{static get properties(){return{_filters:{type:Array,value:()=>[]}}}constructor(){super(),this._filterChanged=this._filterChanged.bind(this),this.addEventListener("filter-changed",this._filterChanged)}_filterChanged(e){e.stopPropagation(),this.__addFilter(e.target),this.__applyFilters()}__removeFilters(e){0!==e.length&&(this._filters=this._filters.filter((t=>e.indexOf(t)<0)),this.__applyFilters())}__addFilter(e){-1===this._filters.indexOf(e)&&this._filters.push(e)}__applyFilters(){this.dataProvider&&this.isAttached&&this.clearCache()}_mapFilters(){return this._filters.map((e=>({path:e.path,value:e.value})))}};function lo(e){return e instanceof HTMLTableRowElement}function ho(e){return e instanceof HTMLTableCellElement}function co(e){return e.matches('[part~="details-cell"]')}const uo=e=>class extends e{static get properties(){return{_headerFocusable:{type:Object,observer:"_focusableChanged",sync:!0},_itemsFocusable:{type:Object,observer:"_focusableChanged",sync:!0},_footerFocusable:{type:Object,observer:"_focusableChanged",sync:!0},_navigatingIsHidden:Boolean,_focusedItemIndex:{type:Number,value:0},_focusedColumnOrder:Number,_focusedCell:{type:Object,observer:"_focusedCellChanged",sync:!0},interacting:{type:Boolean,value:!1,reflectToAttribute:!0,readOnly:!0,observer:"_interactingChanged"}}}get __rowFocusMode(){return[this._headerFocusable,this._itemsFocusable,this._footerFocusable].some(lo)}set __rowFocusMode(e){["_itemsFocusable","_footerFocusable","_headerFocusable"].forEach((t=>{const i=this[t];if(e){const e=i&&i.parentElement;ho(i)?this[t]=e:ho(e)&&(this[t]=e.parentElement)}else if(!e&&lo(i)){const e=i.firstElementChild;this[t]=e._focusButton||e}}))}get _visibleItemsCount(){return this._lastVisibleIndex-this._firstVisibleIndex-1}ready(){super.ready(),this._ios||this._android||(this.addEventListener("keydown",this._onKeyDown),this.addEventListener("keyup",this._onKeyUp),this.addEventListener("focusin",this._onFocusIn),this.addEventListener("focusout",this._onFocusOut),this.$.table.addEventListener("focusin",this._onContentFocusIn.bind(this)),this.addEventListener("mousedown",(()=>{this.toggleAttribute("navigating",!1),this._isMousedown=!0,this._focusedColumnOrder=void 0})),this.addEventListener("mouseup",(()=>{this._isMousedown=!1})))}_focusableChanged(e,t){t&&t.setAttribute("tabindex","-1"),e&&this._updateGridSectionFocusTarget(e)}_focusedCellChanged(e,t){t&&mi(t,"part","focused-cell"),e&&pi(e,"part","focused-cell")}_interactingChanged(){this._updateGridSectionFocusTarget(this._headerFocusable),this._updateGridSectionFocusTarget(this._itemsFocusable),this._updateGridSectionFocusTarget(this._footerFocusable)}__updateItemsFocusable(){if(!this._itemsFocusable)return;const e=this.shadowRoot.activeElement===this._itemsFocusable;this._getRenderedRows().forEach((e=>{if(e.index===this._focusedItemIndex)if(this.__rowFocusMode)this._itemsFocusable=e;else{let t=this._itemsFocusable.parentElement,i=this._itemsFocusable;if(t){ho(t)&&(i=t,t=t.parentElement);const r=[...t.children].indexOf(i);this._itemsFocusable=this.__getFocusable(e,e.children[r])}}})),e&&this._itemsFocusable.focus()}_onKeyDown(e){const t=e.key;let i;switch(t){case"ArrowUp":case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"PageUp":case"PageDown":case"Home":case"End":i="Navigation";break;case"Enter":case"Escape":case"F2":i="Interaction";break;case"Tab":i="Tab";break;case" ":i="Space"}this._detectInteracting(e),this.interacting&&"Interaction"!==i&&(i=void 0),i&&this[`_on${i}KeyDown`](e,t)}__ensureFlatIndexInViewport(e){[...this.$.items.children].find((t=>t.index===e))?this.__scrollIntoViewport(e):this._scrollToFlatIndex(e)}__isRowExpandable(e){if(this.itemHasChildrenPath){const t=e._item;return!(!t||!di(this.itemHasChildrenPath,t)||this._isExpanded(t))}}__isRowCollapsible(e){return this._isExpanded(e._item)}_onNavigationKeyDown(e,t){e.preventDefault();const i=this.__isRTL,r=e.composedPath().find(lo),o=e.composedPath().find(ho);let s=0,n=0;switch(t){case"ArrowRight":s=i?-1:1;break;case"ArrowLeft":s=i?1:-1;break;case"Home":this.__rowFocusMode||e.ctrlKey?n=-1/0:s=-1/0;break;case"End":this.__rowFocusMode||e.ctrlKey?n=1/0:s=1/0;break;case"ArrowDown":n=1;break;case"ArrowUp":n=-1;break;case"PageDown":if(this.$.items.contains(r)){const e=this.__getIndexInGroup(r,this._focusedItemIndex);this._scrollToFlatIndex(e)}n=this._visibleItemsCount;break;case"PageUp":n=-this._visibleItemsCount}if(this.__rowFocusMode&&!r||!this.__rowFocusMode&&!o)return;const a=i?"ArrowRight":"ArrowLeft";if(t===(i?"ArrowLeft":"ArrowRight")){if(this.__rowFocusMode)return this.__isRowExpandable(r)?void this.expandItem(r._item):(this.__rowFocusMode=!1,void this._onCellNavigation(r.firstElementChild,0,0))}else if(t===a)if(this.__rowFocusMode){if(this.__isRowCollapsible(r))return void this.collapseItem(r._item)}else if(o===[...r.children].sort(((e,t)=>e._order-t._order))[0]||co(o))return this.__rowFocusMode=!0,void this._onRowNavigation(r,0);this.__rowFocusMode?this._onRowNavigation(r,n):this._onCellNavigation(o,s,n)}_onRowNavigation(e,t){const{dstRow:i}=this.__navigateRows(t,e);i&&i.focus()}__getIndexInGroup(e,t){const i=e.parentNode;return i===this.$.items?void 0!==t?t:e.index:[...i.children].indexOf(e)}__navigateRows(e,t,i){const r=this.__getIndexInGroup(t,this._focusedItemIndex),o=t.parentNode,s=(o===this.$.items?this._flatSize:o.children.length)-1;let n=Math.max(0,Math.min(r+e,s));if(o!==this.$.items){if(n>r)for(;n<s&&o.children[n].hidden;)n+=1;else if(n<r)for(;n>0&&o.children[n].hidden;)n-=1;return this.toggleAttribute("navigating",!0),{dstRow:o.children[n]}}let a=!1;if(i){const s=co(i);if(o===this.$.items){const i=t._item,{item:o}=this._dataProviderController.getFlatIndexContext(n);a=s?0===e:1===e&&this._isDetailsOpened(i)||-1===e&&n!==r&&this._isDetailsOpened(o),a!==s&&(1===e&&a||-1===e&&!a)&&(n=r)}}return this.__ensureFlatIndexInViewport(n),this._focusedItemIndex=n,this.toggleAttribute("navigating",!0),{dstRow:[...o.children].find((e=>!e.hidden&&e.index===n)),dstIsRowDetails:a}}_onCellNavigation(e,t,i){const r=e.parentNode,{dstRow:o,dstIsRowDetails:s}=this.__navigateRows(i,r,e);if(!o)return;let n=[...r.children].indexOf(e);this.$.items.contains(e)&&(n=[...this.$.sizer.children].findIndex((t=>t._column===e._column)));const a=co(e),l=r.parentNode,d=this.__getIndexInGroup(r,this._focusedItemIndex);if(void 0===this._focusedColumnOrder&&(this._focusedColumnOrder=a?0:this._getColumns(l,d).filter((e=>!e.hidden))[n]._order),s)[...o.children].find(co).focus();else{const r=this.__getIndexInGroup(o,this._focusedItemIndex),s=this._getColumns(l,r).filter((e=>!e.hidden)),n=s.map((e=>e._order)).sort(((e,t)=>e-t)),d=n.length-1,h=n.indexOf(n.slice(0).sort(((e,t)=>Math.abs(e-this._focusedColumnOrder)-Math.abs(t-this._focusedColumnOrder)))[0]),c=0===i&&a?h:Math.max(0,Math.min(h+t,d));c!==h&&(this._focusedColumnOrder=void 0);const u=s.reduce(((e,t,i)=>(e[t._order]=i,e)),{})[n[c]];let _;if(this.$.items.contains(e)){const e=this.$.sizer.children[u];this._lazyColumns&&(this.__isColumnInViewport(e._column)||e.scrollIntoView(),this.__updateColumnsBodyContentHidden(),this.__updateHorizontalScrollPosition()),_=[...o.children].find((t=>t._column===e._column)),this._scrollHorizontallyToCell(_)}else _=o.children[u],this._scrollHorizontallyToCell(_);_.focus()}}_onInteractionKeyDown(e,t){const i=e.composedPath()[0],r="input"===i.localName&&!/^(button|checkbox|color|file|image|radio|range|reset|submit)$/iu.test(i.type);let o;switch(t){case"Enter":o=!this.interacting||!r;break;case"Escape":o=!1;break;case"F2":o=!this.interacting}const{cell:s}=this._getGridEventLocation(e);if(this.interacting!==o&&null!==s)if(o){const t=s._content.querySelector("[focus-target]")||[...s._content.querySelectorAll("*")].find((e=>this._isFocusable(e)));t&&(e.preventDefault(),t.focus(),this._setInteracting(!0),this.toggleAttribute("navigating",!1))}else e.preventDefault(),this._focusedColumnOrder=void 0,s.focus(),this._setInteracting(!1),this.toggleAttribute("navigating",!0);"Escape"===t&&this._hideTooltip(!0)}_predictFocusStepTarget(e,t){const i=[this.$.table,this._headerFocusable,this.__emptyState?this.$.emptystatecell:this._itemsFocusable,this._footerFocusable,this.$.focusexit];let r=i.indexOf(e);for(r+=t;r>=0&&r<=i.length-1;){let e=i[r];if(e&&!this.__rowFocusMode&&(e=i[r].parentNode),e&&!e.hidden)break;r+=t}let o=i[r];if(o&&!this.__isHorizontallyInViewport(o)){const e=this._getColumnsInOrder().find((e=>this.__isColumnInViewport(e)));if(e)if(o===this._headerFocusable)o=e._headerCell;else if(o===this._itemsFocusable){const t=o._column._cells.indexOf(o);o=e._cells[t]}else o===this._footerFocusable&&(o=e._footerCell)}return o}_onTabKeyDown(e){let t=this._predictFocusStepTarget(e.composedPath()[0],e.shiftKey?-1:1);t&&(e.stopPropagation(),t===this._itemsFocusable&&(this.__ensureFlatIndexInViewport(this._focusedItemIndex),this.__updateItemsFocusable(),t=this._itemsFocusable),t.focus(),t!==this.$.table&&t!==this.$.focusexit&&e.preventDefault(),this.toggleAttribute("navigating",!0))}_onSpaceKeyDown(e){e.preventDefault();const t=e.composedPath()[0],i=lo(t);!i&&t._content&&t._content.firstElementChild||this.dispatchEvent(new CustomEvent(i?"row-activate":"cell-activate",{detail:{model:this.__getRowModel(i?t:t.parentElement)}}))}_onKeyUp(e){if(!/^( |SpaceBar)$/u.test(e.key)||this.interacting)return;e.preventDefault();const t=e.composedPath()[0];if(t._content&&t._content.firstElementChild){const i=this.hasAttribute("navigating");t._content.firstElementChild.dispatchEvent(new MouseEvent("click",{shiftKey:e.shiftKey,bubbles:!0,composed:!0,cancelable:!0})),this.toggleAttribute("navigating",i)}}_onFocusIn(e){this._isMousedown||this.toggleAttribute("navigating",!0);const t=e.composedPath()[0];t===this.$.table||t===this.$.focusexit?(this._isMousedown||this._predictFocusStepTarget(t,t===this.$.table?1:-1).focus(),this._setInteracting(!1)):this._detectInteracting(e)}_onFocusOut(e){this.toggleAttribute("navigating",!1),this._detectInteracting(e),this._hideTooltip(),this._focusedCell=null}_onContentFocusIn(e){const{section:t,cell:i,row:r}=this._getGridEventLocation(e);if((i||this.__rowFocusMode)&&(this._detectInteracting(e),t&&(i||r)))if(this._activeRowGroup=t,t===this.$.header?this._headerFocusable=this.__getFocusable(r,i):t===this.$.items?(this._itemsFocusable=this.__getFocusable(r,i),this._focusedItemIndex=r.index):t===this.$.footer&&(this._footerFocusable=this.__getFocusable(r,i)),i){const t=this.getEventContext(e);this.__pendingBodyCellFocus=this.loading&&"body"===t.section,this.__pendingBodyCellFocus||i===this.$.emptystatecell||i.dispatchEvent(new CustomEvent("cell-focus",{bubbles:!0,composed:!0,detail:{context:t}})),this._focusedCell=i._focusButton||i,ar()&&e.target===i&&this._showTooltip(e)}else this._focusedCell=null}__dispatchPendingBodyCellFocus(){this.__pendingBodyCellFocus&&this.shadowRoot.activeElement===this._itemsFocusable&&this._itemsFocusable.dispatchEvent(new Event("focusin",{bubbles:!0,composed:!0}))}__getFocusable(e,t){return this.__rowFocusMode?e:t._focusButton||t}_detectInteracting(e){const t=e.composedPath().some((e=>"slot"===e.localName&&this.shadowRoot.contains(e)));this._setInteracting(t),this.__updateHorizontalScrollPosition()}_updateGridSectionFocusTarget(e){if(!e)return;const t=this._getGridSectionFromFocusTarget(e),i=this.interacting&&t===this._activeRowGroup;e.tabIndex=i?-1:0}_preventScrollerRotatingCellFocus(){this._activeRowGroup===this.$.items&&(this.__preventScrollerRotatingCellFocusDebouncer=ti.debounce(this.__preventScrollerRotatingCellFocusDebouncer,Jt,(()=>{const e=this._activeRowGroup===this.$.items;this._getRenderedRows().some((e=>e.index===this._focusedItemIndex))?(this.__updateItemsFocusable(),e&&!this.__rowFocusMode&&(this._focusedCell=this._itemsFocusable),this._navigatingIsHidden&&(this.toggleAttribute("navigating",!0),this._navigatingIsHidden=!1)):e&&(this._focusedCell=null,this.hasAttribute("navigating")&&(this._navigatingIsHidden=!0,this.toggleAttribute("navigating",!1)))})))}_getColumns(e,t){let i=this._columnTree.length-1;return e===this.$.header?i=t:e===this.$.footer&&(i=this._columnTree.length-1-t),this._columnTree[i]}__isValidFocusable(e){return this.$.table.contains(e)&&e.offsetHeight}_resetKeyboardNavigation(){if(!this.$&&this.performUpdate&&this.performUpdate(),["header","footer"].forEach((e=>{if(!this.__isValidFocusable(this[`_${e}Focusable`])){const t=[...this.$[e].children].find((e=>e.offsetHeight)),i=t?[...t.children].find((e=>!e.hidden)):null;t&&i&&(this[`_${e}Focusable`]=this.__getFocusable(t,i))}})),!this.__isValidFocusable(this._itemsFocusable)&&this.$.items.firstElementChild){const e=this.__getFirstVisibleItem(),t=e?[...e.children].find((e=>!e.hidden)):null;t&&e&&(this._focusedColumnOrder=void 0,this._itemsFocusable=this.__getFocusable(e,t))}else this.__updateItemsFocusable()}_scrollHorizontallyToCell(e){if(e.hasAttribute("frozen")||e.hasAttribute("frozen-to-end")||co(e))return;const t=e.getBoundingClientRect(),i=e.parentNode,r=Array.from(i.children).indexOf(e),o=this.$.table.getBoundingClientRect();let s=o.left,n=o.right;for(let e=r-1;e>=0;e--){const t=i.children[e];if(!t.hasAttribute("hidden")&&!co(t)&&(t.hasAttribute("frozen")||t.hasAttribute("frozen-to-end"))){s=t.getBoundingClientRect().right;break}}for(let e=r+1;e<i.children.length;e++){const t=i.children[e];if(!t.hasAttribute("hidden")&&!co(t)&&(t.hasAttribute("frozen")||t.hasAttribute("frozen-to-end"))){n=t.getBoundingClientRect().left;break}}t.left<s&&(this.$.table.scrollLeft+=Math.round(t.left-s)),t.right>n&&(this.$.table.scrollLeft+=Math.round(t.right-n))}_getGridEventLocation(e){const t=e.__composedPath||e.composedPath(),i=t.indexOf(this.$.table);return{section:i>=1?t[i-1]:null,row:i>=2?t[i-2]:null,cell:i>=3?t[i-3]:null}}_getGridSectionFromFocusTarget(e){return e===this._headerFocusable?this.$.header:e===this._itemsFocusable?this.$.items:e===this._footerFocusable?this.$.footer:null}},_o=e=>class extends e{static get properties(){return{detailsOpenedItems:{type:Array,value:()=>[],sync:!0},rowDetailsRenderer:{type:Function,sync:!0},_detailsCells:{type:Array}}}static get observers(){return["_detailsOpenedItemsChanged(detailsOpenedItems, rowDetailsRenderer)","_rowDetailsRendererChanged(rowDetailsRenderer)"]}ready(){super.ready(),this._detailsCellResizeObserver=new ResizeObserver((e=>{e.forEach((({target:e})=>{this._updateDetailsCellHeight(e.parentElement)})),this.__virtualizer.__adapter._resizeHandler()}))}_rowDetailsRendererChanged(e){e&&this._columnTree&&fi(this.$.items,(e=>{if(!e.querySelector("[part~=details-cell]")){this._updateRow(e,this._columnTree[this._columnTree.length-1]);const t=this._isDetailsOpened(e._item);this._toggleDetailsCell(e,t)}}))}_detailsOpenedItemsChanged(e,t){fi(this.$.items,(e=>{(e.hasAttribute("details-opened")||t&&this._isDetailsOpened(e._item))&&this._updateItem(e,e._item)}))}_configureDetailsCell(e){e.setAttribute("part","cell details-cell"),e.toggleAttribute("frozen",!0),this._detailsCellResizeObserver.observe(e)}_toggleDetailsCell(e,t){const i=e.querySelector('[part~="details-cell"]');i&&(i.hidden=!t,i.hidden||this.rowDetailsRenderer&&(i._renderer=this.rowDetailsRenderer))}_updateDetailsCellHeight(e){const t=e.querySelector('[part~="details-cell"]');t&&(this.__updateDetailsRowPadding(e,t),requestAnimationFrame((()=>this.__updateDetailsRowPadding(e,t))))}__updateDetailsRowPadding(e,t){t.hidden?e.style.removeProperty("padding-bottom"):e.style.setProperty("padding-bottom",`${t.offsetHeight}px`)}_updateDetailsCellHeights(){fi(this.$.items,(e=>{this._updateDetailsCellHeight(e)}))}_isDetailsOpened(e){return this.detailsOpenedItems&&-1!==this._getItemIndexInArray(e,this.detailsOpenedItems)}openItemDetails(e){this._isDetailsOpened(e)||(this.detailsOpenedItems=[...this.detailsOpenedItems,e])}closeItemDetails(e){this._isDetailsOpened(e)&&(this.detailsOpenedItems=this.detailsOpenedItems.filter((t=>!this._itemsEqual(t,e))))}},po=document.createElement("div");let mo;po.style.position="fixed",po.style.clip="rect(0px, 0px, 0px, 0px)",po.setAttribute("aria-live","polite"),document.body.appendChild(po);const go=ne((e=>class extends e{ready(){super.ready(),this.addEventListener("keydown",(e=>{this._onKeyDown(e)})),this.addEventListener("keyup",(e=>{this._onKeyUp(e)}))}_onKeyDown(e){switch(e.key){case"Enter":this._onEnter(e);break;case"Escape":this._onEscape(e)}}_onKeyUp(e){}_onEnter(e){}_onEscape(e){}})),fo=e=>class extends(Mi(go(e))){get _activeKeys(){return[" "]}ready(){super.ready(),Dr(this,"down",(e=>{this._shouldSetActive(e)&&this._setActive(!0)})),Dr(this,"up",(()=>{this._setActive(!1)}))}disconnectedCallback(){super.disconnectedCallback(),this._setActive(!1)}_shouldSetActive(e){return!this.disabled}_onKeyDown(e){super._onKeyDown(e),this._shouldSetActive(e)&&this._activeKeys.includes(e.key)&&(this._setActive(!0),document.addEventListener("keyup",(e=>{this._activeKeys.includes(e.key)&&this._setActive(!1)}),{once:!0}))}_setActive(e){this.toggleAttribute("active",e)}},bo=ne((e=>class extends e{get _keyboardActive(){return ar()}ready(){this.addEventListener("focusin",(e=>{this._shouldSetFocus(e)&&this._setFocused(!0)})),this.addEventListener("focusout",(e=>{this._shouldRemoveFocus(e)&&this._setFocused(!1)})),super.ready()}disconnectedCallback(){super.disconnectedCallback(),this.hasAttribute("focused")&&this._setFocused(!1)}_setFocused(e){this.toggleAttribute("focused",e),this.toggleAttribute("focus-ring",e&&this._keyboardActive)}_shouldSetFocus(e){return!0}_shouldRemoveFocus(e){return!0}})),vo=ne((e=>class extends(bo(Li(e))){static get properties(){return{autofocus:{type:Boolean},focusElement:{type:Object,readOnly:!0,observer:"_focusElementChanged"},_lastTabIndex:{value:0}}}constructor(){super(),this._boundOnBlur=this._onBlur.bind(this),this._boundOnFocus=this._onFocus.bind(this)}ready(){super.ready(),this.autofocus&&!this.disabled&&requestAnimationFrame((()=>{this.focus(),this.setAttribute("focus-ring","")}))}focus(){this.focusElement&&!this.disabled&&this.focusElement.focus()}blur(){this.focusElement&&this.focusElement.blur()}click(){this.focusElement&&!this.disabled&&this.focusElement.click()}_focusElementChanged(e,t){e?(e.disabled=this.disabled,this._addFocusListeners(e),this.__forwardTabIndex(this.tabindex)):t&&this._removeFocusListeners(t)}_addFocusListeners(e){e.addEventListener("blur",this._boundOnBlur),e.addEventListener("focus",this._boundOnFocus)}_removeFocusListeners(e){e.removeEventListener("blur",this._boundOnBlur),e.removeEventListener("focus",this._boundOnFocus)}_onFocus(e){e.stopPropagation(),this.dispatchEvent(new Event("focus"))}_onBlur(e){e.stopPropagation(),this.dispatchEvent(new Event("blur"))}_shouldSetFocus(e){return e.target===this.focusElement}_shouldRemoveFocus(e){return e.target===this.focusElement}_disabledChanged(e,t){super._disabledChanged(e,t),this.focusElement&&(this.focusElement.disabled=e),e&&this.blur()}_tabindexChanged(e){this.__forwardTabIndex(e)}__forwardTabIndex(e){void 0!==e&&this.focusElement&&(this.focusElement.tabIndex=e,-1!==e&&(this.tabindex=void 0)),this.disabled&&e&&(-1!==e&&(this._lastTabIndex=e),this.tabindex=void 0)}})),yo=new Map;function Co(e){return yo.has(e)||yo.set(e,new WeakMap),yo.get(e)}function wo(e,t){e&&e.removeAttribute(t)}function Ao(e,t){if(!e||!t)return;const i=Co(t);if(i.has(e))return;const r=ui(e.getAttribute(t));i.set(e,new Set(r))}function xo(e,t,i={newId:null,oldId:null,fromUser:!1}){if(!e||!t)return;const{newId:r,oldId:o,fromUser:s}=i,n=Co(t),a=n.get(e);if(!s&&a)return o&&a.delete(o),void(r&&a.add(r));s&&(a?r||n.delete(e):Ao(e,t),wo(e,t)),mi(e,t,o);const l=r||_i(a);l&&pi(e,t,l)}class So{constructor(e){this.host=e,this.__required=!1}setTarget(e){this.__target=e,this.__setAriaRequiredAttribute(this.__required),this.__setLabelIdToAriaAttribute(this.__labelId,this.__labelId),null!=this.__labelIdFromUser&&this.__setLabelIdToAriaAttribute(this.__labelIdFromUser,this.__labelIdFromUser,!0),this.__setErrorIdToAriaAttribute(this.__errorId),this.__setHelperIdToAriaAttribute(this.__helperId),this.setAriaLabel(this.__label)}setRequired(e){this.__setAriaRequiredAttribute(e),this.__required=e}setAriaLabel(e){this.__setAriaLabelToAttribute(e),this.__label=e}setLabelId(e,t=!1){const i=t?this.__labelIdFromUser:this.__labelId;this.__setLabelIdToAriaAttribute(e,i,t),t?this.__labelIdFromUser=e:this.__labelId=e}setErrorId(e){this.__setErrorIdToAriaAttribute(e,this.__errorId),this.__errorId=e}setHelperId(e){this.__setHelperIdToAriaAttribute(e,this.__helperId),this.__helperId=e}__setAriaLabelToAttribute(e){var t;this.__target&&(e?(Ao(t=this.__target,"aria-labelledby"),wo(t,"aria-labelledby"),this.__target.setAttribute("aria-label",e)):this.__label&&(function(e,t){if(!e)return;const i=Co(t),r=i.get(e);r&&0!==r.size?pi(e,t,_i(r)):e.removeAttribute(t),i.delete(e)}(this.__target,"aria-labelledby"),this.__target.removeAttribute("aria-label")))}__setLabelIdToAriaAttribute(e,t,i){xo(this.__target,"aria-labelledby",{newId:e,oldId:t,fromUser:i})}__setErrorIdToAriaAttribute(e,t){xo(this.__target,"aria-describedby",{newId:e,oldId:t,fromUser:!1})}__setHelperIdToAriaAttribute(e,t){xo(this.__target,"aria-describedby",{newId:e,oldId:t,fromUser:!1})}__setAriaRequiredAttribute(e){this.__target&&(["input","textarea"].includes(this.__target.localName)||(e?this.__target.setAttribute("aria-required","true"):this.__target.removeAttribute("aria-required")))}}function Eo(e,t){const{scrollLeft:i}=e;return"rtl"!==t?i:e.scrollWidth-e.clientWidth+i}const Io=new ResizeObserver((e=>{setTimeout((()=>{e.forEach((e=>{e.target.isConnected&&(e.target.resizables?e.target.resizables.forEach((t=>{t._onResize(e.contentRect)})):e.target._onResize(e.contentRect))}))}))})),Po=ne((e=>class extends e{get _observeParent(){return!1}connectedCallback(){if(super.connectedCallback(),Io.observe(this),this._observeParent){const e=this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentNode;e.resizables||(e.resizables=new Set,Io.observe(e)),e.resizables.add(this),this.__parent=e}}disconnectedCallback(){super.disconnectedCallback(),Io.unobserve(this);const e=this.__parent;if(this._observeParent&&e){const t=e.resizables;t&&(t.delete(this),0===t.size&&Io.unobserve(e)),this.__parent=null}}_onResize(e){}})),To=e=>class extends(Po(e)){static get properties(){return{columnRendering:{type:String,value:"eager",sync:!0},_frozenCells:{type:Array,value:()=>[]},_frozenToEndCells:{type:Array,value:()=>[]}}}static get observers(){return["__columnRenderingChanged(_columnTree, columnRendering)"]}get _scrollLeft(){return this.$.table.scrollLeft}get _scrollTop(){return this.$.table.scrollTop}set _scrollTop(e){this.$.table.scrollTop=e}get _lazyColumns(){return"lazy"===this.columnRendering}ready(){super.ready(),this.scrollTarget=this.$.table,this.$.items.addEventListener("focusin",(e=>{const t=e.composedPath(),i=t[t.indexOf(this.$.items)-1];i&&(this._isMousedown||this.__scrollIntoViewport(i.index),this.$.table.contains(e.relatedTarget)||this.$.table.dispatchEvent(new CustomEvent("virtualizer-element-focused",{detail:{element:i}})))})),this.$.table.addEventListener("scroll",(()=>this._afterScroll()))}_onResize(){if(this._updateOverflow(),this.__updateHorizontalScrollPosition(),this._firefox){const e=!lr(this);e&&!1===this.__previousVisible&&(this._scrollTop=this.__memorizedScrollTop||0),this.__previousVisible=e}}_scrollToFlatIndex(e){e=Math.min(this._flatSize-1,Math.max(0,e)),this.__virtualizer.scrollToIndex(e),this.__scrollIntoViewport(e)}__scrollIntoViewport(e){const t=[...this.$.items.children].find((t=>t.index===e));if(t){const e=t.getBoundingClientRect(),i=this.$.footer.getBoundingClientRect().top,r=this.$.header.getBoundingClientRect().bottom;e.bottom>i?this.$.table.scrollTop+=e.bottom-i:e.top<r&&(this.$.table.scrollTop-=r-e.top)}}_scheduleScrolling(){this._scrollingFrame||(this._scrollingFrame=requestAnimationFrame((()=>this.$.scroller.toggleAttribute("scrolling",!0)))),this._debounceScrolling=ti.debounce(this._debounceScrolling,Xt.after(500),(()=>{cancelAnimationFrame(this._scrollingFrame),delete this._scrollingFrame,this.$.scroller.toggleAttribute("scrolling",!1)}))}_afterScroll(){this.__updateHorizontalScrollPosition(),this.hasAttribute("reordering")||this._scheduleScrolling(),this.hasAttribute("navigating")||this._hideTooltip(!0),this._updateOverflow(),this._debounceColumnContentVisibility=ti.debounce(this._debounceColumnContentVisibility,Xt.after(100),(()=>{this._lazyColumns&&this.__cachedScrollLeft!==this._scrollLeft&&(this.__cachedScrollLeft=this._scrollLeft,this.__updateColumnsBodyContentHidden())})),this._firefox&&!lr(this)&&!1!==this.__previousVisible&&(this.__memorizedScrollTop=this._scrollTop)}__updateColumnsBodyContentHidden(){if(!this._columnTree||!this._areSizerCellsAssigned())return;const e=this._getColumnsInOrder();let t=!1;if(e.forEach((i=>{const r=this._lazyColumns&&!this.__isColumnInViewport(i);i._bodyContentHidden!==r&&(t=!0,i._cells.forEach((t=>{if(t!==i._sizerCell)if(r)t.remove();else if(t.__parentRow){const r=[...t.__parentRow.children].find((t=>e.indexOf(t._column)>e.indexOf(i)));t.__parentRow.insertBefore(t,r)}}))),i._bodyContentHidden=r})),t&&this._frozenCellsChanged(),this._lazyColumns){const t=[...e].reverse().find((e=>e.frozen)),i=this.__getColumnEnd(t),r=e.find((e=>!e.frozen&&!e._bodyContentHidden));this.__lazyColumnsStart=this.__getColumnStart(r)-i,this.$.items.style.setProperty("--_grid-lazy-columns-start",`${this.__lazyColumnsStart}px`),this._resetKeyboardNavigation()}}__getColumnEnd(e){return e?e._sizerCell.offsetLeft+(this.__isRTL?0:e._sizerCell.offsetWidth):this.__isRTL?this.$.table.clientWidth:0}__getColumnStart(e){return e?e._sizerCell.offsetLeft+(this.__isRTL?e._sizerCell.offsetWidth:0):this.__isRTL?this.$.table.clientWidth:0}__isColumnInViewport(e){return!(!e.frozen&&!e.frozenToEnd)||this.__isHorizontallyInViewport(e._sizerCell)}__isHorizontallyInViewport(e){return e.offsetLeft+e.offsetWidth>=this._scrollLeft&&e.offsetLeft<=this._scrollLeft+this.clientWidth}__columnRenderingChanged(e,t){"eager"===t?this.$.scroller.removeAttribute("column-rendering"):this.$.scroller.setAttribute("column-rendering",t),this.__updateColumnsBodyContentHidden()}_updateOverflow(){this._debounceOverflow=ti.debounce(this._debounceOverflow,Jt,(()=>{this.__doUpdateOverflow()}))}__doUpdateOverflow(){let e="";const t=this.$.table;t.scrollTop<t.scrollHeight-t.clientHeight&&(e+=" bottom"),t.scrollTop>0&&(e+=" top");const i=Eo(t,this.getAttribute("dir"));i>0&&(e+=" start"),i<t.scrollWidth-t.clientWidth&&(e+=" end"),this.__isRTL&&(e=e.replace(/start|end/giu,(e=>"start"===e?"end":"start"))),t.scrollLeft<t.scrollWidth-t.clientWidth&&(e+=" right"),t.scrollLeft>0&&(e+=" left");const r=e.trim();r.length>0&&this.getAttribute("overflow")!==r?this.setAttribute("overflow",r):0===r.length&&this.hasAttribute("overflow")&&this.removeAttribute("overflow")}_frozenCellsChanged(){this._debouncerCacheElements=ti.debounce(this._debouncerCacheElements,Qt,(()=>{Array.from(this.shadowRoot.querySelectorAll('[part~="cell"]')).forEach((e=>{e.style.transform=""})),this._frozenCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen]")),this._frozenToEndCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen-to-end]")),this.__updateHorizontalScrollPosition()})),this._debounceUpdateFrozenColumn()}_debounceUpdateFrozenColumn(){this.__debounceUpdateFrozenColumn=ti.debounce(this.__debounceUpdateFrozenColumn,Qt,(()=>this._updateFrozenColumn()))}_updateFrozenColumn(){if(!this._columnTree)return;const e=this._columnTree[this._columnTree.length-1].slice(0);let t,i;e.sort(((e,t)=>e._order-t._order));for(let r=0;r<e.length;r++){const o=e[r];o._lastFrozen=!1,o._firstFrozenToEnd=!1,void 0===i&&o.frozenToEnd&&!o.hidden&&(i=r),o.frozen&&!o.hidden&&(t=r)}void 0!==t&&(e[t]._lastFrozen=!0),void 0!==i&&(e[i]._firstFrozenToEnd=!0),this.__updateColumnsBodyContentHidden()}__updateHorizontalScrollPosition(){if(!this._columnTree)return;const e=this.$.table.scrollWidth,t=this.$.table.clientWidth,i=Math.max(0,this.$.table.scrollLeft),r=Eo(this.$.table,this.getAttribute("dir")),o=`translate(${-i}px, 0)`;this.$.header.style.transform=o,this.$.footer.style.transform=o,this.$.items.style.transform=o;const s=this.__isRTL?r+t-e:i,n=`translate(${s}px, 0)`;this._frozenCells.forEach((e=>{e.style.transform=n}));const a=this.__isRTL?r:i+t-e,l=`translate(${a}px, 0)`;let d=l;if(this._lazyColumns&&this._areSizerCellsAssigned()){const e=this._getColumnsInOrder(),t=[...e].reverse().find((e=>!e.frozenToEnd&&!e._bodyContentHidden)),i=this.__getColumnEnd(t),r=e.find((e=>e.frozenToEnd)),o=a+(this.__getColumnStart(r)-i)+this.__lazyColumnsStart;d=`translate(${o}px, 0)`}this._frozenToEndCells.forEach((e=>{this.$.items.contains(e)?e.style.transform=d:e.style.transform=l})),this.hasAttribute("navigating")&&this.__rowFocusMode&&this.$.table.style.setProperty("--_grid-horizontal-scroll-position",-s+"px")}_areSizerCellsAssigned(){return this._getColumnsInOrder().every((e=>e._sizerCell))}},zo=e=>class extends e{static get properties(){return{selectedItems:{type:Object,notify:!0,value:()=>[],sync:!0},isItemSelectable:{type:Function,notify:!0},__selectedKeys:{type:Object,computed:"__computeSelectedKeys(itemIdPath, selectedItems)"}}}static get observers(){return["__selectedItemsChanged(itemIdPath, selectedItems, isItemSelectable)"]}_isSelected(e){return this.__selectedKeys.has(this.getItemId(e))}__isItemSelectable(e){return!this.isItemSelectable||!e||this.isItemSelectable(e)}selectItem(e){this._isSelected(e)||(this.selectedItems=[...this.selectedItems,e])}deselectItem(e){this._isSelected(e)&&(this.selectedItems=this.selectedItems.filter((t=>!this._itemsEqual(t,e))))}__selectedItemsChanged(){this.requestContentUpdate()}__computeSelectedKeys(e,t){const i=t||[],r=new Set;return i.forEach((e=>{r.add(this.getItemId(e))})),r}};let ko="prepend";const Ro=e=>class extends e{static get properties(){return{multiSort:{type:Boolean,value:!1},multiSortPriority:{type:String,value:()=>ko},multiSortOnShiftClick:{type:Boolean,value:!1},_sorters:{type:Array,value:()=>[]},_previousSorters:{type:Array,value:()=>[]}}}static setDefaultMultiSortPriority(e){ko=["append","prepend"].includes(e)?e:"prepend"}ready(){super.ready(),this.addEventListener("sorter-changed",this._onSorterChanged)}_onSorterChanged(e){const t=e.target;e.stopPropagation(),t._grid=this,this.__updateSorter(t,e.detail.shiftClick,e.detail.fromSorterClick),this.__applySorters()}__removeSorters(e){0!==e.length&&(this._sorters=this._sorters.filter((t=>!e.includes(t))),this.__applySorters())}__updateSortOrders(){this._sorters.forEach((e=>{e._order=null}));const e=this._getActiveSorters();e.length>1&&e.forEach(((e,t)=>{e._order=t}))}__updateSorter(e,t,i){if(!e.direction&&!this._sorters.includes(e))return;e._order=null;const r=this._sorters.filter((t=>t!==e));this.multiSort&&(!this.multiSortOnShiftClick||!i)||this.multiSortOnShiftClick&&t?"append"===this.multiSortPriority?this._sorters=[...r,e]:this._sorters=[e,...r]:(e.direction||this.multiSortOnShiftClick)&&(this._sorters=e.direction?[e]:[],r.forEach((e=>{e._order=null,e.direction=null})))}__applySorters(){this.__updateSortOrders(),this.dataProvider&&this.isAttached&&JSON.stringify(this._previousSorters)!==JSON.stringify(this._mapSorters())&&this.__debounceClearCache(),this._a11yUpdateSorters(),this._previousSorters=this._mapSorters()}_getActiveSorters(){return this._sorters.filter((e=>e.direction&&e.isConnected))}_mapSorters(){return this._getActiveSorters().map((e=>({path:e.path,direction:e.direction})))}},Oo=e=>class extends e{static get properties(){return{cellClassNameGenerator:{type:Function,sync:!0},cellPartNameGenerator:{type:Function,sync:!0}}}static get observers(){return["__cellClassNameGeneratorChanged(cellClassNameGenerator)","__cellPartNameGeneratorChanged(cellPartNameGenerator)"]}__cellClassNameGeneratorChanged(){this.generateCellClassNames()}__cellPartNameGeneratorChanged(){this.generateCellPartNames()}generateCellClassNames(){fi(this.$.items,(e=>{e.hidden||this._generateCellClassNames(e,this.__getRowModel(e))}))}generateCellPartNames(){fi(this.$.items,(e=>{e.hidden||this._generateCellPartNames(e,this.__getRowModel(e))}))}_generateCellClassNames(e,t){bi(e,(i=>{if(i.__generatedClasses&&i.__generatedClasses.forEach((e=>i.classList.remove(e))),this.cellClassNameGenerator&&!e.hasAttribute("loading")){const e=this.cellClassNameGenerator(i._column,t);i.__generatedClasses=e&&e.split(" ").filter((e=>e.length>0)),i.__generatedClasses&&i.__generatedClasses.forEach((e=>i.classList.add(e)))}}))}_generateCellPartNames(e,t){bi(e,(i=>{if(i.__generatedParts&&i.__generatedParts.forEach((e=>{Ci(i,null,e)})),this.cellPartNameGenerator&&!e.hasAttribute("loading")){const e=this.cellPartNameGenerator(i._column,t);i.__generatedParts=e&&e.split(" ").filter((e=>e.length>0)),i.__generatedParts&&i.__generatedParts.forEach((e=>{Ci(i,!0,e)}))}}))}},No=e=>class extends(mr(pr(Jr(so(dr(To(zo(Ro(_o(uo(sr(ao(Wr(Ur(no(ro(Oo(Li(e))))))))))))))))))){static get observers(){return["_columnTreeChanged(_columnTree)","_flatSizeChanged(_flatSize, __virtualizer, _hasData, _columnTree)"]}static get properties(){return{_safari:{type:Boolean,value:qi},_ios:{type:Boolean,value:Ui},_firefox:{type:Boolean,value:$i},_android:{type:Boolean,value:Vi},_touchDevice:{type:Boolean,value:ji},allRowsVisible:{type:Boolean,value:!1,reflectToAttribute:!0},isAttached:{value:!1},__gridElement:{type:Boolean,value:!0},__hasEmptyStateContent:{type:Boolean,value:!1},__emptyState:{type:Boolean,computed:"__computeEmptyState(_flatSize, __hasEmptyStateContent)"}}}constructor(){super(),this.addEventListener("animationend",this._onAnimationEnd)}get _firstVisibleIndex(){const e=this.__getFirstVisibleItem();return e?e.index:void 0}get _lastVisibleIndex(){const e=this.__getLastVisibleItem();return e?e.index:void 0}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.__virtualizer.hostConnected()}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this._hideTooltip(!0)}__getFirstVisibleItem(){return this._getRenderedRows().find((e=>this._isInViewport(e)))}__getLastVisibleItem(){return this._getRenderedRows().reverse().find((e=>this._isInViewport(e)))}_isInViewport(e){const t=this.$.table.getBoundingClientRect(),i=e.getBoundingClientRect(),r=this.$.header.getBoundingClientRect().height,o=this.$.footer.getBoundingClientRect().height;return i.bottom>t.top+r&&i.top<t.bottom-o}_getRenderedRows(){return Array.from(this.$.items.children).filter((e=>!e.hidden)).sort(((e,t)=>e.index-t.index))}_getRowContainingNode(e){const t=ci("vaadin-grid-cell-content",e);if(t)return t.assignedSlot.parentElement.parentElement}_isItemAssignedToRow(e,t){const i=this.__getRowModel(t);return this.getItemId(e)===this.getItemId(i.item)}ready(){super.ready(),this.__virtualizer=new or({createElements:this._createScrollerRows.bind(this),updateElement:this._updateScrollerItem.bind(this),scrollContainer:this.$.items,scrollTarget:this.$.table,reorderElements:!0}),new ResizeObserver((()=>setTimeout((()=>{this.__updateColumnsBodyContentHidden()})))).observe(this.$.table);const e=new ResizeObserver((()=>setTimeout((()=>{this.__updateMinHeight()}))));e.observe(this.$.header),e.observe(this.$.items),e.observe(this.$.footer),hi(this),this._tooltipController=new Zi(this),this.addController(this._tooltipController),this._tooltipController.setManual(!0),this.__emptyStateContentObserver=new Ki(this.$.emptystateslot,(({currentNodes:e})=>{this.$.emptystatecell._content=e[0],this.__hasEmptyStateContent=!!this.$.emptystatecell._content}))}__getBodyCellCoordinates(e){if(this.$.items.contains(e)&&"td"===e.localName)return{item:e.parentElement._item,column:e._column}}__focusBodyCell({item:e,column:t}){const i=this._getRenderedRows().find((t=>t._item===e)),r=i&&[...i.children].find((e=>e._column===t));r&&r.focus()}_focusFirstVisibleRow(){const e=this.__getFirstVisibleItem();this.__rowFocusMode=!0,e.focus()}_flatSizeChanged(e,t,i,r){if(t&&i&&r){const i=this.shadowRoot.activeElement,r=this.__getBodyCellCoordinates(i),o=t.size||0;t.size=e,t.update(o-1,o-1),e<o&&t.update(e-1,e-1),r&&i.parentElement.hidden&&this.__focusBodyCell(r),this._resetKeyboardNavigation()}}_createScrollerRows(e){const t=[];for(let i=0;i<e;i++){const e=document.createElement("tr");e.setAttribute("part","row body-row"),e.setAttribute("role","row"),e.setAttribute("tabindex","-1"),this._columnTree&&this._updateRow(e,this._columnTree[this._columnTree.length-1],"body",!1,!0),t.push(e)}return this._columnTree&&this._columnTree[this._columnTree.length-1].forEach((e=>{e.isConnected&&e._cells&&(e._cells=[...e._cells])})),this.__afterCreateScrollerRowsDebouncer=ti.debounce(this.__afterCreateScrollerRowsDebouncer,Jt,(()=>{this._afterScroll()})),t}_createCell(e,t){const i=`vaadin-grid-cell-content-${this._contentIndex=this._contentIndex+1||0}`,r=document.createElement("vaadin-grid-cell-content");r.setAttribute("slot",i);const o=document.createElement(e);o.id=i.replace("-content-","-"),o.setAttribute("role","td"===e?"gridcell":"columnheader"),Vi||Ui||(o.addEventListener("mouseenter",(e=>{this.$.scroller.hasAttribute("scrolling")||this._showTooltip(e)})),o.addEventListener("mouseleave",(()=>{this._hideTooltip()})),o.addEventListener("mousedown",(()=>{this._hideTooltip(!0)})));const s=document.createElement("slot");if(s.setAttribute("name",i),t&&t._focusButtonMode){const e=document.createElement("div");e.setAttribute("role","button"),e.setAttribute("tabindex","-1"),o.appendChild(e),o._focusButton=e,o.focus=function(e){o._focusButton.focus(e)},e.appendChild(s)}else o.setAttribute("tabindex","-1"),o.appendChild(s);return o._content=r,r.addEventListener("mousedown",(()=>{if(Gi){const e=t=>{const i=r.contains(this.getRootNode().activeElement),s=t.composedPath().includes(r);!i&&s&&o.focus({preventScroll:!0}),document.removeEventListener("mouseup",e,!0)};document.addEventListener("mouseup",e,!0)}else setTimeout((()=>{r.contains(this.getRootNode().activeElement)||o.focus({preventScroll:!0})}))})),o}_updateRow(e,t,i="body",r=!1,o=!1){const s=document.createDocumentFragment();bi(e,(e=>{e._vacant=!0})),e.innerHTML="","body"===i&&(e.__cells=[],e.__detailsCell=null),t.filter((e=>!e.hidden)).forEach(((t,n,a)=>{let l;if("body"===i){t._cells||(t._cells=[]),l=t._cells.find((e=>e._vacant)),l||(l=this._createCell("td",t),t._onCellKeyDown&&l.addEventListener("keydown",t._onCellKeyDown.bind(t)),t._cells.push(l)),l.setAttribute("part","cell body-cell"),l.__parentRow=e,e.__cells.push(l);const i=e===this.$.sizer;if(t._bodyContentHidden&&!i||e.appendChild(l),i&&(t._sizerCell=l),n===a.length-1&&this.rowDetailsRenderer){this._detailsCells||(this._detailsCells=[]);const t=this._detailsCells.find((e=>e._vacant))||this._createCell("td");-1===this._detailsCells.indexOf(t)&&this._detailsCells.push(t),t._content.parentElement||s.appendChild(t._content),this._configureDetailsCell(t),e.appendChild(t),e.__detailsCell=t,this._a11ySetRowDetailsCell(e,t),t._vacant=!1}o||(t._cells=[...t._cells])}else{const o="header"===i?"th":"td";r||"vaadin-grid-column-group"===t.localName?(l=t[`_${i}Cell`],l||(l=this._createCell(o),t._onCellKeyDown&&l.addEventListener("keydown",t._onCellKeyDown.bind(t))),l._column=t,e.appendChild(l),t[`_${i}Cell`]=l):(t._emptyCells||(t._emptyCells=[]),l=t._emptyCells.find((e=>e._vacant))||this._createCell(o),l._column=t,e.appendChild(l),-1===t._emptyCells.indexOf(l)&&t._emptyCells.push(l)),l.part.add("cell",`${i}-cell`)}l._content.parentElement||s.appendChild(l._content),l._vacant=!1,l._column=t})),"body"!==i&&this.__debounceUpdateHeaderFooterRowVisibility(e),this.appendChild(s),this._frozenCellsChanged(),this._updateFirstAndLastColumnForRow(e)}__debounceUpdateHeaderFooterRowVisibility(e){e.__debounceUpdateHeaderFooterRowVisibility=ti.debounce(e.__debounceUpdateHeaderFooterRowVisibility,Qt,(()=>this.__updateHeaderFooterRowVisibility(e)))}__updateHeaderFooterRowVisibility(e){if(!e)return;const t=Array.from(e.children).filter((t=>{const i=t._column;if(i._emptyCells&&i._emptyCells.indexOf(t)>-1)return!1;if(e.parentElement===this.$.header){if(i.headerRenderer)return!0;if(null===i.header)return!1;if(i.path||void 0!==i.header)return!0}else if(i.footerRenderer)return!0;return!1}));e.hidden!==!t.length&&(e.hidden=!t.length),this._resetKeyboardNavigation()}_updateScrollerItem(e,t){this._preventScrollerRotatingCellFocus(e,t),this._columnTree&&(this._updateRowOrderParts(e,t),this._a11yUpdateRowRowindex(e,t),this._getItem(t,e))}_columnTreeChanged(e){this._renderColumnTree(e),this.__updateColumnsBodyContentHidden()}_updateRowOrderParts(e,t=e.index){Ai(e,{first:0===t,last:t===this._flatSize-1,odd:t%2!=0,even:t%2==0})}_updateRowStateParts(e,{item:t,expanded:i,selected:r,detailsOpened:o}){Ai(e,{expanded:i,collapsed:this.__isRowExpandable(e),selected:r,nonselectable:!1===this.__isItemSelectable(t),"details-opened":o})}__computeEmptyState(e,t){return 0===e&&t}_renderColumnTree(e){for(fi(this.$.items,(t=>{this._updateRow(t,e[e.length-1],"body",!1,!0);const i=this.__getRowModel(t);this._updateRowOrderParts(t),this._updateRowStateParts(t,i),this._filterDragAndDrop(t,i)}));this.$.header.children.length<e.length;){const e=document.createElement("tr");e.setAttribute("part","row"),e.setAttribute("role","row"),e.setAttribute("tabindex","-1"),this.$.header.appendChild(e);const t=document.createElement("tr");t.setAttribute("part","row"),t.setAttribute("role","row"),t.setAttribute("tabindex","-1"),this.$.footer.appendChild(t)}for(;this.$.header.children.length>e.length;)this.$.header.removeChild(this.$.header.firstElementChild),this.$.footer.removeChild(this.$.footer.firstElementChild);fi(this.$.header,((t,i,r)=>{this._updateRow(t,e[i],"header",i===e.length-1);const o=gi(t);wi(o,"first-header-row-cell",0===i),wi(o,"last-header-row-cell",i===r.length-1)})),fi(this.$.footer,((t,i,r)=>{this._updateRow(t,e[e.length-1-i],"footer",0===i);const o=gi(t);wi(o,"first-footer-row-cell",0===i),wi(o,"last-footer-row-cell",i===r.length-1)})),this._updateRow(this.$.sizer,e[e.length-1]),this._resizeHandler(),this._frozenCellsChanged(),this._updateFirstAndLastColumn(),this._resetKeyboardNavigation(),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows(),this.generateCellClassNames(),this.generateCellPartNames(),this.__updateHeaderAndFooter()}_updateItem(e,t){e._item=t;const i=this.__getRowModel(e);this._toggleDetailsCell(e,i.detailsOpened),this._a11yUpdateRowLevel(e,i.level),this._a11yUpdateRowSelected(e,i.selected),this._updateRowStateParts(e,i),this._generateCellClassNames(e,i),this._generateCellPartNames(e,i),this._filterDragAndDrop(e,i),this.__updateDragSourceParts(e,i),fi(e,(e=>{if((!e._column||e._column.isConnected)&&e._renderer){const t=e._column||this;e._renderer.call(t,e._content,t,i)}})),this._updateDetailsCellHeight(e),this._a11yUpdateRowExpanded(e,i.expanded)}_resizeHandler(){this._updateDetailsCellHeights(),this.__updateHorizontalScrollPosition()}_onAnimationEnd(e){0===e.animationName.indexOf("vaadin-grid-appear")&&(e.stopPropagation(),this._resetKeyboardNavigation(),requestAnimationFrame((()=>{this.__scrollToPendingIndexes()})))}__getRowModel(e){return{index:e.index,item:e._item,level:this._getIndexLevel(e.index),expanded:this._isExpanded(e._item),selected:this._isSelected(e._item),detailsOpened:!!this.rowDetailsRenderer&&this._isDetailsOpened(e._item)}}_showTooltip(e){const t=this._tooltipController.node;if(t&&t.isConnected){const i=e.target;if(!this.__isCellFullyVisible(i))return;this._tooltipController.setTarget(i),this._tooltipController.setContext(this.getEventContext(e)),t._stateController.open({focus:"focusin"===e.type,hover:"mouseenter"===e.type})}}__isCellFullyVisible(e){if(e.hasAttribute("frozen")||e.hasAttribute("frozen-to-end"))return!0;let{left:t,right:i}=this.getBoundingClientRect();const r=[...e.parentNode.children].find((e=>e.hasAttribute("last-frozen")));if(r){const e=r.getBoundingClientRect();t=this.__isRTL?t:e.right,i=this.__isRTL?e.left:i}const o=[...e.parentNode.children].find((e=>e.hasAttribute("first-frozen-to-end")));if(o){const e=o.getBoundingClientRect();t=this.__isRTL?e.right:t,i=this.__isRTL?i:e.left}const s=e.getBoundingClientRect();return s.left>=t&&s.right<=i}_hideTooltip(e){const t=this._tooltipController&&this._tooltipController.node;t&&t._stateController.close(e)}requestContentUpdate(){this.__updateHeaderAndFooter(),this.__updateVisibleRows()}__updateHeaderAndFooter(){(this._columnTree||[]).forEach((e=>{e.forEach((e=>{e._renderHeaderAndFooter&&e._renderHeaderAndFooter()}))}))}__updateVisibleRows(e,t){this.__virtualizer&&this.__virtualizer.update(e,t)}__updateMinHeight(){const e=this.$.header.clientHeight+36+this.$.footer.clientHeight+(this.$.table.offsetHeight-this.$.table.clientHeight);!this.__minHeightStyleSheet&&Yi&&(this.__minHeightStyleSheet=new CSSStyleSheet,this.shadowRoot.adoptedStyleSheets=[...this.shadowRoot.adoptedStyleSheets,this.__minHeightStyleSheet]),this.__minHeightStyleSheet?this.__minHeightStyleSheet.replaceSync(`:host { --_grid-min-height: ${e}px; }`):this.style.setProperty("--_grid-min-height",`${e}px`)}};T("vaadin-grid",t.i`
  @keyframes vaadin-grid-appear {
    to {
      opacity: 1;
    }
  }

  :host {
    display: flex;
    flex-direction: column;
    animation: 1ms vaadin-grid-appear;
    height: 400px;
    min-height: var(--_grid-min-height, 0);
    flex: 1 1 auto;
    align-self: stretch;
    position: relative;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  #scroller {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    transform: translateY(0);
    width: auto;
    height: auto;
    position: absolute;
    inset: 0;
  }

  :host([all-rows-visible]) {
    height: auto;
    align-self: flex-start;
    min-height: auto;
    flex-grow: 0;
    width: 100%;
  }

  :host([all-rows-visible]) #scroller {
    width: 100%;
    height: 100%;
    position: relative;
  }

  :host([all-rows-visible]) #items {
    min-height: 1px;
  }

  #table {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    outline: none;
    /* Workaround for a Desktop Safari bug: new stacking context here prevents the scrollbar from getting hidden */
    z-index: 0;
  }

  #header,
  #footer {
    display: block;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    overflow: visible;
    width: 100%;
    z-index: 1;
  }

  #header {
    top: 0;
  }

  th {
    text-align: inherit;
  }

  /* Safari doesn't work with "inherit" */
  [safari] th {
    text-align: initial;
  }

  #footer {
    bottom: 0;
  }

  #items {
    flex-grow: 1;
    flex-shrink: 0;
    display: block;
    position: -webkit-sticky;
    position: sticky;
    width: 100%;
    left: 0;
    overflow: visible;
  }

  [part~='row'] {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }

  [part~='row'][loading] [part~='body-cell'] ::slotted(vaadin-grid-cell-content) {
    visibility: hidden;
  }

  [column-rendering='lazy'] [part~='body-cell']:not([frozen]):not([frozen-to-end]) {
    transform: translateX(var(--_grid-lazy-columns-start));
  }

  #items [part~='row'] {
    position: absolute;
  }

  #items [part~='row']:empty {
    height: 100%;
  }

  [part~='cell']:not([part~='details-cell']) {
    flex-shrink: 0;
    flex-grow: 1;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    padding: 0;
    white-space: nowrap;
  }

  [part~='cell'] {
    outline: none;
  }

  [part~='cell'] > [tabindex] {
    display: flex;
    align-items: inherit;
    outline: none;
    position: absolute;
    inset: 0;
  }

  /* Switch the focusButtonMode wrapping element to "position: static" temporarily
     when measuring real width of the cells in the auto-width columns. */
  [measuring-auto-width] [part~='cell'] > [tabindex] {
    position: static;
  }

  [part~='details-cell'] {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
  }

  [part~='cell'] ::slotted(vaadin-grid-cell-content) {
    display: block;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [hidden] {
    display: none !important;
  }

  [frozen],
  [frozen-to-end] {
    z-index: 2;
    will-change: transform;
  }

  [no-scrollbars][safari] #table,
  [no-scrollbars][firefox] #table {
    overflow: hidden;
  }

  /* Empty state */

  #scroller:not([empty-state]) #emptystatebody,
  #scroller[empty-state] #items {
    display: none;
  }

  #emptystatebody {
    display: flex;
    position: sticky;
    inset: 0;
    flex: 1;
    overflow: hidden;
  }

  #emptystaterow {
    display: flex;
    flex: 1;
  }

  #emptystatecell {
    display: block;
    flex: 1;
    overflow: auto;
  }

  /* Reordering styles */
  :host([reordering]) [part~='cell'] ::slotted(vaadin-grid-cell-content),
  :host([reordering]) [part~='resize-handle'],
  #scroller[no-content-pointer-events] [part~='cell'] ::slotted(vaadin-grid-cell-content) {
    pointer-events: none;
  }

  [part~='reorder-ghost'] {
    visibility: hidden;
    position: fixed;
    pointer-events: none;
    opacity: 0.5;

    /* Prevent overflowing the grid in Firefox */
    top: 0;
    left: 0;
  }

  :host([reordering]) {
    -webkit-user-select: none;
    user-select: none;
  }

  /* Resizing styles */
  [part~='resize-handle'] {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    cursor: col-resize;
    z-index: 1;
  }

  [part~='resize-handle']::before {
    position: absolute;
    content: '';
    height: 100%;
    width: 35px;
    transform: translateX(-50%);
  }

  [last-column] [part~='resize-handle']::before,
  [last-frozen] [part~='resize-handle']::before {
    width: 18px;
    transform: none;
    right: 0;
  }

  [frozen-to-end] [part~='resize-handle'] {
    left: 0;
    right: auto;
  }

  [frozen-to-end] [part~='resize-handle']::before {
    left: 0;
    right: auto;
  }

  [first-frozen-to-end] [part~='resize-handle']::before {
    width: 18px;
    transform: none;
  }

  [first-frozen-to-end] {
    margin-inline-start: auto;
  }

  /* Hide resize handle if scrolled to end */
  :host(:not([overflow~='end'])) [first-frozen-to-end] [part~='resize-handle'] {
    display: none;
  }

  #scroller[column-resizing],
  #scroller[range-selecting] {
    -webkit-user-select: none;
    user-select: none;
  }

  /* Sizer styles */
  #sizer {
    display: flex;
    position: absolute;
    visibility: hidden;
  }

  #sizer [part~='details-cell'] {
    display: none !important;
  }

  #sizer [part~='cell'][hidden] {
    display: none !important;
  }

  #sizer [part~='cell'] {
    display: block;
    flex-shrink: 0;
    line-height: 0;
    height: 0 !important;
    min-height: 0 !important;
    max-height: 0 !important;
    padding: 0 !important;
    border: none !important;
  }

  #sizer [part~='cell']::before {
    content: '-';
  }

  #sizer [part~='cell'] ::slotted(vaadin-grid-cell-content) {
    display: none !important;
  }

  /* RTL specific styles */

  :host([dir='rtl']) #items,
  :host([dir='rtl']) #header,
  :host([dir='rtl']) #footer {
    left: auto;
  }

  :host([dir='rtl']) [part~='reorder-ghost'] {
    left: auto;
    right: 0;
  }

  :host([dir='rtl']) [part~='resize-handle'] {
    left: 0;
    right: auto;
  }

  :host([dir='rtl']) [part~='resize-handle']::before {
    transform: translateX(50%);
  }

  :host([dir='rtl']) [last-column] [part~='resize-handle']::before,
  :host([dir='rtl']) [last-frozen] [part~='resize-handle']::before {
    left: 0;
    right: auto;
  }

  :host([dir='rtl']) [frozen-to-end] [part~='resize-handle'] {
    right: 0;
    left: auto;
  }

  :host([dir='rtl']) [frozen-to-end] [part~='resize-handle']::before {
    right: 0;
    left: auto;
  }

  @media (forced-colors: active) {
    [part~='selected-row'] [part~='first-column-cell']::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border: 2px solid;
    }

    [part~='focused-cell']::before {
      outline: 2px solid !important;
      outline-offset: -1px;
    }
  }
`,{moduleId:"vaadin-grid-styles"}),b(class extends(No(Di(N(Ti(Ut))))){static get template(){return $t`
      <div
        id="scroller"
        safari$="[[_safari]]"
        ios$="[[_ios]]"
        loading$="[[loading]]"
        column-reordering-allowed$="[[columnReorderingAllowed]]"
        empty-state$="[[__emptyState]]"
      >
        <table id="table" role="treegrid" aria-multiselectable="true" tabindex="0" aria-label$="[[accessibleName]]">
          <caption id="sizer" part="row"></caption>
          <thead id="header" role="rowgroup"></thead>
          <tbody id="items" role="rowgroup"></tbody>
          <tbody id="emptystatebody">
            <tr id="emptystaterow">
              <td part="empty-state" id="emptystatecell" tabindex="0">
                <slot name="empty-state" id="emptystateslot"></slot>
              </td>
            </tr>
          </tbody>
          <tfoot id="footer" role="rowgroup"></tfoot>
        </table>

        <div part="reorder-ghost"></div>
      </div>

      <slot name="tooltip"></slot>

      <div id="focusexit" tabindex="0"></div>
    `}static get is(){return"vaadin-grid"}});const Fo=e=>class extends(Ii(e)){static get properties(){return{_childColumns:{value(){return this._getChildColumns(this)}},flexGrow:{type:Number,readOnly:!0,sync:!0},width:{type:String,readOnly:!0,sync:!0},_visibleChildColumns:Array,_colSpan:Number,_rootColumns:Array}}static get observers(){return["_groupFrozenChanged(frozen, _rootColumns)","_groupFrozenToEndChanged(frozenToEnd, _rootColumns)","_groupHiddenChanged(hidden)","_colSpanChanged(_colSpan, _headerCell, _footerCell)","_groupOrderChanged(_order, _rootColumns)","_groupReorderStatusChanged(_reorderStatus, _rootColumns)","_groupResizableChanged(resizable, _rootColumns)"]}connectedCallback(){super.connectedCallback(),this._addNodeObserver(),this._updateFlexAndWidth()}disconnectedCallback(){super.disconnectedCallback(),this._observer&&this._observer.disconnect()}_columnPropChanged(e,t){"hidden"===e&&(this._preventHiddenSynchronization=!0,this._updateVisibleChildColumns(this._childColumns),this._preventHiddenSynchronization=!1),/flexGrow|width|hidden|_childColumns/u.test(e)&&this._updateFlexAndWidth(),"frozen"!==e||this.frozen||(this.frozen=t),"lastFrozen"!==e||this._lastFrozen||(this._lastFrozen=t),"frozenToEnd"!==e||this.frozenToEnd||(this.frozenToEnd=t),"firstFrozenToEnd"!==e||this._firstFrozenToEnd||(this._firstFrozenToEnd=t)}_groupOrderChanged(e,t){if(t){const i=t.slice(0);if(!e)return void i.forEach((e=>{e._order=0}));const r=10**(/(0+)$/u.exec(e).pop().length-(1+~~(Math.log(t.length)/Math.LN10)));i[0]&&i[0]._order&&i.sort(((e,t)=>e._order-t._order)),vi(i,r,e)}}_groupReorderStatusChanged(e,t){void 0!==e&&void 0!==t&&t.forEach((t=>{t._reorderStatus=e}))}_groupResizableChanged(e,t){void 0!==e&&void 0!==t&&t.forEach((t=>{t.resizable=e}))}_updateVisibleChildColumns(e){this._visibleChildColumns=Array.prototype.filter.call(e,(e=>!e.hidden)),this._colSpan=this._visibleChildColumns.length,this._updateAutoHidden()}_updateFlexAndWidth(){if(this._visibleChildColumns){if(this._visibleChildColumns.length>0){const e=this._visibleChildColumns.reduce(((e,t)=>e+` + ${(t.width||"0px").replace("calc","")}`),"").substring(3);this._setWidth(`calc(${e})`)}else this._setWidth("0px");this._setFlexGrow(Array.prototype.reduce.call(this._visibleChildColumns,((e,t)=>e+t.flexGrow),0))}}__scheduleAutoFreezeWarning(e,t){if(this._grid){const i=t.replace(/([A-Z])/gu,"-$1").toLowerCase(),r=e[0][t]||e[0].hasAttribute(i);e.every((e=>(e[t]||e.hasAttribute(i))===r))||(this._grid.__autoFreezeWarningDebouncer=ti.debounce(this._grid.__autoFreezeWarningDebouncer,Jt,(()=>{console.warn(`WARNING: Joining ${t} and non-${t} Grid columns inside the same column group! This will automatically freeze all the joined columns to avoid rendering issues. If this was intentional, consider marking each joined column explicitly as ${t}. Otherwise, exclude the ${t} columns from the joined group.`)})))}}_groupFrozenChanged(e,t){void 0!==t&&void 0!==e&&!1!==e&&(this.__scheduleAutoFreezeWarning(t,"frozen"),Array.from(t).forEach((t=>{t.frozen=e})))}_groupFrozenToEndChanged(e,t){void 0!==t&&void 0!==e&&!1!==e&&(this.__scheduleAutoFreezeWarning(t,"frozenToEnd"),Array.from(t).forEach((t=>{t.frozenToEnd=e})))}_groupHiddenChanged(e){(e||this.__groupHiddenInitialized)&&this._synchronizeHidden(),this.__groupHiddenInitialized=!0}_updateAutoHidden(){const e=this._autoHidden;this._autoHidden=0===(this._visibleChildColumns||[]).length,(e||this._autoHidden)&&(this.hidden=this._autoHidden)}_synchronizeHidden(){this._childColumns&&!this._preventHiddenSynchronization&&this._childColumns.forEach((e=>{e.hidden=this.hidden}))}_colSpanChanged(e,t,i){t&&(t.setAttribute("colspan",e),this._grid&&this._grid._a11yUpdateCellColspan(t,e)),i&&(i.setAttribute("colspan",e),this._grid&&this._grid._a11yUpdateCellColspan(i,e))}_getChildColumns(e){return Ei.getColumns(e)}_addNodeObserver(){this._observer=new Ei(this,(()=>{this._preventHiddenSynchronization=!0,this._rootColumns=this._getChildColumns(this),this._childColumns=this._rootColumns,this._updateVisibleChildColumns(this._childColumns),this._preventHiddenSynchronization=!1,this._grid&&this._grid._debounceUpdateColumnTree&&this._grid._debounceUpdateColumnTree()})),this._observer.flush()}_isColumnElement(e){return e.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(e.localName)}};class Do extends(Fo(Ut)){static get is(){return"vaadin-grid-column-group"}}b(Do),T("vaadin-checkbox",t.i`
    :host {
      color: var(--vaadin-checkbox-label-color, var(--lumo-body-text-color));
      font-size: var(--vaadin-checkbox-label-font-size, var(--lumo-font-size-m));
      font-family: var(--lumo-font-family);
      line-height: var(--lumo-line-height-s);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      user-select: none;
      cursor: default;
      outline: none;
      --_checkbox-size: var(--vaadin-checkbox-size, calc(var(--lumo-size-m) / 2));
      --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
      --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
      --_selection-color: var(--vaadin-selection-color, var(--lumo-primary-color));
      --_invalid-background: var(--vaadin-input-field-invalid-background, var(--lumo-error-color-10pct));
      --_disabled-checkmark-color: var(--vaadin-checkbox-disabled-checkmark-color, var(--lumo-contrast-30pct));
    }

    [part='label'] {
      display: flex;
      position: relative;
      max-width: max-content;
    }

    :host([has-label]) ::slotted(label) {
      padding: var(
        --vaadin-checkbox-label-padding,
        var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs)
      );
    }

    :host([dir='rtl'][has-label]) ::slotted(label) {
      padding: var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-s);
    }

    :host([has-label][required]) ::slotted(label) {
      padding-inline-end: var(--lumo-space-m);
    }

    [part='checkbox'] {
      width: var(--_checkbox-size);
      height: var(--_checkbox-size);
      margin: var(--lumo-space-xs);
      position: relative;
      border-radius: var(--vaadin-checkbox-border-radius, var(--lumo-border-radius-s));
      background: var(--vaadin-checkbox-background, var(--lumo-contrast-20pct));
      transition:
        transform 0.2s cubic-bezier(0.12, 0.32, 0.54, 2),
        background-color 0.15s;
      cursor: var(--lumo-clickable-cursor);
      /* Default field border color */
      --_input-border-color: var(--vaadin-input-field-border-color, var(--lumo-contrast-50pct));
    }

    :host([indeterminate]),
    :host([checked]) {
      --vaadin-input-field-border-color: transparent;
    }

    :host([indeterminate]) [part='checkbox'],
    :host([checked]) [part='checkbox'] {
      background-color: var(--_selection-color);
    }

    /* Checkmark */
    [part='checkbox']::after {
      pointer-events: none;
      font-family: 'lumo-icons';
      content: var(--vaadin-checkbox-checkmark-char, var(--lumo-icons-checkmark));
      color: var(--vaadin-checkbox-checkmark-color, var(--lumo-primary-contrast-color));
      font-size: var(--vaadin-checkbox-checkmark-size, calc(var(--_checkbox-size) + 2px));
      line-height: 1;
      position: absolute;
      top: -1px;
      left: -1px;
      contain: content;
      opacity: 0;
    }

    :host([checked]) [part='checkbox']::after {
      opacity: 1;
    }

    :host([readonly]:not([checked]):not([indeterminate])) {
      color: var(--lumo-secondary-text-color);
    }

    :host([readonly]:not([checked]):not([indeterminate])) [part='checkbox'] {
      background: transparent;
      box-shadow: none;
    }

    :host([readonly]:not([checked]):not([indeterminate])) [part='checkbox']::after {
      content: '';
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      top: 0;
      left: 0;
      opacity: 1;
      border: var(--vaadin-input-field-readonly-border, 1px dashed var(--lumo-contrast-50pct));
    }

    /* Indeterminate checkmark */
    :host([indeterminate]) [part='checkbox']::after {
      content: var(--vaadin-checkbox-checkmark-char-indeterminate, '');
      opacity: 1;
      top: 45%;
      height: 10%;
      left: 22%;
      right: 22%;
      width: auto;
      border: 0;
      background-color: var(--lumo-primary-contrast-color);
    }

    /* Focus ring */
    :host([focus-ring]) [part='checkbox'] {
      box-shadow:
        0 0 0 1px var(--lumo-base-color),
        0 0 0 calc(var(--_focus-ring-width) + 1px) var(--_focus-ring-color),
        inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
    }

    :host([focus-ring][readonly]:not([checked]):not([indeterminate])) [part='checkbox'] {
      box-shadow:
        0 0 0 1px var(--lumo-base-color),
        0 0 0 calc(var(--_focus-ring-width) + 1px) var(--_focus-ring-color);
    }

    /* Disabled */
    :host([disabled]) {
      pointer-events: none;
      --vaadin-input-field-border-color: var(--lumo-contrast-20pct);
    }

    :host([disabled]) ::slotted(label) {
      color: inherit;
    }

    :host([disabled]) [part='checkbox'] {
      background-color: var(--vaadin-checkbox-disabled-background, var(--lumo-contrast-10pct));
    }

    :host([disabled]) [part='checkbox']::after {
      color: var(--_disabled-checkmark-color);
    }

    :host([disabled]) [part='label'],
    :host([disabled]) [part='helper-text'] {
      color: var(--lumo-disabled-text-color);
      -webkit-text-fill-color: var(--lumo-disabled-text-color);
    }

    :host([indeterminate][disabled]) [part='checkbox']::after {
      background-color: var(--_disabled-checkmark-color);
    }

    :host([readonly][checked]:not([disabled])) [part='checkbox'],
    :host([readonly][indeterminate]:not([disabled])) [part='checkbox'] {
      background-color: var(--vaadin-checkbox-readonly-checked-background, var(--lumo-contrast-70pct));
    }

    /* Used for activation "halo" */
    [part='checkbox']::before {
      pointer-events: none;
      color: transparent;
      width: 100%;
      height: 100%;
      line-height: var(--_checkbox-size);
      border-radius: inherit;
      background-color: inherit;
      transform: scale(1.4);
      opacity: 0;
      transition:
        transform 0.1s,
        opacity 0.8s;
    }

    /* Hover */
    :host(:not([checked]):not([indeterminate]):not([disabled]):not([readonly]):not([invalid]):hover) [part='checkbox'] {
      background: var(--vaadin-checkbox-background-hover, var(--lumo-contrast-30pct));
    }

    /* Disable hover for touch devices */
    @media (pointer: coarse) {
      /* prettier-ignore */
      :host(:not([checked]):not([indeterminate]):not([disabled]):not([readonly]):not([invalid]):hover) [part='checkbox'] {
        background: var(--vaadin-checkbox-background, var(--lumo-contrast-20pct));
      }
    }

    /* Active */
    :host([active]) [part='checkbox'] {
      transform: scale(0.9);
      transition-duration: 0.05s;
    }

    :host([active][checked]) [part='checkbox'] {
      transform: scale(1.1);
    }

    :host([active]:not([checked])) [part='checkbox']::before {
      transition-duration: 0.01s, 0.01s;
      transform: scale(0);
      opacity: 0.4;
    }

    /* Required */
    :host([required]) [part='required-indicator'] {
      position: absolute;
      top: var(--lumo-space-xs);
      right: var(--lumo-space-xs);
    }

    :host([required][dir='rtl']) [part='required-indicator'] {
      right: auto;
      left: var(--lumo-space-xs);
    }

    :host([required]) [part='required-indicator']::after {
      content: var(--lumo-required-field-indicator, '\\2022');
      transition: opacity 0.2s;
      color: var(--lumo-required-field-indicator-color, var(--lumo-primary-text-color));
      width: 1em;
      text-align: center;
    }

    :host(:not([has-label])) [part='required-indicator'] {
      display: none;
    }

    /* Invalid */
    :host([invalid]) {
      --vaadin-input-field-border-color: var(--lumo-error-color);
    }

    :host([invalid]) [part='checkbox'] {
      background: var(--_invalid-background);
      background-image: linear-gradient(var(--_invalid-background) 0%, var(--_invalid-background) 100%);
    }

    :host([invalid]:hover) [part='checkbox'] {
      background-image: linear-gradient(var(--_invalid-background) 0%, var(--_invalid-background) 100%),
        linear-gradient(var(--_invalid-background) 0%, var(--_invalid-background) 100%);
    }

    :host([invalid][focus-ring]) {
      --_focus-ring-color: var(--lumo-error-color-50pct);
    }

    :host([invalid]) [part='required-indicator']::after {
      color: var(--lumo-required-field-indicator-color, var(--lumo-error-text-color));
    }

    /* Error message */
    [part='error-message'] {
      font-size: var(--vaadin-input-field-error-font-size, var(--lumo-font-size-xs));
      line-height: var(--lumo-line-height-xs);
      font-weight: var(--vaadin-input-field-error-font-weight, 400);
      color: var(--vaadin-input-field-error-color, var(--lumo-error-text-color));
      will-change: max-height;
      transition: 0.4s max-height;
      max-height: 5em;
      padding-inline-start: var(--lumo-space-xs);
    }

    :host([has-error-message]) [part='error-message']::after,
    :host([has-helper]) [part='helper-text']::after {
      content: '';
      display: block;
      height: 0.4em;
    }

    :host(:not([invalid])) [part='error-message'] {
      max-height: 0;
      overflow: hidden;
    }

    /* Helper */
    [part='helper-text'] {
      display: block;
      color: var(--vaadin-input-field-helper-color, var(--lumo-secondary-text-color));
      font-size: var(--vaadin-input-field-helper-font-size, var(--lumo-font-size-xs));
      line-height: var(--lumo-line-height-xs);
      font-weight: var(--vaadin-input-field-helper-font-weight, 400);
      margin-left: calc(var(--lumo-border-radius-m) / 4);
      transition: color 0.2s;
      padding-inline-start: var(--lumo-space-xs);
    }

    :host(:hover:not([readonly])) [part='helper-text'] {
      color: var(--lumo-body-text-color);
    }

    :host([has-error-message]) ::slotted(label),
    :host([has-helper]) ::slotted(label) {
      padding-bottom: 0;
    }
  `,{moduleId:"lumo-checkbox"});const Mo=new WeakMap,Lo=ne((e=>class extends e{get slotStyles(){return[]}connectedCallback(){super.connectedCallback(),this.__applySlotStyles()}__applySlotStyles(){const e=this.getRootNode(),t=function(e){return Mo.has(e)||Mo.set(e,new Set),Mo.get(e)}(e);this.slotStyles.forEach((i=>{t.has(i)||(function(e,t){const i=document.createElement("style");i.textContent=e,t===document?document.head.appendChild(i):t.insertBefore(i,t.firstChild)}(i,e),t.add(i))}))}})),Ho=ne((e=>class extends e{static get properties(){return{stateTarget:{type:Object,observer:"_stateTargetChanged"}}}static get delegateAttrs(){return[]}static get delegateProps(){return[]}ready(){super.ready(),this._createDelegateAttrsObserver(),this._createDelegatePropsObserver()}_stateTargetChanged(e){e&&(this._ensureAttrsDelegated(),this._ensurePropsDelegated())}_createDelegateAttrsObserver(){this._createMethodObserver(`_delegateAttrsChanged(${this.constructor.delegateAttrs.join(", ")})`)}_createDelegatePropsObserver(){this._createMethodObserver(`_delegatePropsChanged(${this.constructor.delegateProps.join(", ")})`)}_ensureAttrsDelegated(){this.constructor.delegateAttrs.forEach((e=>{this._delegateAttribute(e,this[e])}))}_ensurePropsDelegated(){this.constructor.delegateProps.forEach((e=>{this._delegateProperty(e,this[e])}))}_delegateAttrsChanged(...e){this.constructor.delegateAttrs.forEach(((t,i)=>{this._delegateAttribute(t,e[i])}))}_delegatePropsChanged(...e){this.constructor.delegateProps.forEach(((t,i)=>{this._delegateProperty(t,e[i])}))}_delegateAttribute(e,t){this.stateTarget&&("invalid"===e&&this._delegateAttribute("aria-invalid",!!t&&"true"),"boolean"==typeof t?this.stateTarget.toggleAttribute(e,t):t?this.stateTarget.setAttribute(e,t):this.stateTarget.removeAttribute(e))}_delegateProperty(e,t){this.stateTarget&&(this.stateTarget[e]=t)}})),Bo=ne((e=>class extends e{static get properties(){return{inputElement:{type:Object,readOnly:!0,observer:"_inputElementChanged",sync:!0},type:{type:String,readOnly:!0},value:{type:String,value:"",observer:"_valueChanged",notify:!0,sync:!0}}}constructor(){super(),this._boundOnInput=this._onInput.bind(this),this._boundOnChange=this._onChange.bind(this)}get _hasValue(){return null!=this.value&&""!==this.value}get _inputElementValueProperty(){return"value"}get _inputElementValue(){return this.inputElement?this.inputElement[this._inputElementValueProperty]:void 0}set _inputElementValue(e){this.inputElement&&(this.inputElement[this._inputElementValueProperty]=e)}clear(){this.value="",this._inputElementValue=""}_addInputListeners(e){e.addEventListener("input",this._boundOnInput),e.addEventListener("change",this._boundOnChange)}_removeInputListeners(e){e.removeEventListener("input",this._boundOnInput),e.removeEventListener("change",this._boundOnChange)}_forwardInputValue(e){this.inputElement&&(this._inputElementValue=null!=e?e:"")}_inputElementChanged(e,t){e?this._addInputListeners(e):t&&this._removeInputListeners(t)}_onInput(e){const t=e.composedPath()[0];this.__userInput=e.isTrusted,this.value=t.value,this.__userInput=!1}_onChange(e){}_toggleHasValue(e){this.toggleAttribute("has-value",e)}_valueChanged(e,t){this._toggleHasValue(this._hasValue),""===e&&void 0===t||this.__userInput||this._forwardInputValue(e)}})),Vo=ne((e=>class extends(Ho(Mi(Bo(e)))){static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0,sync:!0}}}static get delegateProps(){return[...super.delegateProps,"checked"]}_onChange(e){const t=e.target;this._toggleChecked(t.checked)}_toggleChecked(e){this.checked=e}}));class Go extends Ji{constructor(e,t,i,r={}){super(e,t,i,{...r,useUniqueId:!0})}initCustomNode(e){this.__updateNodeId(e),this.__notifyChange(e)}teardownNode(e){const t=this.getSlotChild();t&&t!==this.defaultNode?this.__notifyChange(t):(this.restoreDefaultNode(),this.updateDefaultNode(this.node))}attachDefaultNode(){const e=super.attachDefaultNode();return e&&this.__updateNodeId(e),e}restoreDefaultNode(){}updateDefaultNode(e){this.__notifyChange(e)}observeNode(e){this.__nodeObserver&&this.__nodeObserver.disconnect(),this.__nodeObserver=new MutationObserver((e=>{e.forEach((e=>{const t=e.target,i=t===this.node;"attributes"===e.type?i&&this.__updateNodeId(t):(i||t.parentElement===this.node)&&this.__notifyChange(this.node)}))})),this.__nodeObserver.observe(e,{attributes:!0,attributeFilter:["id"],childList:!0,subtree:!0,characterData:!0})}__hasContent(e){return!!e&&(e.nodeType===Node.ELEMENT_NODE&&(customElements.get(e.localName)||e.children.length>0)||e.textContent&&""!==e.textContent.trim())}__notifyChange(e){this.dispatchEvent(new CustomEvent("slot-content-changed",{detail:{hasContent:this.__hasContent(e),node:e}}))}__updateNodeId(e){const t=!this.nodes||e===this.nodes[0];e.nodeType!==Node.ELEMENT_NODE||this.multiple&&!t||e.id||(e.id=this.defaultId)}}class $o extends Go{constructor(e){super(e,"error-message","div")}setErrorMessage(e){this.errorMessage=e,this.updateDefaultNode(this.node)}setInvalid(e){this.invalid=e,this.updateDefaultNode(this.node)}initAddedNode(e){e!==this.defaultNode&&this.initCustomNode(e)}initNode(e){this.updateDefaultNode(e)}initCustomNode(e){e.textContent&&!this.errorMessage&&(this.errorMessage=e.textContent.trim()),super.initCustomNode(e)}restoreDefaultNode(){this.attachDefaultNode()}updateDefaultNode(e){const{errorMessage:t,invalid:i}=this,r=Boolean(i&&t&&""!==t.trim());e&&(e.textContent=r?t:"",e.hidden=!r,r&&function(e,t={}){const i=t.mode||"polite",r=void 0===t.timeout?150:t.timeout;"alert"===i?(po.removeAttribute("aria-live"),po.removeAttribute("role"),mo=ti.debounce(mo,Jt,(()=>{po.setAttribute("role","alert")}))):(mo&&mo.cancel(),po.removeAttribute("role"),po.setAttribute("aria-live",i)),po.textContent="",setTimeout((()=>{po.textContent=e}),r)}(t,{mode:"assertive"})),super.updateDefaultNode(e)}}class Wo extends Go{constructor(e){super(e,"helper",null)}setHelperText(e){this.helperText=e,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){const{helperText:e}=this;if(e&&""!==e.trim()){this.tagName="div";const e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(e){e&&(e.textContent=this.helperText),super.updateDefaultNode(e)}initCustomNode(e){super.initCustomNode(e),this.observeNode(e)}}class Uo extends Go{constructor(e){super(e,"label","label")}setLabel(e){this.label=e,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){const{label:e}=this;if(e&&""!==e.trim()){const e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(e){e&&(e.textContent=this.label),super.updateDefaultNode(e)}initCustomNode(e){super.initCustomNode(e),this.observeNode(e)}}const qo=ne((e=>class extends(Ti(e)){static get properties(){return{label:{type:String,observer:"_labelChanged"}}}constructor(){super(),this._labelController=new Uo(this),this._labelController.addEventListener("slot-content-changed",(e=>{this.toggleAttribute("has-label",e.detail.hasContent)}))}get _labelId(){const e=this._labelNode;return e&&e.id}get _labelNode(){return this._labelController.node}ready(){super.ready(),this.addController(this._labelController)}_labelChanged(e){this._labelController.setLabel(e)}})),jo=ne((e=>class extends e{static get properties(){return{invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1,sync:!0},manualValidation:{type:Boolean,value:!1},required:{type:Boolean,reflectToAttribute:!0,sync:!0}}}validate(){const e=this.checkValidity();return this._setInvalid(!e),this.dispatchEvent(new CustomEvent("validated",{detail:{valid:e}})),e}checkValidity(){return!this.required||!!this.value}_setInvalid(e){this._shouldSetInvalid(e)&&(this.invalid=e)}_shouldSetInvalid(e){return!0}_requestValidation(){this.manualValidation||this.validate()}})),Yo=e=>class extends(jo(qo(Ti(e)))){static get properties(){return{ariaTarget:{type:Object,observer:"_ariaTargetChanged"},errorMessage:{type:String,observer:"_errorMessageChanged"},helperText:{type:String,observer:"_helperTextChanged"},accessibleName:{type:String,observer:"_accessibleNameChanged"},accessibleNameRef:{type:String,observer:"_accessibleNameRefChanged"}}}static get observers(){return["_invalidChanged(invalid)","_requiredChanged(required)"]}constructor(){super(),this._fieldAriaController=new So(this),this._helperController=new Wo(this),this._errorController=new $o(this),this._errorController.addEventListener("slot-content-changed",(e=>{this.toggleAttribute("has-error-message",e.detail.hasContent)})),this._labelController.addEventListener("slot-content-changed",(e=>{const{hasContent:t,node:i}=e.detail;this.__labelChanged(t,i)})),this._helperController.addEventListener("slot-content-changed",(e=>{const{hasContent:t,node:i}=e.detail;this.toggleAttribute("has-helper",t),this.__helperChanged(t,i)}))}get _errorNode(){return this._errorController.node}get _helperNode(){return this._helperController.node}ready(){super.ready(),this.addController(this._fieldAriaController),this.addController(this._helperController),this.addController(this._errorController)}__helperChanged(e,t){e?this._fieldAriaController.setHelperId(t.id):this._fieldAriaController.setHelperId(null)}_accessibleNameChanged(e){this._fieldAriaController.setAriaLabel(e)}_accessibleNameRefChanged(e){this._fieldAriaController.setLabelId(e,!0)}__labelChanged(e,t){e?this._fieldAriaController.setLabelId(t.id):this._fieldAriaController.setLabelId(null)}_errorMessageChanged(e){this._errorController.setErrorMessage(e)}_helperTextChanged(e){this._helperController.setHelperText(e)}_ariaTargetChanged(e){e&&this._fieldAriaController.setTarget(e)}_requiredChanged(e){this._fieldAriaController.setRequired(e)}_invalidChanged(e){this._errorController.setInvalid(e),setTimeout((()=>{if(e){const e=this._errorNode;this._fieldAriaController.setErrorId(e&&e.id)}else this._fieldAriaController.setErrorId(null)}))}};class Ko extends Ji{constructor(e,t,i={}){const{uniqueIdPrefix:r}=i;super(e,"input","input",{initializer:(e,i)=>{i.value&&(e.value=i.value),i.type&&e.setAttribute("type",i.type),e.id=this.defaultId,"function"==typeof t&&t(e)},useUniqueId:!0,uniqueIdPrefix:r})}}class Xo{constructor(e,t){this.input=e,this.__preventDuplicateLabelClick=this.__preventDuplicateLabelClick.bind(this),t.addEventListener("slot-content-changed",(e=>{this.__initLabel(e.detail.node)})),this.__initLabel(t.node)}__initLabel(e){e&&(e.addEventListener("click",this.__preventDuplicateLabelClick),this.input&&e.setAttribute("for",this.input.id))}__preventDuplicateLabelClick(){const e=t=>{t.stopImmediatePropagation(),this.input.removeEventListener("click",e)};this.input.addEventListener("click",e)}}const Jo=e=>class extends(Lo(Yo(Vo(vo(fo(e)))))){static get properties(){return{indeterminate:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0},name:{type:String,value:""},readonly:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["__readonlyChanged(readonly, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"indeterminate"]}static get delegateAttrs(){return[...super.delegateAttrs,"name","invalid","required"]}constructor(){super(),this._setType("checkbox"),this._boundOnInputClick=this._onInputClick.bind(this),this.value="on",this.tabindex=0}get slotStyles(){return[`\n          ${this.localName} > input[slot='input'] {\n            opacity: 0;\n          }\n        `]}ready(){super.ready(),this.addController(new Ko(this,(e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e}))),this.addController(new Xo(this.inputElement,this._labelController)),this._createMethodObserver("_checkedChanged(checked)")}_shouldSetActive(e){return!this.readonly&&"a"!==e.target.localName&&e.target!==this._helperNode&&e.target!==this._errorNode&&super._shouldSetActive(e)}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("click",this._boundOnInputClick)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("click",this._boundOnInputClick)}_onInputClick(e){this.readonly&&e.preventDefault()}__readonlyChanged(e,t){t&&(e?t.setAttribute("aria-readonly","true"):t.removeAttribute("aria-readonly"))}_toggleChecked(e){this.indeterminate&&(this.indeterminate=!1),super._toggleChecked(e)}checkValidity(){return!this.required||!!this.checked}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}_checkedChanged(e){(e||this.__oldChecked)&&this._requestValidation(),this.__oldChecked=e}_requiredChanged(e){super._requiredChanged(e),!1===e&&this._requestValidation()}_onRequiredIndicatorClick(){this._labelNode.click()}};T("vaadin-checkbox",t.i`
  :host {
    display: inline-block;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([disabled]) {
    -webkit-tap-highlight-color: transparent;
  }

  .vaadin-checkbox-container {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: baseline;
  }

  [part='checkbox'],
  ::slotted(input),
  [part='label'] {
    grid-row: 1;
  }

  [part='checkbox'],
  ::slotted(input) {
    grid-column: 1;
  }

  [part='helper-text'],
  [part='error-message'] {
    grid-column: 2;
  }

  :host(:not([has-helper])) [part='helper-text'],
  :host(:not([has-error-message])) [part='error-message'] {
    display: none;
  }

  [part='checkbox'] {
    width: var(--vaadin-checkbox-size, 1em);
    height: var(--vaadin-checkbox-size, 1em);
    --_input-border-width: var(--vaadin-input-field-border-width, 0);
    --_input-border-color: var(--vaadin-input-field-border-color, transparent);
    box-shadow: inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
  }

  [part='checkbox']::before {
    display: block;
    content: '\\202F';
    line-height: var(--vaadin-checkbox-size, 1em);
    contain: paint;
  }

  /* visually hidden */
  ::slotted(input) {
    cursor: inherit;
    margin: 0;
    align-self: stretch;
    -webkit-appearance: none;
    width: initial;
    height: initial;
  }

  @media (forced-colors: active) {
    [part='checkbox'] {
      outline: 1px solid;
      outline-offset: -1px;
    }

    :host([disabled]) [part='checkbox'],
    :host([disabled]) [part='checkbox']::after {
      outline-color: GrayText;
    }

    :host(:is([checked], [indeterminate])) [part='checkbox']::after {
      outline: 1px solid;
      outline-offset: -1px;
      border-radius: inherit;
    }

    :host([focused]) [part='checkbox'],
    :host([focused]) [part='checkbox']::after {
      outline-width: 2px;
    }
  }
`,{moduleId:"vaadin-checkbox-styles"});class Zo extends(Jo(Di(N(Ut)))){static get is(){return"vaadin-checkbox"}static get template(){return $t`
      <div class="vaadin-checkbox-container">
        <div part="checkbox" aria-hidden="true"></div>
        <slot name="input"></slot>
        <div part="label">
          <slot name="label"></slot>
          <div part="required-indicator" on-click="_onRequiredIndicatorClick"></div>
        </div>
        <div part="helper-text">
          <slot name="helper"></slot>
        </div>
        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>
      <slot name="tooltip"></slot>
    `}ready(){super.ready(),this._tooltipController=new Zi(this),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}}b(Zo);const Qo=e=>class extends e{static get properties(){return{width:{type:String,value:"58px",sync:!0},autoWidth:{type:Boolean,value:!0},flexGrow:{type:Number,value:0,sync:!0},selectAll:{type:Boolean,value:!1,notify:!0,sync:!0},autoSelect:{type:Boolean,value:!1,sync:!0},dragSelect:{type:Boolean,value:!1,sync:!0},_indeterminate:{type:Boolean,sync:!0},_selectAllHidden:Boolean,_shiftKeyDown:{type:Boolean,value:!1}}}static get observers(){return["_onHeaderRendererOrBindingChanged(_headerRenderer, _headerCell, path, header, selectAll, _indeterminate, _selectAllHidden)"]}constructor(){super(),this.__onCellTrack=this.__onCellTrack.bind(this),this.__onCellClick=this.__onCellClick.bind(this),this.__onCellMouseDown=this.__onCellMouseDown.bind(this),this.__onGridInteraction=this.__onGridInteraction.bind(this),this.__onActiveItemChanged=this.__onActiveItemChanged.bind(this),this.__onSelectRowCheckboxChange=this.__onSelectRowCheckboxChange.bind(this),this.__onSelectAllCheckboxChange=this.__onSelectAllCheckboxChange.bind(this)}connectedCallback(){super.connectedCallback(),this._grid&&(this._grid.addEventListener("keyup",this.__onGridInteraction),this._grid.addEventListener("keydown",this.__onGridInteraction,{capture:!0}),this._grid.addEventListener("mousedown",this.__onGridInteraction),this._grid.addEventListener("active-item-changed",this.__onActiveItemChanged))}disconnectedCallback(){super.disconnectedCallback(),this._grid&&(this._grid.removeEventListener("keyup",this.__onGridInteraction),this._grid.removeEventListener("keydown",this.__onGridInteraction,{capture:!0}),this._grid.removeEventListener("mousedown",this.__onGridInteraction),this._grid.removeEventListener("active-item-changed",this.__onActiveItemChanged))}_defaultHeaderRenderer(e,t){let i=e.firstElementChild;i||(i=document.createElement("vaadin-checkbox"),i.setAttribute("aria-label","Select All"),i.classList.add("vaadin-grid-select-all-checkbox"),i.addEventListener("change",this.__onSelectAllCheckboxChange),e.appendChild(i));const r=this.__isChecked(this.selectAll,this._indeterminate);i.checked=r,i.hidden=this._selectAllHidden,i.indeterminate=this._indeterminate}_defaultRenderer(e,t,{item:i,selected:r}){let o=e.firstElementChild;o||(o=document.createElement("vaadin-checkbox"),o.setAttribute("aria-label","Select Row"),o.addEventListener("change",this.__onSelectRowCheckboxChange),e.appendChild(o),Dr(e,"track",this.__onCellTrack),e.addEventListener("mousedown",this.__onCellMouseDown),e.addEventListener("click",this.__onCellClick)),o.__item=i,o.checked=r;const s=this._grid.__isItemSelectable(i);o.readonly=!s,o.hidden=!s&&!r}__onSelectAllCheckboxChange(e){this._indeterminate||e.currentTarget.checked?this._selectAll():this._deselectAll()}__onGridInteraction(e){this._shiftKeyDown=e.shiftKey,this.autoSelect&&this._grid.$.scroller.toggleAttribute("range-selecting",this._shiftKeyDown)}__onSelectRowCheckboxChange(e){this.__toggleItem(e.currentTarget.__item,e.currentTarget.checked)}__onCellTrack(e){if(this.dragSelect)if(this.__dragCurrentY=e.detail.y,this.__dragDy=e.detail.dy,"start"===e.detail.state){const t=this._grid._getRenderedRows().find((t=>t.contains(e.currentTarget.assignedSlot)));this.__selectOnDrag=!this._grid._isSelected(t._item),this.__dragStartIndex=t.index,this.__dragStartItem=t._item,this.__dragAutoScroller()}else"end"===e.detail.state&&(this.__dragStartItem&&this.__toggleItem(this.__dragStartItem,this.__selectOnDrag),setTimeout((()=>{this.__dragStartIndex=void 0})))}__onCellMouseDown(e){this.dragSelect&&e.preventDefault()}__onCellClick(e){void 0!==this.__dragStartIndex&&e.preventDefault()}_onCellKeyDown(e){const t=e.composedPath()[0];if(32===e.keyCode)if(t===this._headerCell)this.selectAll?this._deselectAll():this._selectAll();else if(this._cells.includes(t)&&!this.autoSelect){const e=t._content.firstElementChild;this.__toggleItem(e.__item)}}__onActiveItemChanged(e){const t=e.detail.value;if(this.autoSelect){const e=t||this.__previousActiveItem;e&&this.__toggleItem(e)}this.__previousActiveItem=t}__dragAutoScroller(){if(void 0===this.__dragStartIndex)return;const e=this._grid._getRenderedRows(),t=e.find((e=>{const t=e.getBoundingClientRect();return this.__dragCurrentY>=t.top&&this.__dragCurrentY<=t.bottom}));let i=t?t.index:void 0;const r=this.__getScrollableArea();this.__dragCurrentY<r.top?i=this._grid._firstVisibleIndex:this.__dragCurrentY>r.bottom&&(i=this._grid._lastVisibleIndex),void 0!==i&&e.forEach((e=>{(i>this.__dragStartIndex&&e.index>=this.__dragStartIndex&&e.index<=i||i<this.__dragStartIndex&&e.index<=this.__dragStartIndex&&e.index>=i)&&(this.__toggleItem(e._item,this.__selectOnDrag),this.__dragStartItem=void 0)}));const o=.15*r.height;if(this.__dragDy<0&&this.__dragCurrentY<r.top+o){const e=r.top+o-this.__dragCurrentY,t=Math.min(1,e/o);this._grid.$.table.scrollTop-=10*t}if(this.__dragDy>0&&this.__dragCurrentY>r.bottom-o){const e=this.__dragCurrentY-(r.bottom-o),t=Math.min(1,e/o);this._grid.$.table.scrollTop+=10*t}setTimeout((()=>this.__dragAutoScroller()),10)}__getScrollableArea(){const e=this._grid.$.table.getBoundingClientRect(),t=this._grid.$.header.getBoundingClientRect(),i=this._grid.$.footer.getBoundingClientRect();return{top:e.top+t.height,bottom:e.bottom-i.height,left:e.left,right:e.right,height:e.height-t.height-i.height,width:e.width}}_selectAll(){}_deselectAll(){}_selectItem(e){}_deselectItem(e){}__toggleItem(e,t=!this._grid._isSelected(e)){t!==this._grid._isSelected(e)&&(t?this._selectItem(e):this._deselectItem(e))}__isChecked(e,t){return t||e}},es=e=>class extends(Qo(e)){static get properties(){return{__previousActiveItem:Object}}static get observers(){return["__onSelectAllChanged(selectAll)"]}constructor(){super(),this.__boundUpdateSelectAllVisibility=this.__updateSelectAllVisibility.bind(this),this.__boundOnSelectedItemsChanged=this.__onSelectedItemsChanged.bind(this)}disconnectedCallback(){this._grid.removeEventListener("data-provider-changed",this.__boundUpdateSelectAllVisibility),this._grid.removeEventListener("is-item-selectable-changed",this.__boundUpdateSelectAllVisibility),this._grid.removeEventListener("filter-changed",this.__boundOnSelectedItemsChanged),this._grid.removeEventListener("selected-items-changed",this.__boundOnSelectedItemsChanged),super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this._grid&&(this._grid.addEventListener("data-provider-changed",this.__boundUpdateSelectAllVisibility),this._grid.addEventListener("is-item-selectable-changed",this.__boundUpdateSelectAllVisibility),this._grid.addEventListener("filter-changed",this.__boundOnSelectedItemsChanged),this._grid.addEventListener("selected-items-changed",this.__boundOnSelectedItemsChanged),this.__updateSelectAllVisibility())}__onSelectAllChanged(e){void 0!==e&&this._grid&&(this.__selectAllInitialized?this._selectAllChangeLock||(e&&this.__hasArrayDataProvider()?this.__withFilteredItemsArray((e=>{this._grid.selectedItems=e})):this._grid.selectedItems=[]):this.__selectAllInitialized=!0)}_selectAll(){this.selectAll=!0}_deselectAll(){this.selectAll=!1}_selectItem(e){this._grid.__isItemSelectable(e)&&(this._grid.selectItem(e),this._grid.dispatchEvent(new CustomEvent("item-toggle",{detail:{item:e,selected:!0,shiftKey:this._shiftKeyDown}})))}_deselectItem(e){this._grid.__isItemSelectable(e)&&(this._grid.deselectItem(e),this._grid.dispatchEvent(new CustomEvent("item-toggle",{detail:{item:e,selected:!1,shiftKey:this._shiftKeyDown}})))}__hasArrayDataProvider(){return Array.isArray(this._grid.items)&&!!this._grid.dataProvider}__onSelectedItemsChanged(){this._selectAllChangeLock=!0,this.__hasArrayDataProvider()&&this.__withFilteredItemsArray((e=>{this._grid.selectedItems.length?e.every((e=>this._grid._isSelected(e)))?(this.selectAll=!0,this._indeterminate=!1):(this.selectAll=!1,this._indeterminate=!0):(this.selectAll=!1,this._indeterminate=!1)})),this._selectAllChangeLock=!1}__updateSelectAllVisibility(){this._selectAllHidden=!Array.isArray(this._grid.items)||!!this._grid.isItemSelectable}__withFilteredItemsArray(e){const t={page:0,pageSize:1/0,sortOrders:[],filters:this._grid._mapFilters()};this._grid.dataProvider(t,(t=>e(t)))}};class ts extends(es(Pi)){static get is(){return"vaadin-grid-selection-column"}}b(ts),T("vaadin-grid-sorter",t.i`
    :host {
      justify-content: flex-start;
      align-items: baseline;
      -webkit-user-select: none;
      user-select: none;
      cursor: var(--lumo-clickable-cursor);
    }

    [part='content'] {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [part='indicators'] {
      margin-left: var(--lumo-space-s);
    }

    [part='indicators']::before {
      transform: scale(0.8);
    }

    :host(:not([direction]):not(:hover)) [part='indicators'] {
      color: var(--lumo-tertiary-text-color);
    }

    :host([direction]) {
      color: var(--vaadin-selection-color-text, var(--lumo-primary-text-color));
    }

    [part='order'] {
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
    }

    /* RTL specific styles */

    :host([dir='rtl']) [part='indicators'] {
      margin-right: var(--lumo-space-s);
      margin-left: 0;
    }
  `,{moduleId:"lumo-grid-sorter"});const is=document.createElement("template");is.innerHTML="\n  <style>\n    @font-face {\n      font-family: 'vaadin-grid-sorter-icons';\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAA0AAAAABuwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEFAAAABkAAAAcfep+mUdERUYAAAP4AAAAHAAAAB4AJwAOT1MvMgAAAZgAAAA/AAAAYA8TBPpjbWFwAAAB7AAAAFUAAAFeF1fZ4mdhc3AAAAPwAAAACAAAAAgAAAAQZ2x5ZgAAAlgAAABcAAAAnMvguMloZWFkAAABMAAAAC8AAAA2C5Ap72hoZWEAAAFgAAAAHQAAACQGbQPHaG10eAAAAdgAAAAUAAAAHAoAAABsb2NhAAACRAAAABIAAAASAIwAYG1heHAAAAGAAAAAFgAAACAACwAKbmFtZQAAArQAAAECAAACZxWCgKhwb3N0AAADuAAAADUAAABZCrApUXicY2BkYGAA4rDECVrx/DZfGbhZGEDgyqNPOxH0/wNMq5kPALkcDEwgUQBWRA0dAHicY2BkYGA+8P8AAwMLAwgwrWZgZEAFbABY4QM8AAAAeJxjYGRgYOAAQiYGEICQSAAAAi8AFgAAeJxjYGY6yziBgZWBgWkm0xkGBoZ+CM34msGYkZMBFTAKoAkwODAwvmRiPvD/AIMDMxCD1CDJKjAwAgBktQsXAHicY2GAAMZQCM0EwqshbAALxAEKeJxjYGBgZoBgGQZGBhCIAPIYwXwWBhsgzcXAwcAEhIwMCi+Z/v/9/x+sSuElA4T9/4k4K1gHFwMMMILMY2QDYmaoABOQYGJABUA7WBiGNwAAJd4NIQAAAAAAAAAACAAIABAAGAAmAEAATgAAeJyNjLENgDAMBP9tIURJwQCMQccSZgk2i5fIYBDAidJjycXr7x5EPwE2wY8si7jmyBNXGo/bNBerxJNrpxhbO3/fEFpx8ZICpV+ghxJ74fAMe+h7Ox14AbrsHB14nK2QQWrDMBRER4mTkhQK3ZRQKOgCNk7oGQqhhEIX2WSlWEI1BAlkJ5CDdNsj5Ey9Rncdi38ES+jzNJo/HwTgATcoDEthhY3wBHc4CE+pfwsX5F/hGe7Vo/AcK/UhvMSz+mGXKhZU6pww8ISz3oWn1BvhgnwTnuEJf8Jz1OpFeIlX9YULDLdFi4ASHolkSR0iuYdjLak1vAequBhj21D61Nqyi6l3qWybGPjySbPHGScGJl6dP58MYcQRI0bts7mjebBqrFENH7t3qWtj0OuqHnXcW7b0HOTZFnKryRGW2hFX1m0O2vEM3opNMfTau+CS6Z3Vx6veNnEXY6jwDxhsc2gAAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSrpYEBlIbxjQDrzgsuAAAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKyoz1cD0o087YTQATOcIewAAAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n",document.head.appendChild(is.content),T("vaadin-grid-sorter",t.i`
    :host {
      display: inline-flex;
      cursor: pointer;
      max-width: 100%;
    }

    [part='content'] {
      flex: 1 1 auto;
    }

    [part='indicators'] {
      position: relative;
      align-self: center;
      flex: none;
    }

    [part='order'] {
      display: inline;
      vertical-align: super;
    }

    [part='indicators']::before {
      font-family: 'vaadin-grid-sorter-icons';
      display: inline-block;
    }

    :host(:not([direction])) [part='indicators']::before {
      content: '\\e901';
    }

    :host([direction='asc']) [part='indicators']::before {
      content: '\\e900';
    }

    :host([direction='desc']) [part='indicators']::before {
      content: '\\e902';
    }
  `,{moduleId:"vaadin-grid-sorter-styles"});const rs=e=>class extends e{static get properties(){return{path:String,direction:{type:String,reflectToAttribute:!0,notify:!0,value:null,sync:!0},_order:{type:Number,value:null,sync:!0}}}static get observers(){return["_pathOrDirectionChanged(path, direction)"]}ready(){super.ready(),this.addEventListener("click",this._onClick.bind(this))}connectedCallback(){super.connectedCallback(),this._grid?this._grid.__applySorters():this.__dispatchSorterChangedEvenIfPossible()}disconnectedCallback(){super.disconnectedCallback(),!this.parentNode&&this._grid?this._grid.__removeSorters([this]):this._grid&&this._grid.__applySorters()}_pathOrDirectionChanged(){this.__dispatchSorterChangedEvenIfPossible()}__dispatchSorterChangedEvenIfPossible(){void 0!==this.path&&void 0!==this.direction&&this.isConnected&&(this.dispatchEvent(new CustomEvent("sorter-changed",{detail:{shiftClick:Boolean(this._shiftClick),fromSorterClick:Boolean(this._fromSorterClick)},bubbles:!0,composed:!0})),this._fromSorterClick=!1,this._shiftClick=!1)}_getDisplayOrder(e){return null===e?"":e+1}_onClick(e){if(e.defaultPrevented)return;const t=this.getRootNode().activeElement;this!==t&&this.contains(t)||(e.preventDefault(),this._shiftClick=e.shiftKey,this._fromSorterClick=!0,"asc"===this.direction?this.direction="desc":"desc"===this.direction?this.direction=null:this.direction="asc")}};class os extends(rs(N(li(Ut)))){static get template(){return $t`
      <div part="content">
        <slot></slot>
      </div>
      <div part="indicators">
        <span part="order">[[_getDisplayOrder(_order)]]</span>
      </div>
    `}static get is(){return"vaadin-grid-sorter"}}b(os);const ss="esri-grid",ns={base:ss,content:`${ss}__content`,grid:`${ss}__grid`,noDataMessage:`${ss}__no-data-message`},as={sort:["Enter"," "]};let ls=class extends c{constructor(e,t){super(e,t),this._columnElements=[],this._grid=null,this._temporaryHighlightId=null,this.itemIdPath="objectId",this.messages=null,this.selectionColumnEnabled=!0,this.viewModel=new u,this._onSelectedItemsChange=this._onSelectedItemsChange.bind(this)}initialize(){this.addHandles([this.columns.on("before-changes",(()=>this.renderNow())),this.columns.on("change",(()=>this.onColumnChange())),s.on((()=>this.highlightIds),"before-add",(({target:e})=>{!this.multipleSelectionEnabled&&e.length&&e.removeAll()})),this.rowHighlightIds.on("change",(()=>this.generateCellPartNames())),s.watch((()=>this.effectiveSize),(()=>this._updateGridSize())),s.watch((()=>this.isEditing),(()=>{this.generateCellPartNames(),this.requestContentUpdate()})),s.watch((()=>this.store?.state),((e,t)=>{"ready"!==e||"loaded"!==t&&"error"!==t||this.refreshPageCache()})),s.on((()=>this._table),"scroll",(()=>this.viewModel.closeColumnMenus())),r.on(window,"resize",(()=>this._updateColumnBorderStyles())),s.on((()=>this._table),"scrollend",(()=>{this.paginationEnabled||(this.pageIndex=this.getVirtualPageIndex()),this._updateColumnBorderStyles()})),s.watch((()=>this.multipleSelectionEnabled),(e=>{!e&&this.highlightIds.length>1&&this.highlightIds.removeAll()}))])}destroy(){this.resetColumns(),this.columns.destroyed||this.columns.destroy()}resetColumns(){this.columns.drain((e=>!e.destroyed&&e.destroy()))}get _columnRendering(){return this.columnPerformanceModeEnabled?"lazy":"eager"}get _selectedItems(){const{highlightIds:e,store:t}=this;return e.toArray().map((e=>t?.getItemByObjectId(e)??{objectId:e}))}get _gridIsDisabled(){return 0===this.viewModel.allVisibleColumns.length||this.hasInvalidColumnConfiguration}get _noDataMessage(){return n.renderingSanitizer.sanitize(this.noDataMessage)}get _table(){return this._grid?.$?.table}get cellPartNameGenerator(){return this.viewModel.cellPartNameGenerator}set cellPartNameGenerator(e){this.viewModel.cellPartNameGenerator=e}get columns(){return this.viewModel.columns}set columns(e){this.viewModel.columns=e}get columnPerformanceModeEnabled(){return this.viewModel.columnPerformanceModeEnabled}set columnPerformanceModeEnabled(e){this.viewModel.columnPerformanceModeEnabled=e}get columnReorderingEnabled(){return this.viewModel.columnReorderingEnabled}set columnReorderingEnabled(e){this.viewModel.columnReorderingEnabled=e}get dataProvider(){return this.viewModel.dataProvider}set dataProvider(e){this.viewModel.dataProvider=e}get editingEnabled(){return this.viewModel.editingEnabled}set editingEnabled(e){this.viewModel.editingEnabled=e}get effectiveSize(){return this.viewModel.effectiveSize}get groupColumns(){return this.viewModel.groupColumns}get hasInvalidColumnConfiguration(){return this.viewModel.hasInvalidColumnConfiguration}get highlightIds(){return this.viewModel.highlightIds}set highlightIds(e){this.viewModel.highlightIds=e}get temporaryHighlightId(){return this._temporaryHighlightId}get isEditing(){return this.viewModel.isEditing}get isReady(){return!!this._grid}get label(){return this.messages?.widgetLabel??""}set label(e){this._overrideIfSome("label",e)}get multipleSelectionEnabled(){return this.viewModel.multipleSelectionEnabled}set multipleSelectionEnabled(e){this.viewModel.multipleSelectionEnabled=e}get multiSortEnabled(){return this.viewModel.multiSortEnabled}set multiSortEnabled(e){this.viewModel.multiSortEnabled=e}get noDataMessage(){return this.viewModel.noDataMessage}set noDataMessage(e){this.viewModel.noDataMessage=e}get pageIndex(){return this.viewModel.pageIndex}set pageIndex(e){this.viewModel.pageIndex=e}get multipleSortPriority(){return this.viewModel.multipleSortPriority}set multipleSortPriority(e){this.viewModel.multipleSortPriority=e}get pageSize(){return this.viewModel.pageSize}set pageSize(e){this.viewModel.pageSize=e}get paginationEnabled(){return this.viewModel.paginationEnabled}set paginationEnabled(e){this.viewModel.paginationEnabled=e}get rowDetailsRenderer(){return this.viewModel.rowDetailsRenderer}set rowDetailsRenderer(e){this.viewModel.rowDetailsRenderer=e}get rowHighlightIds(){return this.viewModel.rowHighlightIds}set rowHighlightIds(e){this.viewModel.rowHighlightIds=e}get size(){return this.viewModel.size}get sortOrders(){return this._grid?._sorters?this._grid._sorters.filter((e=>!!e&&e.path)).map((({direction:e,path:t})=>({direction:e,path:t}))):[]}get store(){return this.viewModel.store}set store(e){this.viewModel.store=e}get state(){return this.viewModel.state}addSorter(e){this._grid?.__updateSorter(e,!1,!1),this.notifyChange("sortOrders")}getColumnProps(e,t){const{id:i}=this,{autoWidth:r,direction:o,fieldName:s,flexGrow:n,frozen:a,frozenToEnd:l,hidden:d,label:h,resizable:c,textAlign:u,width:_}=e,p=`${i}_${s}_${t}`,{renderFunction:m,footerRenderFunction:g,headerRenderFunction:f}=e,b=g?(e,t)=>g({root:e,column:t}):void 0,v=f?(e,t)=>f({root:e,column:t}):void 0,y=m?(e,t,i)=>m({root:e,column:t,rowData:i}):void 0;let C="";return e.direction&&(C+=" direction"),e.invalid&&(C+=" invalid"),{footerRenderer:b,headerRenderer:v,renderer:y,autoWidth:r,direction:o,flexGrow:n,frozen:a,frozenToEnd:l,headerPartName:C,key:p,resizable:c,bind:this,"data-fieldName":s,header:h,hidden:this.hasInvalidColumnConfiguration||d,path:s,"text-align":u,width:"number"==typeof _?`${_}px`:_,afterCreate:this._afterColumnCreate,afterRemoved:this._afterColumnRemoved}}clearSelection(){this._clearSelection(),this.scheduleRender()}clearSort(){let e=!1;this._grid&&(this._grid._sorters?.length&&(this._grid._sorters.forEach((e=>{e._order=null,e.direction=null})),e=!0),this.columns.length&&this.columns.some((e=>!!e.direction))&&(this.columns.forEach((e=>e.direction=null)),e=!0),e&&(this.notifyChange("sortOrders"),this.scheduleRender()))}findColumn(e){return this.viewModel.findColumn(e)}generateCellPartNames(){this._grid?.generateCellPartNames()}getFirstVisibleRowIndex(){return this._grid?._firstVisibleIndex||0}getVirtualPageIndex(){return Math.floor(this.getFirstVisibleRowIndex()/this.pageSize)}getLastVisibleRowIndex(){return this._grid?._lastVisibleIndex||0}getVisibleItemsCount(){return this._grid?._visibleItemsCount||0}getRowContainingNode(e){try{return this._grid?._getRowContainingNode(e)}catch{return null}}getSlotElementByName(e){return this._grid?.shadowRoot?.querySelector(`slot[name='${e}']`)??null}hasSorter(e){return this._grid?._sorters?.includes(e)||!1}hideColumn(e){this.viewModel.hideColumn(e)}recalculateColumnWidths(){this._grid?.recalculateColumnWidths()}async reset(){this._clearSelection(),await(this.store?.reset()),this.scrollToTop()}refreshPageCache(){this._grid?.clearCache(),this._temporaryHighlightId=null}requestContentUpdate(){this._grid?.requestContentUpdate(),this._temporaryHighlightId=null}selectRows(e){const{itemIdPath:t}=this,i=e?.filter((e=>!this.highlightIds.includes(e[t]))),r=i.map((e=>e[t]));r.length&&(this.multipleSelectionEnabled||(this.highlightIds.removeAll(),r.splice(1)),this.highlightIds.addMany(r))}deselectRows(e){const{itemIdPath:t}=this,i=e?.map((e=>e[t]))||[];i.length&&this.highlightIds.removeMany(i)}showColumn(e){this.viewModel.showColumn(e)}sort({path:e,direction:t}){this.viewModel.sortColumn(e,t),this.notifyChange("sortOrders")}scrollToIndex(e){0!==this.size&&(this._grid?.isConnected&&this._grid?.scrollToIndex(e),this._temporaryHighlightId=null)}scrollToTop(){this.scrollToIndex(0)}scrollToBottom(){this.scrollToIndex(1/0)}scrollLeft(e){const{_table:t}=this;t&&(t.scrollLeft=e)}toggleColumnVisibility(e){this.viewModel.toggleColumnVisibility(e)}onColumnChange(){this._columnElements.forEach((e=>this._applyRenderersToColumnElement(e))),this.requestContentUpdate()}render(){return g.tsx("div",{bind:this,class:this.classes(ns.base,_.globalCss.widget)},g.tsx("div",{bind:this,class:ns.content},this._renderGrid()))}_renderGrid(){return g.tsx("vaadin-grid",{afterCreate:this._afterGridCreate,afterUpdate:this._afterGridUpdate,bind:this,cellPartNameGenerator:this.cellPartNameGenerator,class:ns.grid,columnRendering:this._columnRendering,columnReorderingAllowed:this.columnReorderingEnabled,dataProvider:this.dataProvider,disabled:this._gridIsDisabled,id:`${this.id}_grid`,itemIdPath:this.itemIdPath,multiSort:this.multiSortEnabled,multiSortPriority:this.multipleSortPriority,pageSize:this.pageSize,ref:"grid",rowDetailsRenderer:this.rowDetailsRenderer,selectedItems:this._selectedItems,size:this.effectiveSize},this._renderAllColumns(),this._renderEmptyState())}_renderAllColumns(){return"disabled"!==this.state&&this.columns.length?[this._renderSelectionColumn(),this._renderColumns()]:null}_renderSelectionColumn(){return g.tsx("vaadin-grid-selection-column",{_selectAllHidden:!0,autoWidth:!1,bind:this,dragSelect:!0,frozen:!0,hidden:this.hasInvalidColumnConfiguration||!this.selectionColumnEnabled,selectAll:!1,sortable:!1,textAlign:"center"})}_renderColumns(){return Array.from(this.columns,((e,t)=>"columns"in e?this._renderGroupColumn(e,t):g.tsx("vaadin-grid-column",{...this.getColumnProps(e,t)}))).filter(i.isSome)}_renderGroupColumn(e,t){const i=this.getColumnProps(e,t);if(i.hidden||!e.columns)return null;const r=e.columns.filter((({hidden:e})=>!e));return r.length?g.tsx("vaadin-grid-column-group",{...i},r.map((e=>g.tsx("vaadin-grid-column",{...this.getColumnProps(e,t)})))):null}_renderEmptyState(){const e=this.viewModel;if("loaded"===e.state&&!e.isQueryingOrSyncing)return g.tsx("div",{class:ns.noDataMessage,slot:"empty-state"},this._noDataMessage??this.messages.noDataFound)}_afterGridCreate(e){const t=this._grid=e;t.setAttribute("theme","compact column-borders"),customElements.whenDefined("vaadin-grid").then((()=>{this._appendStyles(),this._addGridEventListeners()})),t.__updateSorter=(e,i,r)=>{const o=t._sorters,s=!o.includes(e),{multiSort:n,multiSortOnShiftClick:a,multiSortPriority:l}=t,d=o.filter((t=>t!==e)),h=n&&(!a||!r)||a&&i;e._order=null,e.direction?h?null!=e._initialOrder?(s?o[e._initialOrder]=e:o.splice(e._initialOrder,0,e),e._initialOrder=null):"append"===l&&s?t._sorters=[...d,e]:"prepend"===l&&(t._sorters=[e,...d]):(e.direction||a)&&(t._sorters=e.direction?[e]:[],d.forEach((e=>{e._order=null,e.direction=null}))):s||(t._sorters=[...d])},t.__removeSorters=e=>{if(0===e.length)return;const i=new Set(e.filter((e=>!e.direction)));t._sorters=t._sorters.filter((e=>!i.has(e))),t.__applySorters()}}_appendStyles(){const e=this._grid?.shadowRoot,t=document.createElement("style");e&&(t.textContent='\n      #items [part~="row"][editing],\n      #items [part~="row"][editing][selected] {\n        z-index: 2;\n      }\n\n      #items [part~="editing"],\n      #items [part~="editing"][selected] {\n        z-index: 3;\n      }\n\n      [frozen], [frozen-to-end] {\n        z-index: 4;\n      }\n\n      [last-frozen] {\n        overflow: visible;\n      }\n\n      [part~=\'cell\'] ::slotted(vaadin-grid-cell-content) {\n        align-items: center;\n        box-sizing: border-box !important;\n        height: 100%;\n        line-height: 2em;\n        min-height: 40px;\n      }\n\n      #items [part~="text-wrap"] {\n        text-wrap: wrap;\n      }\n    ',e.appendChild(t))}_afterGridUpdate(e){this._grid||(this._grid=e)}_afterColumnCreate(e){this._columnElements.push(e)}_afterColumnRemoved(e){const t=this._columnElements.indexOf(e,0);t>-1&&this._columnElements.splice(t,1)}_updateGridSize(){this._grid&&(this._grid.size=this.effectiveSize,this.scheduleRender())}_addGridEventListeners(){const e=this._grid;o.assertIsSome(e),this.addHandles([r.on(e,["click","dblclick","keydown","pointerover","pointerout"],(e=>this._onGridInteraction(e))),r.on(e,["pointerover","pointerout","cell-focus"],(e=>this._onTransientGridInteraction(e))),r.on(e,"selected-items-changed",this._onSelectedItemsChange),r.on(e,"sorter-changed",(()=>{this.notifyChange("sortOrders"),this._updateColumnBorderStyles()})),r.on(e,"column-resize",(e=>{const t=e.detail.resizedColumn,i=t.getAttribute("data-fieldName"),r=this.findColumn(i);r?.set({width:t.width}),this._updateColumnBorderStyles()})),r.on(e,"column-reorder",(()=>this._onColumnOrderChange()))])}_onGridInteraction(e){const t=this._grid;if(o.assertIsSome(t),("pointerover"===e.type||"pointerout"===e.type)&&e.relatedTarget!==t){const{target:t,relatedTarget:i}=e;if(!this._isGridCellContentNode(t)||!this._isGridCellContentNode(i))return}let i=null;try{i=t.getEventContext(e)}catch(e){}if(!i)return;const{column:r,index:s,item:n,section:a}=i;if(!a)return;if("header"===a&&"keydown"===e.type&&r?.path){const t=e.key;as.sort.includes(t)&&this.findColumn(r.path)?.sort()}const l=`cell-${e.type}`;this.emit(l,{type:l,context:i,index:s,item:n,native:e,path:r?.path??void 0})}_onTransientGridInteraction(e){if("pointerout"===e.type)return void(this._temporaryHighlightId=null);const t=this._grid;if(t)try{const{item:i}=t.getEventContext(e);this._temporaryHighlightId=i?.objectId}catch{this._temporaryHighlightId=null}}_isGridCellContentNode(e){return!!(e&&e instanceof HTMLElement&&"vaadin-grid-cell-content"===e.localName)}_onColumnOrderChange(){const e=this._grid;o.assertIsSome(e);const t=e._getColumnsInOrder(0),i=[],r=(this.viewModel.groupColumns.length?e._getColumnsInOrder(1):t).map((e=>e.getAttribute("data-fieldName")));t?.forEach((e=>{const t=e.getAttribute("data-fieldName");if(null!=t){const e=this.findColumn(t);i.push(t),e&&"columns"in e&&e.columns?.length&&e.columns.sort(((e,t)=>r.indexOf(e.fieldName)>r.indexOf(t.fieldName)?1:-1))}})),this.columns.sort(((e,t)=>i.indexOf(e.fieldName)>i.indexOf(t.fieldName)?1:-1)),this.notifyChange("sortOrders"),this.emit("column-reorder",{type:"column-reorder"})}_clearSelection(){this.highlightIds.removeAll(),this._temporaryHighlightId=null}_onSelectedItemsChange(e){const{highlightIds:t,itemIdPath:i}=this,r=e.detail.value.map((e=>e[i])),o=r.filter((e=>!t.includes(e)));if(!this.multipleSelectionEnabled&&o.length&&t.length)t.removeAll(),t.add(o[0]);else{const e=t.filter((e=>!r.includes(e)));t.removeMany(e),t.addMany(o)}}_applyRenderersToColumnElement(e){const t=e?.path,i=null!=t?this.findColumn(t):void 0;if(i)try{const{renderFunction:t,footerRenderFunction:r,headerRenderFunction:o}=i;t&&"renderer"in e&&(e.renderer=(e,i,r)=>t({root:e,column:i,rowData:r})),r&&(e.footerRenderer=(e,t)=>r({root:e,column:t})),o&&(e.headerRenderer=(e,t)=>o({root:e,column:t}))}catch(e){}}_updateColumnBorderStyles(){try{this._grid?._updateFirstAndLastColumn()}catch(e){}}};return e.__decorate([a.property()],ls.prototype,"_columnElements",void 0),e.__decorate([a.property()],ls.prototype,"_columnRendering",null),e.__decorate([a.property()],ls.prototype,"_selectedItems",null),e.__decorate([a.property()],ls.prototype,"_grid",void 0),e.__decorate([a.property()],ls.prototype,"_gridIsDisabled",null),e.__decorate([a.property()],ls.prototype,"_noDataMessage",null),e.__decorate([a.property()],ls.prototype,"_table",null),e.__decorate([a.property()],ls.prototype,"_temporaryHighlightId",void 0),e.__decorate([a.property()],ls.prototype,"cellPartNameGenerator",null),e.__decorate([a.property()],ls.prototype,"columns",null),e.__decorate([a.property()],ls.prototype,"columnPerformanceModeEnabled",null),e.__decorate([a.property()],ls.prototype,"columnReorderingEnabled",null),e.__decorate([a.property()],ls.prototype,"dataProvider",null),e.__decorate([a.property()],ls.prototype,"editingEnabled",null),e.__decorate([a.property()],ls.prototype,"effectiveSize",null),e.__decorate([a.property()],ls.prototype,"groupColumns",null),e.__decorate([a.property()],ls.prototype,"hasInvalidColumnConfiguration",null),e.__decorate([a.property()],ls.prototype,"highlightIds",null),e.__decorate([a.property()],ls.prototype,"temporaryHighlightId",null),e.__decorate([a.property()],ls.prototype,"isEditing",null),e.__decorate([a.property()],ls.prototype,"isReady",null),e.__decorate([a.property()],ls.prototype,"itemIdPath",void 0),e.__decorate([a.property()],ls.prototype,"label",null),e.__decorate([a.property(),m.messageBundle("esri/widgets/FeatureTable/t9n/FeatureTable")],ls.prototype,"messages",void 0),e.__decorate([a.property()],ls.prototype,"multipleSelectionEnabled",null),e.__decorate([a.property()],ls.prototype,"multiSortEnabled",null),e.__decorate([a.property()],ls.prototype,"noDataMessage",null),e.__decorate([a.property()],ls.prototype,"pageIndex",null),e.__decorate([a.property()],ls.prototype,"multipleSortPriority",null),e.__decorate([a.property()],ls.prototype,"pageSize",null),e.__decorate([a.property()],ls.prototype,"paginationEnabled",null),e.__decorate([a.property()],ls.prototype,"rowDetailsRenderer",null),e.__decorate([a.property()],ls.prototype,"rowHighlightIds",null),e.__decorate([a.property()],ls.prototype,"selectionColumnEnabled",void 0),e.__decorate([a.property()],ls.prototype,"size",null),e.__decorate([a.property({readOnly:!0})],ls.prototype,"sortOrders",null),e.__decorate([a.property()],ls.prototype,"store",null),e.__decorate([a.property()],ls.prototype,"state",null),e.__decorate([a.property()],ls.prototype,"viewModel",void 0),ls=e.__decorate([h.subclass("esri.widgets.FeatureTable.Grid.Grid")],ls),ls}));