import Link from "next/link";

const Card = ({
  id,
  name,
  description,
}: {
  id: number;
  name: string;
  description: string;
}) => {
  return (
    <div className="box-border  m-3 p-3 w-[200px] h-[250px] rounded-sm shadow-lg bg-white">
      <Link href={`/list/${id}`} passHref>
        <h3 className="text-lg font-bold cursor-pointer w-300">{name}</h3>
      </Link>
      <p className="text-md w-full max-w-300">{description}</p>
    </div>
  );
};

export default Card;
