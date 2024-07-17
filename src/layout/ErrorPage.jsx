import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
            <p className="mt-4 text-xl text-gray-700">Perdona, ha ocurrido un error!.</p>
            <p className="mt-2 text-gray-500">
                <i>{error.statusText || error.message}</i>
            </p>
            <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Volver al Inicio
            </a>
        </div>
    );
}
