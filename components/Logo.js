   export default function Logo({ size = 170 }) {
     return (
       <img src="/logo.png" alt="Logo perusahaan" width={size} height={size}
            style={{ objectFit: "contain" }} />
     );
   }