import React from "react";

import styles from "./movingText.module.css";

export const MovingText = () => {
  return (
    <svg
      id="svg"
      viewBox="95 115 300 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`font-bold ${styles.svg}`}
    >
      <path
        id="curve"
        d="M100,200 C100,100 250,100 250,200, S400,300 400,200"
        stroke=""
        stroke-width="30"
        className={styles.path}
      ></path>
      <text>
        <textPath xlinkHref="#curve" fill="#8861F0" font-weight="bold">
          #FamiliaEtBeneficium • Keluarga dan Manfaat • #FamiliaEtBeneficium •
          Keluarga dan Manfaat • #FamiliaEtBeneficium • Keluarga dan Manfaat •
          #FamiliaEtBeneficium • Keluarga dan Manfaat • #FamiliaEtBeneficium •
          Keluarga dan Manfaat • #FamiliaEtBeneficium • Keluarga dan Manfaat •
          #FamiliaEtBeneficium • Keluarga dan Manfaat • #FamiliaEtBeneficium •
          Keluarga dan Manfaat • #FamiliaEtBeneficium • Keluarga dan Manfaat •
          #FamiliaEtBeneficium • Keluarga dan Manfaat
        </textPath>
        <animate
          attributeName="x"
          dur="90s"
          values="-4000;0"
          repeatCount="indefinite"
        ></animate>
      </text>
    </svg>
  );
};
