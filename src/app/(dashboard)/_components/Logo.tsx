import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative w-40 h-20 my-4">
      <Image
        src={'/logo.svg'}
        fill
        style={{ objectFit: 'contain' }}
        alt="Logo"
      />
    </div>
  );
}

export default Logo;
