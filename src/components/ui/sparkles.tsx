"use client";
import { useId } from "react";
import Particles from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  const generatedId = useId();

  const options: ISourceOptions = {
    background: {
      color: { value: background || "#0d47a1" },
    },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: false, mode: "repulse" },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: particleColor || "#ffffff" },
      move: {
        enable: true,
        speed: { min: 0.1, max: 1 },
        direction: "none",
        outModes: { default: "out" },
        random: false,
        straight: false,
      },
      number: {
        density: { enable: true },
        value: particleDensity || 120,
      },
      opacity: {
        value: { min: 0.1, max: 1 },
        animation: {
          enable: true,
          speed: speed || 4,
          sync: false,
          mode: "auto",
          startValue: "random",
        },
      },
      shape: { type: "circle" },
      size: {
        value: { min: minSize || 1, max: maxSize || 3 },
      },
      reduceDuplicates: false,
    },
    detectRetina: true,
  };

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      <Particles
        id={id || generatedId}
        className={cn("h-full w-full")}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </motion.div>
  );
};
