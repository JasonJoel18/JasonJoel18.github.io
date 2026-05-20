import { useEffect, useRef, useState } from 'react';

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = (a_pos + 1.0) * 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;
uniform sampler2D u_tex;
uniform vec2  u_mouse;     // 0..1
uniform float u_hover;     // 0..1
uniform float u_time;

void main(){
  vec2 uv = v_uv;
  uv.y = 1.0 - uv.y;
  vec2 d = uv - u_mouse;
  float dist = length(d);
  float ripple = sin(dist * 28.0 - u_time * 3.0) * 0.012 * u_hover * smoothstep(0.55, 0.0, dist);
  vec2 off = normalize(d + 1e-6) * ripple;

  float aberr = 0.006 * u_hover * smoothstep(0.4, 0.0, dist);
  float r = texture(u_tex, uv + off + vec2( aberr, 0.0)).r;
  float g = texture(u_tex, uv + off                  ).g;
  float b = texture(u_tex, uv + off + vec2(-aberr, 0.0)).b;
  float a = texture(u_tex, uv + off).a;
  outColor = vec4(r, g, b, a);
}`;

interface Props {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Image wrapped in a WebGL2 canvas that applies an RGB-shift ripple centred
 * on the cursor. Falls back to a plain <img> when WebGL2/reduced-motion isn't available.
 */
export default function DistortMedia({ src, alt, className }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [glReady, setGlReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !img || !wrap) return;

    const gl = canvas.getContext('webgl2', { premultipliedAlpha: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uHover = gl.getUniformLocation(program, 'u_hover');
    const uTime  = gl.getUniformLocation(program, 'u_time');

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const upload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      setGlReady(true);
    };
    if (img.complete && img.naturalWidth > 0) upload();
    else img.addEventListener('load', upload, { once: true });

    const mouse = { x: 0.5, y: 0.5, hover: 0 };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
    };
    const onEnter = () => { mouse.hover = 1; };
    const onLeave = () => { mouse.hover = 0; };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerenter', onEnter);
    wrap.addEventListener('pointerleave', onLeave);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = wrap.getBoundingClientRect();
      canvas.width  = Math.floor(r.width  * dpr);
      canvas.height = Math.floor(r.height * dpr);
      canvas.style.width  = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let hover = 0;
    const start = performance.now();
    let rafId = 0;
    const tick = () => {
      hover += (mouse.hover - hover) * 0.08;
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uHover, hover);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerenter', onEnter);
      wrap.removeEventListener('pointerleave', onLeave);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [reduce, src]);

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: glReady && !reduce ? 0 : 1,
          transition: 'opacity 200ms',
        }}
      />
      {!reduce && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: glReady ? 1 : 0,
            transition: 'opacity 300ms',
          }}
        />
      )}
    </div>
  );
}
