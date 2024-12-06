interface TitleProps {
    title: string;
}

export default function Title({ title }: TitleProps) {

    return (
        <div className="mt-5 mb-6 flex justify-center items-center">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
    );
}