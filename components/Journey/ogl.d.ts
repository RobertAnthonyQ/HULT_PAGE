declare module 'ogl' {
  export class Renderer {
    gl: WebGLRenderingContext;
    constructor(options?: { alpha?: boolean; premultipliedAlpha?: boolean });
    setSize(width: number, height: number): void;
    render(options: { scene: any }): void;
  }

  export class Program {
    uniforms: Record<string, { value: any }>;
    constructor(
      gl: WebGLRenderingContext,
      options: {
        vertex: string;
        fragment: string;
        uniforms: Record<string, { value: any }>;
      }
    ): void;
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: { geometry: any; program: any });
  }

  export class Color {
    constructor(r: number, g: number, b: number);
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }
}
