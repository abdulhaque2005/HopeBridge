"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { Translate } from "@/components/translate";
import { Button } from "@/components/ui/button";

interface GoogleMapProps {
  address: string;
  embedUrl: string;
}

export function GoogleMap({ address, embedUrl }: GoogleMapProps) {
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="relative w-full h-full group">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100"
      />
      
      {/* Overlay controls */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass p-4 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-xl">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                <Translate>Our Headquarters</Translate>
              </p>
              <p className="text-sm font-bold truncate max-w-[200px]">
                <Translate>{address}</Translate>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 pointer-events-auto"
        >
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-full shadow-xl hover:scale-105 transition-transform font-bold bg-white/90 text-black hover:bg-white"
            render={<a href={googleMapsSearchUrl} target="_blank" rel="noopener noreferrer" />}
          >
            <Translate>View on Maps</Translate> <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full shadow-xl hover:scale-105 transition-transform font-bold"
            render={<a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" />}
          >
            <Translate>Directions</Translate> <Navigation className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Decorative pulse indicator on the map (roughly centered for effect) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative">
          <div className="absolute inset-0 w-8 h-8 bg-primary/40 rounded-full animate-ping" />
          <div className="relative w-8 h-8 bg-primary/60 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
