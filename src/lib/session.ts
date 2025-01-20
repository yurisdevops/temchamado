import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const session = await getServerSession(authOptions);
