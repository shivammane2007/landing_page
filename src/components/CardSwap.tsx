"use client";

import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }: any, ref) => (
  <div ref={ref as any} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}: any) => {
  const [expanded, setExpanded] = useState(false);
  
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<any>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<any>(null);
  const intervalRef = useRef<any>();
  const container = useRef<any>(null);

  useEffect(() => {
    const total = refs.length;
    
    // Ensure all cards are centered correctly before any transforms
    refs.forEach((r) => {
      gsap.set(r.current, { xPercent: -50, yPercent: -50, transformOrigin: 'center center', force3D: true });
    });

    if (expanded) {
      clearInterval(intervalRef.current);
      if (tlRef.current) tlRef.current.kill();
      
      const tl = gsap.timeline();
      tlRef.current = tl;
      const spread = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 250;
      refs.forEach((r, i) => {
        const visualIndex = order.current.indexOf(i);
        tl.to(r.current, {
          x: (visualIndex - (total - 1) / 2) * spread,
          y: 0,
          z: 0,
          skewY: 0,
          scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.85 : 0.95,
          duration: 0.8,
          ease: 'power3.out',
          zIndex: total - visualIndex
        }, 0);
      });
      return;
    }

    // Normal mode (collapsed)
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    refs.forEach((r, i) => {
       const visualIndex = order.current.indexOf(i);
       const slot = makeSlot(visualIndex, cardDistance, verticalDistance, total);
       tl.to(r.current, {
         x: slot.x,
         y: slot.y,
         z: slot.z,
         skewY: skewAmount,
         scale: 1,
         duration: 0.8,
         ease: 'power3.out',
         zIndex: slot.zIndex
       }, 0);
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const currentTl = gsap.timeline();
      tlRef.current = currentTl;

      currentTl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      currentTl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        currentTl.set(el, { zIndex: slot.zIndex }, 'promote');
        currentTl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      currentTl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      currentTl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      currentTl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      currentTl.call(() => {
        order.current = [...rest, front];
      });
    };

    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child: any, i) =>
    isValidElement(child)
      ? cloneElement(child as any, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: any) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
            setExpanded(prev => !prev);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
