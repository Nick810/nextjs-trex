import Image from "next/image";

export default function BlurImage({ image, fitStyle }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={image}
          layout="fill"
          objectFit="cover"
          className={`
              duration-700 ease-in-out group-hover:opacity-75
              ${ fitStyle ? fitStyle : null }
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </div>
  );
}