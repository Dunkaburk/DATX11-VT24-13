import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handleError (e: any) {
    console.log(e);
    if (e instanceof PrismaClientKnownRequestError) {
        return e.message;
    } else {
        return "Error: Something went wrong.";
    }
}