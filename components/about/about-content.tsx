"use client";

import { motion, useReducedMotion } from "motion/react";

const paragraphs = [
  "En Mar D Jabones elaboramos jabones y resinas artesanales con ingredientes seleccionados y un enfoque consciente en el cuidado de la piel y el medio ambiente. Cada pieza es diseñada para brindar una experiencia sensorial equilibrada y agradable.",
  "Trabajamos en pequeños lotes, cuidando cada detalle: desde la selección de materiales hasta el empaque final. Nuestro objetivo es ofrecer productos que transmitan calma, bienestar y la esencia del mar Caribe en cada uso.",
  "Acompañamos a nuestra comunidad con un servicio cercano, transparente y confiable. Creemos en la calidad, la sostenibilidad y el diseño atemporal que perdura.",
];

export function AboutContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-6 text-base leading-7 text-muted-foreground">
      {paragraphs.map((text, index) => (
        <motion.p
          key={index}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.55,
            delay: prefersReducedMotion ? 0 : index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
