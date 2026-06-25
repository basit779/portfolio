"use client";

import { useEffect, useRef } from "react";

/**
 * Custom WebGL fragment-shader background — a slow, domain-warped noise field in
 * the brand palette that reacts to the cursor. Tuned for performance:
 *  - renders to a downscaled buffer (CSS upscales it; a smooth shader hides it)
 *  - throttled to ~30fps (motion is slow; saves GPU on high-refresh panels)
 *  - pauses when the tab is hidden
 *  - recovers from WebGL context loss (common on Windows: sleep/resume, TDR)
 *  - falls back to a static CSS gradient for reduced-motion / no-WebGL
 */

const VERT = `
attribute vec2 a;
varying vec2 v;
void main() {
  v = a * 0.5 + 0.5;
  gl_Position = vec4(a, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 3; i++){ s += a * noise(p); p *= 2.0; a *= 0.5; } return s; }

void main(){
  vec2 uv = v;
  vec2 asp = vec2(u_res.x / u_res.y, 1.0);
  vec2 p = (uv - 0.5) * asp * 2.6;
  float t = u_time * 0.05;

  vec2 q = vec2(fbm(p + t), fbm(p - t + 5.2));
  float n = fbm(p + q * 1.6 + t * 0.5);

  vec3 base   = vec3(0.027, 0.027, 0.039);
  vec3 green  = vec3(0.243, 0.812, 0.557);
  vec3 cyan   = vec3(0.133, 0.827, 0.933);
  vec3 violet = vec3(0.545, 0.361, 0.965);

  vec3 col = base;
  col = mix(col, green  * 0.55, smoothstep(0.35, 0.78, n) * 0.55);
  col = mix(col, violet * 0.55, smoothstep(0.58, 0.98, n) * 0.45);
  col = mix(col, cyan   * 0.55, smoothstep(0.20, 0.50, 1.0 - n) * 0.28);

  float md = distance(uv, u_mouse);
  col += green * 0.22 * smoothstep(0.42, 0.0, md);

  col *= 1.0 - 0.6 * pow(length((uv - 0.5) * asp), 1.5);
  col += (hash(gl_FragCoord.xy + u_time) - 0.5) / 255.0 * 6.0;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const quality = coarse ? 0.5 : 0.8; // render under 1× CSS res, then upscale
    const FRAME = 1000 / 30; // throttle: motion is slow, 30fps is plenty

    let gl: WebGLRenderingContext | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let w = 0, h = 0, raf = 0, prev = 0;
    let start = performance.now();
    let mx = 0.5, my = 0.6, tmx = 0.5, tmy = 0.6;

    const resize = () => {
      if (!gl) return;
      w = Math.max(1, Math.floor(canvas.clientWidth * quality));
      h = Math.max(1, Math.floor(canvas.clientHeight * quality));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    // (re)create the program — also used to recover after context loss
    const initGL = () => {
      gl =
        (canvas.getContext("webgl", { antialias: false, alpha: false }) as WebGLRenderingContext | null) ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
      if (!gl) {
        canvas.style.display = "none";
        return false;
      }
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) {
        canvas.style.display = "none";
        return false;
      }
      const prog = gl.createProgram();
      if (!prog) return false;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        canvas.style.display = "none";
        return false;
      }
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aLoc = gl.getAttribLocation(prog, "a");
      gl.enableVertexAttribArray(aLoc);
      gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

      uRes = gl.getUniformLocation(prog, "u_res");
      uTime = gl.getUniformLocation(prog, "u_time");
      uMouse = gl.getUniformLocation(prog, "u_mouse");
      resize();
      return true;
    };

    const drawOnce = (timeSec: number) => {
      if (!gl) return;
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, timeSec);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (now - prev < FRAME) return;
      prev = now;
      mx += (tmx - mx) * 0.08;
      my += (tmy - my) * 0.08;
      drawOnce((now - start) / 1000);
    };

    if (!initGL()) return;

    const onMove = (e: MouseEvent) => {
      tmx = e.clientX / window.innerWidth;
      tmy = 1 - e.clientY / window.innerHeight;
    };
    if (!coarse && !reduce) window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    if (reduce) {
      drawOnce(12.0); // single static frame, no loop
    } else {
      raf = requestAnimationFrame(render);
    }

    const onVisibility = () => {
      if (reduce) return;
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        prev = 0;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onRestored = () => {
      if (initGL() && !reduce) {
        start = performance.now();
        prev = 0;
        raf = requestAnimationFrame(render);
      } else if (initGL()) {
        drawOnce(12.0);
      }
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-bg"
      style={{
        backgroundImage:
          "radial-gradient(60% 50% at 20% 10%, rgba(62,207,142,0.10), transparent 60%), radial-gradient(50% 50% at 85% 25%, rgba(139,92,246,0.10), transparent 60%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55vh] grid-floor opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.5))]" />
    </div>
  );
}
