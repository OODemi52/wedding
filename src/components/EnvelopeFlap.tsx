import { motion } from "framer-motion";
import envelopeFlapOut from "../../public/both_images/envelope_flap_out.png";
import envelopeFlapIn from "../../public/both_images/envelope_flap_in.png";

interface EnvelopeFlapProps {
    flapHalfFlipped: boolean;
    setFlapHalfFlipped: (flapHalfFlipped: boolean) => void;
    setFlapFullyFlipped: (flapFullyFlipped: boolean) => void;
}

import React, { useMemo } from "react";

const EnvelopeFlap: React.FC<EnvelopeFlapProps> = ({ flapHalfFlipped, setFlapHalfFlipped, setFlapFullyFlipped }) => {
    const style = useMemo(() => ({
        position: 'absolute',
        width: "840px",
        height: "549px",
        backfaceVisibility: 'hidden',
        zIndex: 10,
        transformOrigin: 'top',
    }), []);

    const initial = useMemo(() => flapHalfFlipped ? { rotateZ: 180 } : {}, [flapHalfFlipped]);

    const animate = useMemo(() => ({
        rotateX: flapHalfFlipped ? [90, 180] : [0, 90],
    }), [flapHalfFlipped]);

    const transition = useMemo(() => ({
        rotateX: { duration: 1.5, ease: flapHalfFlipped ? "easeOut" : "easeIn", delay: flapHalfFlipped ? 0 : 1.5 },
    }), [flapHalfFlipped]);

    return useMemo(() => (
        <motion.img
            className={flapHalfFlipped ? "envelope-flap-in" : "envelope-flap-out"}
            alt={flapHalfFlipped ? "Inside of envelope flap" : "Outside of envelope flap"}
            src={flapHalfFlipped ? envelopeFlapIn : envelopeFlapOut}
            style={style as React.CSSProperties}
            initial={initial}
            animate={animate}
            transition={transition}
            onAnimationComplete={() => flapHalfFlipped ? setFlapFullyFlipped(true) : setFlapHalfFlipped(true)}
        />
    ), [
        flapHalfFlipped,
        style,
        initial,
        animate,
        transition,
        setFlapFullyFlipped,
        setFlapHalfFlipped
    ]);
};

export default EnvelopeFlap;
  