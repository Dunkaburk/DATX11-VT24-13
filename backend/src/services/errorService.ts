import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handleError (e: any) {
    console.log(e);
    if (e instanceof PrismaClientKnownRequestError) {
        const errorMessage = translatePrismaErrorCodes(e.code);
        if(errorMessage) {
            return errorMessage;
        }
        return e.message;
    } else {
        return "Error: Something went wrong.";
    }
}

function translatePrismaErrorCodes(code: string) {
    if (code === 'P2002') {
        return 'Unique constraint failure.';
    }
    return null;
}