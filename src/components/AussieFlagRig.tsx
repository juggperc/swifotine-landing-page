"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./AussieFlagRig.module.css";

type AussieFlagRigProps = {
  reduceMotion?: boolean;
};

type Vec2 = {
  x: number;
  y: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function AussieFlagRig({ reduceMotion = false }: AussieFlagRigProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const flagRef = useRef<HTMLButtonElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const pathShadowRef = useRef<SVGPathElement | null>(null);
  const anchorRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const flagEl = flagRef.current;
    const path = pathRef.current;
    const pathShadow = pathShadowRef.current;
    const anchorDot = anchorRef.current;

    if (!root || !flagEl || !path || !pathShadow || !anchorDot) {
      return;
    }

    const state = {
      width: 0,
      height: 0,
      anchor: { x: 0, y: 0 } as Vec2,
      pos: { x: 0, y: 0 } as Vec2,
      vel: { x: 0, y: 0 } as Vec2,
      pointer: { x: 0, y: 0 } as Vec2,
      pointerId: null as number | null,
      dragging: false,
      restLength: 52,
    };

    const halfFlag = { x: 28, y: 18 };

    let frame = 0;
    let previousTime = performance.now();

    const updateBounds = () => {
      const rect = root.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;
      state.anchor.x = clamp(state.width * 0.6, 34, state.width - 24);
      state.anchor.y = 10;

      if (state.pos.y === 0) {
        state.pos.x = state.anchor.x;
        state.pos.y = state.anchor.y + state.restLength;
      } else {
        state.pos.x = clamp(state.pos.x, halfFlag.x, state.width - halfFlag.x);
        state.pos.y = clamp(
          state.pos.y,
          state.anchor.y + 16,
          state.height - halfFlag.y,
        );
      }
    };

    const toLocal = (clientX: number, clientY: number): Vec2 => {
      const rect = root.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onPointerDown = (event: PointerEvent) => {
      event.preventDefault();
      state.dragging = true;
      state.pointerId = event.pointerId;
      state.pointer = toLocal(event.clientX, event.clientY);
      flagEl.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!state.dragging || event.pointerId !== state.pointerId) {
        return;
      }

      const nextPointer = toLocal(event.clientX, event.clientY);
      state.vel.x = (nextPointer.x - state.pointer.x) * 30;
      state.vel.y = (nextPointer.y - state.pointer.y) * 30;
      state.pointer = nextPointer;
    };

    const stopDragging = (event: PointerEvent) => {
      if (event.pointerId !== state.pointerId) {
        return;
      }

      state.dragging = false;
      state.pointerId = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const impulse = 110;

      if (event.key === "ArrowLeft") {
        state.vel.x -= impulse;
      } else if (event.key === "ArrowRight") {
        state.vel.x += impulse;
      } else if (event.key === "ArrowUp") {
        state.vel.y -= impulse;
      } else if (event.key === "ArrowDown") {
        state.vel.y += impulse;
      } else if (event.key === " ") {
        state.vel.y -= impulse * 1.2;
      } else {
        return;
      }

      event.preventDefault();
    };

    const render = (time: number) => {
      frame = requestAnimationFrame(render);

      const dt = Math.min(0.033, Math.max(0.001, (time - previousTime) / 1000));
      previousTime = time;

      if (state.dragging) {
        state.pos.x = clamp(state.pointer.x, halfFlag.x, state.width - halfFlag.x);
        state.pos.y = clamp(
          state.pointer.y,
          state.anchor.y + 18,
          state.height - halfFlag.y,
        );
      } else {
        const dx = state.pos.x - state.anchor.x;
        const dy = state.pos.y - state.anchor.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        const extension = dist - state.restLength;

        const springK = 20;
        const damping = 4.6;
        const gravity = 680;
        const windAmp = reduceMotion ? 0 : 44;
        const wind = Math.sin(time * 0.0018) * windAmp;

        const forceX = -springK * extension * (dx / dist) - damping * state.vel.x + wind;
        const forceY =
          -springK * extension * (dy / dist) - damping * state.vel.y + gravity;

        state.vel.x += forceX * dt;
        state.vel.y += forceY * dt;
        state.pos.x += state.vel.x * dt;
        state.pos.y += state.vel.y * dt;

        if (state.pos.x < halfFlag.x || state.pos.x > state.width - halfFlag.x) {
          state.pos.x = clamp(state.pos.x, halfFlag.x, state.width - halfFlag.x);
          state.vel.x *= -0.34;
        }

        if (
          state.pos.y < state.anchor.y + 16 ||
          state.pos.y > state.height - halfFlag.y
        ) {
          state.pos.y = clamp(
            state.pos.y,
            state.anchor.y + 16,
            state.height - halfFlag.y,
          );
          state.vel.y *= -0.34;
        }
      }

      const angle = Math.atan2(
        state.pos.y - state.anchor.y,
        state.pos.x - state.anchor.x,
      );
      const rotation = (angle * 180) / Math.PI - 90;

      flagEl.style.transform = `translate(${state.pos.x - halfFlag.x}px, ${
        state.pos.y - halfFlag.y
      }px) rotate(${rotation.toFixed(2)}deg)`;

      const stringSag = Math.min(
        24,
        7 + Math.abs(state.vel.x) * 0.014 + Math.abs(state.pos.x - state.anchor.x) * 0.12,
      );
      const controlX = (state.anchor.x + state.pos.x) / 2;
      const controlY = (state.anchor.y + state.pos.y) / 2 + stringSag;
      const d = `M ${state.anchor.x.toFixed(2)} ${state.anchor.y.toFixed(
        2,
      )} Q ${controlX.toFixed(2)} ${controlY.toFixed(2)} ${state.pos.x.toFixed(
        2,
      )} ${state.pos.y.toFixed(2)}`;

      path.setAttribute("d", d);
      pathShadow.setAttribute("d", d);
      anchorDot.setAttribute("cx", state.anchor.x.toFixed(2));
      anchorDot.setAttribute("cy", state.anchor.y.toFixed(2));
    };

    updateBounds();
    previousTime = performance.now();
    frame = requestAnimationFrame(render);

    flagEl.addEventListener("pointerdown", onPointerDown);
    flagEl.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
    window.addEventListener("resize", updateBounds);

    return () => {
      cancelAnimationFrame(frame);
      flagEl.removeEventListener("pointerdown", onPointerDown);
      flagEl.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
      window.removeEventListener("resize", updateBounds);
    };
  }, [reduceMotion]);

  return (
    <div className={styles.rig} ref={rootRef}>
      <svg className={styles.stringLayer} viewBox="0 0 140 170">
        <path className={styles.stringShadow} ref={pathShadowRef} />
        <path className={styles.stringMain} ref={pathRef} />
        <circle className={styles.anchorDot} r="3.2" ref={anchorRef} />
      </svg>

      <button
        aria-label="Drag Australian flag decoration"
        className={styles.flagHandle}
        ref={flagRef}
        type="button"
      >
        <Image
          alt="Australian flag"
          draggable={false}
          height={40}
          priority
          src="/brand/australian-flag.svg"
          width={58}
        />
      </button>
    </div>
  );
}
